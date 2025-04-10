import { NextPage } from 'next';
import Link from 'next/link';

// Basic Card component for reuse
function Card({ title, description }: { title: string; description: string }) {
  return (
    <div className="bg-white border rounded-lg p-6 shadow hover:shadow-lg transition">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-zinc-600">{description}</p>
    </div>
  );
}

const IntroductionPage: NextPage = () => {
  return (
    <main className="text-zinc-800">
      {/* Hero Section */}
      <section className="py-20 px-6 text-center bg-gradient-to-br from-zinc-900 to-zinc-800 text-white">
        <h1 className="text-5xl font-bold mb-4">Welcome to Desynd</h1>
        <p className="text-xl max-w-2xl mx-auto text-zinc-300">
          A modern design system that speaks to both designers and developers — powered by Tailwind CSS, built on atomic principles, and designed for scale.
        </p>
      </section>

      {/* Why Desynd */}
      <section className="py-16 px-6 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Why Desynd?</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <Card 
            title="Design & Dev Modes" 
            description="Switch between visual design specs and full developer documentation seamlessly — no context switching, just clarity." 
          />
          <Card 
            title="Atomic-First Structure" 
            description="Our components follow atomic design principles: from atoms to organisms. Meaningful hierarchy, built to scale." 
          />
          <Card 
            title="Tailwind-Native" 
            description="No bloated overrides. Clean utility-first styles that map directly from design tokens to code." 
          />
          <Card 
            title="Component Playground" 
            description="Explore, inspect, and interact — every component is live, customizable, and ready to drop in." 
          />
        </div>
      </section>

      {/* Core Principles */}
      <section className="py-16 px-6 bg-zinc-50 text-zinc-800">
        <h2 className="text-3xl font-bold mb-8 text-center">Core Principles</h2>
        <ul className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto text-center">
          <li>
            <h3 className="text-xl font-semibold mb-2">Modularity</h3>
            <p>Everything is reusable. Designed to adapt, extend, and plug into your product flow.</p>
          </li>
          <li>
            <h3 className="text-xl font-semibold mb-2">Clarity</h3>
            <p>Designs are accessible, purposeful, and aligned with development structure.</p>
          </li>
          <li>
            <h3 className="text-xl font-semibold mb-2">Sync</h3>
            <p>One source of truth for designers and developers — no duplication, no guesswork.</p>
          </li>
        </ul>
      </section>

      {/* Designers vs Developers */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">How to Use Desynd</h2>
        <div className="grid md:grid-cols-2 gap-10">
          <div className="bg-white p-6 rounded-xl shadow border">
            <h3 className="text-2xl font-semibold mb-4">For Designers</h3>
            <ul className="space-y-3 text-zinc-600">
              <li>🎨 Browse components in Design Mode</li>
              <li>📏 View spacing, grids, and design tokens</li>
              <li>🧠 Follow atomic structure for creating new screens</li>
              <li>🖼️ Access (coming soon) Figma kit & variants</li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded-xl shadow border">
            <h3 className="text-2xl font-semibold mb-4">For Developers</h3>
            <ul className="space-y-3 text-zinc-600">
              <li>💻 Toggle to Dev Mode for specs & props</li>
              <li>📚 See code examples and interaction states</li>
              <li>⚙️ Copy-paste Tailwind-ready components</li>
              <li>🧪 Test states in live playground</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 text-center">
        <p className="text-xl mb-6">Ready to explore components and start building?</p>
        <Link 
          href="/components" 
          className="inline-block bg-black text-white px-6 py-3 rounded-xl hover:bg-zinc-800 transition"
        >
          Explore Components →
        </Link>
      </section>
    </main>
  );
};

export default IntroductionPage; 