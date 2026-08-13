import Link from 'next/link';
import { getTrendingTools } from '@/lib/data';
import RadarScore from '@/components/ui/RadarScore';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Trending AI Tools — WAMA',
  description: 'See which AI tools are gaining the most attention right now.',
};

export default function TrendingPage() {
  const trending = getTrendingTools();

  return (
    <div className="page">
      <div className="container">
        <div style={{ marginBottom: 'var(--space-8)' }}>
          <p className="section-label">🔥 Trending</p>
          <h1 className="heading-1">What&apos;s Hot Right Now</h1>
          <p className="text-muted" style={{ marginTop: 'var(--space-2)' }}>
            AI tools gaining the most attention and interest.
          </p>
        </div>

        <div className="stagger" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          {trending.map((tool, i) => (
            <Link key={tool.id} href={`/tools/${tool.slug}`} className="card card-interactive card-glow-cyan">
              <div className="flex items-center gap-6" style={{ position: 'relative', zIndex: 1 }}>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-4xl)',
                  fontWeight: 800,
                  minWidth: '60px',
                  textAlign: 'center',
                  background: 'var(--gradient-primary)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
                  #{i + 1}
                </div>

                <div className="tool-card-logo" style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--gradient-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: 'var(--text-xl)',
                  flexShrink: 0,
                }}>
                  {tool.name.charAt(0)}
                </div>

                <div style={{ flex: 1 }}>
                  <div className="flex items-center gap-2" style={{ marginBottom: 'var(--space-1)' }}>
                    <h3 style={{ fontSize: 'var(--text-xl)', fontWeight: 600 }}>{tool.name}</h3>
                    <span className="badge badge-default">{tool.type}</span>
                  </div>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
                    {tool.shortDescription}
                  </p>
                  <div className="flex flex-wrap gap-1" style={{ marginTop: 'var(--space-2)' }}>
                    {tool.categories.map((c) => (
                      <span key={c} className="badge badge-default" style={{ textTransform: 'capitalize' }}>{c}</span>
                    ))}
                  </div>
                </div>

                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <div style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'var(--text-2xl)',
                    fontWeight: 700,
                    color: tool.trendingChange > 0 ? 'var(--accent-green)' : 'var(--accent-red)',
                    marginBottom: 'var(--space-1)',
                  }}>
                    {tool.trendingChange > 0 ? '+' : ''}{tool.trendingChange}%
                  </div>
                  <RadarScore score={tool.evaluation.radarScore} size={44} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
