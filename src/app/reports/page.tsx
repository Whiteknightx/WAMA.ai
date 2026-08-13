import Link from 'next/link';
import { getReports, formatDate } from '@/lib/data';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Reports — WAMA',
  description: 'In-depth AI industry reports, tool comparisons, and landscape analysis.',
};

export default function ReportsPage() {
  const reports = getReports();

  return (
    <div className="page">
      <div className="container">
        <div style={{ marginBottom: 'var(--space-8)' }}>
          <p className="section-label">Reports</p>
          <h1 className="heading-1">AI Intelligence Reports</h1>
          <p className="text-muted" style={{ marginTop: 'var(--space-2)' }}>
            In-depth analysis, comparisons, and landscape reports for every AI category.
          </p>
        </div>

        <div className="stagger" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          {reports.map((report) => (
            <div key={report.id} className="card card-interactive card-glow-violet">
              <div className="flex gap-6" style={{ position: 'relative', zIndex: 1 }}>
                {/* Color bar */}
                <div style={{
                  width: '4px',
                  borderRadius: 'var(--radius-full)',
                  background: 'var(--gradient-secondary)',
                  flexShrink: 0,
                }} />

                <div style={{ flex: 1 }}>
                  <div className="flex items-center gap-3" style={{ marginBottom: 'var(--space-3)' }}>
                    <span className="badge badge-accent">{report.readTime}</span>
                    <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-tertiary)' }}>
                      {formatDate(report.date)}
                    </span>
                    {report.profession && (
                      <span className="badge badge-default" style={{ textTransform: 'capitalize' }}>
                        {report.profession.replace('-', ' ')}
                      </span>
                    )}
                  </div>

                  <h2 style={{ fontSize: 'var(--text-2xl)', fontWeight: 700, marginBottom: 'var(--space-2)' }}>
                    {report.title}
                  </h2>

                  <p style={{ fontSize: 'var(--text-base)', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 'var(--space-4)' }}>
                    {report.summary}
                  </p>

                  <div className="flex items-center gap-4">
                    <div className="flex flex-wrap gap-1">
                      {report.tags.map((tag) => (
                        <span key={tag} className="badge badge-default">#{tag}</span>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {report.sections.slice(0, 4).map((section) => (
                        <span key={section} style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>
                          {section} •
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
