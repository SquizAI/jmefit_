import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, Clock } from 'lucide-react';

function Blog() {
  const blogPosts = [
    {
      title: "5 Essential Tips for Building Lean Muscle",
      excerpt: "Learn the fundamental principles of muscle building and how to optimize your training for maximum results.",
      author: "Jaime Christine",
      date: "March 15, 2024",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=800&q=80",
      category: "Training"
    },
    {
      title: "Understanding Macros: A Beginner's Guide",
      excerpt: "Dive into the world of macro tracking and learn how to optimize your nutrition for your fitness goals.",
      author: "Jaime Christine",
      date: "March 10, 2024",
      readTime: "7 min read",
      image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=800&q=80",
      category: "Nutrition"
    },
    {
      title: "The Importance of Recovery in Your Fitness Journey",
      excerpt: "Discover why rest and recovery are crucial components of any successful training program.",
      author: "Jaime Christine",
      date: "March 5, 2024",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80",
      category: "Wellness"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        Latest Articles
      </h1>
      <p className="text-xl text-gray-600 mb-12">
        Expert advice on training, nutrition, and living a healthy lifestyle
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post, index) => (
          <article key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="aspect-w-16 aspect-h-9 relative">
              <img
                src={post.image}
                alt={post.title}
                className="object-cover w-full h-48"
              />
              <div className="absolute top-4 left-4">
                <span className="bg-jme-purple text-white text-sm px-3 py-1 rounded-full">
                  {post.category}
                </span>
              </div>
            </div>
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                {post.title}
              </h2>
              <p className="text-gray-600 mb-4">
                {post.excerpt}
              </p>
              <div className="flex items-center text-sm text-gray-500 space-x-4">
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-1" />
                  {post.author}
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  {post.date}
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {post.readTime}
                </div>
              </div>
            </div>
            <div className="px-6 pb-6">
              <Link
                to={`/blog/${post.title.toLowerCase().replace(/\s+/g, '-')}`}
                className="text-jme-purple font-semibold hover:text-purple-700 transition-colors"
              >
                Read More →
              </Link>
            </div>
          </article>
        ))}
      </div>

      {/* Newsletter Section */}
      <div className="mt-24 bg-gradient-to-r from-jme-purple to-purple-800 rounded-2xl p-12 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">
          Subscribe to Our Newsletter
        </h2>
        <p className="text-gray-200 mb-8 max-w-2xl mx-auto">
          Get the latest articles, workout tips, and exclusive content delivered straight to your inbox.
        </p>
        <form className="max-w-md mx-auto flex gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-6 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
          />
          <button
            type="submit"
            className="bg-white text-jme-purple px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
}

export default Blog;