import toolsData from '@/data/tools.json';
import categoriesData from '@/data/categories.json';
import professionsData from '@/data/professions.json';
import reportsData from '@/data/reports.json';
import updatesData from '@/data/updates.json';

export interface Tool {
  id: string;
  name: string;
  slug: string;
  url: string;
  description: string;
  shortDescription: string;
  type: string;
  categories: string[];
  professions: string[];
  tasks: string[];
  capabilities: Record<string, boolean | string | undefined>;
  pricing: {
    model: string;
    freeTier: boolean;
    plans: { name: string; price: number | null; period: string }[];
    hasFreeTrial: boolean;
    hasWatermark: boolean;
    commercialRights: boolean;
    apiPricing: boolean;
  };
  evaluation: {
    radarScore: number;
    capability: number;
    quality: number;
    easeOfUse: number;
    value: number;
    reliability: number;
    workflowFit: number;
    innovation: number;
  };
  platforms: string[];
  released: string;
  lastUpdated: string;
  openSource: boolean;
  tags: string[];
  pros: string[];
  cons: string[];
  useCases: { name: string; rating: number }[];
  bestFor: string[];
  history: { date: string; event: string }[];
  alternatives: string[];
  tested: boolean;
  featured: boolean;
  trending: boolean;
  trendingChange: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
  toolCount: number;
  color: string;
}

export interface Profession {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
  toolCount: number;
  subcategories: { name: string; count: number }[];
  topTools: string[];
}

export interface Report {
  id: string;
  title: string;
  slug: string;
  summary: string;
  date: string;
  category: string;
  profession: string | null;
  tags: string[];
  readTime: string;
  sections: string[];
}

export interface Update {
  id: string;
  type: string;
  icon: string;
  toolId: string;
  toolName: string;
  title: string;
  description: string;
  date: string;
  category: string;
}

const typedTools = toolsData as unknown as Tool[];
const typedCategories = categoriesData as unknown as Category[];
const typedProfessions = professionsData as unknown as Profession[];
const typedReports = reportsData as unknown as Report[];
const typedUpdates = updatesData as unknown as Update[];

// -- Tools --

export function getTools(): Tool[] {
  return typedTools;
}

export function getToolBySlug(slug: string): Tool | undefined {
  return typedTools.find((t) => t.slug === slug);
}

export function getToolById(id: string): Tool | undefined {
  return typedTools.find((t) => t.id === id);
}

export function getToolsByIds(ids: string[]): Tool[] {
  return ids.map((id) => getToolById(id)).filter(Boolean) as Tool[];
}

export function getFeaturedTools(): Tool[] {
  return typedTools.filter((t) => t.featured);
}

export function getTrendingTools(): Tool[] {
  return [...typedTools]
    .filter((t) => t.trending)
    .sort((a, b) => b.trendingChange - a.trendingChange);
}

export function getNewTools(): Tool[] {
  return [...typedTools].sort(
    (a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
  );
}

export function getTestedTools(): Tool[] {
  return typedTools.filter((t) => t.tested);
}

export function getToolsByCategory(categoryId: string): Tool[] {
  return typedTools.filter((t) => t.categories.includes(categoryId));
}

export function getToolsByProfession(professionId: string): Tool[] {
  return typedTools.filter((t) => t.professions.includes(professionId));
}

export function filterTools(filters: {
  type?: string;
  category?: string;
  profession?: string;
  pricing?: string;
  platform?: string;
  search?: string;
  sort?: string;
}): Tool[] {
  let results = [...typedTools];

  if (filters.type) {
    results = results.filter(
      (t) => t.type.toLowerCase().replace(/\s+/g, '-') === filters.type
    );
  }

  if (filters.category) {
    results = results.filter((t) => t.categories.includes(filters.category!));
  }

  if (filters.profession) {
    results = results.filter((t) => t.professions.includes(filters.profession!));
  }

  if (filters.pricing) {
    results = results.filter((t) => t.pricing.model === filters.pricing);
  }

  if (filters.platform) {
    results = results.filter((t) =>
      t.platforms.some((p) => p.toLowerCase() === filters.platform!.toLowerCase())
    );
  }

  if (filters.search) {
    const q = filters.search.toLowerCase();
    results = results.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.tags.some((tag) => tag.toLowerCase().includes(q)) ||
        t.categories.some((c) => c.toLowerCase().includes(q))
    );
  }

  // Sort
  switch (filters.sort) {
    case 'newest':
      results.sort(
        (a, b) =>
          new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
      );
      break;
    case 'trending':
      results.sort((a, b) => b.trendingChange - a.trendingChange);
      break;
    case 'highest-rated':
      results.sort((a, b) => b.evaluation.radarScore - a.evaluation.radarScore);
      break;
    case 'best-value':
      results.sort((a, b) => b.evaluation.value - a.evaluation.value);
      break;
    default:
      // recommended: featured first, then by score
      results.sort((a, b) => {
        if (a.featured !== b.featured) return a.featured ? -1 : 1;
        return b.evaluation.radarScore - a.evaluation.radarScore;
      });
  }

  return results;
}

// -- Categories --

export function getCategories(): Category[] {
  return typedCategories;
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return typedCategories.find((c) => c.slug === slug);
}

// -- Professions --

export function getProfessions(): Profession[] {
  return typedProfessions;
}

export function getProfessionBySlug(slug: string): Profession | undefined {
  return typedProfessions.find((p) => p.slug === slug);
}

// -- Reports --

export function getReports(): Report[] {
  return [...typedReports].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

// -- Updates / Feed --

export function getUpdates(): Update[] {
  return [...typedUpdates].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getRecentUpdates(limit: number = 10): Update[] {
  return getUpdates().slice(0, limit);
}

// -- Utility --

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function getPricingLabel(model: string): string {
  const labels: Record<string, string> = {
    free: 'Free',
    freemium: 'Freemium',
    paid: 'Paid',
    'open-source': 'Open Source',
  };
  return labels[model] || model;
}

export function getScoreColor(score: number): string {
  if (score >= 90) return 'var(--score-excellent)';
  if (score >= 80) return 'var(--score-good)';
  if (score >= 70) return 'var(--score-average)';
  return 'var(--score-below)';
}
