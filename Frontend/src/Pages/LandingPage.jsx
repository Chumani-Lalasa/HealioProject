import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Activity, MessageSquare, FileText, Heart, Shield, Zap,
  ArrowRight, ChevronLeft, ChevronRight, Star, Menu, X
} from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Fitness Enthusiast",
      text: "HealthTrack completely changed how I manage my health. The personalized reminders keep me on track with my medication schedule.",
      initials: "SJ",
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Business Professional",
      text: "The AI chatbot provided me with instant answers about my symptoms when I was traveling. It's like having a doctor in my pocket!",
      initials: "MC",
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      role: "Teacher",
      text: "The smart report analysis helped me understand my lab results in plain language. I feel more informed about my health than ever before.",
      initials: "ER",
    },
  ];

  const features = [
    {
      icon: <Activity className="h-7 w-7" />,
      title: "Real-time Monitoring",
      description: "Track vital signs, symptoms, and health metrics with continuous updates and smart alerts.",
      color: "text-sky-500",
      bg: "bg-sky-50",
    },
    {
      icon: <MessageSquare className="h-7 w-7" />,
      title: "AI-Powered Chatbot",
      description: "Get instant health advice and answers to medical questions — available 24/7.",
      color: "text-emerald-500",
      bg: "bg-emerald-50",
    },
    {
      icon: <FileText className="h-7 w-7" />,
      title: "Smart Report Analysis",
      description: "Upload medical reports and receive easy-to-understand interpretations and insights.",
      color: "text-violet-500",
      bg: "bg-violet-50",
    },
    {
      icon: <Heart className="h-7 w-7" />,
      title: "Skin Disease Analyzer",
      description: "AI-powered image analysis to detect potential skin conditions early and accurately.",
      color: "text-rose-500",
      bg: "bg-rose-50",
    },
    {
      icon: <Shield className="h-7 w-7" />,
      title: "Emergency Alerts",
      description: "Send SOS alerts with your live location to emergency contacts when you need help.",
      color: "text-orange-500",
      bg: "bg-orange-50",
    },
    {
      icon: <Zap className="h-7 w-7" />,
      title: "Personalized Insights",
      description: "Receive health recommendations tailored to your unique profile and history.",
      color: "text-amber-500",
      bg: "bg-amber-50",
    },
  ];

  const steps = [
    { number: "01", title: "Sign Up", desc: "Create your account and set up your health profile in minutes." },
    { number: "02", title: "Track Metrics", desc: "Log daily vitals, connect wearables, or upload medical reports." },
    { number: "03", title: "Get Insights", desc: "Receive AI-driven recommendations tailored just for you." },
    { number: "04", title: "Stay Connected", desc: "Share updates with doctors or emergency contacts anytime." },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const prevTestimonial = () =>
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  const nextTestimonial = () =>
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* ── Navbar ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-500 to-emerald-500 flex items-center justify-center">
              <Heart size={16} className="text-white" />
            </div>
            <span className="text-lg font-bold text-gray-900">HealthTrack</span>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-gray-600 hover:text-sky-600 transition-colors">Features</a>
            <a href="#how-it-works" className="text-sm text-gray-600 hover:text-sky-600 transition-colors">How It Works</a>
            <a href="#testimonials" className="text-sm text-gray-600 hover:text-sky-600 transition-colors">Testimonials</a>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Link to="/signin" className="text-sm text-gray-700 font-medium hover:text-sky-600 transition-colors">
              Sign In
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 bg-sky-500 text-white text-sm font-medium rounded-lg hover:bg-sky-600 transition-colors"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button className="md:hidden p-2" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-3">
            <a href="#features" className="block text-sm text-gray-700 py-2" onClick={() => setMenuOpen(false)}>Features</a>
            <a href="#how-it-works" className="block text-sm text-gray-700 py-2" onClick={() => setMenuOpen(false)}>How It Works</a>
            <a href="#testimonials" className="block text-sm text-gray-700 py-2" onClick={() => setMenuOpen(false)}>Testimonials</a>
            <Link to="/signin" className="block text-sm text-gray-700 py-2">Sign In</Link>
            <Link
              to="/signup"
              className="block w-full text-center px-4 py-2 bg-sky-500 text-white text-sm font-medium rounded-lg"
              onClick={() => setMenuOpen(false)}
            >
              Get Started
            </Link>
          </div>
        )}
      </nav>

      {/* ── Hero ── */}
      <section className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-sky-50 via-white to-emerald-50">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-100 text-sky-700 text-xs font-semibold uppercase tracking-wider mb-6">
              <Zap size={12} /> AI-Powered Health Platform
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
              Track Your Health,{' '}
              <span className="bg-gradient-to-r from-sky-500 to-emerald-500 bg-clip-text text-transparent">
                Anytime Anywhere
              </span>
            </h1>
            <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
              AI-powered insights, real-time health monitoring, and personalised care — all in one place.
              Take control of your wellbeing today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/signup')}
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-sky-500 text-white font-semibold rounded-xl hover:bg-sky-600 transition-all shadow-lg shadow-sky-200"
              >
                Get Started Free <ArrowRight size={18} />
              </button>
              <a
                href="#features"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white text-gray-700 font-semibold rounded-xl border border-gray-200 hover:border-sky-300 hover:text-sky-600 transition-all"
              >
                Explore Features
              </a>
            </div>
          </div>

          {/* Stats strip */}
          <div className="mt-16 grid grid-cols-3 gap-4 max-w-lg mx-auto">
            {[
              { value: "10K+", label: "Active Users" },
              { value: "98%", label: "Accuracy Rate" },
              { value: "24/7", label: "AI Support" },
            ].map((stat) => (
              <div key={stat.label} className="text-center p-4 rounded-2xl bg-white shadow-sm border border-gray-100">
                <div className="text-2xl font-bold text-sky-600">{stat.value}</div>
                <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Why Choose HealthTrack?</h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Everything you need to understand and improve your health, powered by AI.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className="p-6 rounded-2xl border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-200 bg-white"
              >
                <div className={`inline-flex p-3 rounded-xl ${f.bg} ${f.color} mb-4`}>{f.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Get started in minutes and see results from day one.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <div key={step.number} className="relative">
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-px bg-gradient-to-r from-sky-200 to-transparent z-0" />
                )}
                <div className="relative z-10 p-6 rounded-2xl bg-white border border-gray-100 shadow-sm text-center">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-sky-500 to-emerald-500 flex items-center justify-center">
                    <span className="text-white font-bold text-lg">{step.number}</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">What Our Users Say</h2>
          </div>
          <div className="relative bg-gradient-to-br from-sky-50 to-emerald-50 rounded-3xl p-8 sm:p-12 border border-sky-100">
            <div className="flex gap-1 mb-6 justify-center">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} className="text-amber-400 fill-amber-400" />
              ))}
            </div>
            <p className="text-lg text-gray-700 text-center italic leading-relaxed mb-8">
              "{testimonials[currentTestimonial].text}"
            </p>
            <div className="flex items-center justify-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-500 to-emerald-500 flex items-center justify-center text-white font-bold text-sm">
                {testimonials[currentTestimonial].initials}
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm">{testimonials[currentTestimonial].name}</p>
                <p className="text-xs text-gray-500">{testimonials[currentTestimonial].role}</p>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={prevTestimonial}
                className="p-2 rounded-full border border-gray-200 hover:border-sky-400 hover:text-sky-600 transition-colors"
              >
                <ChevronLeft size={18} />
              </button>
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentTestimonial(i)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      i === currentTestimonial ? 'bg-sky-500 w-6' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={nextTestimonial}
                className="p-2 rounded-full border border-gray-200 hover:border-sky-400 hover:text-sky-600 transition-colors"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-sky-500 to-emerald-500">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Take Control of Your Health?
          </h2>
          <p className="text-sky-100 mb-8 text-lg">Join 10,000+ users on HealthTrack today. It's free to get started.</p>
          <button
            onClick={() => navigate('/signup')}
            className="inline-flex items-center gap-2 px-10 py-4 bg-white text-sky-600 font-bold rounded-xl hover:shadow-xl hover:-translate-y-0.5 transition-all"
          >
            Get Started Free <ArrowRight size={18} />
          </button>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-sky-500 to-emerald-500 flex items-center justify-center">
              <Heart size={13} className="text-white" />
            </div>
            <span className="text-white font-bold">HealthTrack</span>
          </div>
          <p className="text-sm">© 2025 HealthTrack. All rights reserved.</p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
