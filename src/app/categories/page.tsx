import Link from 'next/link';
import { getCategories, getToolsByCategory } from '@/lib/data';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Categories — WAMA',
  description: 'Browse AI tools by capability: Image, Video, Audio, Music, 3D, Coding, Writing, Research and more.',
};

export default function CategoriesPage() {
  const categories = getCategories();

  return (
    <div className="page">
      <div className="container">
        <div style={{ marginBottom: 'var(--space-8)' }}>
          <p className="section-label">Categories</p>
          <h1 className="heading-1">Browse by Capability</h1>
          <p className="text-muted" style={{ marginTop: 'var(--space-2)' }}>
            Find AI tools organized by what they do.
          </p>
        </div>

        <div className="grid grid-3 stagger">
          {categories.map((cat) => {
            const catTools = getToolsByCategory(cat.id);
            return (
              <Link key={cat.id} href={`/explore?category=${cat.id}`} className="card card-interactive card-glow-cyan">
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-3)' }}>
                    <span style={{ fontSize: '2.5rem' }}>{cat.icon}</span>
                    <span style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 'var(--text-sm)',
                      fontWeight: 600,
                      color: cat.color,
                    }}>
                      {catTools.length} tools
                    </span>
                  </div>
                  <h3 style={{ fontSize: 'var(--text-xl)', fontWeight: 600, marginBottom: 'var(--space-2)' }}>
                    {cat.name}
                  </h3>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                    {cat.description}
                  </p>
                  <div style={{ marginTop: 'var(--space-3)', display: 'flex', flexWrap: 'wrap', gap: 'var(--space-1)' }}>
                    {catTools.slice(0, 3).map((t) => (
                      <span key={t.id} className="badge badge-default">{t.name}</span>
                    ))}
                    {catTools.length > 3 && (
                      <span className="badge badge-default">+{catTools.length - 3}</span>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
