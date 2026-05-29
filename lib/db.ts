import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { Collection } from 'mongodb';
import clientPromise from './mongo';

export type Pose = {
  id: string;
  title: string;
  description: string;
  category: string;
  moodTags: string[];
  tips: string[];
  image: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  saved: string[];
};

const poses: Pose[] = [
  {
    id: 'pose-1',
    title: 'Neon Cafe Lean',
    description: 'A moody coffee shop pose with relaxed shoulders and an introspective gaze.',
    category: 'cafe',
    moodTags: ['cozy', 'moody', 'aesthetic'],
    tips: ['Lean into the counter', 'Use warm window light', 'Keep your shoulders soft'],
    image: 'https://images.unsplash.com/photo-1515548215403-7e8f10b29b53?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'pose-2',
    title: 'Streetside Motion',
    description: 'Walk through the city with a confident stride and natural mirror of the buildings.',
    category: 'street',
    moodTags: ['urban', 'dynamic', 'travel'],
    tips: ['Take a few steps before the shot', 'Look away from the camera', 'Let the jacket move with you'],
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'pose-3',
    title: 'Soft Sunset Dream',
    description: 'A pastel-backed pose with gentle movement and dreamy silhouette lines.',
    category: 'aesthetic',
    moodTags: ['soft', 'sunset', 'dreamy'],
    tips: ['Angle your face to the light', 'Use hands in the hair', 'Keep your body relaxed'],
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'pose-4',
    title: 'Mirror Frame Magic',
    description: 'Use the mirror edge to frame your face while keeping the pose fluid and natural.',
    category: 'mirror',
    moodTags: ['glam', 'bold', 'editorial'],
    tips: ['Hold the frame softly', 'Create depth with your shoulders', 'Experiment with close-up angles'],
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'pose-5',
    title: 'Travel Window Seat',
    description: 'A quiet travel moment captured with a window-side pose and reflective mood.',
    category: 'travel',
    moodTags: ['journey', 'serene', 'minimal'],
    tips: ['Rest your chin on your hand', 'Let light fall across your face', 'Keep your legs angled'],
    image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'pose-6',
    title: 'Cute Tilted Gaze',
    description: 'A playful tilt and soft smile for cute, effortless portrait energy.',
    category: 'cute',
    moodTags: ['sweet', 'bright', 'playful'],
    tips: ['Tilt your chin down slightly', 'Keep your eyes lively', 'Use props like a hat or coffee cup'],
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'pose-7',
    title: 'Sunlit Window Mood',
    description: 'Lean into soft morning light with a warm, happy window-side pose.',
    category: 'cafe',
    moodTags: ['sunny', 'happy', 'cozy'],
    tips: ['Face the light', 'Keep your posture open', 'Use a coffee mug as a prop'],
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'pose-8',
    title: 'City Neon Drift',
    description: 'A confident city moment with neon reflections and bold attitude.',
    category: 'street',
    moodTags: ['urban', 'happy', 'electric'],
    tips: ['Lean back slightly', 'Use neon accents', 'Keep your hands relaxed'],
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'pose-9',
    title: 'Mirror Glow Pose',
    description: 'Use mirror depth and soft lighting to create a glowing, editorial feel.',
    category: 'mirror',
    moodTags: ['glam', 'happy', 'bold'],
    tips: ['Stand slightly angled', 'Use the mirror frame', 'Keep your expression soft and confident'],
    image: 'https://images.unsplash.com/photo-1495567720989-cebdbdd97913?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'pose-10',
    title: 'Patio Brunch Ease',
    description: 'A relaxed cafe pose with easy charm, perfect for a bright romance edit.',
    category: 'cafe',
    moodTags: ['happy', 'calm', 'bright'],
    tips: ['Sit with one knee up', 'Rest your elbow on the table', 'Smile gently'],
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'pose-11',
    title: 'Forest Stroll',
    description: 'A gentle travel pose with soft motion and natural scenery.',
    category: 'travel',
    moodTags: ['serene', 'happy', 'free'],
    tips: ['Walk slowly', 'Look toward the horizon', 'Let your arms move naturally'],
    image: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'pose-12',
    title: 'Studio Minimal Mood',
    description: 'A clean editorial pose with modern minimalism and calm confidence.',
    category: 'aesthetic',
    moodTags: ['clean', 'calm', 'happy'],
    tips: ['Keep lines simple', 'Use negative space', 'Focus on small facial expressions'],
    image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'pose-13',
    title: 'Rooftop Sunset Lean',
    description: 'A warm rooftop shot with a relaxed lean and dramatic skyline glow.',
    category: 'travel',
    moodTags: ['sunset', 'bold', 'happy'],
    tips: ['Lean on the railing', 'Let the sky fill the frame', 'Use warm tones in styling'],
    image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'pose-14',
    title: 'Cafe Window Reflection',
    description: 'A layered composition using window glass and reflective details for an editorial feel.',
    category: 'cafe',
    moodTags: ['reflective', 'soft', 'happy'],
    tips: ['Angle toward the window', 'Use reflections for depth', 'Keep your hands light and natural'],
    image: 'https://images.unsplash.com/photo-1475727946784-1b04caeafa6d?auto=format&fit=crop&w=1000&q=80',
  },
];

const localUsers: User[] = [
  {
    id: 'user-demo',
    name: 'Sky',
    email: 'demo@insposwipe.com',
    password: bcrypt.hashSync('demo1234', 10),
    saved: ['pose-3', 'pose-6'],
  },
];

export function getAllPoses() {
  return poses;
}

export function getPoseById(id: string) {
  return poses.find((pose) => pose.id === id);
}

export function filterPoses(query?: string, category?: string) {
  let results = poses;
  if (category) {
    results = results.filter((pose) => pose.category === category.toLowerCase());
  }
  if (query) {
    const q = query.toLowerCase();
    results = results.filter(
      (pose) =>
        pose.title.toLowerCase().includes(q) ||
        pose.description.toLowerCase().includes(q) ||
        pose.moodTags.some((tag) => tag.includes(q))
    );
  }
  return results;
}

async function getUserCollection(): Promise<Collection<User> | null> {
  const client = await clientPromise;
  if (!client) {
    return null;
  }
  try {
    return client.db().collection<User>('users');
  } catch {
    return null;
  }
}

async function ensureDemoUser(collection: Collection<User> | null) {
  if (!collection) return;
  const existing = await collection.findOne({ email: 'demo@insposwipe.com' });
  if (!existing) {
    await collection.insertOne({
      id: 'user-demo',
      name: 'Sky',
      email: 'demo@insposwipe.com',
      password: bcrypt.hashSync('demo1234', 10),
      saved: ['pose-3', 'pose-6'],
    });
  }
}

export async function findUserByEmail(email: string) {
  const collection = await getUserCollection();
  if (collection) {
    await ensureDemoUser(collection);
    return collection.findOne({ email: email.toLowerCase() });
  }
  return localUsers.find((user) => user.email === email.toLowerCase()) ?? null;
}

export async function createUser(name: string, email: string, password: string) {
  const existing = await findUserByEmail(email);
  if (existing) {
    return null;
  }
  const user: User = {
    id: crypto.randomUUID(),
    name,
    email: email.toLowerCase(),
    password: bcrypt.hashSync(password, 10),
    saved: [],
  };
  const collection = await getUserCollection();
  if (collection) {
    await collection.insertOne(user);
    return user;
  }
  localUsers.push(user);
  return user;
}

export async function authenticateUser(email: string, password: string) {
  const user = await findUserByEmail(email);
  if (!user) return null;
  const valid = bcrypt.compareSync(password, user.password);
  return valid ? user : null;
}

export async function toggleFavorite(userId: string, poseId: string) {
  const collection = await getUserCollection();
  if (collection) {
    const user = await collection.findOne({ id: userId });
    if (!user) return null;
    const saved = new Set(user.saved || []);
    if (saved.has(poseId)) {
      saved.delete(poseId);
    } else {
      saved.add(poseId);
    }
    const updated = Array.from(saved);
    await collection.updateOne({ id: userId }, { $set: { saved: updated } });
    return updated;
  }

  const user = localUsers.find((item) => item.id === userId);
  if (!user) return null;
  const saved = new Set(user.saved);
  if (saved.has(poseId)) {
    saved.delete(poseId);
  } else {
    saved.add(poseId);
  }
  user.saved = Array.from(saved);
  return user.saved;
}

export async function getUserFavorites(userId: string) {
  const collection = await getUserCollection();
  if (collection) {
    const user = await collection.findOne({ id: userId });
    if (!user) return [];
    return poses.filter((pose) => user.saved.includes(pose.id));
  }
  const user = localUsers.find((item) => item.id === userId);
  if (!user) return [];
  return poses.filter((pose) => user.saved.includes(pose.id));
}
