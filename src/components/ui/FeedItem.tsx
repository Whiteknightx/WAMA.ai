import type { Update } from '@/lib/data';
import { formatDate } from '@/lib/data';
import Link from 'next/link';

interface FeedItemProps {
  update: Update;
}

const typeStyles: Record<string, { bg: string; border: string }> = {
  new: { bg: 'rgba(34, 197, 94, 0.08)', border: 'rgba(34, 197, 94, 0.2)' },
  update: { bg: 'rgba(59, 130, 246, 0.08)', border: 'rgba(59, 130, 246, 0.2)' },
  release: { bg: 'rgba(124, 58, 237, 0.08)', border: 'rgba(124, 58, 237, 0.2)' },
  price: { bg: 'rgba(249, 115, 22, 0.08)', border: 'rgba(249, 115, 22, 0.2)' },
  trend: { bg: 'rgba(236, 72, 153, 0.08)', border: 'rgba(236, 72, 153, 0.2)' },
};

export default function FeedItem({ update }: FeedItemProps) {
  const style = typeStyles[update.type] || typeStyles.update;

  return (
    <Link
      href={`/tools/${update.toolId}`}
      className="feed-item card card-compact card-interactive"
      style={{ borderLeftColor: style.border, borderLeftWidth: 3 }}
    >
      <div className="feed-item-inner">
        <div className="feed-item-icon">{update.icon}</div>
        <div className="feed-item-content">
          <div className="feed-item-header">
            <span className="feed-item-tool">{update.toolName}</span>
            <span className="feed-item-date">{formatDate(update.date)}</span>
          </div>
          <h4 className="feed-item-title">{update.title}</h4>
          <p className="feed-item-desc">{update.description}</p>
        </div>
      </div>
    </Link>
  );
}
