import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Activity, MessageSquare, FileText, Calendar } from 'lucide-react';
import Dashboard from '../Components/Dashboard';

const LandingPage = () => {
//   const navigate = useNavigate();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      text: "HealthTrack completely changed how I manage my health. The personalized reminders keep me on track with my medication schedule.",
      role: "Fitness Enthusiast"
    },
    {
      id: 2,
      name: "Michael Chen",
      text: "The AI chatbot provided me with instant answers about my symptoms when I was traveling. It's like having a doctor in my pocket!",
      role: "Business Professional"
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      text: "The smart report analysis helped me understand my lab results in plain language. I feel more informed about my health than ever before.",
      role: "Teacher"
    }
  ];
  
  const features = [
    {
      id: 1,
      title: "Real-time Health Monitoring",
      description: "Track vital signs, symptoms, and health metrics with continuous updates and alerts.",
      icon: <Activity className="h-12 w-12 text-blue-500" />,
      link: "/dashboard/monitoring"
    },
    {
      id: 2,
      title: "AI-powered Chatbot",
      description: "Get instant health advice and answers to your medical questions anytime.",
      icon: <MessageSquare className="h-12 w-12 text-blue-500" />,
      link: "/dashboard/chatbot"
    },
    {
      id: 3,
      title: "Smart Report Analysis",
      description: "Upload medical reports and receive easy-to-understand interpretations and insights.",
      icon: <FileText className="h-12 w-12 text-blue-500" />,
      link: "/dashboard/reports"
    },
    {
      id: 4,
      title: "Personalized Health Reminders",
      description: "Never miss appointments, medications, or important health checkups with custom alerts.",
      icon: <Calendar className="h-12 w-12 text-blue-500" />,
      link: "/dashboard/reminders"
    }
  ];
  
  // Auto-slider for testimonials
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
//     }, 5000);
    
//     return () => clearInterval(interval);
//   }, [testimonials.length]);
  
  const handleGetStarted = () => {
    // navigate('/signup');
  };
  
//   const handleFeatureClick = (link) => {
//     navigate(link);
//   };
  
  return (
    <div className="min-h-screen flex flex-col">
      
      {/* Header */}
      <header className="bg-white shadow-md fixed w-full z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <a href="#" className="text-2xl font-bold text-blue-600">HealthTrack</a>
            <nav className="hidden md:flex items-center">
              <ul className="flex space-x-8">
                <li>
                  <a href="#" className="hover:text-blue-600 transition duration-300">
                    <Link to="/dashboard">
                    Dashboard
                    </Link>
                  </a>
                </li>
                <li><a href="#features" className="hover:text-blue-600 transition duration-300">Features</a></li>
                <li><a href="#how-it-works" className="hover:text-blue-600 transition duration-300">How It Works</a></li>
                <li><a href="#testimonials" className="hover:text-blue-600 transition duration-300">Testimonials</a></li>
                <li><a href="#" className="bg-gradient-to-r from-blue-600 to-blue-400 text-white px-6 py-2 rounded-full font-medium hover:shadow-lg transition duration-300">Sign Up</a></li>
              </ul>
            </nav>
            <div className="md:hidden flex items-center">
              <button className="text-gray-800">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-blue-50 pt-32 pb-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-gradient-to-r from-blue-600 to-blue-400 opacity-10"></div>
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 md:pr-10 mb-10 md:mb-0 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Track Your Health, <span className="text-blue-600">Anytime, Anywhere!</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                AI-powered insights, real-time health monitoring, and personalized care.
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <a href="#" className="bg-gradient-to-r from-blue-600 to-blue-400 text-white px-8 py-3 rounded-full font-medium hover:shadow-lg transform hover:-translate-y-1 transition duration-300">
                  Get Started
                </a>
                <a href="#" className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-full font-medium hover:bg-blue-50 transition duration-300">
                  Explore Features
                </a>
              </div>
            </div>
            <div className="md:w-1/2">
              <img src="/api/placeholder/400/320" alt="Health Dashboard" className="rounded-xl shadow-xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Why Choose HealthTrack?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition duration-300">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-3xl mb-6 mx-auto">
                📊
              </div>
              <h3 className="text-xl font-bold text-center mb-4">AI-Powered Health Insights</h3>
              <p className="text-gray-600 text-center">
                Personalized health predictions and recommendations based on your unique health profile.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition duration-300">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-3xl mb-6 mx-auto">
                🎙️
              </div>
              <h3 className="text-xl font-bold text-center mb-4">Voice & Image Input</h3>
              <p className="text-gray-600 text-center">
                Track your health metrics easily using voice commands or by simply uploading images.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition duration-300">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-3xl mb-6 mx-auto">
                📉
              </div>
              <h3 className="text-xl font-bold text-center mb-4">Real-time Health Tracking</h3>
              <p className="text-gray-600 text-center">
                Sync with your favorite wearable devices for continuous monitoring of vital health metrics.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition duration-300">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-3xl mb-6 mx-auto">
                📢
              </div>
              <h3 className="text-xl font-bold text-center mb-4">Emergency Contact Alerts</h3>
              <p className="text-gray-600 text-center">
                Send SOS alerts with your live location to emergency contacts when you need immediate help.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition duration-300">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-3xl mb-6 mx-auto">
                💬
              </div>
              <h3 className="text-xl font-bold text-center mb-4">AI Chatbot Assistance</h3>
              <p className="text-gray-600 text-center">
                Get instant health guidance and answers to your health queries 24/7 with our smart AI assistant.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-blue-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {/* Step 1 */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full flex items-center justify-center text-xl font-bold text-white mb-6">
                1
              </div>
              <h3 className="text-xl font-bold text-center mb-2">Sign Up</h3>
              <p className="text-gray-600 text-center">
                Create an account and input your basic health details.
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full flex items-center justify-center text-xl font-bold text-white mb-6">
                2
              </div>
              <h3 className="text-xl font-bold text-center mb-2">Smart Tracking</h3>
              <p className="text-gray-600 text-center">
                Use AI-driven insights and connect your devices.
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full flex items-center justify-center text-xl font-bold text-white mb-6">
                3
              </div>
              <h3 className="text-xl font-bold text-center mb-2">Get Recommendations</h3>
              <p className="text-gray-600 text-center">
                Receive personalized health recommendations.
              </p>
            </div>

            {/* Step 4 */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full flex items-center justify-center text-xl font-bold text-white mb-6">
                4
              </div>
              <h3 className="text-xl font-bold text-center mb-2">Connect with Experts</h3>
              <p className="text-gray-600 text-center">
                Connect with doctors or emergency contacts when needed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">What Our Users Say</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-blue-50 rounded-xl p-8 shadow-lg">
              <div className="text-yellow-400 mb-4">⭐⭐⭐⭐⭐</div>
              <p className="text-gray-600 italic mb-6">
                "HealthTrack has completely changed how I manage my health. The AI insights are incredibly accurate, and the emergency alert feature saved me during a health crisis!"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full flex items-center justify-center text-white font-bold mr-4">
                  SJ
                </div>
                <div>
                  <h4 className="font-bold">Sarah Johnson</h4>
                  <span className="text-sm text-gray-500">Using HealthTrack for 6 months</span>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-blue-50 rounded-xl p-8 shadow-lg">
              <div className="text-yellow-400 mb-4">⭐⭐⭐⭐⭐</div>
              <p className="text-gray-600 italic mb-6">
                "As someone with chronic conditions, this app has been a game-changer. The real-time tracking and alerts help me stay on top of my health better than any other app I've tried."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full flex items-center justify-center text-white font-bold mr-4">
                  MR
                </div>
                <div>
                  <h4 className="font-bold">Michael Rodriguez</h4>
                  <span className="text-sm text-gray-500">Using HealthTrack for 1 year</span>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-blue-50 rounded-xl p-8 shadow-lg">
              <div className="text-yellow-400 mb-4">⭐⭐⭐⭐⭐</div>
              <p className="text-gray-600 italic mb-6">
                "The voice input feature is so convenient! I can log my symptoms or medication just by speaking. The AI chatbot is impressively knowledgeable too."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full flex items-center justify-center text-white font-bold mr-4">
                  AP
                </div>
                <div>
                  <h4 className="font-bold">Aisha Patel</h4>
                  <span className="text-sm text-gray-500">Using HealthTrack for 3 months</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-400 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Take Control of Your Health?</h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto">Join 10,000+ Users on HealthTrack Today!</p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <a href="#" className="bg-white text-blue-600 px-8 py-3 rounded-full font-medium hover:shadow-lg transform hover:-translate-y-1 transition duration-300">
              Get Started
            </a>
            <a href="#" className="border-2 border-white text-white px-8 py-3 rounded-full font-medium hover:bg-white hover:bg-opacity-10 transition duration-300">
              Learn More
            </a>
          </div>
          
          {/* Newsletter */}
          <div className="max-w-md mx-auto mb-12">
            <h3 className="text-xl font-bold mb-4">Subscribe for Health Tips & Updates</h3>
            <div className="flex flex-col sm:flex-row">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="flex-grow px-4 py-3 rounded-l-full sm:rounded-r-none rounded-r-full sm:mb-0 mb-2 text-gray-700 focus:outline-none"
              />
              <button className="bg-red-500 text-white px-6 py-3 rounded-r-full sm:rounded-l-none rounded-l-full font-medium hover:bg-red-600 transition duration-300">
                Subscribe
              </button>
            </div>
          </div>
          
          {/* App Download */}
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#" className="bg-white text-gray-800 px-6 py-3 rounded-xl font-medium flex items-center transition duration-300 hover:shadow-lg">
              <span>App Store</span>
            </a>
            <a href="#" className="bg-white text-gray-800 px-6 py-3 rounded-xl font-medium flex items-center transition duration-300 hover:shadow-lg">
              <span>Google Play</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white pt-16 pb-8">
        <div className="container mx-auto px-6">
          {/* Footer Top */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-16">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <h3 className="text-2xl font-bold mb-4">HealthTrack</h3>
              <p className="text-gray-400 mb-6">
                AI-powered health monitoring and personalized care for everyone.
              </p>
            </div>
            
            {/* Company Links */}
            <div>
              <h4 className="text-lg font-bold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Press</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Contact</a></li>
              </ul>
            </div>
            
            {/* Product Links */}
            <div>
              <h4 className="text-lg font-bold mb-4">Product</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Features</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Pricing</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Integrations</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Updates</a></li>
              </ul>
            </div>
            
            {/* Legal Links */}
            <div>
              <h4 className="text-lg font-bold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Privacy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Terms</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Security</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">HIPAA</a></li>
              </ul>
            </div>
          </div>
          
          {/* Footer Bottom */}
          <div className="pt-8 border-t border-gray-800 text-center">
            <div className="flex justify-center space-x-6 mb-6">
              <a href="#" className="text-gray-400 hover:text-white transition duration-300">Facebook</a>
              <a href="#" className="text-gray-400 hover:text-white transition duration-300">Twitter</a>
              <a href="#" className="text-gray-400 hover:text-white transition duration-300">Instagram</a>
              <a href="#" className="text-gray-400 hover:text-white transition duration-300">LinkedIn</a>
            </div>
            <p className="text-gray-500">
              &copy; 2025 HealthTrack. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;