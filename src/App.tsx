import React, { useState, useRef, useEffect } from 'react';
import { 
  Bolt, 
  Building2, 
  Database, 
  Palette, 
  Share2, 
  Rocket, 
  Lock, 
  Facebook, 
  Instagram, 
  Linkedin, 
  Twitter,
  Globe,
  LayoutDashboard,
  BarChart3,
  Database as DbIcon,
  GitBranch,
  Settings,
  Search,
  Bell,
  CheckCircle2,
  FileText,
  Trophy,
  Copy,
  Plus,
  MessageSquare,
  TrendingUp,
  Users,
  Clock,
  Upload,
  Trash2,
  Shield,
  Key,
  Smartphone,
  Slack,
  MessageCircle,
  Hash,
  ExternalLink,
  X,
  Send,
  User,
  CreditCard,
  Zap,
  LogOut,
  Bot,
  ArrowLeft
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area,
  BarChart,
  Bar
} from 'recharts';

const Logo = ({ className = "h-10", minimal = false, src }: { className?: string, minimal?: boolean, src?: string }) => {
  if (src) {
    return <img src={src} alt="Logo" className={className} referrerPolicy="no-referrer" />;
  }

  if (minimal) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <div className="size-8 bg-primary flex items-center justify-center rounded-lg shadow-lg shadow-primary/20">
          <Bolt className="text-white size-5 fill-current" />
        </div>
        <div className="flex flex-col -space-y-1">
          <span className="text-lg font-black tracking-tighter text-slate-900">IECC</span>
          <span className="text-[8px] font-bold text-primary uppercase tracking-widest leading-none">Nile University</span>
        </div>
      </div>
    );
  }

  return (
    <img 
      src="https://iecc.nu.edu.eg/sites/default/files/iecc-logo.png" 
      alt="Nile University Logo" 
      className={className}
      referrerPolicy="no-referrer"
    />
  );
};

const InputField = ({ label, placeholder, type = "text", required = false, icon: Icon, defaultValue, onChange, value }: any) => (
  <div className="flex flex-col gap-2">
    <label className="text-sm font-semibold text-slate-600">
      {label} {required && <span className="text-primary">*</span>}
    </label>
    <div className="relative">
      {Icon && <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 size-5" />}
      <input 
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        value={value}
        onChange={onChange}
        className={`w-full h-12 bg-slate-50 border border-slate-200 rounded-xl ${Icon ? 'pl-12' : 'px-4'} text-slate-900 placeholder:text-slate-400 focus:border-primary transition-all focus:ring-0 outline-none`}
      />
    </div>
  </div>
);

const SocialInput = ({ icon: Icon, placeholder, colorClass }: any) => (
  <div className="flex items-center gap-4 p-4 rounded-xl border border-white/5 bg-white/5 group transition-all hover:border-primary/30">
    <div className={`size-10 rounded-lg ${colorClass} flex items-center justify-center`}>
      <Icon className="size-5" />
    </div>
    <div className="flex-1">
      <input 
        className="w-full bg-transparent border-none p-0 text-sm focus:ring-0 placeholder:text-slate-500 outline-none" 
        placeholder={placeholder} 
        type="text"
      />
    </div>
    <button className="text-xs font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity">Connect</button>
  </div>
);

// --- Views ---

const Modal = ({ isOpen, onClose, title, children }: any) => (
  <AnimatePresence>
    {isOpen && (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
        />
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-lg bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-2xl"
        >
          <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
            <h3 className="text-xl font-bold text-slate-900">{title}</h3>
            <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-500">
              <X className="size-5" />
            </button>
          </div>
          <div className="p-6">
            {children}
          </div>
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);

const PlanModal = ({ isOpen, onClose }: any) => (
  <Modal isOpen={isOpen} onClose={onClose} title="Manage Subscription">
    <div className="space-y-6">
      <div className="p-4 bg-primary/10 border border-primary/20 rounded-2xl flex items-center justify-between">
        <div>
          <p className="text-xs font-bold text-primary uppercase tracking-widest">Current Plan</p>
          <p className="text-xl font-black">Premium 2026</p>
        </div>
        <Zap className="size-8 text-primary fill-current" />
      </div>
      
      <div className="space-y-3">
        {[
          { name: 'Starter', price: '$0', desc: 'Perfect for testing', current: false },
          { name: 'Pro', price: '$49', desc: 'For growing businesses', current: false },
          { name: 'Enterprise', price: 'Custom', desc: 'Unlimited scale', current: false },
        ].map((plan) => (
          <div key={plan.name} className="p-4 border border-border-dark rounded-2xl flex items-center justify-between hover:border-primary/50 transition-colors cursor-pointer group">
            <div>
              <p className="font-bold">{plan.name}</p>
              <p className="text-xs text-slate-500">{plan.desc}</p>
            </div>
            <div className="text-right">
              <p className="font-black text-lg">{plan.price}</p>
              <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">/ month</p>
            </div>
          </div>
        ))}
      </div>
      
      <button className="w-full py-4 bg-white/5 border border-white/10 rounded-2xl font-bold hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
        <CreditCard className="size-5" />
        Update Payment Method
      </button>
    </div>
  </Modal>
);

const ChatWidget = ({ isOpen, onClose, botName }: { isOpen: boolean, onClose: () => void, botName: string }) => {
  const [messages, setMessages] = useState([
    { role: 'bot', text: `Hello! I am ${botName}. How can I help you today?` }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { role: 'user', text: input }]);
    setInput('');
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'bot', text: "I've analyzed your request. As an AI trained on your company data, I can confirm that our omnichannel integration is fully active." }]);
    }, 1000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: 100, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 100, scale: 0.8 }}
          className="fixed bottom-24 right-8 z-[100] w-96 h-[500px] bg-card-dark border border-border-dark rounded-3xl shadow-2xl overflow-hidden flex flex-col"
        >
          <div className="p-4 bg-primary text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="size-8 bg-white/20 rounded-lg flex items-center justify-center">
                <Bolt className="size-5 fill-current" />
              </div>
              <div>
                <p className="font-bold text-sm">{botName} Preview</p>
                <p className="text-[10px] opacity-80 uppercase font-bold tracking-widest">Online</p>
              </div>
            </div>
            <button onClick={onClose} className="p-1 hover:bg-white/10 rounded-full transition-colors">
              <X className="size-5" />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.role === 'user' ? 'bg-primary text-white rounded-tr-none' : 'bg-white/5 text-slate-300 rounded-tl-none border border-white/5'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
          
          <div className="p-4 border-t border-border-dark bg-white/5">
            <div className="relative">
              <input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type a message..."
                className="w-full h-12 bg-black/40 border border-white/10 rounded-xl pl-4 pr-12 text-sm text-white focus:border-primary outline-none"
              />
              <button 
                onClick={handleSend}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-primary hover:text-orange-400 transition-colors"
              >
                <Send className="size-5" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const NotificationsPanel = ({ isOpen, onClose }: any) => (
  <AnimatePresence>
    {isOpen && (
      <>
        <div className="fixed inset-0 z-[90]" onClick={onClose} />
        <motion.div 
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          className="absolute top-16 right-8 z-[100] w-80 bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden"
        >
          <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
            <p className="font-bold text-sm text-slate-900">Notifications</p>
            <span className="text-[10px] font-bold text-primary uppercase bg-primary/10 px-2 py-0.5 rounded">3 New</span>
          </div>
          <div className="max-h-96 overflow-y-auto divide-y divide-slate-100">
            {[
              { title: 'Knowledge Base Synced', time: '12m ago', icon: DbIcon, color: 'text-blue-500' },
              { title: 'New Slack Connection', time: '1h ago', icon: Slack, color: 'text-purple-500' },
              { title: 'Accuracy Rating Improved', time: '3h ago', icon: Trophy, color: 'text-amber-500' },
              { title: 'System Update v2.0.4', time: 'Yesterday', icon: Bolt, color: 'text-slate-400' },
            ].map((note, i) => (
              <div key={i} className="p-4 hover:bg-slate-50 transition-colors cursor-pointer flex gap-3">
                <div className={`size-8 rounded-lg bg-slate-50 flex items-center justify-center shrink-0 ${note.color}`}>
                  <note.icon className="size-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">{note.title}</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">{note.time}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full p-3 text-[10px] font-bold text-slate-500 uppercase hover:bg-slate-50 transition-colors border-t border-slate-100">
            View All Activity
          </button>
        </motion.div>
      </>
    )}
  </AnimatePresence>
);

const ToastContainer = ({ toasts }: { toasts: any[] }) => (
  <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[200] flex flex-col gap-2 pointer-events-none">
    <AnimatePresence>
      {toasts.map((toast) => (
        <motion.div
          key={toast.id}
          initial={{ opacity: 0, y: -20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="bg-card-dark border border-border-dark px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 pointer-events-auto"
        >
          <div className={`size-2 rounded-full ${toast.type === 'success' ? 'bg-emerald-500' : 'bg-primary'}`} />
          <p className="text-sm font-bold">{toast.message}</p>
        </motion.div>
      ))}
    </AnimatePresence>
  </div>
);

const LandingView = ({ onLogin, onSignup }: { onLogin: () => void, onSignup: () => void }) => (
  <div className="relative min-h-screen w-full flex flex-col bg-background-dark overflow-hidden">
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] bg-gradient-to-b from-primary/10 to-transparent pointer-events-none opacity-50"></div>
    
    <header className="relative z-10 flex items-center justify-between px-6 lg:px-20 py-8">
      <Logo className="h-14" />
      <div className="flex items-center gap-4">
        <button onClick={onLogin} className="text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors px-4 py-2">Login</button>
        <button onClick={onSignup} className="bg-primary hover:opacity-90 text-white text-sm font-bold px-6 py-2.5 rounded-xl transition-all shadow-lg shadow-primary/20">Sign Up</button>
      </div>
    </header>

    <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 text-center">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl space-y-8"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-black uppercase tracking-widest">
          <Zap className="size-3 fill-current" />
          The Future of Customer Support
        </div>
        <h1 className="text-6xl lg:text-8xl font-black leading-[0.9] tracking-tighter text-slate-900">
          NILE <br/>
          <span className="text-primary">ASSISTANT</span> <br/>
          PLATFORM
        </h1>
        <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium">
          Empower Nile University with intelligent, brand-aware AI agents. Deploy across all channels in under 5 minutes.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
          <button onClick={onSignup} className="w-full sm:w-auto bg-primary hover:opacity-90 text-white py-5 px-12 rounded-2xl font-black text-xl shadow-2xl shadow-primary/40 transition-all transform hover:scale-105 active:scale-95">
            Get Started
          </button>
        </div>
      </motion.div>
    </main>
  </div>
);

const AuthView = ({ mode, onSwitch, onSuccess, addToast, onClose }: { mode: 'login' | 'signup', onSwitch: () => void, onSuccess: (user: any) => void, addToast: (m: string, t?: 'success' | 'info') => void, onClose: () => void }) => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'signup' && formData.password !== formData.confirmPassword) {
      addToast('Passwords do not match', 'info');
      return;
    }

    setLoading(true);
    try {
      const endpoint = mode === 'signup' ? '/api/signup' : '/api/login';
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success) {
        onSuccess(data.user || { id: data.userId, ...formData });
        addToast(mode === 'signup' ? 'Account created successfully!' : 'Welcome back!');
      } else {
        addToast(data.message || 'Authentication failed', 'info');
      }
    } catch (error) {
      addToast('Connection error', 'info');
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = mode === 'signup' 
    ? formData.name && formData.email && formData.password && formData.confirmPassword && formData.password === formData.confirmPassword
    : formData.email && formData.password;

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background-dark px-6">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(236,91,19,0.05),transparent_50%)]"></div>
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-card-dark border border-border-dark p-8 rounded-3xl shadow-2xl relative z-10"
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-all"
        >
          <X className="size-5" />
        </button>

        <div className="text-center mb-8">
          <div className="size-12 bg-primary flex items-center justify-center rounded-2xl shadow-lg shadow-primary/20 mx-auto mb-4">
            <Bolt className="text-white size-8 fill-current" />
          </div>
          <h2 className="text-3xl font-black tracking-tight text-slate-900">{mode === 'signup' ? 'Create Account' : 'Welcome Back'}</h2>
          <p className="text-slate-500 mt-2">{mode === 'signup' ? 'Join Nile Assistant and start building today.' : 'Enter your credentials to access your dashboard.'}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <InputField 
              label="Full Name" 
              placeholder="John Doe" 
              value={formData.name} 
              onChange={(e: any) => setFormData({ ...formData, name: e.target.value })} 
              required 
            />
          )}
          <InputField 
            label="Email Address" 
            type="email" 
            placeholder="john@example.com" 
            value={formData.email} 
            onChange={(e: any) => setFormData({ ...formData, email: e.target.value })} 
            required 
          />
          <InputField 
            label="Password" 
            type="password" 
            placeholder="••••••••" 
            value={formData.password} 
            onChange={(e: any) => setFormData({ ...formData, password: e.target.value })} 
            required 
          />
          {mode === 'signup' && (
            <InputField 
              label="Confirm Password" 
              type="password" 
              placeholder="••••••••" 
              value={formData.confirmPassword} 
              onChange={(e: any) => setFormData({ ...formData, confirmPassword: e.target.value })} 
              required 
            />
          )}
          
          <button 
            disabled={loading || !isFormValid}
            className="w-full py-4 bg-primary text-white font-black rounded-2xl shadow-lg shadow-primary/20 hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-4"
          >
            {loading ? 'Processing...' : mode === 'signup' ? 'Complete Sign Up' : 'Login'}
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-slate-500">
          {mode === 'signup' ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button onClick={onSwitch} className="text-primary font-bold hover:underline">
            {mode === 'signup' ? 'Login' : 'Sign Up'}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

const OnboardingStep1 = ({ data, onNext, onBack, primaryColor, setPrimaryColor }: any) => {
  const [startupName, setStartupName] = useState(data.startupName || '');

  const isStepValid = startupName && primaryColor;

  return (
    <div className="w-full max-w-3xl space-y-8">
      <div className="text-center space-y-4 mb-12">
        <h1 className="text-4xl font-black tracking-tight text-slate-900">Step 1: Bot Identity</h1>
        <p className="text-slate-500">Define how your AI assistant looks.</p>
      </div>

      <section className="glass p-8 rounded-3xl glow-subtle space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <InputField 
              label="Startup Name" 
              placeholder="e.g. My Assistant" 
              value={startupName}
              onChange={(e: any) => setStartupName(e.target.value)}
              required 
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-slate-500 uppercase tracking-widest">Brand Primary Color *</label>
            <div className="flex gap-3">
              <div className="size-12 rounded-xl border border-slate-200 p-1 flex items-center justify-center bg-slate-50 overflow-hidden">
                <input 
                  className="w-14 h-14 cursor-pointer scale-150 bg-transparent border-none" 
                  type="color" 
                  value={primaryColor} 
                  onChange={(e) => setPrimaryColor(e.target.value)}
                />
              </div>
              <input 
                className="flex-1 h-12 bg-slate-50 border border-slate-200 rounded-xl px-4 text-slate-900 uppercase font-mono text-sm focus:border-primary outline-none" 
                type="text" 
                value={primaryColor.toUpperCase()} 
                onChange={(e) => setPrimaryColor(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      <div className="flex flex-col md:flex-row items-center justify-center gap-4 pt-8">
        <button 
          onClick={onBack}
          className="w-full md:w-auto min-w-[160px] bg-white border border-slate-200 text-slate-600 py-4 px-12 rounded-2xl font-bold text-xl hover:bg-slate-50 transition-all flex items-center justify-center gap-3"
        >
          <ArrowLeft className="size-6" />
          Back
        </button>
        <button 
          onClick={() => onNext({ startupName, primaryColor })}
          disabled={!isStepValid}
          className="w-full md:w-auto min-w-[280px] bg-primary text-white py-4 px-12 rounded-2xl font-black text-xl shadow-xl shadow-primary/20 transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          Next Step
          <Rocket className="size-5" />
        </button>
      </div>
    </div>
  );
};

const OnboardingStep2 = ({ data, onComplete, onBack, addToast }: { data: any, onComplete: (d: any) => void, onBack: () => void, addToast: (m: string, t?: 'success' | 'info') => void }) => {
  const [formData, setFormData] = useState({
    websiteUrl: '',
    googleDriveUrl: '',
    googleSheetUrl: '',
    backoffSeconds: 30,
    ignoredMessages: '',
    facebookConnected: false
  });

  const handleComplete = () => {
    onComplete(formData);
  };

  const isStepValid = formData.websiteUrl && formData.googleSheetUrl && formData.backoffSeconds;

  return (
    <div className="w-full max-w-3xl space-y-8">
      <div className="text-center space-y-4 mb-12">
        <h1 className="text-4xl font-black tracking-tight text-slate-900">Step 2: Integrations</h1>
        <p className="text-slate-500">Connect your data sources.</p>
      </div>

      <div className="space-y-6">
        <section className="glass p-8 rounded-3xl glow-subtle space-y-6">
          <h3 className="text-xl font-bold flex items-center gap-2 text-slate-900">
            <Globe className="text-primary size-6" />
            Knowledge Base
          </h3>
          <div className="space-y-6">
            <InputField 
              label="Website Link URL *" 
              placeholder="https://yourwebsite.com" 
              value={formData.websiteUrl}
              onChange={(e: any) => setFormData({ ...formData, websiteUrl: e.target.value })}
              required
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField 
                label="Google Drive (Optional)" 
                placeholder="https://drive.google.com/..." 
                value={formData.googleDriveUrl}
                onChange={(e: any) => setFormData({ ...formData, googleDriveUrl: e.target.value })}
              />
              <div className="space-y-2">
                <InputField 
                  label="Google Sheets URL *" 
                  placeholder="https://docs.google.com/spreadsheets/d/..." 
                  value={formData.googleSheetUrl}
                  onChange={(e: any) => setFormData({ ...formData, googleSheetUrl: e.target.value })}
                  required
                />
              </div>
            </div>
          </div>
        </section>

        <section className="glass p-8 rounded-3xl glow-subtle space-y-6">
          <h3 className="text-xl font-bold flex items-center gap-2 text-slate-900">
            <Settings className="text-primary size-6" />
            Advanced Settings
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-500 uppercase tracking-widest">Messaging Backoff (Seconds) *</label>
              <input 
                type="number"
                value={isNaN(formData.backoffSeconds) ? '' : formData.backoffSeconds}
                onChange={(e) => setFormData({ ...formData, backoffSeconds: parseInt(e.target.value) })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 outline-none focus:border-primary transition-all"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-500 uppercase tracking-widest block">
                Ignored Messages (Optional)
                <span className="block text-[10px] font-normal normal-case text-slate-400 mt-1">(Comma separated)</span>
              </label>
              <input 
                type="text"
                placeholder="hi, hello, test"
                value={formData.ignoredMessages}
                onChange={(e) => setFormData({ ...formData, ignoredMessages: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 outline-none focus:border-primary transition-all"
              />
            </div>
          </div>
        </section>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center gap-4 pt-8 pb-20">
        <button 
          onClick={onBack}
          className="w-full md:w-auto min-w-[160px] bg-white border border-slate-200 text-slate-600 py-5 px-12 rounded-2xl font-bold text-xl hover:bg-slate-50 transition-all flex items-center justify-center gap-3"
        >
          <ArrowLeft className="size-6" />
          Back
        </button>
        <button 
          onClick={handleComplete}
          disabled={!isStepValid}
          className="w-full md:w-auto min-w-[320px] bg-primary text-white py-5 px-12 rounded-2xl font-black text-xl shadow-2xl shadow-primary/40 transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          Complete Signup
          <CheckCircle2 className="size-6" />
        </button>
      </div>
    </div>
  );
};

const DashboardHome = ({ addToast, onboardingData, botName, primaryColor, onNavigateToSettings }: { addToast: (m: string, t?: 'success' | 'info') => void, onboardingData: any, botName: string, primaryColor: string, onNavigateToSettings: () => void }) => {
  const [showEmbed, setShowEmbed] = useState(false);
  
  // Calculate readiness score dynamically
  const calculateReadiness = () => {
    let score = 70; // Base score for required fields
    if (onboardingData?.google_drive_url) score += 15;
    if (onboardingData?.ignored_messages) score += 15;
    return Math.min(score, 100);
  };

  const readinessScore = calculateReadiness();

  const chartData = [
    { name: '00:00', value: 45 },
    { name: '04:00', value: 30 },
    { name: '08:00', value: 85 },
    { name: '12:00', value: 120 },
    { name: '16:00', value: 95 },
    { name: '20:00', value: 60 },
    { name: '23:59', value: 50 },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-3xl p-8 shadow-sm flex flex-col justify-between relative overflow-hidden">
          <div className="relative z-10">
            <h1 className="text-4xl font-black tracking-tight mb-2 text-slate-900">Welcome back, {onboardingData?.name || 'Admin'}.</h1>
            <p className="text-slate-500 text-lg max-w-md">Your AI agent is currently handling 12 active conversations with a 98% resolution rate.</p>
            <div className="mt-8 flex gap-4">
              <button 
                onClick={() => addToast('Deploying chatbot to production...', 'success')}
                className="px-8 py-3 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform flex items-center gap-2"
              >
                <Rocket className="size-5" />
                Deploy Full Chatbot
              </button>
              <button 
                onClick={() => addToast('System logs are currently empty.', 'info')}
                className="px-6 py-3 bg-slate-100 border border-slate-200 font-bold rounded-xl hover:bg-slate-200 transition-colors text-slate-700"
              >
                View Logs
              </button>
            </div>
          </div>
          <div className="absolute right-0 bottom-0 w-1/2 h-full opacity-10 pointer-events-none">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <Area type="monotone" dataKey="value" stroke={primaryColor} fill={primaryColor} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="bg-white border border-slate-200 rounded-3xl p-8 flex flex-col items-center justify-center text-center shadow-sm">
          <div className="relative size-32 flex items-center justify-center rounded-full bg-slate-50 border-8 border-primary/10">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-3xl font-black text-slate-900">{readinessScore}%</span>
            </div>
            <svg className="size-full -rotate-90">
              <circle 
                cx="64" cy="64" r="56" 
                fill="none" 
                stroke={primaryColor} 
                strokeWidth="8" 
                strokeDasharray="351.85" 
                strokeDashoffset={351.85 * (1 - readinessScore / 100)}
                strokeLinecap="round"
              />
            </svg>
          </div>
          <h3 className="mt-6 font-bold text-xl text-slate-900">Readiness Score</h3>
          <p className="text-sm text-slate-500 px-4 mt-2 leading-relaxed">
            {readinessScore === 100 
              ? "Your knowledge base is complete! Your assistant is fully trained." 
              : `Your knowledge base is ${readinessScore}% complete. Add more documentation to reach 100%.`}
          </p>
          
          <div className="mt-6 flex flex-col gap-3 w-full items-center">
            {readinessScore < 100 && (
              <button 
                onClick={onNavigateToSettings}
                className="w-full py-2.5 bg-amber-500 text-white text-xs font-black uppercase tracking-widest rounded-full shadow-lg shadow-amber-500/20 hover:scale-105 transition-all"
              >
                Complete your knowledge base
              </button>
            )}
            <div className="flex items-center gap-2 text-emerald-600 text-xs font-bold uppercase tracking-wider bg-emerald-50 px-4 py-2 rounded-full">
              <CheckCircle2 className="size-4" />
              Production Ready
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8">
        <div className="bg-white border border-slate-200 p-8 rounded-3xl shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold flex items-center gap-2 text-slate-900">
              <Copy className="text-primary size-6" />
              Website Embed Code
            </h3>
            {showEmbed && (
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(`<script src="https://iecc-chatbot.io/widget.js"></script>\n<script>\n  Assistant.init({\n    startup: "${botName}",\n    color: "${primaryColor}"\n  });\n</script>`);
                  addToast('Embed code copied!');
                }}
                className="p-2 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors text-slate-600"
              >
                <Copy className="size-4" />
              </button>
            )}
          </div>
          
          {!showEmbed ? (
            <div className="flex flex-col items-center justify-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-200 gap-4">
              <Globe className="size-12 text-slate-300" />
              <p className="text-sm text-slate-500 font-medium">Click the button below to generate your embed code.</p>
              <button 
                onClick={() => setShowEmbed(true)}
                className="px-8 py-3 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform"
              >
                Generate Embed Code
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-sm text-slate-500">Copy and paste this code into your website's <code className="text-primary">&lt;head&gt;</code> or <code className="text-primary">&lt;body&gt;</code> tag.</p>
              <div className="bg-slate-50 rounded-xl p-6 font-mono text-xs text-slate-700 leading-relaxed border border-slate-200">
                <pre className="whitespace-pre-wrap">
{`<script src="https://iecc-chatbot.io/widget.js"></script>
<script>
  Assistant.init({
    startup: "${botName}",
    color: "${primaryColor}"
  });
</script>`}
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const AnalyticsView = ({ primaryColor, addToast, onExport }: { primaryColor: string, addToast: (m: string) => void, onExport: () => void }) => {
  const data = [
    { name: 'Mon', conversations: 400, satisfaction: 92 },
    { name: 'Tue', conversations: 600, satisfaction: 95 },
    { name: 'Wed', conversations: 550, satisfaction: 93 },
    { name: 'Thu', conversations: 800, satisfaction: 96 },
    { name: 'Fri', conversations: 700, satisfaction: 94 },
    { name: 'Sat', conversations: 300, satisfaction: 98 },
    { name: 'Sun', conversations: 250, satisfaction: 97 },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-black tracking-tight text-slate-900">Analytics Overview</h1>
        <div className="flex gap-2">
          <button 
            onClick={() => addToast('Changing date range...')}
            className="px-4 py-2 bg-slate-100 border border-slate-200 rounded-lg text-xs font-bold text-slate-600"
          >
            Last 7 Days
          </button>
          <button 
            onClick={onExport}
            className="px-4 py-2 bg-primary text-white rounded-lg text-xs font-bold"
          >
            Export Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Conversations', value: '12,482', change: '+12%', icon: MessageSquare, color: 'text-blue-500' },
          { label: 'Avg. Satisfaction', value: '94.2%', change: '+2.4%', icon: Trophy, color: 'text-amber-500' },
          { label: 'Active Users', value: '3,102', change: '+18%', icon: Users, color: 'text-purple-500' },
          { label: 'Avg. Response Time', value: '1.2s', change: '-0.4s', icon: Clock, color: 'text-emerald-500' },
        ].map((stat, i) => (
          <div key={i} className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className={`size-10 rounded-lg bg-slate-50 flex items-center justify-center ${stat.color}`}>
                <stat.icon className="size-5" />
              </div>
              <span className="text-xs font-bold text-emerald-600">{stat.change}</span>
            </div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{stat.label}</p>
            <p className="text-2xl font-black mt-1 text-slate-900">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
          <h3 className="font-bold mb-6 text-slate-900">Conversation Volume</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorConv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={primaryColor} stopOpacity={0.3}/>
                    <stop offset="95%" stopColor={primaryColor} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px' }}
                  itemStyle={{ color: primaryColor }}
                />
                <Area type="monotone" dataKey="conversations" stroke={primaryColor} fillOpacity={1} fill="url(#colorConv)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
          <h3 className="font-bold mb-6 text-slate-900">Satisfaction Rate (%)</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} domain={[80, 100]} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px' }}
                />
                <Bar dataKey="satisfaction" fill={primaryColor} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

const KnowledgeBaseView = ({ sources, onAdd, onDelete, addToast }: { sources: any[], onAdd: (n: string, t: string, s: string) => void, onDelete: (id: number) => void, addToast: (m: string) => void }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const size = (file.size / (1024 * 1024)).toFixed(1) + ' MB';
      const type = file.name.split('.').pop()?.toUpperCase() || 'FILE';
      onAdd(file.name, type, size);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900">Knowledge Base</h1>
          <p className="text-slate-500 mt-1">Manage the data sources your AI uses for training.</p>
        </div>
        <div className="flex gap-2">
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            onChange={handleFileChange}
          />
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="px-6 py-3 bg-primary text-white font-bold rounded-xl flex items-center gap-2 shadow-lg shadow-primary/20"
          >
            <Upload className="size-5" />
            Upload New Source
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Source Name</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Type</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Size</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Uploaded</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {sources.map((doc) => (
                  <tr key={doc.id} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <FileText className="size-5 text-primary" />
                        <span className="text-sm font-medium text-slate-900">{doc.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500">{doc.type}</td>
                    <td className="px-6 py-4 text-sm text-slate-500">{doc.size}</td>
                    <td className="px-6 py-4 text-sm text-slate-500">{doc.date}</td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => onDelete(doc.id)}
                        className="p-2 text-slate-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
            <h3 className="font-bold mb-4 flex items-center gap-2 text-slate-900">
              <TrendingUp className="size-5 text-primary" />
              Training Status
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Total Chunks</span>
                <span className="font-bold text-slate-900">1,240</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Last Sync</span>
                <span className="font-bold text-slate-900">12 mins ago</span>
              </div>
              <div className="pt-2">
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-primary h-full w-[94%]"></div>
                </div>
                <p className="text-[10px] text-slate-500 mt-2 text-center uppercase font-bold tracking-widest">94% Accuracy Rating</p>
              </div>
            </div>
          </div>

          <div className="bg-primary/5 border border-primary/10 p-6 rounded-2xl">
            <h3 className="font-bold text-primary mb-2">Pro Tip</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Connect your Notion workspace directly to keep your AI updated in real-time as you edit your documents.
            </p>
            <button 
              onClick={() => addToast('Redirecting to Notion OAuth...')}
              className="mt-4 text-xs font-bold text-primary hover:underline flex items-center gap-1"
            >
              Connect Notion <ExternalLink className="size-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const IntegrationsView = ({ addToast, botName, primaryColor }: { addToast: (m: string) => void, botName: string, primaryColor: string }) => {
  const integrations = [
    { name: 'Website Embed', icon: Globe, desc: 'Add IECC Chatbot to your website with a simple script.', status: 'Get Code', color: 'text-primary' },
    { name: 'Slack', icon: Slack, desc: 'Deploy your bot to any Slack channel.', status: 'Connected', color: 'text-purple-500' },
    { name: 'WhatsApp', icon: MessageCircle, desc: 'Connect via Twilio or Meta Business.', status: 'Connect', color: 'text-emerald-500' },
    { name: 'Messenger', icon: Facebook, desc: 'Official Facebook Messenger API.', status: 'Connected', color: 'text-blue-600' },
    { name: 'Instagram', icon: Instagram, desc: 'Automate DMs and comments.', status: 'Connected', color: 'text-pink-600' },
    { name: 'LinkedIn', icon: Linkedin, desc: 'Professional networking automation.', status: 'Connected', color: 'text-sky-700' },
  ];

  const [showEmbedCode, setShowEmbedCode] = useState(false);

  return (
    <div className="space-y-8">
      <Modal isOpen={showEmbedCode} onClose={() => setShowEmbedCode(false)} title="Website Embed Code">
        <div className="space-y-6">
          <p className="text-sm text-slate-500">Copy and paste this code into your website's <code className="text-primary">&lt;head&gt;</code> or <code className="text-primary">&lt;body&gt;</code> tag.</p>
          <div className="bg-slate-50 rounded-xl p-6 font-mono text-xs text-slate-700 leading-relaxed relative group border border-slate-200">
            <pre className="whitespace-pre-wrap">
{`<script src="https://iecc-chatbot.io/widget.js"></script>
<script>
  Assistant.init({
    startup: "${botName}",
    color: "${primaryColor}"
  });
</script>`}
            </pre>
            <button 
              onClick={() => {
                navigator.clipboard.writeText(`<script src="https://iecc-chatbot.io/widget.js"></script>\n<script>\n  Assistant.init({\n    startup: "${botName}",\n    color: "${primaryColor}"\n  });\n</script>`);
                addToast('Embed code copied!');
              }}
              className="absolute top-4 right-4 p-2 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg transition-colors text-slate-500"
            >
              <Copy className="size-4" />
            </button>
          </div>
          <button 
            onClick={() => setShowEmbedCode(false)}
            className="w-full py-4 bg-primary text-white font-bold rounded-2xl shadow-lg shadow-primary/20"
          >
            Done
          </button>
        </div>
      </Modal>

      <div>
        <h1 className="text-3xl font-black tracking-tight text-slate-900">Integrations</h1>
        <p className="text-slate-500 mt-1">Connect IECC Chatbot to your favorite platforms and tools.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {integrations.map((item, i) => (
          <div key={i} className="bg-white border border-slate-200 p-6 rounded-2xl hover:border-primary/30 transition-all group shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className={`size-12 rounded-xl bg-slate-50 flex items-center justify-center ${item.color}`}>
                <item.icon className="size-6" />
              </div>
              {item.status === 'Connected' ? (
                <span className="text-[10px] font-bold text-emerald-600 uppercase bg-emerald-500/10 px-2 py-1 rounded">Connected</span>
              ) : (
                <button 
                  onClick={() => {
                    if (item.name === 'Website Embed') setShowEmbedCode(true);
                    else addToast(`Initiating ${item.name} connection...`);
                  }}
                  className="text-[10px] font-bold text-primary uppercase hover:underline"
                >
                  {item.status}
                </button>
              )}
            </div>
            <h4 className="font-bold text-lg mb-2 text-slate-900">{item.name}</h4>
            <p className="text-sm text-slate-500 leading-relaxed mb-6">{item.desc}</p>
            <button 
              onClick={() => {
                if (item.name === 'Website Embed') setShowEmbedCode(true);
                else addToast(`Configuring ${item.name} settings...`);
              }}
              className="w-full py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold group-hover:bg-primary group-hover:text-white transition-all text-slate-600"
            >
              {item.name === 'Website Embed' ? 'Get Code' : 'Configure'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const SettingsView = ({ 
  botName: initialBotName, 
  primaryColor, 
  setPrimaryColor, 
  onSave, 
  addToast,
  onboardingData 
}: { 
  botName: string, 
  primaryColor: string, 
  setPrimaryColor: (c: string) => void, 
  onSave: (data: any) => void, 
  addToast: (m: string, t?: 'success' | 'info') => void,
  onboardingData: any
}) => {
  const [localBotName, setLocalBotName] = useState(initialBotName);
  const [settingsData, setSettingsData] = useState({
    websiteUrl: onboardingData?.website_url || '',
    googleDriveUrl: onboardingData?.google_drive_url || '',
    googleSheetUrl: onboardingData?.google_sheet_url || '',
    backoffSeconds: onboardingData?.backoff_seconds || 30,
    ignoredMessages: onboardingData?.ignored_messages || '',
  });

  // Update local state when onboardingData changes
  useEffect(() => {
    if (onboardingData) {
      setSettingsData({
        websiteUrl: onboardingData.website_url || onboardingData.websiteUrl || '',
        googleDriveUrl: onboardingData.google_drive_url || onboardingData.googleDriveUrl || '',
        googleSheetUrl: onboardingData.google_sheet_url || onboardingData.googleSheetUrl || '',
        backoffSeconds: onboardingData.backoff_seconds || onboardingData.backoffSeconds || 30,
        ignoredMessages: onboardingData.ignored_messages || onboardingData.ignoredMessages || '',
      });
      setLocalBotName(onboardingData.startup_name || onboardingData.startupName || initialBotName);
    }
  }, [onboardingData]);

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-3xl font-black tracking-tight text-slate-900">Settings</h1>
        <p className="text-slate-500 mt-1">Manage your account and bot preferences.</p>
      </div>

      <div className="space-y-6">
        <section className="bg-white border border-slate-200 rounded-2xl p-8 space-y-6 shadow-sm">
          <h3 className="text-xl font-bold flex items-center gap-2 text-slate-900">
            <Bot className="size-6 text-primary" />
            General Configuration
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField 
              label="Bot Name" 
              value={localBotName}
              onChange={(e: any) => setLocalBotName(e.target.value)}
            />
            
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-slate-500 uppercase tracking-widest">Brand Primary Color</label>
              <div className="flex gap-3">
                <div className="size-12 rounded-xl border border-slate-200 p-1 flex items-center justify-center bg-slate-50 overflow-hidden">
                  <input 
                    className="w-14 h-14 cursor-pointer scale-150 bg-transparent border-none" 
                    type="color" 
                    value={primaryColor} 
                    onChange={(e) => setPrimaryColor(e.target.value)}
                  />
                </div>
                <input 
                  className="flex-1 h-12 bg-slate-50 border border-slate-200 rounded-xl px-4 text-slate-900 uppercase font-mono text-sm focus:border-primary outline-none" 
                  type="text" 
                  value={primaryColor.toUpperCase()} 
                  onChange={(e) => setPrimaryColor(e.target.value)}
                />
              </div>
            </div>
            
            <InputField 
              label="Website Link URL" 
              value={settingsData.websiteUrl}
              onChange={(e: any) => setSettingsData({ ...settingsData, websiteUrl: e.target.value })}
            />
            <InputField 
              label="Google Sheets URL" 
              value={settingsData.googleSheetUrl}
              onChange={(e: any) => setSettingsData({ ...settingsData, googleSheetUrl: e.target.value })}
            />
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-500 uppercase tracking-widest">Messaging Backoff (Seconds)</label>
              <input 
                type="number"
                value={isNaN(settingsData.backoffSeconds) ? '' : settingsData.backoffSeconds}
                onChange={(e) => setSettingsData({ ...settingsData, backoffSeconds: parseInt(e.target.value) })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 outline-none focus:border-primary transition-all"
              />
            </div>
            <InputField 
              label="Ignored Messages" 
              value={settingsData.ignoredMessages}
              onChange={(e: any) => setSettingsData({ ...settingsData, ignoredMessages: e.target.value })}
            />
            
            <div className="md:col-span-2">
              <InputField 
                label="Google Drive Integration" 
                placeholder="https://drive.google.com/..." 
                value={settingsData.googleDriveUrl}
                onChange={(e: any) => setSettingsData({ ...settingsData, googleDriveUrl: e.target.value })}
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button 
              onClick={() => {
                onSave({ ...settingsData, startupName: localBotName, primaryColor });
              }}
              className="px-8 py-3 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:scale-105 transition-all"
            >
              Save Changes
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

const SidebarItem = ({ icon: Icon, label, active, collapsed, onClick }: any) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group relative ${active ? 'bg-primary/10 text-primary font-bold' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}
    title={collapsed ? label : ''}
  >
    <Icon className={`size-5 shrink-0 ${active ? 'text-primary' : 'text-slate-400 group-hover:text-slate-600'}`} />
    {!collapsed && <span className="text-sm truncate">{label}</span>}
    {collapsed && active && (
      <motion.div 
        layoutId="active-pill"
        className="absolute left-0 w-1 h-6 bg-primary rounded-r-full"
      />
    )}
  </button>
);

const DashboardView = ({ 
  onLogout, 
  primaryColor, 
  setPrimaryColor,
  addToast, 
  botName, 
  setBotName, 
  knowledgeSources, 
  onAddSource, 
  onDeleteSource, 
  onExportReport,
  onboardingData,
  user,
  setOnboardingData
}: { 
  onLogout: () => void, 
  primaryColor: string, 
  setPrimaryColor: (c: string) => void,
  addToast: (m: string, t?: 'success' | 'info') => void,
  botName: string,
  setBotName: (n: string) => void,
  knowledgeSources: any[],
  onAddSource: (n: string, t: string, s: string) => void,
  onDeleteSource: (id: number) => void,
  onExportReport: () => void,
  onboardingData: any,
  user: any,
  setOnboardingData: (d: any) => void
}) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'analytics' | 'settings'>('dashboard');
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return (
        <DashboardHome 
          addToast={addToast} 
          onboardingData={onboardingData} 
          botName={botName} 
          primaryColor={primaryColor} 
          onNavigateToSettings={() => setActiveTab('settings')}
        />
      );
      case 'analytics': return <AnalyticsView primaryColor={primaryColor} addToast={addToast} onExport={onExportReport} />;
      case 'settings': return (
        <SettingsView 
          botName={botName} 
          primaryColor={primaryColor}
          setPrimaryColor={setPrimaryColor}
          onboardingData={onboardingData}
          onSave={async (data) => {
            try {
              const response = await fetch('/api/onboarding', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...data, userId: user.id }),
              });
              if (response.ok) {
                setBotName(data.startupName);
                setOnboardingData({ ...onboardingData, ...data });
                addToast('Settings saved successfully!');
              }
            } catch (error) {
              addToast('Failed to save settings', 'info');
            }
          }}
          addToast={addToast} 
        />
      );
      default: return (
        <DashboardHome 
          addToast={addToast} 
          onboardingData={onboardingData} 
          botName={botName} 
          primaryColor={primaryColor} 
          onNavigateToSettings={() => setActiveTab('settings')}
        />
      );
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background-dark text-slate-100 relative">
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      {/* Side Navigation */}
      <aside className={`fixed lg:relative z-50 h-full bg-white border-r border-slate-200 flex flex-col transition-all duration-300 ease-in-out ${isSidebarCollapsed ? 'w-20' : 'w-64'} ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className={`p-6 flex items-center ${isSidebarCollapsed ? 'justify-center' : 'justify-between'}`}>
          {!isSidebarCollapsed && (
            <div className="flex items-center gap-2">
              <div className="size-8 bg-primary flex items-center justify-center rounded-lg shadow-lg shadow-primary/20">
                <Bolt className="text-white size-5 fill-current" />
              </div>
              <span className="text-lg font-black tracking-tighter text-slate-900 truncate max-w-[140px]">
                {onboardingData?.startup_name || onboardingData?.startupName || "Assistant"}
              </span>
            </div>
          )}
          {isSidebarCollapsed && (
            <div className="size-10 bg-primary flex items-center justify-center rounded-xl shadow-lg shadow-primary/20 overflow-hidden">
              <Bolt className="text-white size-6 fill-current" />
            </div>
          )}
          <button 
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="hidden lg:flex p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 transition-colors"
          >
            <motion.div animate={{ rotate: isSidebarCollapsed ? 180 : 0 }}>
              <ArrowLeft className="size-4" />
            </motion.div>
          </button>
        </div>
        
        <nav className="flex-1 px-4 space-y-2 mt-4 overflow-y-auto">
          <SidebarItem 
            icon={LayoutDashboard} 
            label={onboardingData?.startup_name || onboardingData?.startupName || "Dashboard"} 
            active={activeTab === 'dashboard'} 
            collapsed={isSidebarCollapsed}
            onClick={() => { setActiveTab('dashboard'); setIsMobileMenuOpen(false); }} 
          />
          <SidebarItem 
            icon={BarChart3} 
            label="Analytics" 
            active={activeTab === 'analytics'} 
            collapsed={isSidebarCollapsed}
            onClick={() => { setActiveTab('analytics'); setIsMobileMenuOpen(false); }} 
          />
          <SidebarItem 
            icon={Settings} 
            label="Settings" 
            active={activeTab === 'settings'} 
            collapsed={isSidebarCollapsed}
            onClick={() => { setActiveTab('settings'); setIsMobileMenuOpen(false); }} 
          />
        </nav>

        <div className="p-4 border-t border-slate-200 space-y-2">
          <button 
            onClick={onLogout}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-slate-500 hover:bg-red-50 hover:text-red-600 transition-all text-sm font-medium ${isSidebarCollapsed ? 'justify-center' : ''}`}
          >
            <LogOut className="size-4" />
            {!isSidebarCollapsed && <span>Log Out</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-background-dark flex flex-col">
        <header className="h-16 border-b border-primary/20 flex items-center justify-between px-4 lg:px-8 sticky top-0 bg-primary backdrop-blur-md z-30">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 text-white hover:bg-white/10 rounded-lg"
            >
              <LayoutDashboard className="size-6" />
            </button>
            <div className="flex items-center gap-3">
              <div className="size-8 bg-white/20 flex items-center justify-center rounded-lg">
                <Bolt className="text-white size-5 fill-current" />
              </div>
              <button 
                onClick={() => setActiveTab('dashboard')}
                className="text-sm font-bold text-white hover:text-white/80 transition-colors hidden sm:block"
              >
                {botName} Dashboard
              </button>
            </div>
          </div>
          <div className="flex items-center gap-2 lg:gap-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60 size-4" />
              <input 
                className="pl-9 pr-4 py-1.5 bg-white/10 border border-white/20 rounded-lg text-sm focus:ring-1 focus:ring-white/40 w-48 lg:w-64 outline-none text-white placeholder:text-white/40" 
                placeholder="Search..." 
                type="text"
              />
            </div>
            <div className="relative">
              <button 
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className={`p-2 transition-colors rounded-lg ${isNotificationsOpen ? 'bg-white/20 text-white' : 'text-white/80 hover:text-white hover:bg-white/10'}`}
              >
                <Bell className="size-5" />
              </button>
              <NotificationsPanel isOpen={isNotificationsOpen} onClose={() => setIsNotificationsOpen(false)} />
            </div>
            <button 
              onClick={() => setActiveTab('settings')}
              className={`p-2 transition-colors rounded-lg text-white/80 hover:text-white hover:bg-white/10 ${activeTab === 'settings' ? 'bg-white/20 text-white' : ''}`}
              title="Settings"
            >
              <Settings className="size-5" />
            </button>
            <div 
              onClick={() => setActiveTab('settings')}
              className={`size-8 rounded-full bg-white/20 border border-white/40 flex items-center justify-center text-[10px] font-bold text-white uppercase cursor-pointer transition-all ${activeTab === 'settings' ? 'ring-2 ring-white ring-offset-2 ring-offset-primary' : 'hover:bg-white/30'}`}
            >
              {user.name?.charAt(0) || 'A'}
            </div>
          </div>
        </header>

        <div className="p-4 lg:p-8 max-w-7xl mx-auto flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};



const AnalysisCard = ({ icon: Icon, title, desc, status, colorClass }: any) => (
  <div className="bg-card-dark border border-border-dark p-5 rounded-xl space-y-3">
    <div className={`size-10 rounded-lg flex items-center justify-center ${colorClass}`}>
      <Icon className="size-5" />
    </div>
    <h4 className="font-bold text-sm">{title}</h4>
    <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
    <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-500 uppercase">{status}</span>
  </div>
);

const SocialStatus = ({ icon: Icon, name, color }: any) => (
  <div className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors group">
    <div className="flex items-center gap-3">
      <div className={`size-8 rounded-full ${color} flex items-center justify-center text-white`}>
        <Icon className="size-4" />
      </div>
      <span className="text-sm font-medium">{name}</span>
    </div>
    <div className="flex items-center gap-2 text-emerald-500 text-xs font-bold">
      <CheckCircle2 className="size-4" />
      Connected
    </div>
  </div>
);

// --- Main App ---

export default function App() {
  const [view, setView] = useState<'landing' | 'login' | 'signup' | 'onboarding-step1' | 'onboarding-step2' | 'dashboard'>('landing');
  const [user, setUser] = useState<any>(null);
  const [primaryColor, setPrimaryColor] = useState('#0072bc');
  const [toasts, setToasts] = useState<{id: number, message: string, type: 'success' | 'info'}[]>([]);
  
  const [onboardingData, setOnboardingData] = useState<any>({});
  const [botName, setBotName] = useState("Assistant");
  const [botPersonality, setBotPersonality] = useState("Professional, helpful, and concise.");
  const [knowledgeSources, setKnowledgeSources] = useState([
    { id: 1, name: "Product_Documentation.pdf", type: "PDF", size: "2.4 MB", date: "2024-03-10" },
    { id: 2, name: "Pricing_Guide.docx", type: "DOCX", size: "1.1 MB", date: "2024-03-12" },
    { id: 3, name: "https://docs.nexus-ai.com", type: "URL", size: "-", date: "2024-03-15" },
  ]);

  const addToast = (message: string, type: 'success' | 'info' = 'success') => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3000);
  };

  const handleAuthSuccess = (userData: any) => {
    setUser(userData);
    if (userData.startup_name) {
      setBotName(userData.startup_name);
      setBotPersonality(userData.bot_personality);
      setPrimaryColor(userData.primary_color || '#0072bc');
      setOnboardingData(userData);
      setView('dashboard');
    } else {
      setView('onboarding-step1');
    }
  };

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'OAUTH_AUTH_SUCCESS') {
        handleAuthSuccess(event.data.user);
        addToast('Successfully authenticated with Google!');
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const handleOnboardingStep1 = (data: any) => {
    setOnboardingData({ ...onboardingData, ...data });
    setBotName(data.startupName);
    setPrimaryColor(data.primaryColor);
    setView('onboarding-step2');
  };

  const handleOnboardingComplete = async (data: any) => {
    const finalData = { ...onboardingData, ...data, userId: user.id };
    try {
      const response = await fetch('/api/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(finalData),
      });
      if (response.ok) {
        setOnboardingData(finalData);
        setView('dashboard');
        addToast('Onboarding complete! Welcome to Nile Assistant.');
      }
    } catch (error) {
      addToast('Failed to save onboarding data', 'info');
    }
  };

  const handleLogout = () => {
    setUser(null);
    setView('landing');
    setPrimaryColor('#0072bc');
    setBotName('Assistant');
    addToast('Logged out successfully');
  };

  const renderView = () => {
    switch (view) {
      case 'landing':
        return <LandingView onLogin={() => setView('login')} onSignup={() => setView('signup')} />;
      case 'login':
        return <AuthView mode="login" onSwitch={() => setView('signup')} onSuccess={handleAuthSuccess} addToast={addToast} onClose={() => setView('landing')} />;
      case 'signup':
        return <AuthView mode="signup" onSwitch={() => setView('login')} onSuccess={handleAuthSuccess} addToast={addToast} onClose={() => setView('landing')} />;
      case 'onboarding-step1':
        return (
          <div className="min-h-screen bg-background-dark flex flex-col items-center py-20 px-6">
            <OnboardingStep1 
              data={onboardingData} 
              onNext={handleOnboardingStep1} 
              onBack={() => setView('signup')}
              primaryColor={primaryColor} 
              setPrimaryColor={setPrimaryColor} 
            />
          </div>
        );
      case 'onboarding-step2':
        return (
          <div className="min-h-screen bg-background-dark flex flex-col items-center py-20 px-6">
            <OnboardingStep2 
              data={onboardingData} 
              onComplete={handleOnboardingComplete} 
              onBack={() => setView('onboarding-step1')}
              addToast={addToast} 
            />
          </div>
        );
      case 'dashboard':
        return (
          <DashboardView 
            onLogout={handleLogout} 
            primaryColor={primaryColor}
            setPrimaryColor={setPrimaryColor}
            addToast={addToast}
            botName={botName}
            setBotName={setBotName}
            knowledgeSources={knowledgeSources}
            onAddSource={(n, t, s) => {
              const newSource = { id: Date.now() + Math.random(), name: n, type: t, size: s, date: new Date().toISOString().split('T')[0] };
              setKnowledgeSources(prev => [newSource, ...prev]);
              addToast(`Uploaded ${n}`);
            }}
            onDeleteSource={(id) => {
              setKnowledgeSources(prev => prev.filter(s => s.id !== id));
              addToast('Source deleted');
            }}
            onExportReport={() => addToast('Exporting report...')}
            onboardingData={onboardingData}
            user={user}
            setOnboardingData={setOnboardingData}
          />
        );
    }
  };

  return (
    <div style={{ '--color-primary': primaryColor } as React.CSSProperties}>
      <ToastContainer toasts={toasts} />
      <AnimatePresence mode="wait">
        <motion.div
          key={view}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {renderView()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
