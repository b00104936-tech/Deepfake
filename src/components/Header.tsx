import { Shield, Award } from 'lucide-react';

export function Header() {
  return (
    <header className="border-b border-[#0A1F35]/10 bg-white/40 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-6 py-5">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#0A1F35] rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-[#C5A059]" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[#0A1F35] tracking-tight leading-none">
                DeepScan Pro
              </h1>
              <p className="text-xs text-[#0A1F35]/60 tracking-wide uppercase">
                Forensic AI Analysis
              </p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#" className="text-sm font-medium text-[#0A1F35]/70 hover:text-[#0A1F35] transition-colors">
              Platform
            </a>
            <a href="#" className="text-sm font-medium text-[#0A1F35]/70 hover:text-[#0A1F35] transition-colors">
              Documentation
            </a>
            <a href="#" className="text-sm font-medium text-[#0A1F35]/70 hover:text-[#0A1F35] transition-colors">
              API Access
            </a>
            <div className="flex items-center gap-2 px-4 py-2 bg-[#C5A059]/10 rounded-full border border-[#C5A059]/20">
              <Award className="w-4 h-4 text-[#C5A059]" />
              <span className="text-xs font-semibold text-[#0A1F35] tracking-wide">
                CERTIFIED
              </span>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
