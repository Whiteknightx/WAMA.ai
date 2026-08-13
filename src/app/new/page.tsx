import Link from 'next/link';
import { getUpdates, getNewTools, formatDate } from '@/lib/data';
import ToolCard from '@/components/ui/ToolCard';
import FeedItem from '@/components/ui/FeedItem';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'New AI Tools & Updates — WAMA',
  description: 'Discover newly launched AI tools and the latest updates to existing tools.',
};

export default function NewPage() {
  const updates = getUpdates();
  const newTools = getNewTools();

  // Group updates by date proximity
  const today = new Date().toISOString().split('T')[0];
  const todayUpdates = updates.filter((u) => u.date === today || u.date >= '2026-08-13');
  const thisWeekUpdates = updates.filter((u) => u.date < '2026-08-13' && u.date >= '2026-08-07');
  const olderUpdates = updates.filter((u) => u.date < '2026-08-07');

  return (
    <div className="page">
      <div className="container">
        <div style={{ marginBottom: 'var(--space-8)' }}>
          <p className="section-label">New & Updated</p>
          <h1 className="heading-1">Latest AI Developments</h1>
          <p className="text-muted" style={{ marginTop: 'var(--space-2)' }}>
            Stay up to date with newly discovered AI tools and recent updates.
          </p>
        </div>

        {/* Today */}
        {todayUpdates.length > 0 && (
          <section style={{ marginBottom: 'var(--space-10)' }}>
            <h2 className="heading-3" style={{ marginBottom: 'var(--space-4)' }}>
              Today
            </h2>
            <div className="grid grid-2 stagger" style={{ gap: 'var(--space-3)' }}>
              {todayUpdates.map((u) => (
                <FeedItem key={u.id} update={u} />
              ))}
            </div>
          </section>
        )}

        {/* This Week */}
        {thisWeekUpdates.length > 0 && (
          <section style={{ marginBottom: 'var(--space-10)' }}>
            <h2 className="heading-3" style={{ marginBottom: 'var(--space-4)' }}>
              This Week
            </h2>
            <div className="grid grid-2 stagger" style={{ gap: 'var(--space-3)' }}>
              {thisWeekUpdates.map((u) => (
                <FeedItem key={u.id} update={u} />
              ))}
            </div>
          </section>
        )}

        {/* Earlier */}
        {olderUpdates.length > 0 && (
          <section style={{ marginBottom: 'var(--space-10)' }}>
            <h2 className="heading-3" style={{ marginBottom: 'var(--space-4)' }}>
              Earlier
            </h2>
            <div className="grid grid-2 stagger" style={{ gap: 'var(--space-3)' }}>
              {olderUpdates.map((u) => (
                <FeedItem key={u.id} update={u} />
              ))}
            </div>
          </section>
        )}

        <div className="divider" />

        {/* New Tools */}
        <section>
          <h2 className="heading-3" style={{ marginBottom: 'var(--space-6)' }}>
            Recently Updated Tools
          </h2>
          <div className="grid grid-4 stagger">
            {newTools.slice(0, 12).map((tool) => (
              <ToolCard key={tool.id} tool={tool} compact />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
