import React, { useState } from 'react';
import {
  Lock,
  LogOut,
  FolderPlus,
  Edit2,
  Trash2,
  Save,
  RotateCcw,
  ExternalLink,
  Plus,
  Key,
  CheckCircle2,
  AlertCircle,
  Eye,
  Layers,
  Wrench,
  User,
  Briefcase,
  X,
} from 'lucide-react';
import { usePortfolio, type Project, type Skill, type Experience } from '@/context/PortfolioContext';

interface AdminDashboardProps {
  onClose: () => void;
}

export default function AdminDashboard({ onClose }: AdminDashboardProps) {
  const {
    data,
    loading,
    saving,
    serverConnected,
    updateProfile,
    addProject,
    updateProject,
    deleteProject,
    addSkill,
    updateSkill,
    deleteSkill,
    addExperience,
    updateExperience,
    deleteExperience,
    resetToDefaults,
  } = usePortfolio();

  // Auth State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('portfolio_admin_token') !== null;
  });
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState<'projects' | 'skills' | 'profile' | 'experience'>('projects');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Profile Form State
  const [profileForm, setProfileForm] = useState(data.profile);
  const [aboutForm, setAboutForm] = useState(data.aboutText);

  // Project Modal / Edit State
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [projectForm, setProjectForm] = useState({
    title: '',
    description: '',
    tags: '',
    link: '',
    repo: '',
    emoji: '🚀',
  });

  // Skill Modal / Edit State
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [isSkillModalOpen, setIsSkillModalOpen] = useState(false);
  const [skillForm, setSkillForm] = useState<{
    name: string;
    level: number;
    category: Skill['category'];
  }>({
    name: '',
    level: 80,
    category: 'Languages',
  });

  // Experience Modal / Edit State
  const [editingExp, setEditingExp] = useState<Experience | null>(null);
  const [isExpModalOpen, setIsExpModalOpen] = useState(false);
  const [expForm, setExpForm] = useState({
    role: '',
    company: '',
    period: '',
    description: '',
  });

  // Change Password State
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordChangeStatus, setPasswordChangeStatus] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');

    try {
      if (serverConnected) {
        const res = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ password }),
        });
        const resData = await res.json();
        if (res.ok && resData.success) {
          localStorage.setItem('portfolio_admin_token', resData.token);
          setIsAuthenticated(true);
          return;
        }
      }

      // Offline / fallback password check (default: admin123)
      if (password === 'admin123' || password === localStorage.getItem('portfolio_admin_pass')) {
        localStorage.setItem('portfolio_admin_token', 'offline_auth');
        setIsAuthenticated(true);
      } else {
        setAuthError('Incorrect password. (Default is admin123)');
      }
    } catch {
      if (password === 'admin123') {
        localStorage.setItem('portfolio_admin_token', 'offline_auth');
        setIsAuthenticated(true);
      } else {
        setAuthError('Login failed. Please verify password.');
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('portfolio_admin_token');
    setIsAuthenticated(false);
  };

  // --- Profile Submit ---
  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateProfile(profileForm, aboutForm);
    showToast('Profile and About info saved successfully!');
  };

  // --- Project Handlers ---
  const openNewProjectModal = () => {
    setEditingProject(null);
    setProjectForm({
      title: '',
      description: '',
      tags: '',
      link: '#',
      repo: '#',
      emoji: '💡',
    });
    setIsProjectModalOpen(true);
  };

  const openEditProjectModal = (proj: Project) => {
    setEditingProject(proj);
    setProjectForm({
      title: proj.title,
      description: proj.description,
      tags: proj.tags.join(', '),
      link: proj.link,
      repo: proj.repo,
      emoji: proj.emoji || '🚀',
    });
    setIsProjectModalOpen(true);
  };

  const handleProjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const tagList = projectForm.tags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    if (editingProject && editingProject.id) {
      await updateProject(editingProject.id, {
        title: projectForm.title,
        description: projectForm.description,
        tags: tagList,
        link: projectForm.link || '#',
        repo: projectForm.repo || '#',
        emoji: projectForm.emoji,
      });
      showToast(`Updated "${projectForm.title}"`);
    } else {
      await addProject({
        title: projectForm.title,
        description: projectForm.description,
        tags: tagList,
        link: projectForm.link || '#',
        repo: projectForm.repo || '#',
        emoji: projectForm.emoji,
      });
      showToast(`Added "${projectForm.title}"`);
    }
    setIsProjectModalOpen(false);
  };

  const handleDeleteProject = async (proj: Project) => {
    if (window.confirm(`Are you sure you want to delete "${proj.title}"?`)) {
      if (proj.id) {
        await deleteProject(proj.id);
        showToast(`Deleted "${proj.title}"`);
      }
    }
  };

  // --- Skill Handlers ---
  const openNewSkillModal = () => {
    setEditingSkill(null);
    setSkillForm({
      name: '',
      level: 80,
      category: 'Languages',
    });
    setIsSkillModalOpen(true);
  };

  const openEditSkillModal = (skill: Skill) => {
    setEditingSkill(skill);
    setSkillForm({
      name: skill.name,
      level: skill.level,
      category: skill.category,
    });
    setIsSkillModalOpen(true);
  };

  const handleSkillSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingSkill && editingSkill.id) {
      await updateSkill(editingSkill.id, skillForm);
      showToast(`Updated skill "${skillForm.name}"`);
    } else {
      await addSkill(skillForm);
      showToast(`Added skill "${skillForm.name}"`);
    }
    setIsSkillModalOpen(false);
  };

  const handleDeleteSkill = async (skill: Skill) => {
    if (window.confirm(`Delete skill "${skill.name}"?`)) {
      if (skill.id) {
        await deleteSkill(skill.id);
        showToast(`Deleted skill "${skill.name}"`);
      }
    }
  };

  // --- Experience Handlers ---
  const openNewExpModal = () => {
    setEditingExp(null);
    setExpForm({
      role: '',
      company: '',
      period: '',
      description: '',
    });
    setIsExpModalOpen(true);
  };

  const openEditExpModal = (exp: Experience) => {
    setEditingExp(exp);
    setExpForm({
      role: exp.role,
      company: exp.company,
      period: exp.period,
      description: exp.description,
    });
    setIsExpModalOpen(true);
  };

  const handleExpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingExp && editingExp.id) {
      await updateExperience(editingExp.id, expForm);
      showToast(`Updated role at "${expForm.company}"`);
    } else {
      await addExperience(expForm);
      showToast(`Added role at "${expForm.company}"`);
    }
    setIsExpModalOpen(false);
  };

  const handleDeleteExp = async (exp: Experience) => {
    if (window.confirm(`Delete experience at "${exp.company}"?`)) {
      if (exp.id) {
        await deleteExperience(exp.id);
        showToast(`Deleted experience at "${exp.company}"`);
      }
    }
  };

  // --- Password Change ---
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordChangeStatus(null);
    try {
      if (serverConnected) {
        const res = await fetch('/api/auth/change-password', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ oldPassword, newPassword }),
        });
        const d = await res.json();
        if (res.ok) {
          showToast('Password changed successfully on server!');
          setIsPasswordModalOpen(false);
          setOldPassword('');
          setNewPassword('');
          return;
        } else {
          setPasswordChangeStatus(d.error || 'Failed to update password');
          return;
        }
      }

      // Offline
      localStorage.setItem('portfolio_admin_pass', newPassword);
      showToast('Password changed successfully in browser!');
      setIsPasswordModalOpen(false);
      setOldPassword('');
      setNewPassword('');
    } catch (e: any) {
      setPasswordChangeStatus('Error changing password: ' + e.message);
    }
  };

  // 1. RENDER LOGIN SCREEN IF NOT AUTHENTICATED
  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#070b14]/95 backdrop-blur-xl p-4">
        <div className="w-full max-w-md p-8 rounded-3xl bg-[#0f172a] border border-white/10 shadow-2xl relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-slate-400 hover:text-white transition-colors"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="w-14 h-14 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 mx-auto mb-6">
            <Lock className="w-7 h-7" />
          </div>

          <h2 className="text-2xl font-display font-bold text-center text-white mb-2">
            Admin Access
          </h2>
          <p className="text-sm text-slate-400 text-center mb-6">
            Enter your admin password to manage portfolio contents.
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-400 tracking-wider mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password (default: admin123)"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 transition-colors"
                autoFocus
              />
            </div>

            {authError && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-sky-500 to-teal-400 text-white font-semibold hover:opacity-95 transition-opacity"
            >
              Sign In to Admin
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-slate-500">
            Default credentials: <code className="text-sky-400">admin123</code>
          </p>
        </div>
      </div>
    );
  }

  // 2. RENDER FULL ADMIN DASHBOARD
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#070b14] text-slate-200">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 shadow-xl backdrop-blur-md animate-in fade-in slide-in-from-top-4">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Top Bar */}
      <header className="sticky top-0 z-40 bg-[#0a0f1a]/90 backdrop-blur-md border-b border-white/10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-teal-400 flex items-center justify-center text-white font-bold text-lg">
              OH
            </div>
            <div>
              <h1 className="font-display font-bold text-lg text-white">Portfolio Admin Panel</h1>
              <div className="flex items-center gap-2 text-xs">
                <span
                  className={`w-2 h-2 rounded-full ${
                    serverConnected ? 'bg-emerald-400' : 'bg-amber-400'
                  }`}
                />
                <span className="text-slate-400">
                  {serverConnected
                    ? 'Backend Server Connected (Express :5000)'
                    : 'Local Offline Mode (Synced to Browser)'}
                </span>
                {saving && <span className="text-sky-400 animate-pulse ml-2">Saving...</span>}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsPasswordModalOpen(true)}
              className="px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-300 hover:text-white hover:border-white/20 transition-all flex items-center gap-1.5"
            >
              <Key className="w-3.5 h-3.5" /> Password
            </button>
            <button
              onClick={() => {
                if (window.confirm('Reset all portfolio data back to defaults?')) {
                  resetToDefaults();
                  showToast('Reset to original defaults!');
                }
              }}
              className="px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-400 hover:text-red-400 hover:border-red-500/30 transition-all flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-semibold hover:bg-sky-500/20 transition-all flex items-center gap-1.5"
            >
              <Eye className="w-3.5 h-3.5" /> View Portfolio
            </button>
            <button
              onClick={handleLogout}
              className="p-2 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white transition-colors"
              title="Log Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Navigation Tabs */}
        <div className="flex border-b border-white/10 gap-2 mb-8 overflow-x-auto">
          <button
            onClick={() => setActiveTab('projects')}
            className={`flex items-center gap-2 px-5 py-3 border-b-2 font-medium text-sm transition-all whitespace-nowrap ${
              activeTab === 'projects'
                ? 'border-sky-400 text-sky-400 bg-white/[0.02]'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-4 h-4" /> Projects ({data.projects.length})
          </button>
          <button
            onClick={() => setActiveTab('skills')}
            className={`flex items-center gap-2 px-5 py-3 border-b-2 font-medium text-sm transition-all whitespace-nowrap ${
              activeTab === 'skills'
                ? 'border-sky-400 text-sky-400 bg-white/[0.02]'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Wrench className="w-4 h-4" /> Skills ({data.skills.length})
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex items-center gap-2 px-5 py-3 border-b-2 font-medium text-sm transition-all whitespace-nowrap ${
              activeTab === 'profile'
                ? 'border-sky-400 text-sky-400 bg-white/[0.02]'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <User className="w-4 h-4" /> Profile & About
          </button>
          <button
            onClick={() => setActiveTab('experience')}
            className={`flex items-center gap-2 px-5 py-3 border-b-2 font-medium text-sm transition-all whitespace-nowrap ${
              activeTab === 'experience'
                ? 'border-sky-400 text-sky-400 bg-white/[0.02]'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Briefcase className="w-4 h-4" /> Experience ({data.experience.length})
          </button>
        </div>

        {/* --- TAB 1: PROJECTS --- */}
        {activeTab === 'projects' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-display font-bold text-white">Manage Projects</h2>
                <p className="text-sm text-slate-400">
                  Add new portfolio projects, update descriptions, tags, and links.
                </p>
              </div>
              <button
                onClick={openNewProjectModal}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-teal-400 text-white font-medium text-sm flex items-center gap-2 hover:opacity-95 transition-opacity"
              >
                <Plus className="w-4 h-4" /> Add Project
              </button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.projects.map((proj) => (
                <div
                  key={proj.id || proj.title}
                  className="rounded-2xl bg-[#0f172a] border border-white/10 p-6 flex flex-col justify-between hover:border-white/20 transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-3xl">{proj.emoji || '🚀'}</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openEditProjectModal(proj)}
                          className="p-2 rounded-lg bg-white/5 hover:bg-sky-500/20 text-slate-300 hover:text-sky-400 transition-colors"
                          title="Edit"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteProject(proj)}
                          className="p-2 rounded-lg bg-white/5 hover:bg-red-500/20 text-slate-300 hover:text-red-400 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <h3 className="font-display font-semibold text-lg text-white mb-2">
                      {proj.title}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-3 mb-4 leading-relaxed">
                      {proj.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {proj.tags.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[11px] text-slate-300"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
                    <span className="truncate max-w-[120px]">{proj.link}</span>
                    <span className="truncate max-w-[120px]">{proj.repo}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- TAB 2: SKILLS --- */}
        {activeTab === 'skills' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-display font-bold text-white">Manage Skills</h2>
                <p className="text-sm text-slate-400">
                  Update proficiency levels, add new technologies, or categorize skills.
                </p>
              </div>
              <button
                onClick={openNewSkillModal}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-teal-400 text-white font-medium text-sm flex items-center gap-2 hover:opacity-95 transition-opacity"
              >
                <Plus className="w-4 h-4" /> Add Skill
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {(['Languages', 'Data & Analytics', 'Frameworks', 'Tools'] as const).map(
                (category) => {
                  const catSkills = data.skills.filter((s) => s.category === category);
                  return (
                    <div
                      key={category}
                      className="rounded-2xl bg-[#0f172a] border border-white/10 p-6"
                    >
                      <h3 className="font-display font-semibold text-sky-400 text-base mb-4 flex items-center justify-between">
                        <span>{category}</span>
                        <span className="text-xs font-normal text-slate-400">
                          {catSkills.length} skills
                        </span>
                      </h3>

                      <div className="space-y-4">
                        {catSkills.map((s) => (
                          <div
                            key={s.id || s.name}
                            className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between gap-4"
                          >
                            <div className="flex-1">
                              <div className="flex justify-between text-sm mb-1">
                                <span className="font-medium text-slate-200">{s.name}</span>
                                <span className="text-xs text-slate-400">{s.level}%</span>
                              </div>
                              <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                                <div
                                  className="h-full rounded-full bg-gradient-to-r from-sky-500 to-teal-400"
                                  style={{ width: `${s.level}%` }}
                                />
                              </div>
                            </div>

                            <div className="flex items-center gap-1.5 shrink-0">
                              <button
                                onClick={() => openEditSkillModal(s)}
                                className="p-1.5 rounded-lg bg-white/5 hover:bg-sky-500/20 text-slate-300 hover:text-sky-400 transition-colors"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDeleteSkill(s)}
                                className="p-1.5 rounded-lg bg-white/5 hover:bg-red-500/20 text-slate-300 hover:text-red-400 transition-colors"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </div>
        )}

        {/* --- TAB 3: PROFILE & ABOUT --- */}
        {activeTab === 'profile' && (
          <div className="max-w-3xl">
            <h2 className="text-xl font-display font-bold text-white mb-2">
              Profile & Personal Info
            </h2>
            <p className="text-sm text-slate-400 mb-8">
              Update your name, headline, contact email, social links, and the About Me bio.
            </p>

            <form onSubmit={handleProfileSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-slate-400 font-semibold mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={profileForm.name}
                    onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-sky-500"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-slate-400 font-semibold mb-2">
                    Professional Title
                  </label>
                  <input
                    type="text"
                    value={profileForm.title}
                    onChange={(e) => setProfileForm({ ...profileForm, title: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-400 font-semibold mb-2">
                  Hero Tagline / Subtitle
                </label>
                <input
                  type="text"
                  value={profileForm.tagline}
                  onChange={(e) => setProfileForm({ ...profileForm, tagline: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-sky-500"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-slate-400 font-semibold mb-2">
                    Contact Email
                  </label>
                  <input
                    type="email"
                    value={profileForm.email}
                    onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-sky-500"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-slate-400 font-semibold mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    value={profileForm.location}
                    onChange={(e) => setProfileForm({ ...profileForm, location: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-slate-400 font-semibold mb-2">
                    GitHub URL
                  </label>
                  <input
                    type="url"
                    value={profileForm.github}
                    onChange={(e) => setProfileForm({ ...profileForm, github: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-sky-500"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-slate-400 font-semibold mb-2">
                    LinkedIn URL
                  </label>
                  <input
                    type="url"
                    value={profileForm.linkedin}
                    onChange={(e) => setProfileForm({ ...profileForm, linkedin: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-400 font-semibold mb-2">
                  CV / Resume URL (File path or Google Drive link)
                </label>
                <input
                  type="text"
                  value={profileForm.resumeUrl || ''}
                  onChange={(e) => setProfileForm({ ...profileForm, resumeUrl: e.target.value })}
                  placeholder="/resume.pdf or https://drive.google.com/..."
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-400 font-semibold mb-2">
                  About Me Description
                </label>
                <textarea
                  rows={5}
                  value={aboutForm}
                  onChange={(e) => setAboutForm(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-sky-500 leading-relaxed text-sm"
                />
              </div>

              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-teal-400 text-white font-semibold flex items-center gap-2 hover:opacity-95 transition-opacity"
              >
                <Save className="w-4 h-4" /> Save Profile & Bio
              </button>
            </form>
          </div>
        )}

        {/* --- TAB 4: EXPERIENCE --- */}
        {activeTab === 'experience' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-display font-bold text-white">Work Experience</h2>
                <p className="text-sm text-slate-400">
                  Manage career timeline, past roles, and engineering milestones.
                </p>
              </div>
              <button
                onClick={openNewExpModal}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-teal-400 text-white font-medium text-sm flex items-center gap-2 hover:opacity-95 transition-opacity"
              >
                <Plus className="w-4 h-4" /> Add Experience
              </button>
            </div>

            <div className="space-y-4">
              {data.experience.map((exp) => (
                <div
                  key={exp.id || exp.company}
                  className="rounded-2xl bg-[#0f172a] border border-white/10 p-6 flex items-start justify-between gap-4"
                >
                  <div>
                    <h3 className="font-display font-semibold text-lg text-white">
                      {exp.role} <span className="text-sky-400">@ {exp.company}</span>
                    </h3>
                    <p className="text-xs text-slate-400 mb-3">{exp.period}</p>
                    <p className="text-sm text-slate-300 leading-relaxed">{exp.description}</p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => openEditExpModal(exp)}
                      className="p-2 rounded-lg bg-white/5 hover:bg-sky-500/20 text-slate-300 hover:text-sky-400 transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteExp(exp)}
                      className="p-2 rounded-lg bg-white/5 hover:bg-red-500/20 text-slate-300 hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* --- MODAL: ADD / EDIT PROJECT --- */}
      {isProjectModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg rounded-3xl bg-[#0f172a] border border-white/10 p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsProjectModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-display font-bold text-white mb-4">
              {editingProject ? 'Edit Project' : 'New Project'}
            </h3>

            <form onSubmit={handleProjectSubmit} className="space-y-4">
              <div className="grid grid-cols-4 gap-4">
                <div className="col-span-1">
                  <label className="block text-xs uppercase text-slate-400 font-semibold mb-1">
                    Emoji / Icon
                  </label>
                  <input
                    type="text"
                    value={projectForm.emoji}
                    onChange={(e) => setProjectForm({ ...projectForm, emoji: e.target.value })}
                    className="w-full text-center text-xl px-2 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white"
                  />
                </div>
                <div className="col-span-3">
                  <label className="block text-xs uppercase text-slate-400 font-semibold mb-1">
                    Project Title
                  </label>
                  <input
                    type="text"
                    required
                    value={projectForm.title}
                    onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-sky-500"
                    placeholder="e.g. Sales Forecast Dashboard"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase text-slate-400 font-semibold mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  required
                  value={projectForm.description}
                  onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-sky-500 text-sm"
                  placeholder="Explain what the project does and key metrics..."
                />
              </div>

              <div>
                <label className="block text-xs uppercase text-slate-400 font-semibold mb-1">
                  Tech Tags (Comma separated)
                </label>
                <input
                  type="text"
                  value={projectForm.tags}
                  onChange={(e) => setProjectForm({ ...projectForm, tags: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-sky-500 text-sm"
                  placeholder="Python, React, PostgreSQL, Tailwind"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase text-slate-400 font-semibold mb-1">
                    Live Demo Link
                  </label>
                  <input
                    type="text"
                    value={projectForm.link}
                    onChange={(e) => setProjectForm({ ...projectForm, link: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-sky-500 text-sm"
                    placeholder="https://... or #"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase text-slate-400 font-semibold mb-1">
                    GitHub Repo Link
                  </label>
                  <input
                    type="text"
                    value={projectForm.repo}
                    onChange={(e) => setProjectForm({ ...projectForm, repo: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-sky-500 text-sm"
                    placeholder="https://github.com/... or #"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsProjectModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white/5 text-slate-300 text-sm hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-sky-500 to-teal-400 text-white font-medium text-sm"
                >
                  {editingProject ? 'Save Changes' : 'Create Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- MODAL: ADD / EDIT SKILL --- */}
      {isSkillModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-3xl bg-[#0f172a] border border-white/10 p-6 shadow-2xl relative">
            <button
              onClick={() => setIsSkillModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-display font-bold text-white mb-4">
              {editingSkill ? 'Edit Skill' : 'New Skill'}
            </h3>

            <form onSubmit={handleSkillSubmit} className="space-y-4">
              <div>
                <label className="block text-xs uppercase text-slate-400 font-semibold mb-1">
                  Skill Name
                </label>
                <input
                  type="text"
                  required
                  value={skillForm.name}
                  onChange={(e) => setSkillForm({ ...skillForm, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-sky-500"
                  placeholder="e.g. Docker, Python, BigQuery"
                />
              </div>

              <div>
                <label className="block text-xs uppercase text-slate-400 font-semibold mb-1">
                  Category
                </label>
                <select
                  value={skillForm.category}
                  onChange={(e) =>
                    setSkillForm({ ...skillForm, category: e.target.value as Skill['category'] })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-[#1e293b] border border-white/10 text-white focus:outline-none focus:border-sky-500 text-sm"
                >
                  <option value="Languages">Languages</option>
                  <option value="Data & Analytics">Data & Analytics</option>
                  <option value="Frameworks">Frameworks</option>
                  <option value="Tools">Tools</option>
                </select>
              </div>

              <div>
                <div className="flex justify-between text-xs uppercase text-slate-400 font-semibold mb-1">
                  <span>Proficiency Level</span>
                  <span className="text-sky-400">{skillForm.level}%</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="100"
                  step="5"
                  value={skillForm.level}
                  onChange={(e) => setSkillForm({ ...skillForm, level: Number(e.target.value) })}
                  className="w-full accent-sky-400"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsSkillModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white/5 text-slate-300 text-sm hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-sky-500 to-teal-400 text-white font-medium text-sm"
                >
                  {editingSkill ? 'Save Skill' : 'Add Skill'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- MODAL: ADD / EDIT EXPERIENCE --- */}
      {isExpModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg rounded-3xl bg-[#0f172a] border border-white/10 p-6 shadow-2xl relative">
            <button
              onClick={() => setIsExpModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-display font-bold text-white mb-4">
              {editingExp ? 'Edit Experience' : 'New Experience'}
            </h3>

            <form onSubmit={handleExpSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase text-slate-400 font-semibold mb-1">
                    Job Role
                  </label>
                  <input
                    type="text"
                    required
                    value={expForm.role}
                    onChange={(e) => setExpForm({ ...expForm, role: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-sky-500 text-sm"
                    placeholder="e.g. Data Analyst"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase text-slate-400 font-semibold mb-1">
                    Company
                  </label>
                  <input
                    type="text"
                    required
                    value={expForm.company}
                    onChange={(e) => setExpForm({ ...expForm, company: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-sky-500 text-sm"
                    placeholder="e.g. Tech Corp"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase text-slate-400 font-semibold mb-1">
                  Time Period
                </label>
                <input
                  type="text"
                  required
                  value={expForm.period}
                  onChange={(e) => setExpForm({ ...expForm, period: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-sky-500 text-sm"
                  placeholder="e.g. 2023 — Present"
                />
              </div>

              <div>
                <label className="block text-xs uppercase text-slate-400 font-semibold mb-1">
                  Description / Responsibilities
                </label>
                <textarea
                  rows={3}
                  required
                  value={expForm.description}
                  onChange={(e) => setExpForm({ ...expForm, description: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-sky-500 text-sm"
                  placeholder="Key accomplishments and duties..."
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsExpModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white/5 text-slate-300 text-sm hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-sky-500 to-teal-400 text-white font-medium text-sm"
                >
                  {editingExp ? 'Save Changes' : 'Add Experience'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- MODAL: CHANGE PASSWORD --- */}
      {isPasswordModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-3xl bg-[#0f172a] border border-white/10 p-6 shadow-2xl relative">
            <button
              onClick={() => setIsPasswordModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-display font-bold text-white mb-4">
              Change Admin Password
            </h3>

            <form onSubmit={handleChangePassword} className="space-y-4">
              <div>
                <label className="block text-xs uppercase text-slate-400 font-semibold mb-1">
                  Current Password
                </label>
                <input
                  type="password"
                  required
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white"
                  placeholder="Current password (default: admin123)"
                />
              </div>

              <div>
                <label className="block text-xs uppercase text-slate-400 font-semibold mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white"
                  placeholder="Enter new password (min 4 chars)"
                />
              </div>

              {passwordChangeStatus && (
                <p className="text-xs text-red-400">{passwordChangeStatus}</p>
              )}

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsPasswordModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white/5 text-slate-300 text-sm hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-sky-500 to-teal-400 text-white font-medium text-sm"
                >
                  Update Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
