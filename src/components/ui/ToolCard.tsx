import Link from 'next/link';
import type { Tool } from '@/lib/data';
import { getPricingLabel } from '@/lib/data';
import RadarScore from './RadarScore';

interface ToolCardProps {
  tool: Tool;
  compact?: boolean;
}

export default function ToolCard({ tool, compact = false }: ToolCardProps) {
  const pricingBadgeClass = `badge badge-${tool.pricing.model === 'free' ? 'free' : tool.pricing.model === 'freemium' ? 'freemium' : 'paid'}`;

  return (
    <Link href={`/tools/${tool.slug}`} className={`tool-card card card-interactive card-glow-cyan ${compact ? 'card-compact' : ''}`}>
      <div className="tool-card-inner">
        <div className="tool-card-header">
          <div className="tool-card-logo">
            {tool.name.charAt(0)}
          </div>
          <div className="tool-card-meta">
            <h3 className="tool-card-name">{tool.name}</h3>
            <span className="tool-card-type">{tool.type}</span>
          </div>
          {!compact && (
            <div className="tool-card-score">
              <RadarScore score={tool.evaluation.radarScore} size={44} />
            </div>
          )}
        </div>

        <p className="tool-card-description">
          {tool.shortDescription}
        </p>

        <div className="tool-card-tags">
          {tool.categories.slice(0, 2).map((cat) => (
            <span key={cat} className="badge badge-default">{cat}</span>
          ))}
          <span className={pricingBadgeClass}>
            {getPricingLabel(tool.pricing.model)}
          </span>
          {tool.trending && (
            <span className="badge badge-trending">🔥 Trending</span>
          )}
          {tool.tested && (
            <span className="badge badge-tested">✓ Tested</span>
          )}
        </div>

        {!compact && tool.platforms.length > 0 && (
          <div className="tool-card-platforms">
            {tool.platforms.slice(0, 4).map((p) => (
              <span key={p} className="tool-card-platform">{p}</span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
