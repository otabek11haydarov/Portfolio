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
}

const defaultPortfolioData: PortfolioData = {
  profile: defaultProfile,
  aboutText: defaultAboutText,
  skills: defaultSkills,
  projects: defaultProjects,
  experience: defaultExperience,
};

const PortfolioContext = createContext<PortfolioContextType>({
  data: defaultPortfolioData,
  loading: false,
});

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<PortfolioData>(defaultPortfolioData);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    // If a private remote API URL is specified in .env, optionally fetch fresh data
    const remoteApiUrl = import.meta.env.VITE_API_URL;
    if (!remoteApiUrl) return;

    let isMounted = true;
    setLoading(true);

    fetch(`${remoteApiUrl.replace(/\/$/, '')}/api/portfolio`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch remote portfolio data');
        return res.json();
      })
      .then((remoteData) => {
        if (isMounted && remoteData && remoteData.profile) {
          setData(remoteData);
        }
      })
      .catch((err) => {
        console.warn('Could not load remote portfolio data, using local fallback:', err.message);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <PortfolioContext.Provider value={{ data, loading }}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => useContext(PortfolioContext);
