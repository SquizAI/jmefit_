
interface PricingToggleProps {
  interval: 'month' | 'year';
  onChange: (interval: 'month' | 'year') => void;
  monthlyPrice: number;
  className?: string;
}

export default function PricingToggle({ interval, onChange, monthlyPrice, className = '' }: PricingToggleProps) {
  const yearlyPrice = monthlyPrice * 12 * 0.8; // 20% discount
  const yearlySavings = (monthlyPrice * 12) - yearlyPrice;

  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      <div className="flex items-stretch gap-4">
        <div 
          onClick={() => onChange('month')}
          className={`flex-1 cursor-pointer rounded-xl border-2 transition-all duration-300 ${
            interval === 'month'
              ? 'border-jme-purple bg-purple-50'
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <div className="p-4 text-center">
            <div className="text-sm font-medium text-gray-500 mb-2">Monthly</div>
            <div className="text-2xl font-bold text-gray-900">${monthlyPrice.toFixed(2)}</div>
            <div className="text-sm text-gray-500">per month</div>
          </div>
        </div>

        <div 
          onClick={() => onChange('year')}
          className={`flex-1 cursor-pointer rounded-xl border-2 transition-all duration-300 relative ${
            interval === 'year'
              ? 'border-jme-purple bg-purple-50'
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          {interval === 'year' && (
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
              BEST VALUE
            </div>
          )}
          <div className="p-4 text-center">
            <div className="text-sm font-medium text-gray-500 mb-2">Yearly</div>
            <div className="text-2xl font-bold text-gray-900">
              ${(yearlyPrice / 12).toFixed(2)}
            </div>
            <div className="text-sm text-gray-500">per month</div>
          </div>
        </div>
      </div>
      
      {interval === 'year' && (
        <div className="text-center">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium">
            <span>Save ${yearlySavings.toFixed(2)} per year</span>
          </div>
        </div>
      )}
    </div>
  );
}