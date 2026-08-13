import Link from 'next/link';
import { getProfessions, getProfessionBySlug, getToolsByProfession, getToolsByIds } from '@/lib/data';
import { notFound } from 'next/navigation';
import ToolCard from '@/components/ui/ToolCard';
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getProfessions().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const profession = getProfessionBySlug(slug);
  if (!profession) return {};
  return {
    title: `AI for ${profession.name} — WAMA`,
    description: profession.description,
  };
}

export default async function ProfessionDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const profession = getProfessionBySlug(slug);
  if (!profession) notFound();

  const topTools = getToolsByIds(profession.topTools);
  const allTools = getToolsByProfession(profession.id);

  return (
    <div className="page">
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: 'var(--space-8)' }}>
          <Link href="/professions" className="text-muted" style={{ fontSize: 'var(--text-sm)', marginBottom: 'var(--space-4)', display: 'inline-block' }}>
            ← All Professions
          </Link>
          <div className="flex items-center gap-4" style={{ marginBottom: 'var(--space-4)' }}>
            <span style={{ fontSize: '3.5rem' }}>{profession.icon}</span>
            <div>
              <p className="section-label">AI For</p>
              <h1 className="heading-1">{profession.name}</h1>
            </div>
          </div>
          <p className="text-muted" style={{ maxWidth: '600px' }}>
            {profession.description}
          </p>
        </div>

        {/* Subcategory breakdown */}
        <div className="grid grid-3" style={{ marginBottom: 'var(--space-10)', gap: 'var(--space-3)' }}>
          {profession.subcategories.map((sub) => (
            <div key={sub.name} className="card card-compact">
              <div className="flex items-center justify-between" style={{ position: 'relative', zIndex: 1 }}>
                <span style={{ fontSize: 'var(--text-sm)', fontWeight: 500 }}>{sub.name}</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)', color: 'var(--text-accent)' }}>
                  {sub.count}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Top Tools */}
        <section style={{ marginBottom: 'var(--space-10)' }}>
          <h2 className="heading-3" style={{ marginBottom: 'var(--space-6)' }}>
            Best AI Tools for {profession.name}
          </h2>
          <div className="grid grid-3 stagger">
            {topTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </section>

        {/* All Tools */}
        {allTools.length > topTools.length && (
          <section>
            <h2 className="heading-3" style={{ marginBottom: 'var(--space-6)' }}>
              All AI Tools for {profession.name}
            </h2>
            <div className="grid grid-4">
              {allTools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} compact />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
