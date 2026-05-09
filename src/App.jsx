import React, { useState, useEffect } from "react";
import {
  Mail, Linkedin, Github, ExternalLink, Search, User, Briefcase, Award,
  Settings, Database, PieChart, ChevronRight, Copy, Check, X, Code,
  Activity, Star, Info, MapPin, Clock, Send, ShieldCheck, Users
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// --- Advanced Animated Background ---
const BackgroundEnvironment = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#fafafa]">
      {/* Primary Animated Blobs */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], x: [0, 30, 0], y: [0, -50, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full opacity-30 blur-[120px]"
        style={{ background: 'radial-gradient(circle, #3b82f6 0%, #60a5fa 50%, transparent 100%)' }}
      />
      <motion.div
        animate={{ scale: [1, 1.3, 1], x: [0, -40, 0], y: [0, 60, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[-15%] right-[-10%] w-[70%] h-[70%] rounded-full opacity-20 blur-[140px]"
        style={{ background: 'radial-gradient(circle, #2563eb 0%, #93c5fd 50%, transparent 100%)' }}
      />
      {/* Floating Data Particles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{
            y: [Math.random() * 100, Math.random() * -100],
            opacity: [0, 0.3, 0],
            x: [0, (Math.random() - 0.5) * 50],
          }}
          transition={{ duration: 10 + Math.random() * 10, repeat: Infinity, delay: Math.random() * 5 }}
          className="absolute bg-blue-400/20 rounded-full blur-[1px]"
          style={{
            width: Math.random() * 6 + 'px',
            height: Math.random() * 6 + 'px',
            top: Math.random() * 100 + '%',
            left: Math.random() * 100 + '%',
          }}
        />
      ))}
      {/* Structured Grid Overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />
    </div>
  );
};

// --- Glass UI Components ---
const GlassCard = ({ className = "", children, ...props }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className={`rounded-[2rem] border border-white/50 bg-white/40 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] overflow-hidden transition-all duration-500 hover:bg-white/60 hover:shadow-2xl hover:border-white/80 ${className}`}
    {...props}
  >
    {children}
  </motion.div>
);

const CardContent = ({ className = "", children, ...props }) => (
  <div className={`p-8 sm:p-10 ${className}`} {...props}>
    {children}
  </div>
);

const CustomButton = React.forwardRef(({ className = "", variant = "default", ...props }, ref) => {
  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-600/20",
    link: "text-blue-600 font-bold hover:text-blue-800 transition-colors",
    outline: "border border-white/80 bg-white/40 backdrop-blur-md hover:bg-white text-slate-800 font-bold shadow-sm",
    ghost: "bg-transparent hover:bg-white/50 text-slate-600",
  };
  return (
    <button
      ref={ref}
      className={`inline-flex items-center justify-center rounded-2xl text-sm font-semibold transition-all active:scale-95 disabled:opacity-50 px-6 py-3 ${variants[variant]} ${className}`}
      {...props}
    />
  );
});
CustomButton.displayName = "CustomButton";

// --- Contact Modal Component ---
const ContactModal = ({ isOpen, onClose, email, copied, onCopy }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl overflow-hidden"
      >
        <div className="p-8">
          <div className="flex justify-between items-start mb-6">
            <div className="p-3 bg-blue-600 rounded-2xl text-white shadow-lg">
              <Mail className="h-6 w-6" />
            </div>
            <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
              <X className="h-6 w-6 text-slate-400" />
            </button>
          </div>
          <h3 className="text-2xl font-black text-slate-900 mb-2">Get in touch</h3>
          <p className="text-slate-500 font-medium mb-8">I'm currently open to new opportunities and collaborations.</p>
          <div className="space-y-4">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 group relative">
              <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Direct Email</div>
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 truncate mr-2">{email}</span>
                <button
                  onClick={onCopy}
                  className={`p-2 rounded-lg transition-all ${copied ? "bg-green-100 text-green-600" : "bg-white text-slate-400 hover:text-blue-600 shadow-sm"}`}
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <a
              href={`mailto:${email}`}
              className="flex items-center justify-center gap-2 w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl shadow-lg shadow-blue-200 transition-all active:scale-[0.98]"
            >
              Open Mail Client <Send className="h-4 w-4" />
            </a>
          </div>
        </div>
        <div className="bg-slate-50 p-6 flex justify-center gap-6 border-t border-slate-100">
          <a href="https://www.linkedin.com/in/caleb-chinonso-okereke-ba0219270" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-blue-600 transition-colors">
            <Linkedin className="h-5 w-5" />
          </a>
          <a href="https://github.com/engrcaleb" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-900 transition-colors">
            <Github className="h-5 w-5" />
          </a>
        </div>
      </motion.div>
    </div>
  );
};

// --- Main App Component ---
export default function App() {
  const [search, setSearch] = useState("");
  const [isMailModalOpen, setIsMailModalOpen] = useState(false);
  const [activeSkillNote, setActiveSkillNote] = useState(null);
  const [copied, setCopied] = useState(false);

  const linkedInUrl = "https://www.linkedin.com/in/caleb-chinonso-okereke-ba0219270";
  const emailAddress = "okerekecalebchinonso@gmail.com";

  const handleEmailClick = () => setIsMailModalOpen(true);

  const copyToClipboard = () => {
    const textField = document.createElement('textarea');
    textField.innerText = emailAddress;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand('copy');
    textField.remove();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const projectsData = [
    {
      title: "ALX Alpha Team Project",
      tool: "Frontend Dev",
      desc: "Collaborated on a responsive project website during ALX.",
      link: "https://engrcaleb.github.io/alphateamalx/",
    },
    {
      title: "Portfolio Landing Page",
      tool: "Figma UI/UX",
      desc: "Modern UI design focused on clean visual hierarchy.",
      link: "https://www.figma.com/design/yIY1anoFE8WYNbWTIG5UpK/Personal-Portfolio-Landing-Page-Design",
    },
    {
      title: "Professional Presentation",
      tool: "Google Slides",
      desc: "Showcasing project strategy and visual communication.",
      link: "https://docs.google.com/presentation/d/1wJDAtyUXTtqlQ5yuulAOMsDnGpBqHzSohCIThyu6qXY/edit?usp=drivesdk",
    },
  ];

  const skillNotes = {
    "Excel": "Advanced spreadsheet management, using VLOOKUP, Pivot Tables, and complex formulas to automate financial reporting and data cleaning.",
    "SQL (In view)": "Currently learning relational database management to query large datasets, filter records, and perform data joins for deeper business insights.",
    "Reporting": "Transforming raw data into clear, visual summaries that help stakeholders understand trends and operational performance.",
    "Data Entry": "High-accuracy data input and maintenance of database integrity, ensuring foundational data is reliable for downstream analysis.",
    "Financial Reporting": "Drafting comprehensive financial summaries and performance reports to aid executive-level decision making.",
    "Accounts Receivable": "Managing the invoicing cycle and tracking outstanding payments to ensure steady cash flow and accurate ledger maintenance.",
    "Reconciliation": "Ensuring financial accuracy by cross-referencing bank statements with internal records to identify and resolve discrepancies.",
    "Budgeting": "Assisting in the planning and tracking of departmental expenditures to ensure alignment with organizational financial goals.",
    "Navision": "Proficient in using Microsoft Dynamics NAV for enterprise resource planning, specifically for financial management and operational tracking.",
    "Instanta": "Utilizing specialized system management software for operational monitoring and process tracking within a logistics framework.",
    "OS Installation": "Proficient in setting up and configuring Operating Systems (Windows/Linux) to ensure stable and secure computing environments.",
    "Hardware Fixes": "Troubleshooting and resolving essential computer hardware issues to maintain high team uptime and operational efficiency.",
  };

  const skillCategories = [
    { title: "Data Analysis", icon: <Database className="h-5 w-5" />, skills: ["Excel", "SQL (In view)", "Reporting", "Data Entry"] },
    { title: "Financial Ops", icon: <PieChart className="h-5 w-5" />, skills: ["Reconciliation", "Financial Reporting", "Accounts Receivable", "Budgeting", "Navision", "Instanta"] },
    { title: "Technical", icon: <Settings className="h-5 w-5" />, skills: ["OS Installation", "Hardware Fixes"] },
  ];

  const coreExpertise = [
    { label: "Problem Solving", val: "Critical", icon: <Activity className="h-4 w-4" /> },
    { label: "Strategic Logic", val: "Analytical", icon: <ChevronRight className="h-4 w-4" /> },
    { label: "Financial Literacy", val: "Operational", icon: <PieChart className="h-4 w-4" /> },
    { label: "Attention to Detail", val: "Precise", icon: <Search className="h-4 w-4" /> },
    { label: "Teamwork", val: "Collaborative", icon: <Users className="h-4 w-4" /> },
    { label: "Integrity", val: "Core Value", icon: <ShieldCheck className="h-4 w-4" /> },
  ];

  return (
    <div className="relative min-h-screen font-sans text-slate-900 selection:bg-blue-200">
      <BackgroundEnvironment />
      <div className="relative py-16 px-4 sm:px-8 max-w-6xl mx-auto space-y-24">

        {/* Header/Hero */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center pt-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 text-[11px] font-black uppercase tracking-[0.25em] text-blue-700 bg-white/50 backdrop-blur-md rounded-full border border-white shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Available for Opportunities
          </div>
          <h1 className="text-6xl sm:text-8xl font-black mb-8 tracking-tighter text-slate-950 leading-[0.9]">
            CALEB<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">OKEREKE</span>
          </h1>
          <p className="text-xl sm:text-2xl text-slate-500 mb-12 max-w-2xl mx-auto font-medium">
            Data Analyst | Financial Operations Specialist | Problem Solver
          </p>
          <div className="flex flex-wrap justify-center gap-5">
            <CustomButton onClick={handleEmailClick} className="rounded-2xl px-10 py-7 text-lg">
              <Mail className="mr-2 h-5 w-5" /> Let's Talk
            </CustomButton>
            <a href={linkedInUrl} target="_blank" rel="noopener noreferrer">
              <CustomButton variant="outline" className="rounded-2xl px-10 py-7 text-lg">
                <Linkedin className="mr-2 h-5 w-5 text-blue-600" /> LinkedIn
              </CustomButton>
            </a>
          </div>
        </motion.div>

        {/* About Sections */}
        <div className="grid gap-10">

          {/* Elevator Pitch Card */}
          <GlassCard className="border-l-[6px] border-l-blue-600 bg-white/50">
            <CardContent>
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-blue-600 rounded-2xl text-white shadow-lg shadow-blue-200">
                  <User className="h-6 w-6" />
                </div>
                <h2 className="text-sm font-black uppercase tracking-[0.3em] text-blue-600/60">Elevator Pitch</h2>
              </div>
              <p className="text-2xl sm:text-3xl font-bold text-slate-900 leading-tight italic">
                "My name is Caleb Okereke, and I'm a data analyst in training with a background in statistics and experience in financial operations. I enjoy working with data and turning it into insights that can actually help businesses make better decisions."
              </p>
              <p className="mt-4 text-xl text-slate-700 font-medium italic border-l-2 border-blue-200 pl-6">
                "Right now, I'm also working on a Tech platform, which is focused on helping young people gain skills and access job opportunities. I'm currently looking for opportunities where I can grow, contribute, and apply my skills."
              </p>
            </CardContent>
          </GlassCard>

          {/* Professional Bio & Core Expertise Grid */}
          <div className="grid lg:grid-cols-5 gap-10">
            <GlassCard className="lg:col-span-3">
              <CardContent>
                <div className="flex items-center gap-3 mb-6">
                  <Award className="h-6 w-6 text-blue-500" />
                  <h2 className="text-sm font-black uppercase tracking-[0.3em] text-slate-500">Professional Bio</h2>
                </div>
                <div className="text-slate-700 leading-relaxed text-lg space-y-4 font-medium">
                  <p>
                    Okereke Caleb is an aspiring data analyst with a background in statistics and experience in financial operations at{" "}
                    <strong className="text-slate-900">Coscharis Mobility Ltd</strong>.
                  </p>
                  <p>
                    He is passionate about using data to solve real-world problems, particularly youth unemployment in Nigeria. He is currently developing a digital solution (tech platform) that connects learning with job opportunities.
                  </p>
                </div>
              </CardContent>
            </GlassCard>

            <GlassCard className="lg:col-span-2 bg-slate-900 text-white shadow-2xl shadow-blue-900/20 border-none relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" />
              <CardContent className="h-full flex flex-col relative z-10">
                <div className="flex items-center gap-3 mb-10">
                  <div className="p-2 bg-blue-500/20 rounded-lg">
                    <Star className="h-5 w-5 text-blue-400 fill-blue-400/20" />
                  </div>
                  <h2 className="text-sm font-black uppercase tracking-[0.3em] text-blue-300">Core Expertise</h2>
                </div>
                <div className="space-y-4 mt-auto">
                  {coreExpertise.map((skill, i) => (
                    <div key={i} className="group cursor-default">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-black text-lg tracking-tight text-white group-hover:text-blue-400 transition-colors flex items-center gap-2">
                          <span className="opacity-50">{skill.icon}</span>
                          {skill.label}
                        </span>
                        <span className="text-[10px] font-black uppercase tracking-widest text-blue-500 px-2 py-1 bg-blue-500/10 rounded-md">
                          {skill.val}
                        </span>
                      </div>
                      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: "100%" }}
                          transition={{ duration: 1, delay: i * 0.1 }}
                          className="h-full bg-gradient-to-r from-blue-600 to-blue-400"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </GlassCard>
          </div>

          {/* Skill Blocks */}
          <div className="grid md:grid-cols-3 gap-8">
            {skillCategories.map((cat, i) => (
              <GlassCard key={i}>
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 bg-blue-600/10 rounded-2xl text-blue-600">{cat.icon}</div>
                    <h3 className="font-black text-slate-900 tracking-tight text-xl">{cat.title}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((skill, j) => (
                      <button
                        key={j}
                        onClick={() => setActiveSkillNote(skill === activeSkillNote ? null : skill)}
                        className={`group relative px-4 py-2 border rounded-xl text-[13px] font-bold transition-all shadow-sm flex items-center gap-2 ${
                          activeSkillNote === skill
                            ? "bg-blue-600 border-blue-600 text-white shadow-blue-200"
                            : "bg-white border-slate-100 text-slate-700 hover:border-blue-200 hover:text-blue-600"
                        }`}
                      >
                        {skill}
                        <Info className={`h-3.5 w-3.5 opacity-40 group-hover:opacity-100 transition-opacity ${activeSkillNote === skill ? "opacity-100" : ""}`} />
                      </button>
                    ))}
                  </div>
                  <AnimatePresence mode="wait">
                    {activeSkillNote && cat.skills.includes(activeSkillNote) && (
                      <motion.div
                        initial={{ opacity: 0, height: 0, marginTop: 0 }}
                        animate={{ opacity: 1, height: "auto", marginTop: 24 }}
                        exit={{ opacity: 0, height: 0, marginTop: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="p-4 bg-blue-50/50 rounded-2xl border border-blue-100 text-[13px] font-medium text-slate-600 leading-relaxed relative">
                          <div className="font-black text-blue-700 text-[10px] uppercase tracking-widest mb-1">Impact & Application</div>
                          {skillNotes[activeSkillNote]}
                          <div className="absolute top-[-6px] left-8 w-3 h-3 bg-blue-50 rotate-45 border-l border-t border-blue-100" />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </CardContent>
              </GlassCard>
            ))}
          </div>

          {/* Portfolio Grid */}
          <div className="pt-10">
            <div className="flex flex-col sm:flex-row items-end justify-between mb-12 gap-8">
              <div>
                <div className="flex items-center gap-2 text-blue-600 mb-2 font-black uppercase tracking-[0.2em] text-xs">
                  <Code className="h-4 w-4" /> Selected Works
                </div>
                <h2 className="text-5xl font-black tracking-tighter text-slate-950">Projects</h2>
              </div>
              <div className="relative w-full sm:w-80 group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                <input
                  className="w-full h-14 pl-12 pr-4 bg-white rounded-2xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-sm font-semibold"
                  placeholder="Filter projects..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projectsData
                .filter((p) => p.title.toLowerCase().includes(search.toLowerCase()))
                .map((project, index) => (
                  <GlassCard key={index} className="group">
                    <CardContent className="p-8">
                      <div className="mb-4">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full">
                          {project.tool}
                        </span>
                      </div>
                      <h3 className="text-2xl font-black mb-4 text-slate-900 group-hover:text-blue-600 transition-colors tracking-tight">
                        {project.title}
                      </h3>
                      <p className="text-slate-500 mb-8 leading-relaxed text-sm font-medium">{project.desc}</p>
                      <CustomButton
                        variant="link"
                        className="group/btn p-0"
                        onClick={() => window.open(project.link, "_blank")}
                      >
                        EXPLORE PROJECT{" "}
                        <ChevronRight className="inline-block h-4 w-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                      </CustomButton>
                    </CardContent>
                  </GlassCard>
                ))}
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          <GlassCard className="bg-gradient-to-br from-slate-900 to-slate-800 text-white border-none text-center">
            <CardContent className="py-20 px-10 relative overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[80%] bg-blue-600/20 blur-[120px] rounded-full" />
              <div className="relative z-10">
                <h2 className="text-4xl sm:text-6xl font-black mb-8 tracking-tighter">Ready to work together?</h2>
                <p className="text-slate-400 max-w-xl mx-auto mb-12 text-lg font-medium">
                  Whether you have a specific project in mind or just want to say hi, my inbox is always open.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                  <CustomButton
                    onClick={handleEmailClick}
                    className="w-full sm:w-auto rounded-2xl px-12 py-7 text-lg bg-white text-slate-900 hover:bg-slate-100"
                  >
                    <Mail className="mr-3 h-6 w-6" /> Send a Message
                  </CustomButton>
                  <div className="flex gap-4">
                    <a href={linkedInUrl} target="_blank" rel="noopener noreferrer" className="p-4 bg-white/5 rounded-2xl hover:bg-white/10 transition-colors">
                      <Linkedin className="h-6 w-6" />
                    </a>
                    <a href="https://github.com/engrcaleb" target="_blank" rel="noopener noreferrer" className="p-4 bg-white/5 rounded-2xl hover:bg-white/10 transition-colors">
                      <Github className="h-6 w-6" />
                    </a>
                  </div>
                </div>
              </div>
            </CardContent>
          </GlassCard>

          {/* Bottom Info Bar */}
          <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-6 px-10">
            <div className="flex items-center gap-8 text-slate-400 text-sm font-bold tracking-tight">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-blue-500" /> Lagos, Nigeria
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-blue-500" /> UTC +1
              </div>
            </div>
            <div className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-300">
              © 2024 Caleb Okereke — All Rights Reserved
            </div>
          </div>
        </motion.div>
      </div>

      <ContactModal
        isOpen={isMailModalOpen}
        onClose={() => setIsMailModalOpen(false)}
        email={emailAddress}
        copied={copied}
        onCopy={copyToClipboard}
      />
    </div>
  );
}
