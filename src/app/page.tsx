import Link from 'next/link';
import {
  getTools,
  getFeaturedTools,
  getTrendingTools,
  getNewTools,
  getRecentUpdates,
  getCategories,
  getProfessions,
  getReports,
  formatDate,
} from '@/lib/data';
import ToolCard from '@/components/ui/ToolCard';
import FeedItem from '@/components/ui/FeedItem';
import RadarScore from '@/components/ui/RadarScore';
import HeroSearch from '@/components/ui/HeroSearch';

export default function HomePage() {
  const tools = getTools();
  const featured = getFeaturedTools();
  const trending = getTrendingTools();
  const newTools = getNewTools().slice(0, 8);
  const updates = getRecentUpdates(6);
  const categories = getCategories();
  const professions = getProfessions();
  const reports = getReports().slice(0, 4);

  const todayUpdates = updates.slice(0, 4);

  // Editor's picks
  const editorPicks = [
    { label: "Editor's Pick", sublabel: 'Best AI Image Tool', toolId: 'midjourney' },
    { label: 'Best Free Tool', sublabel: 'Best AI Coding Tool', toolId: 'stable-diffusion' },
    { label: 'Best New Tool', sublabel: 'Best AI Agent', toolId: 'claude-code' },
    { label: 'Best Value', sublabel: 'Best Tool Under $20', toolId: 'suno' },
  ];

  return (
    <div className="page">
      {/* ===== HERO ===== */}
      <section className="hero">
        <div className="hero-grid" />
        <div className="hero-orb hero-orb-1" />
        <div className="hero-orb hero-orb-2" />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="animate-fade-in-up">
            <p className="section-label" style={{ marginBottom: '1rem' }}>WAMA — Where AI Meets Application</p>
            <h1 className="heading-hero" style={{ marginBottom: '1.5rem' }}>
              Where AI meets<br />
              <span className="text-gradient">real application.</span>
            </h1>
            <p className="text-muted" style={{ fontSize: 'var(--text-lg)', maxWidth: '600px', margin: '0 auto 2rem' }}>
              Explore curated AI tools, models, agents and workflows — organized by profession, task, and real-world capabilities.
            </p>

            <HeroSearch />

            <div className="flex items-center justify-center gap-4">
              <Link href="/explore" className="btn btn-primary btn-lg">
                Explore AI
              </Link>
              <Link href="/professions" className="btn btn-secondary btn-lg">
                Browse by Profession
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TODAY ON WAMA ===== */}
      <section className="section container">
        <p className="section-label">Today on WAMA</p>
        <h2 className="heading-2" style={{ marginBottom: 'var(--space-6)' }}>Latest AI Developments</h2>

        <div className="grid grid-2 stagger" style={{ gap: 'var(--space-4)' }}>
          {todayUpdates.map((update) => (
            <FeedItem key={update.id} update={update} />
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: 'var(--space-6)' }}>
          <Link href="/new" className="btn btn-secondary">
            View All Updates →
          </Link>
        </div>
      </section>

      {/* ===== POPULAR RIGHT NOW ===== */}
      <section className="section container">
        <p className="section-label">Popular Right Now</p>
        <h2 className="heading-2" style={{ marginBottom: 'var(--space-6)' }}>Top-Rated AI Tools</h2>

        <div className="grid grid-4 stagger">
          {featured.slice(0, 8).map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: 'var(--space-6)' }}>
          <Link href="/explore?sort=highest-rated" className="btn btn-secondary">
            Explore All Tools →
          </Link>
        </div>
      </section>

      {/* ===== NEW THIS WEEK ===== */}
      <section className="section container">
        <div className="flex items-center justify-between" style={{ marginBottom: 'var(--space-6)' }}>
          <div>
            <p className="section-label">New This Week</p>
            <h2 className="heading-2">Recently Discovered</h2>
          </div>
          <Link href="/new" className="btn btn-ghost hide-mobile">
            View All →
          </Link>
        </div>

        <div className="h-scroll">
          {categories.slice(0, 10).map((cat) => (
            <Link
              key={cat.id}
              href={`/explore?category=${cat.id}`}
              className="chip"
            >
              {cat.icon} {cat.name}
            </Link>
          ))}
        </div>

        <div className="grid grid-4 stagger" style={{ marginTop: 'var(--space-6)' }}>
          {newTools.slice(0, 8).map((tool) => (
            <ToolCard key={tool.id} tool={tool} compact />
          ))}
        </div>
      </section>

      {/* ===== AI BY PROFESSION ===== */}
      <section className="section" style={{ background: 'var(--bg-secondary)', padding: 'var(--space-16) 0' }}>
        <div className="container">
          <div className="text-center" style={{ marginBottom: 'var(--space-10)' }}>
            <p className="section-label">AI For Your Profession</p>
            <h2 className="heading-2">Find AI tools made for <span className="text-gradient">you</span></h2>
            <p className="text-muted" style={{ marginTop: 'var(--space-3)', maxWidth: '500px', margin: 'var(--space-3) auto 0' }}>
              Instead of browsing thousands of tools, discover what AI can do specifically for your work.
            </p>
          </div>

          <div className="grid grid-4 stagger">
            {professions.slice(0, 12).map((prof) => (
              <Link
                key={prof.id}
                href={`/professions/${prof.slug}`}
                className="card card-interactive card-glow-cyan"
                style={{ textAlign: 'center' }}
              >
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <div style={{ fontSize: '2.5rem', marginBottom: 'var(--space-3)' }}>{prof.icon}</div>
                  <h3 style={{ fontSize: 'var(--text-base)', fontWeight: 600, marginBottom: 'var(--space-1)' }}>
                    {prof.name}
                  </h3>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-tertiary)' }}>
                    {prof.toolCount} tools
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: 'var(--space-8)' }}>
            <Link href="/professions" className="btn btn-primary">
              Browse All Professions →
            </Link>
          </div>
        </div>
      </section>

      {/* ===== WAMA PICKS ===== */}
      <section className="section container">
        <p className="section-label">WAMA Picks</p>
        <h2 className="heading-2" style={{ marginBottom: 'var(--space-6)' }}>Editorial Recommendations</h2>

        <div className="grid grid-4 stagger">
          {editorPicks.map((pick) => {
            const tool = tools.find((t) => t.id === pick.toolId);
            if (!tool) return null;
            return (
              <Link key={pick.toolId} href={`/tools/${tool.slug}`} className="card card-interactive card-glow-violet">
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <span className="badge badge-accent" style={{ marginBottom: 'var(--space-3)', display: 'inline-flex' }}>
                    {pick.label}
                  </span>
                  <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 600, marginBottom: 'var(--space-1)' }}>
                    {tool.name}
                  </h3>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', marginBottom: 'var(--space-3)' }}>
                    {pick.sublabel}
                  </p>
                  <RadarScore score={tool.evaluation.radarScore} size={50} />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ===== TRENDING ===== */}
      <section className="section container">
        <p className="section-label">🔥 Trending</p>
        <h2 className="heading-2" style={{ marginBottom: 'var(--space-6)' }}>Gaining Attention</h2>

        <div className="grid grid-3 stagger">
          {trending.slice(0, 6).map((tool, i) => (
            <Link key={tool.id} href={`/tools/${tool.slug}`} className="card card-interactive card-glow-cyan">
              <div className="flex items-center gap-4" style={{ position: 'relative', zIndex: 1 }}>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-3xl)',
                  fontWeight: 800,
                  color: 'var(--text-tertiary)',
                  opacity: 0.4,
                  lineHeight: 1,
                  minWidth: '40px',
                }}>
                  #{i + 1}
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: 'var(--text-base)', fontWeight: 600 }}>{tool.name}</h3>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
                    {tool.shortDescription}
                  </p>
                </div>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-sm)',
                  fontWeight: 600,
                  color: tool.trendingChange > 0 ? 'var(--accent-green)' : 'var(--accent-red)',
                }}>
                  {tool.trendingChange > 0 ? '+' : ''}{tool.trendingChange}%
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ===== LATEST REPORTS ===== */}
      <section className="section container">
        <div className="flex items-center justify-between" style={{ marginBottom: 'var(--space-6)' }}>
          <div>
            <p className="section-label">Reports</p>
            <h2 className="heading-2">Latest Intelligence</h2>
          </div>
          <Link href="/reports" className="btn btn-ghost hide-mobile">
            View All →
          </Link>
        </div>

        <div className="grid grid-2 stagger">
          {reports.map((report) => (
            <Link key={report.id} href={`/reports`} className="card card-interactive card-glow-violet">
              <div style={{ position: 'relative', zIndex: 1 }}>
                <div className="flex items-center gap-2" style={{ marginBottom: 'var(--space-3)' }}>
                  <span className="badge badge-accent">{report.readTime}</span>
                  <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>
                    {formatDate(report.date)}
                  </span>
                </div>
                <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 600, marginBottom: 'var(--space-2)' }}>
                  {report.title}
                </h3>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  {report.summary}
                </p>
                <div className="flex flex-wrap gap-1" style={{ marginTop: 'var(--space-3)' }}>
                  {report.tags.map((tag) => (
                    <span key={tag} className="badge badge-default">#{tag}</span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="container" style={{ textAlign: 'center', padding: 'var(--space-16) 0' }}>
        <h2 className="heading-2" style={{ marginBottom: 'var(--space-3)' }}>
          Know an AI tool we&apos;re missing?
        </h2>
        <p className="text-muted" style={{ marginBottom: 'var(--space-6)' }}>
          Help us build the most comprehensive AI database.
        </p>
        <Link href="/submit" className="btn btn-primary btn-lg">
          Submit a Tool
        </Link>
      </section>
    </div>
  );
}
