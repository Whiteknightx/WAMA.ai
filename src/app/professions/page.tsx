import Link from 'next/link';
import { getProfessions, getToolsByProfession, getToolsByIds } from '@/lib/data';
import ToolCard from '@/components/ui/ToolCard';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI For Your Profession — WAMA',
  description: 'Find AI tools made specifically for your profession — game developers, programmers, designers, artists, and more.',
};

export default function ProfessionsPage() {
  const professions = getProfessions();

  return (
    <div className="page">
      <div className="container">
        <div className="text-center" style={{ marginBottom: 'var(--space-10)' }}>
          <p className="section-label">AI For Your Profession</p>
          <h1 className="heading-1">
            What can AI do for <span className="text-gradient">you</span>?
          </h1>
          <p className="text-muted" style={{ marginTop: 'var(--space-2)', maxWidth: '500px', margin: 'var(--space-2) auto 0' }}>
            Instead of searching thousands of tools, find exactly what AI can do for your specific work.
          </p>
        </div>

        <div className="grid grid-4 stagger" style={{ marginBottom: 'var(--space-12)' }}>
          {professions.map((prof) => (
            <Link key={prof.id} href={`/professions/${prof.slug}`} className="card card-interactive card-glow-cyan" style={{ textAlign: 'center' }}>
              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ fontSize: '3rem', marginBottom: 'var(--space-3)' }}>{prof.icon}</div>
                <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 600, marginBottom: 'var(--space-1)' }}>
                  {prof.name}
                </h3>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-tertiary)', marginBottom: 'var(--space-3)' }}>
                  {prof.toolCount} AI tools
                </p>
                <div className="flex flex-wrap justify-center gap-1">
                  {prof.subcategories.slice(0, 3).map((sub) => (
                    <span key={sub.name} className="badge badge-default">{sub.name}</span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
