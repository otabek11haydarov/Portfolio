import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const DATA_FILE = path.join(__dirname, 'data', 'portfolio.json');

app.use(cors());
app.use(express.json());

// Helper to read data safely
function readData() {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      return null;
    }
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading data:', err);
    return null;
  }
}

// Helper to write data safely
function writeData(data) {
  try {
    const dir = path.dirname(DATA_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('Error writing data:', err);
    return false;
  }
}

// --- Auth Routes ---
app.post('/api/auth/login', (req, res) => {
  const { password } = req.body;
  const data = readData();
  const currentPassword = data?.admin?.passwordHash || 'admin123';

  if (password === currentPassword) {
    return res.json({ success: true, token: 'auth_' + Date.now() });
  }
  return res.status(401).json({ success: false, message: 'Invalid password' });
});

app.post('/api/auth/change-password', (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const data = readData();
  if (!data) return res.status(500).json({ error: 'Database unavailable' });

  const currentPassword = data.admin?.passwordHash || 'admin123';
  if (oldPassword !== currentPassword) {
    return res.status(400).json({ error: 'Old password is incorrect' });
  }

  if (!newPassword || newPassword.trim().length < 4) {
    return res.status(400).json({ error: 'New password must be at least 4 characters long' });
  }

  data.admin = { passwordHash: newPassword.trim() };
  writeData(data);
  return res.json({ success: true, message: 'Password updated successfully' });
});

// --- Portfolio Public Data ---
app.get('/api/portfolio', (req, res) => {
  const data = readData();
  if (!data) {
    return res.status(500).json({ error: 'Failed to read portfolio data' });
  }
  // Exclude admin credentials from response
  const { admin, ...publicData } = data;
  res.json(publicData);
});

// --- Update Profile & About ---
app.put('/api/portfolio/profile', (req, res) => {
  const { profile, aboutText } = req.body;
  const data = readData();
  if (!data) return res.status(500).json({ error: 'Data unavailable' });

  if (profile) data.profile = { ...data.profile, ...profile };
  if (aboutText !== undefined) data.aboutText = aboutText;

  writeData(data);
  res.json({ success: true, profile: data.profile, aboutText: data.aboutText });
});

// --- Projects CRUD ---
app.post('/api/portfolio/projects', (req, res) => {
  const data = readData();
  if (!data) return res.status(500).json({ error: 'Data unavailable' });

  const newProject = {
    id: 'proj-' + Date.now(),
    title: req.body.title || 'Untitled Project',
    description: req.body.description || '',
    tags: Array.isArray(req.body.tags) ? req.body.tags : [],
    link: req.body.link || '#',
    repo: req.body.repo || '#',
    emoji: req.body.emoji || '🚀'
  };

  data.projects = data.projects || [];
  data.projects.unshift(newProject);
  writeData(data);

  res.status(201).json({ success: true, project: newProject, projects: data.projects });
});

app.put('/api/portfolio/projects/:id', (req, res) => {
  const { id } = req.params;
  const data = readData();
  if (!data) return res.status(500).json({ error: 'Data unavailable' });

  const index = (data.projects || []).findIndex(p => p.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Project not found' });
  }

  data.projects[index] = {
    ...data.projects[index],
    ...req.body,
    id // keep original id
  };
  writeData(data);

  res.json({ success: true, project: data.projects[index], projects: data.projects });
});

app.delete('/api/portfolio/projects/:id', (req, res) => {
  const { id } = req.params;
  const data = readData();
  if (!data) return res.status(500).json({ error: 'Data unavailable' });

  data.projects = (data.projects || []).filter(p => p.id !== id);
  writeData(data);

  res.json({ success: true, projects: data.projects });
});

// --- Skills CRUD ---
app.post('/api/portfolio/skills', (req, res) => {
  const data = readData();
  if (!data) return res.status(500).json({ error: 'Data unavailable' });

  const newSkill = {
    id: 'skill-' + Date.now(),
    name: req.body.name || 'New Skill',
    level: Math.min(100, Math.max(0, Number(req.body.level) || 50)),
    category: req.body.category || 'Languages'
  };

  data.skills = data.skills || [];
  data.skills.push(newSkill);
  writeData(data);

  res.status(201).json({ success: true, skill: newSkill, skills: data.skills });
});

app.put('/api/portfolio/skills/:id', (req, res) => {
  const { id } = req.params;
  const data = readData();
  if (!data) return res.status(500).json({ error: 'Data unavailable' });

  const index = (data.skills || []).findIndex(s => s.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Skill not found' });
  }

  data.skills[index] = {
    ...data.skills[index],
    ...req.body,
    level: req.body.level !== undefined ? Math.min(100, Math.max(0, Number(req.body.level))) : data.skills[index].level,
    id
  };
  writeData(data);

  res.json({ success: true, skill: data.skills[index], skills: data.skills });
});

app.delete('/api/portfolio/skills/:id', (req, res) => {
  const { id } = req.params;
  const data = readData();
  if (!data) return res.status(500).json({ error: 'Data unavailable' });

  data.skills = (data.skills || []).filter(s => s.id !== id);
  writeData(data);

  res.json({ success: true, skills: data.skills });
});

// --- Experience CRUD ---
app.post('/api/portfolio/experience', (req, res) => {
  const data = readData();
  if (!data) return res.status(500).json({ error: 'Data unavailable' });

  const newExp = {
    id: 'exp-' + Date.now(),
    role: req.body.role || 'New Role',
    company: req.body.company || 'Company',
    period: req.body.period || '2024 - Present',
    description: req.body.description || ''
  };

  data.experience = data.experience || [];
  data.experience.unshift(newExp);
  writeData(data);

  res.status(201).json({ success: true, experience: newExp, allExperience: data.experience });
});

app.put('/api/portfolio/experience/:id', (req, res) => {
  const { id } = req.params;
  const data = readData();
  if (!data) return res.status(500).json({ error: 'Data unavailable' });

  const index = (data.experience || []).findIndex(e => e.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Experience not found' });
  }

  data.experience[index] = {
    ...data.experience[index],
    ...req.body,
    id
  };
  writeData(data);

  res.json({ success: true, experience: data.experience[index], allExperience: data.experience });
});

app.delete('/api/portfolio/experience/:id', (req, res) => {
  const { id } = req.params;
  const data = readData();
  if (!data) return res.status(500).json({ error: 'Data unavailable' });

  data.experience = (data.experience || []).filter(e => e.id !== id);
  writeData(data);

  res.json({ success: true, allExperience: data.experience });
});

// --- Bulk Sync (Full Update / Restore) ---
app.post('/api/portfolio/sync', (req, res) => {
  const data = readData();
  if (!data) return res.status(500).json({ error: 'Data unavailable' });

  const { profile, aboutText, skills, projects, experience } = req.body;
  if (profile) data.profile = profile;
  if (aboutText !== undefined) data.aboutText = aboutText;
  if (Array.isArray(skills)) data.skills = skills;
  if (Array.isArray(projects)) data.projects = projects;
  if (Array.isArray(experience)) data.experience = experience;

  writeData(data);
  res.json({ success: true, message: 'All portfolio data synchronized successfully' });
});

app.listen(PORT, () => {
  console.log(`Portfolio Admin Backend running on http://localhost:${PORT}`);
});
