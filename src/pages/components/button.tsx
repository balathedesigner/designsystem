import { motion } from 'framer-motion';

export default function ButtonDocs() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Button Component
        </h1>
        <div className="prose prose-lg">
          <p className="text-gray-600">
            Button component documentation and examples coming soon.
          </p>
        </div>
      </motion.div>
    </div>
  );
} 