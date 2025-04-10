import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const SplashScreen = () => (
  <div className="fixed inset-0 flex flex-col items-center justify-center bg-gray-900">
    <div className="relative">
      <h1 className="text-6xl font-bold text-white mb-4 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
        Desynd
      </h1>
      <div className="h-0.5 w-full bg-gradient-to-r from-blue-500 to-purple-500" />
    </div>
    <p className="mt-4 text-gray-400 text-lg">
      Design-Dev Harmony. Built with Atomic Precision.
    </p>
  </div>
);

const MainLayout = () => {
  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2 // Stagger the animation of children
      }
    }
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 }, // Start slightly lower and faded out
    visible: {
      opacity: 1, y: 0,    // Fade in and slide up
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-gray-900 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                Desynd
              </Link>
            </div>
            <nav className="flex space-x-8">
              <Link href="/docs/introduction" className="text-gray-600 hover:text-gray-900">Documentation</Link>
              <Link href="/components" className="text-gray-600 hover:text-gray-900">Components</Link>
              <a href="https://github.com/your-repo" className="text-gray-600 hover:text-gray-900">GitHub</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Existing Welcome Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Welcome to Desynd
          </h2>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
            Your design system for building modern, responsive web applications with atomic precision.
          </p>
          <div className="mt-8 flex justify-center space-x-4">
            <Link 
              href="/docs/introduction"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
            >
              Get Started
            </Link>
            <Link
              href="/components"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-blue-100 hover:bg-blue-200"
            >
              View Components
            </Link>
          </div>
        </div>

        {/* --- NEW SECTIONS (Animated) --- */}
        <motion.div 
          className="space-y-12 max-w-3xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible" // Trigger animation when in view
          viewport={{ once: true, amount: 0.1 }} // Trigger once, when 10% is visible
        >

          {/* About Me */}
          <motion.section variants={sectionVariants}>
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">About Me</h3>
            <p className="text-gray-600">
              Hi, I'm [Your Name], the creator of Desynd. I'm passionate about [Your Field/Interests] and building efficient, beautiful user interfaces.
            </p>
          </motion.section>

          {/* Why Desynd */}
          <motion.section variants={sectionVariants}>
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">Why Desynd?</h3>
            <p className="text-gray-600 mb-2">
              I created Desynd because [Explain the problem you faced or the goal you wanted to achieve - e.g., needed a consistent UI toolkit, wanted to bridge design and dev, etc.]. 
              The goal is to provide a streamlined set of reusable components that accelerate development while maintaining visual consistency.
            </p>
          </motion.section>

          {/* Benefits */}
          <motion.section variants={sectionVariants}>
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">Benefits</h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-lg font-medium text-gray-800 mb-1">For Designers:</h4>
                <p className="text-gray-600">
                  Provides a clear visual language and a library of pre-defined components, ensuring consistency across mockups and facilitating smoother handoffs.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-medium text-gray-800 mb-1">For Developers:</h4>
                <p className="text-gray-600">
                  Offers ready-to-use, accessible, and customizable React components built with TypeScript and Tailwind CSS, significantly speeding up development time and reducing boilerplate.
                </p>
              </div>
            </div>
          </motion.section>

          {/* Future Plans */}
          <motion.section variants={sectionVariants}>
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">Future Plans</h3>
            <p className="text-gray-600">
              The roadmap for Desynd includes [Mention potential plans - e.g., adding more components like X and Y, improving theme support, adding Figma integration, writing more documentation, etc.]. Contributions and feedback are welcome!
            </p>
          </motion.section>

          {/* Acknowledgements */}
          <motion.section variants={sectionVariants}>
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">Acknowledgements</h3>
            <p className="text-gray-600">
              This project wouldn't have been possible without the assistance of AI tools like Cursor AI and ChatGPT for code generation, debugging, and brainstorming. Inspiration was also drawn from fantastic design systems like Material UI, Fluent UI, and others.
            </p>
          </motion.section>

        </motion.div>
      </main>

      {/* Optional Footer can go here */}
      {/* <footer className="bg-gray-100 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} Desynd. All rights reserved.
        </div>
      </footer> */}
    </div>
  );
};

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Check if we're running in the browser
    if (typeof window !== 'undefined') {
      // Check if splash screen has been shown in this session
      const hasSeenSplash = sessionStorage.getItem('hasSeenSplash');
      
      if (!hasSeenSplash) {
        // If not seen before, show splash and set timer
        const timer = setTimeout(() => {
          setShowSplash(false);
          sessionStorage.setItem('hasSeenSplash', 'true');
        }, 2000);

        return () => clearTimeout(timer);
      } else {
        // If seen before, skip splash screen
        setShowSplash(false);
      }
    }
  }, []);

  return showSplash ? <SplashScreen /> : <MainLayout />;
} 