import { supabase } from '../supabase';
import { getServerStripe } from '../stripe';
import type { Database } from '../database.types';

export type SubscriptionPlan = Database['public']['Tables']['subscription_plans']['Row'];
export type SubscriptionPrice = Database['public']['Tables']['subscription_prices']['Row'];

/**
 * Get all active subscription plans with their prices
 */
export async function getSubscriptionPlans() {
  const { data: plans, error } = await supabase
    .from('subscription_plans')
    .select(`
      *,
      prices: subscription_prices(*)
    `)
    .eq('active', true as any) // Using 'as any' to bypass type error temporarily
    .order('created_at');

  if (error) throw error;
  return plans;
}

/**
 * Create a new subscription using a subscription price ID
 */
export async function createSubscription(priceId: string) {
  const { data: price, error: priceError } = await supabase
    .from('subscription_prices')
    .select('*, subscription_plans(*)')
    .eq('id', priceId as any) // Using 'as any' to bypass type error temporarily
    .single();

  if (priceError || !price) throw priceError || new Error('Price not found');

  // Use server-side Stripe instance for checkout sessions
  const stripe = getServerStripe();
  
  // Create a checkout session via supabase function
  const { data: { sessionId }, error } = await supabase.functions.invoke(
    'create-subscription',
    {
      body: { 
        priceId: price.stripe_price_id,
        successUrl: `${window.location.origin}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
        cancelUrl: `${window.location.origin}/pricing`,
        metadata: {
          subscription_plan_id: price.subscription_plan_id
        }
      }
    }
  );

  if (error) throw error;
  return { sessionId };
}

/**
 * Create a new subscription plan in both Stripe and our database
 */
export async function createSubscriptionPlan({
  name,
  description,
  features = [],
  metadata = {}
}: {
  name: string;
  description: string;
  features?: string[];
  metadata?: Record<string, any>;
}) {
  // Use server-side Stripe
  const stripe = getServerStripe();
  
  try {
    // Create product in Stripe first
    const stripeProduct = await stripe.products.create({
      name,
      description,
      metadata: {
        ...metadata,
        features: JSON.stringify(features)
      }
    });

    // Then create subscription plan in our database
    const { data, error } = await supabase
      .from('subscription_plans')
      .insert({
        name,
        description,
        features,
        stripe_product_id: stripeProduct.id,
        active: true,
        metadata
      } as any) // Using 'as any' to bypass type error temporarily
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error creating subscription plan:', error);
    throw error;
  }
}

/**
 * Create a new subscription price for a plan
 */
export async function createSubscriptionPrice({
  planId,
  amount,
  interval,
  currency = 'usd',
  metadata = {}
}: {
  planId: string;
  amount: number;
  interval: 'month' | 'year';
  currency?: string;
  metadata?: Record<string, any>;
}) {
  // Get the subscription plan to get its Stripe product ID
  const { data: plan, error: planError } = await supabase
    .from('subscription_plans')
    .select('*')
    .eq('id', planId as any) // Using 'as any' to bypass type error temporarily
    .single();

  if (planError || !plan) throw new Error('Subscription plan not found');
  if (!plan.stripe_product_id) throw new Error('Plan has no Stripe product ID');

  // Use server-side Stripe
  const stripe = getServerStripe();
  
  try {
    // Create price in Stripe
    const stripePrice = await stripe.prices.create({
      product: plan.stripe_product_id as string, // Using 'as string' to bypass type error temporarily
      unit_amount: Math.round(amount * 100),
      currency,
      recurring: {
        interval
      },
      metadata
    });

    // Create price in our database
    const { data: price, error: priceError } = await supabase
      .from('subscription_prices')
      .insert({
        subscription_plan_id: planId,
        stripe_price_id: stripePrice.id,
        price: amount,
        interval,
        currency,
        recurring: true,
        active: true,
        metadata
      } as any) // Using 'as any' to bypass type error temporarily
      .select()
      .single();

    if (priceError) throw priceError;
    return price;
  } catch (error) {
    console.error('Error creating subscription price:', error);
    throw error;
  }
}