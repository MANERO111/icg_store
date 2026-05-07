import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, ArrowRight, Sparkles } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <section className="relative w-full min-h-screen bg-white overflow-hidden pb-20 flex items-center">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-[#e4006d] opacity-5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-[#8b1a8b] opacity-5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full lg:w-1/2 text-left"
          >
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-pink-50 border border-[#e4006d]/20 mb-6"
            >
              <Sparkles size={16} className="text-[#e4006d]" />
              <span className="text-sm font-medium text-[#e4006d] uppercase tracking-wider">
                New Summer Collection
              </span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-serif font-bold leading-tight text-slate-900 mb-6">
              Redefining <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e4006d] to-[#8b1a8b]">
                Radiant Beauty
              </span>
            </h1>

            <p className="text-lg text-gray-600 mb-8 max-w-lg leading-relaxed">
              Experience the fusion of luxury and nature with ICG. Our premium cosmetic line is designed to nourish your skin and boost your natural glow.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-[#e4006d] text-white rounded-full font-semibold shadow-lg shadow-[#e4006d]/30 flex items-center justify-center space-x-2 hover:bg-[#c3005d] transition-colors"
              >
                <span>Shop Now</span>
                <ShoppingBag size={18} />
              </motion.button>

              <motion.button 
                whileHover={{ x: 5 }}
                className="px-8 py-4 bg-transparent text-slate-800 rounded-full font-semibold flex items-center justify-center space-x-2 border border-slate-200 hover:bg-slate-50 transition-all"
              >
                <span>Learn More</span>
                <ArrowRight size={18} />
              </motion.button>
            </div>

            {/* Social Proof/Stats */}
            <div className="mt-12 flex items-center space-x-8 border-t border-slate-100 pt-8">
              <div>
                <p className="text-2xl font-bold text-slate-900">15k+</p>
                <p className="text-sm text-gray-500">Happy Clients</p>
              </div>
              <div className="h-10 w-[1px] bg-slate-200" />
              <div>
                <p className="text-2xl font-bold text-slate-900">100%</p>
                <p className="text-sm text-gray-500">Vegan & Organic</p>
              </div>
            </div>
          </motion.div>

          {/* Visual Content */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="w-full lg:w-1/2 relative flex justify-center items-center"
          >
            {/* The "Main Image" Container */}
            <div className="relative w-full max-w-[700px] aspect-square">
              {/* Animated Ring */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border-[4px] border-dashed border-[#8b1a8b]/20 rounded-full"
              />
              
              {/* Image Placeholder with Gradient Overlay */}
              <div className="absolute inset-6 rounded-3xl overflow-hidden shadow-2xl bg-slate-200 group">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#8b1a8b]/20 to-transparent" />
                <img 
                  src="/img/hero.png" 
                  alt="ICG Beauty Product" 
                  className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              {/* Floating Badge */}
              <motion.div 
                animate={{ y: [-15, 0, -15] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-6 -right-6 bg-white p-4 rounded-2xl shadow-xl border border-slate-50 flex items-center space-x-3"
              >
                {/* <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center">
                  <span className="text-[#e4006d] font-bold">4.9</span>
                </div> */}
                <div>
                  {/* <p className="text-xs text-gray-400">Average Rating</p> */}
                  <p className="text-sm font-bold text-slate-800">Trusted by professionals</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;