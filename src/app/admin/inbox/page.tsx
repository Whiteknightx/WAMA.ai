'use client';

import { useState } from 'react';

interface DiscoveryItem {
  id: string;
  name: string;
  source: string;
  url: string;
  category: string;
  profession: string;
  confidence: number;
  discovered: string;
  status: 'pending' | 'approved' | 'rejected';
}

const mockDiscoveries: DiscoveryItem[] = [
  { id: '1', name: 'CodeWeaver AI', source: 'Product Hunt', url: 'https://codeweaver.ai', category: 'Coding', profession: 'Programmer', confidence: 92, discovered: '2026-08-14', status: 'pending' },
  { id: '2', name: 'VoicePro Studio', source: 'Hacker News', url: 'https://voicepro.studio', category: 'Voice', profession: 'YouTuber', confidence: 87, discovered: '2026-08-14', status: 'pending' },
  { id: '3', name: 'PixelForge', source: 'GitHub', url: 'https://github.com/pixelforge', category: 'Image', profession: 'Game Developer', confidence: 78, discovered: '2026-08-14', status: 'pending' },
  { id: '4', name: 'DataMind Pro', source: 'Product Hunt', url: 'https://datamind.pro', category: 'Data', profession: 'Researcher', confidence: 85, discovered: '2026-08-13', status: 'pending' },
  { id: '5', name: 'DesignSpark AI', source: 'Twitter/X', url: 'https://designspark.ai', category: 'Design', profession: 'Designer', confidence: 90, discovered: '2026-08-13', status: 'pending' },
  { id: '6', name: 'WriteFlow', source: 'Newsletter', url: 'https://writeflow.app', category: 'Writing', profession: 'Writer', confidence: 73, discovered: '2026-08-13', status: 'pending' },
  { id: '7', name: 'BuildBot', source: 'Reddit', url: 'https://buildbot.dev', category: 'Agents', profession: 'Engineer', confidence: 81, discovered: '2026-08-12', status: 'pending' },
  { id: '8', name: 'MusicGen Pro', source: 'Product Hunt', url: 'https://musicgenpro.com', category: 'Music', profession: 'Musician', confidence: 88, discovered: '2026-08-12', status: 'pending' },
];

export default function AdminInboxPage() {
  const [items, setItems] = useState(mockDiscoveries);

  const handleAction = (id: string, action: 'approved' | 'rejected') => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: action } : item))
    );
  };

  const pending = items.filter((i) => i.status === 'pending');
  const processed = items.filter((i) => i.status !== 'pending');

  return (
    <div>
      <div style={{ marginBottom: 'var(--space-6)' }}>
        <h1 className="heading-2">Discovery Inbox</h1>
        <p className="text-muted" style={{ marginTop: 'var(--space-1)' }}>
          {pending.length} items pending review
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        {pending.map((item) => (
          <div key={item.id} className="card" style={{ borderLeftWidth: 3, borderLeftColor: `hsl(${item.confidence * 1.2}, 70%, 50%)` }}>
            <div className="flex items-start justify-between" style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ flex: 1 }}>
                <div className="flex items-center gap-3" style={{ marginBottom: 'var(--space-2)' }}>
                  <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 600 }}>{item.name}</h3>
                  <span className="badge badge-default">{item.source}</span>
                </div>
                <a href={item.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: 'var(--text-sm)', color: 'var(--text-accent)', marginBottom: 'var(--space-3)', display: 'block' }}>
                  {item.url}
                </a>
                <div className="flex gap-4" style={{ fontSize: 'var(--text-sm)' }}>
                  <span><span style={{ color: 'var(--text-tertiary)' }}>Category:</span> {item.category}</span>
                  <span><span style={{ color: 'var(--text-tertiary)' }}>Profession:</span> {item.profession}</span>
                  <span><span style={{ color: 'var(--text-tertiary)' }}>Confidence:</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, color: item.confidence >= 85 ? 'var(--accent-green)' : 'var(--accent-orange)', marginLeft: '4px' }}>
                      {item.confidence}%
                    </span>
                  </span>
                </div>
              </div>

              <div className="flex gap-2">
                <button className="btn btn-primary btn-sm" onClick={() => handleAction(item.id, 'approved')}>
                  ✓ Approve
                </button>
                <button className="btn btn-secondary btn-sm" onClick={() => handleAction(item.id, 'approved')}>
                  Edit
                </button>
                <button className="btn btn-ghost btn-sm" onClick={() => handleAction(item.id, 'rejected')} style={{ color: 'var(--accent-red)' }}>
                  ✕ Reject
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {processed.length > 0 && (
        <div style={{ marginTop: 'var(--space-8)' }}>
          <h3 style={{ fontSize: 'var(--text-base)', fontWeight: 600, marginBottom: 'var(--space-4)', color: 'var(--text-tertiary)' }}>
            Recently Processed ({processed.length})
          </h3>
          {processed.map((item) => (
            <div key={item.id} style={{
              padding: 'var(--space-3) var(--space-4)',
              borderBottom: '1px solid var(--border-subtle)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              opacity: 0.5,
            }}>
              <span style={{ fontSize: 'var(--text-sm)' }}>{item.name}</span>
              <span className={`badge ${item.status === 'approved' ? 'badge-free' : 'badge-paid'}`}>
                {item.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
