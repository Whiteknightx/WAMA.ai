import Link from 'next/link';
import { getToolBySlug, getTools, getToolsByIds, formatDate, getPricingLabel } from '@/lib/data';
import { notFound } from 'next/navigation';
import RadarScore from '@/components/ui/RadarScore';
import ToolCard from '@/components/ui/ToolCard';
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getTools().map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) return {};
  return {
    title: `${tool.name} — WAMA`,
    description: tool.description,
  };
}

export default async function ToolDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) notFound();

  const alternatives = getToolsByIds(tool.alternatives);
  const scoreBreakdown = [
    { label: 'Capability', value: tool.evaluation.capability },
    { label: 'Quality', value: tool.evaluation.quality },
    { label: 'Ease of Use', value: tool.evaluation.easeOfUse },
    { label: 'Value', value: tool.evaluation.value },
    { label: 'Reliability', value: tool.evaluation.reliability },
    { label: 'Workflow Fit', value: tool.evaluation.workflowFit },
    { label: 'Innovation', value: tool.evaluation.innovation },
  ];

  const capabilityEntries = Object.entries(tool.capabilities);

  return (
    <div className="page">
      <div className="container">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2" style={{ marginBottom: 'var(--space-6)', fontSize: 'var(--text-sm)' }}>
          <Link href="/" className="text-muted" style={{ transition: 'color 0.2s' }}>WAMA</Link>
          <span className="text-muted">/</span>
          {tool.categories[0] && (
            <>
              <Link href={`/categories`} className="text-muted" style={{ textTransform: 'capitalize' }}>
                {tool.categories[0]}
              </Link>
              <span className="text-muted">/</span>
            </>
          )}
          <span className="text-accent">{tool.name}</span>
        </div>

        {/* Header */}
        <div className="tool-header">
          <div className="tool-header-left">
            <div className="tool-logo-large">
              {tool.name.charAt(0)}
            </div>
            <div>
              <h1 className="heading-1" style={{ marginBottom: 'var(--space-2)' }}>{tool.name}</h1>
              <p className="text-muted" style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--space-3)' }}>
                {tool.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {tool.categories.map((c) => (
                  <span key={c} className="badge badge-default" style={{ textTransform: 'capitalize' }}>{c}</span>
                ))}
                <span className={`badge badge-${tool.pricing.model === 'free' ? 'free' : tool.pricing.model === 'freemium' ? 'freemium' : 'paid'}`}>
                  {getPricingLabel(tool.pricing.model)}
                </span>
                {tool.tested && <span className="badge badge-tested">✓ Tested by WAMA</span>}
                {tool.openSource && <span className="badge badge-free">Open Source</span>}
              </div>
            </div>
          </div>
          <div className="tool-header-right">
            <RadarScore score={tool.evaluation.radarScore} size={90} />
            <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', marginTop: 'var(--space-1)' }}>
              WAMA Score
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3" style={{ margin: 'var(--space-6) 0' }}>
          <a href={tool.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg">
            Visit Website →
          </a>
          <Link href={`/compare?tools=${tool.slug}`} className="btn btn-secondary">
            Compare
          </Link>
        </div>

        <div className="divider" />

        {/* Content Grid */}
        <div className="tool-content-grid">
          <div className="tool-content-main">
            {/* Quick Info */}
            <section className="tool-section">
              <h2 className="heading-3" style={{ marginBottom: 'var(--space-4)' }}>Quick Info</h2>
              <div className="card">
                <div className="quick-info-grid" style={{ position: 'relative', zIndex: 1 }}>
                  <div className="quick-info-item">
                    <span className="quick-info-label">Pricing</span>
                    <span className="quick-info-value">{getPricingLabel(tool.pricing.model)}</span>
                  </div>
                  <div className="quick-info-item">
                    <span className="quick-info-label">Free Tier</span>
                    <span className="quick-info-value">{tool.pricing.freeTier ? 'Yes' : 'No'}</span>
                  </div>
                  <div className="quick-info-item">
                    <span className="quick-info-label">Platform</span>
                    <span className="quick-info-value">{tool.platforms.join(', ')}</span>
                  </div>
                  <div className="quick-info-item">
                    <span className="quick-info-label">Released</span>
                    <span className="quick-info-value">{formatDate(tool.released)}</span>
                  </div>
                  <div className="quick-info-item">
                    <span className="quick-info-label">Last Updated</span>
                    <span className="quick-info-value">{formatDate(tool.lastUpdated)}</span>
                  </div>
                  <div className="quick-info-item">
                    <span className="quick-info-label">Open Source</span>
                    <span className="quick-info-value">{tool.openSource ? 'Yes' : 'No'}</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Capabilities */}
            <section className="tool-section">
              <h2 className="heading-3" style={{ marginBottom: 'var(--space-4)' }}>What Can It Do?</h2>
              <div className="card">
                <div className="capabilities-grid" style={{ position: 'relative', zIndex: 1 }}>
                  {capabilityEntries.map(([key, value]) => (
                    <div key={key} className="capability-row">
                      <span className="capability-name">
                        {key.replace(/([A-Z])/g, ' $1').replace(/^./, (s) => s.toUpperCase())}
                      </span>
                      <span className={
                        value === true ? 'capability-yes' :
                        value === false ? 'capability-no' :
                        'capability-partial'
                      }>
                        {value === true ? '✅' : value === false ? '❌' : '⚠️'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Use Cases */}
            <section className="tool-section">
              <h2 className="heading-3" style={{ marginBottom: 'var(--space-4)' }}>Use Cases</h2>
              <div className="card">
                <div style={{ position: 'relative', zIndex: 1 }}>
                  {tool.useCases.map((uc) => (
                    <div key={uc.name} className="use-case-row">
                      <span>{uc.name}</span>
                      <div className="stars">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <span key={s} className={`star ${s <= uc.rating ? 'star-filled' : ''}`}>★</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Pricing */}
            {tool.pricing.plans.length > 0 && (
              <section className="tool-section">
                <h2 className="heading-3" style={{ marginBottom: 'var(--space-4)' }}>Pricing</h2>
                <div className="grid grid-4" style={{ gap: 'var(--space-3)' }}>
                  {tool.pricing.plans.map((plan) => (
                    <div key={plan.name} className="card card-compact" style={{ textAlign: 'center' }}>
                      <div style={{ position: 'relative', zIndex: 1 }}>
                        <h4 style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 'var(--space-2)' }}>
                          {plan.name}
                        </h4>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-2xl)', fontWeight: 700 }}>
                          {plan.price === null ? 'Custom' : plan.price === 0 ? 'Free' : `$${plan.price}`}
                        </div>
                        {plan.price !== null && plan.price > 0 && (
                          <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>/{plan.period}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Pros & Cons */}
            <section className="tool-section">
              <div className="grid grid-2" style={{ gap: 'var(--space-4)' }}>
                <div className="card" style={{ borderLeftWidth: 3, borderLeftColor: 'rgba(34, 197, 94, 0.3)' }}>
                  <div style={{ position: 'relative', zIndex: 1 }}>
                    <h3 style={{ fontSize: 'var(--text-base)', fontWeight: 600, marginBottom: 'var(--space-3)', color: 'var(--accent-green)' }}>
                      Why We Like It
                    </h3>
                    {tool.pros.map((pro) => (
                      <div key={pro} style={{ fontSize: 'var(--text-sm)', marginBottom: 'var(--space-2)', color: 'var(--text-secondary)' }}>
                        <span style={{ color: 'var(--accent-green)', marginRight: 'var(--space-2)' }}>+</span>
                        {pro}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="card" style={{ borderLeftWidth: 3, borderLeftColor: 'rgba(249, 115, 22, 0.3)' }}>
                  <div style={{ position: 'relative', zIndex: 1 }}>
                    <h3 style={{ fontSize: 'var(--text-base)', fontWeight: 600, marginBottom: 'var(--space-3)', color: 'var(--accent-orange)' }}>
                      Limitations
                    </h3>
                    {tool.cons.map((con) => (
                      <div key={con} style={{ fontSize: 'var(--text-sm)', marginBottom: 'var(--space-2)', color: 'var(--text-secondary)' }}>
                        <span style={{ color: 'var(--accent-orange)', marginRight: 'var(--space-2)' }}>−</span>
                        {con}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="tool-content-sidebar">
            {/* Who Is It For */}
            <div className="card" style={{ marginBottom: 'var(--space-4)' }}>
              <div style={{ position: 'relative', zIndex: 1 }}>
                <h3 style={{ fontSize: 'var(--text-base)', fontWeight: 600, marginBottom: 'var(--space-3)' }}>Best For</h3>
                <div className="flex flex-col gap-2">
                  {tool.bestFor.map((b) => (
                    <span key={b} className="badge badge-default" style={{ justifyContent: 'flex-start' }}>{b}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Score Breakdown */}
            <div className="card" style={{ marginBottom: 'var(--space-4)' }}>
              <div style={{ position: 'relative', zIndex: 1 }}>
                <h3 style={{ fontSize: 'var(--text-base)', fontWeight: 600, marginBottom: 'var(--space-4)' }}>WAMA Score</h3>
                <div style={{ textAlign: 'center', marginBottom: 'var(--space-4)' }}>
                  <RadarScore score={tool.evaluation.radarScore} size={80} />
                </div>
                {scoreBreakdown.map((item) => (
                  <div key={item.label} className="score-row">
                    <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>{item.label}</span>
                    <div className="score-bar-wrapper">
                      <div className="score-bar" style={{ width: `${item.value}%` }} />
                    </div>
                    <span style={{ fontSize: 'var(--text-sm)', fontFamily: 'var(--font-mono)', fontWeight: 600, minWidth: '28px', textAlign: 'right' }}>
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* History */}
            <div className="card">
              <div style={{ position: 'relative', zIndex: 1 }}>
                <h3 style={{ fontSize: 'var(--text-base)', fontWeight: 600, marginBottom: 'var(--space-4)' }}>History</h3>
                <div className="timeline">
                  {tool.history.map((event, i) => (
                    <div key={i} className="timeline-item">
                      <div className="timeline-dot" />
                      <div>
                        <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', marginBottom: '2px' }}>
                          {formatDate(event.date)}
                        </div>
                        <div style={{ fontSize: 'var(--text-sm)' }}>{event.event}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* Alternatives */}
        {alternatives.length > 0 && (
          <section style={{ marginTop: 'var(--space-12)' }}>
            <h2 className="heading-3" style={{ marginBottom: 'var(--space-6)' }}>
              Alternatives to {tool.name}
            </h2>
            <div className="grid grid-4">
              {alternatives.map((alt) => (
                <ToolCard key={alt.id} tool={alt} compact />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
