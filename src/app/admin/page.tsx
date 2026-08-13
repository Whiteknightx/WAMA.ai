import { getTools, getUpdates, getReports } from '@/lib/data';
import Link from 'next/link';

export default function AdminDashboard() {
  const tools = getTools();
  const updates = getUpdates();
  const reports = getReports();

  const stats = [
    { label: 'Total Tools', value: tools.length, icon: '🔧', color: 'var(--accent-cyan)' },
    { label: 'New Today', value: updates.filter((u) => u.date >= '2026-08-14').length, icon: '🆕', color: 'var(--accent-green)' },
    { label: 'Updates Today', value: updates.filter((u) => u.date >= '2026-08-13').length, icon: '🔄', color: 'var(--accent-violet)' },
    { label: 'Needs Review', value: 12, icon: '⚠️', color: 'var(--accent-orange)' },
    { label: 'Test Queue', value: 5, icon: '🧪', color: 'var(--accent-pink)' },
    { label: 'Reports', value: reports.length, icon: '📊', color: 'var(--accent-yellow)' },
  ];

  const healthChecks = [
    { label: 'Discovery Health', status: 'healthy', detail: '37 items found today' },
    { label: 'Source Health', status: 'healthy', detail: 'All 12 sources active' },
    { label: 'Database Health', status: 'healthy', detail: `${tools.length} tools indexed` },
    { label: 'Automation Health', status: 'warning', detail: '2 pipelines need attention' },
  ];

  const recentUpdates = updates.slice(0, 5);

  return (
    <div>
      <div style={{ marginBottom: 'var(--space-8)' }}>
        <h1 className="heading-2">Dashboard</h1>
        <p className="text-muted" style={{ marginTop: 'var(--space-1)' }}>Welcome back. Here&apos;s what&apos;s happening.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-3" style={{ marginBottom: 'var(--space-8)', gap: 'var(--space-4)' }}>
        {stats.map((stat) => (
          <div key={stat.label} className="card card-compact">
            <div className="flex items-center justify-between" style={{ position: 'relative', zIndex: 1 }}>
              <div>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 'var(--space-1)' }}>
                  {stat.label}
                </p>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-3xl)', fontWeight: 700, color: stat.color }}>
                  {stat.value.toLocaleString()}
                </p>
              </div>
              <span style={{ fontSize: '2rem' }}>{stat.icon}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Health + Activity */}
      <div className="grid grid-2" style={{ gap: 'var(--space-6)' }}>
        {/* Health Checks */}
        <div className="card">
          <div style={{ position: 'relative', zIndex: 1 }}>
            <h3 style={{ fontSize: 'var(--text-base)', fontWeight: 600, marginBottom: 'var(--space-4)' }}>
              System Health
            </h3>
            {healthChecks.map((check) => (
              <div key={check.label} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 'var(--space-3) 0',
                borderBottom: '1px solid var(--border-subtle)',
              }}>
                <div className="flex items-center gap-3">
                  <div style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: check.status === 'healthy' ? 'var(--accent-green)' : 'var(--accent-orange)',
                    boxShadow: `0 0 6px ${check.status === 'healthy' ? 'rgba(34, 197, 94, 0.4)' : 'rgba(249, 115, 22, 0.4)'}`,
                  }} />
                  <span style={{ fontSize: 'var(--text-sm)', fontWeight: 500 }}>{check.label}</span>
                </div>
                <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>{check.detail}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="card">
          <div style={{ position: 'relative', zIndex: 1 }}>
            <h3 style={{ fontSize: 'var(--text-base)', fontWeight: 600, marginBottom: 'var(--space-4)' }}>
              Recent Activity
            </h3>
            {recentUpdates.map((update) => (
              <div key={update.id} style={{
                display: 'flex',
                gap: 'var(--space-3)',
                padding: 'var(--space-3) 0',
                borderBottom: '1px solid var(--border-subtle)',
              }}>
                <span>{update.icon}</span>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 'var(--text-sm)', fontWeight: 500 }}>{update.toolName}</p>
                  <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>{update.title}</p>
                </div>
                <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', whiteSpace: 'nowrap' }}>{update.date}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div style={{ marginTop: 'var(--space-8)' }}>
        <h3 style={{ fontSize: 'var(--text-base)', fontWeight: 600, marginBottom: 'var(--space-4)' }}>Quick Actions</h3>
        <div className="flex flex-wrap gap-3">
          <Link href="/admin/inbox" className="btn btn-primary">
            Review Inbox (12)
          </Link>
          <Link href="/admin/tools" className="btn btn-secondary">
            Manage Tools
          </Link>
          <Link href="/admin/sources" className="btn btn-secondary">
            Check Sources
          </Link>
        </div>
      </div>
    </div>
  );
}
