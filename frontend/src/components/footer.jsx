import React from 'react';
import { Briefcase } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t border-gray-100 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-blue-600 flex items-center justify-center">
            <Briefcase size={12} className="text-white" />
          </div>
          <span className="text-sm font-semibold text-gray-700" style={{ fontFamily: "'Sora', sans-serif" }}>Job<span className="text-blue-600">Matrix</span></span>
        </div>
        <p className="text-xs text-gray-400">© 2026 JobMatrix · Built for ambitious careers</p>
        <div className="flex gap-4">
          {["Privacy", "Terms", "Contact"].map((l) => (
            <a key={l} href="#" className="text-xs text-gray-400 hover:text-blue-500 transition-colors">{l}</a>
          ))}
        </div>
      </div>
    </footer>
  )
}

export default Footer;