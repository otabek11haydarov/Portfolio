import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  profile as defaultProfile,
  aboutText as defaultAboutText,
  skills as defaultSkills,
  projects as defaultProjects,
  experience as defaultExperience,
  type Skill as BaseSkill,
  type Project as BaseProject,
  type Experience as BaseExperience,
} from '@/data/portfolio';

export interface Skill extends BaseSkill {
  id?: string;
}

export interface Project extends BaseProject {
  id?: string;
}

export interface Experience extends BaseExperience {
  id?: string;
}

export interface Profile {
  name: string;
  title: string;
  tagline: string;
  email: string;
  github: string;
  linkedin: string;
  location: string;
  resumeUrl?: string;
}

export interface PortfolioData {
  profile: Profile;
  aboutText: string;
  skills: Skill[];
  projects: Project[];
  experience: Experience[];
}

interface PortfolioContextType {
  data: PortfolioData;
  loading: boolean;
  saving: boolean;
  serverConnected: boolean;
  updateProfile: (profile: Partial<Profile>, aboutText?: string) => Promise<boolean>;
  addProject: (project: Omit<Project, 'id'>) => Promise<boolean>;
  updateProject: (id: string, project: Partial<Project>) => Promise<boolean>;
  deleteProject: (id: string) => Promise<boolean>;
  addSkill: (skill: Omit<Skill, 'id'>) => Promise<boolean>;
  updateSkill: (id: string, skill: Partial<Skill>) => Promise<boolean>;
  deleteSkill: (id: string) => Promise<boolean>;
  addExperience: (exp: Omit<Experience, 'id'>) => Promise<boolean>;
  updateExperience: (id: string, exp: Partial<Experience>) => Promise<boolean>;
  deleteExperience: (id: string) => Promise<boolean>;
  resetToDefaults: () => Promise<void>;
  reload: () => Promise<void>;
}

const STORAGE_KEY = 'portfolio_data_v3';
const LEGACY_STORAGE_KEYS = ['portfolio_custom_data_v1', 'portfolio_custom_data_v2'];

const sanitizeCachedData = (raw: any): PortfolioData | null => {
  if (!raw || typeof raw !== 'object') return null;

  // Detect and purge legacy template mock data (Northwind, Brightwave, Crestline, etc.)
  const hasMockExperience = Array.isArray(raw.experience) && raw.experience.some((exp: any) =>
    exp?.company?.toLowerCase().includes('northwind') ||
    exp?.company?.toLowerCase().includes('brightwave') ||
    exp?.company?.toLowerCase().includes('crestline') ||
    exp?.role?.toLowerCase().includes('senior data analyst')
  );

  if (hasMockExperience) {
    return null;
  }

  if (!raw.profile || !raw.skills || !raw.projects || !raw.experience) {
    return null;
  }

  return raw as PortfolioData;
};

const getInitialState = (): PortfolioData => {
  // Clear any legacy keys with old mock data
  try {
    LEGACY_STORAGE_KEYS.forEach((key) => localStorage.removeItem(key));
  } catch {
    // Ignore storage errors in restricted contexts
  }

  // 1. Try local storage cache
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      const sanitized = sanitizeCachedData(parsed);
      if (sanitized) {
        return sanitized;
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  } catch (e) {
    console.warn('Could not read from localStorage', e);
  }

  // 2. Default to static data
  return {
    profile: defaultProfile,
    aboutText: defaultAboutText,
    skills: defaultSkills.map((s, idx) => ({ ...s, id: `skill-${idx}` })),
    projects: defaultProjects.map((p, idx) => ({ ...p, id: `proj-${idx}` })),
    experience: defaultExperience.map((e, idx) => ({ ...e, id: `exp-${idx}` })),
  };
};

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<PortfolioData>(getInitialState);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [serverConnected, setServerConnected] = useState(false);

  // Sync to localStorage whenever data changes
  const persistLocally = (updated: PortfolioData) => {
    setData(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.warn('Failed to save to localStorage', e);
    }
  };

  const fetchFromApi = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/portfolio');
      if (res.ok) {
        const apiData = await res.json();
        // Ensure arrays and objects exist and don't contain stale mock companies
        const experienceData = (Array.isArray(apiData.experience) && !apiData.experience.some((e: any) => e?.company?.toLowerCase().includes('northwind')))
          ? apiData.experience
          : defaultExperience.map((e, idx) => ({ ...e, id: `exp-${idx}` }));

        const formatted: PortfolioData = {
          profile: apiData.profile || defaultProfile,
          aboutText: apiData.aboutText || defaultAboutText,
          skills: apiData.skills || [],
          projects: apiData.projects || [],
          experience: experienceData,
        };
        persistLocally(formatted);
        setServerConnected(true);
      } else {
        setServerConnected(false);
      }
    } catch {
      setServerConnected(false);
    } finally {
      setLoading(false);
    }
  };

  const getAuthHeaders = (): Record<string, string> => {
    const token = localStorage.getItem('portfolio_admin_token') || sessionStorage.getItem('portfolio_admin_token');
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
  };

  useEffect(() => {
    fetchFromApi();
  }, []);

  // Update Profile & About Text
  const updateProfile = async (profileUpdates: Partial<Profile>, aboutTextUpdate?: string) => {
    setSaving(true);
    const updated: PortfolioData = {
      ...data,
      profile: { ...data.profile, ...profileUpdates },
      aboutText: aboutTextUpdate !== undefined ? aboutTextUpdate : data.aboutText,
    };
    persistLocally(updated);

    try {
      if (serverConnected) {
        await fetch('/api/portfolio/profile', {
          method: 'PUT',
          headers: getAuthHeaders(),
          body: JSON.stringify({ profile: profileUpdates, aboutText: aboutTextUpdate }),
        });
      }
    } catch (e) {
      console.warn('Server sync failed:', e);
    } finally {
      setSaving(false);
    }
    return true;
  };

  // --- Project CRUD ---
  const addProject = async (newProj: Omit<Project, 'id'>) => {
    setSaving(true);
    const id = 'proj-' + Date.now();
    const projectWithId: Project = { ...newProj, id };
    const updatedProjects = [projectWithId, ...data.projects];
    persistLocally({ ...data, projects: updatedProjects });

    try {
      if (serverConnected) {
        await fetch('/api/portfolio/projects', {
          method: 'POST',
          headers: getAuthHeaders(),
          body: JSON.stringify(newProj),
        });
      }
    } catch (e) {
      console.warn('Server sync failed:', e);
    } finally {
      setSaving(false);
    }
    return true;
  };

  const updateProject = async (id: string, updates: Partial<Project>) => {
    setSaving(true);
    const updatedProjects = data.projects.map((p) => (p.id === id ? { ...p, ...updates } : p));
    persistLocally({ ...data, projects: updatedProjects });

    try {
      if (serverConnected) {
        await fetch(`/api/portfolio/projects/${id}`, {
          method: 'PUT',
          headers: getAuthHeaders(),
          body: JSON.stringify(updates),
        });
      }
    } catch (e) {
      console.warn('Server sync failed:', e);
    } finally {
      setSaving(false);
    }
    return true;
  };

  const deleteProject = async (id: string) => {
    setSaving(true);
    const updatedProjects = data.projects.filter((p) => p.id !== id);
    persistLocally({ ...data, projects: updatedProjects });

    try {
      if (serverConnected) {
        await fetch(`/api/portfolio/projects/${id}`, {
          method: 'DELETE',
          headers: getAuthHeaders(),
        });
      }
    } catch (e) {
      console.warn('Server sync failed:', e);
    } finally {
      setSaving(false);
    }
    return true;
  };

  // --- Skills CRUD ---
  const addSkill = async (newSkill: Omit<Skill, 'id'>) => {
    setSaving(true);
    const id = 'skill-' + Date.now();
    const skillWithId: Skill = { ...newSkill, id };
    const updatedSkills = [...data.skills, skillWithId];
    persistLocally({ ...data, skills: updatedSkills });

    try {
      if (serverConnected) {
        await fetch('/api/portfolio/skills', {
          method: 'POST',
          headers: getAuthHeaders(),
          body: JSON.stringify(newSkill),
        });
      }
    } catch (e) {
      console.warn('Server sync failed:', e);
    } finally {
      setSaving(false);
    }
    return true;
  };

  const updateSkill = async (id: string, updates: Partial<Skill>) => {
    setSaving(true);
    const updatedSkills = data.skills.map((s) => (s.id === id ? { ...s, ...updates } : s));
    persistLocally({ ...data, skills: updatedSkills });

    try {
      if (serverConnected) {
        await fetch(`/api/portfolio/skills/${id}`, {
          method: 'PUT',
          headers: getAuthHeaders(),
          body: JSON.stringify(updates),
        });
      }
    } catch (e) {
      console.warn('Server sync failed:', e);
    } finally {
      setSaving(false);
    }
    return true;
  };

  const deleteSkill = async (id: string) => {
    setSaving(true);
    const updatedSkills = data.skills.filter((s) => s.id !== id);
    persistLocally({ ...data, skills: updatedSkills });

    try {
      if (serverConnected) {
        await fetch(`/api/portfolio/skills/${id}`, {
          method: 'DELETE',
          headers: getAuthHeaders(),
        });
      }
    } catch (e) {
      console.warn('Server sync failed:', e);
    } finally {
      setSaving(false);
    }
    return true;
  };

  // --- Experience CRUD ---
  const addExperience = async (newExp: Omit<Experience, 'id'>) => {
    setSaving(true);
    const id = 'exp-' + Date.now();
    const expWithId: Experience = { ...newExp, id };
    const updatedExp = [expWithId, ...data.experience];
    persistLocally({ ...data, experience: updatedExp });

    try {
      if (serverConnected) {
        await fetch('/api/portfolio/experience', {
          method: 'POST',
          headers: getAuthHeaders(),
          body: JSON.stringify(newExp),
        });
      }
    } catch (e) {
      console.warn('Server sync failed:', e);
    } finally {
      setSaving(false);
    }
    return true;
  };

  const updateExperience = async (id: string, updates: Partial<Experience>) => {
    setSaving(true);
    const updatedExp = data.experience.map((e) => (e.id === id ? { ...e, ...updates } : e));
    persistLocally({ ...data, experience: updatedExp });

    try {
      if (serverConnected) {
        await fetch(`/api/portfolio/experience/${id}`, {
          method: 'PUT',
          headers: getAuthHeaders(),
          body: JSON.stringify(updates),
        });
      }
    } catch (e) {
      console.warn('Server sync failed:', e);
    } finally {
      setSaving(false);
    }
    return true;
  };

  const deleteExperience = async (id: string) => {
    setSaving(true);
    const updatedExp = data.experience.filter((e) => e.id !== id);
    persistLocally({ ...data, experience: updatedExp });

    try {
      if (serverConnected) {
        await fetch(`/api/portfolio/experience/${id}`, {
          method: 'DELETE',
          headers: getAuthHeaders(),
        });
      }
    } catch (e) {
      console.warn('Server sync failed:', e);
    } finally {
      setSaving(false);
    }
    return true;
  };

  const resetToDefaults = async () => {
    const defaultData: PortfolioData = {
      profile: defaultProfile,
      aboutText: defaultAboutText,
      skills: defaultSkills.map((s, idx) => ({ ...s, id: `skill-${idx}` })),
      projects: defaultProjects.map((p, idx) => ({ ...p, id: `proj-${idx}` })),
      experience: defaultExperience.map((e, idx) => ({ ...e, id: `exp-${idx}` })),
    };
    persistLocally(defaultData);

    try {
      if (serverConnected) {
        await fetch('/api/portfolio/sync', {
          method: 'POST',
          headers: getAuthHeaders(),
          body: JSON.stringify(defaultData),
        });
      }
    } catch (e) {
      console.warn('Reset sync failed:', e);
    }
  };

  return (
    <PortfolioContext.Provider
      value={{
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
        reload: fetchFromApi,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
