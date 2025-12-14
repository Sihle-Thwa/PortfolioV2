'use server';
// Form validation limits
export const VALIDATION_LIMITS = {
  name: { min: 2, max: 50 },
  email: { min: 5, max: 100 },
  message: { min: 10, max: 1000 },
  title: { min: 3, max: 100 },
  description: { min: 20, max: 500 },
} as const;

// File upload limits
export const FILE_LIMITS = {
  maxSize: 5 * 1024 * 1024, // 5MB
  allowedTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
  allowedExtensions: ['.jpg', '.jpeg', '.png', '.webp', '.gif'],
} as const;

// Rate limiting
export const RATE_LIMITS = {
  contact: {
    maxRequests: 3,
    windowMs: 60 * 60 * 1000, // 1 hour
  },
  newsletter: {
    maxRequests: 5,
    windowMs: 24 * 60 * 60 * 1000, // 24 hours
  },
} as const;

// SEO
export const SEO = {
  title: 'Siphesihle B Mthethwa - Full Stack Developer',
  description:
    'Full-stack developer specializing in React, Next.js, and Node.js. Building modern web applications with beautiful user experiences.',
  keywords: [
    'web developer',
    'full stack developer',
    'react developer',
    'nextjs developer',
    'frontend developer',
    'backend developer',
  ],
  author: 'Siphesihle B Mthethwa',
  siteUrl: process.env.NEXT_PUBLIC_APP_URL || 'https://portfolio-sbm-portfolio.vercel.app/',
} as const;

// Email templates metadata
export const EMAIL_TEMPLATES = {
  contact: {
    subject: 'Portfolio Contact',
    from: 'Portfolio Contact Form',
  },
  autoReply: {
    subject: 'Thank you for contacting me!',
    from: 'Siphesihle B Mthethwa',
  },
  newsletter: {
    subject: 'Welcome to my newsletter!',
    from: 'Siphesihle B Mthethwa',
  },
} as const;