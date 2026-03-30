export const NAV_LINKS = ["About", "Contact"];
export const FEATURES = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-7 h-7">
        <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
      </svg>
    ),
    title: "Easy Job Search",
    desc: "Filter thousands of listings by role, location, or salary with smart search powered by real-time data.",
    color: "from-blue-500 to-cyan-400",
    bg: "bg-blue-50",
    hcolor:"hover:bg-blue-100",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-7 h-7">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
    title: "Top Companies",
    desc: "Connect directly with industry-leading companies from startups to Fortune 500s actively hiring now.",
    color: "from-violet-500 to-purple-400",
    bg: "bg-violet-50",
    hcolor:"hover:bg-violet-100",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-7 h-7">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
      </svg>
    ),
    title: "Upload Resume",
    desc: "One-click resume upload. Let recruiters discover you — your profile does the work while you sleep.",
    color: "from-emerald-500 to-teal-400",
    bg: "bg-emerald-50",
    hcolor:"hover:bg-emerald-100",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-7 h-7">
        <polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
      </svg>
    ),
    title: "Quick Apply",
    desc: "Apply to multiple jobs in seconds with saved profiles. No repetitive forms, just one tap to apply.",
    color: "from-orange-500 to-amber-400",
    bg: "bg-orange-50",
    hcolor:"hover:bg-orange-100",
  },
];


export const STEPS = [
  {
    num: "01",
    title: "Create Account",
    desc: "Sign up in under a minute. Build your profile and let employers know you exist.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-8 h-8">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
        <line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/>
      </svg>
    ),
  },
  {
    num: "02",
    title: "Search Jobs",
    desc: "Browse curated listings matched to your skills, experience, and preferences.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-8 h-8">
        <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        <path d="M8 11h6M11 8v6"/>
      </svg>
    ),
  },
  {
    num: "03",
    title: "Apply Easily",
    desc: "Send applications instantly. Track every status in one clean dashboard.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-8 h-8">
        <path d="M22 2L11 13"/><path d="M22 2L15 22l-4-9-9-4 20-7z"/>
      </svg>
    ),
  },
];