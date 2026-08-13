'use client';

import { useState } from 'react';
import { getTools, formatDate, getPricingLabel } from '@/lib/data';
import Link from 'next/link';
import RadarScore from '@/components/ui/RadarScore';

export default function AdminToolsPage() {
  const tools = getTools();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const filtered = tools.filter((t) => {
    if (search && !t.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (filter === 'tested' && !t.tested) return false;
    if (filter === 'featured' && !t.featured) return false;
    if (filter === 'trending' && !t.trending) return false;
    return true;
  });

  return (
    <div>
      <div className="flex items-center justify-between" style={{ marginBottom: 'var(--space-6)' }}>
        <div>
          <h1 className="heading-2">Tools Database</h1>
          <p className="text-muted" style={{ marginTop: 'var(--space-1)' }}>
            {tools.length} tools in the database
          </p>
        </div>
        <button className="btn btn-primary">+ Add Tool</button>
      </div>

      {/* Filters */}
      <div className="flex gap-3 items-center" style={{ marginBottom: 'var(--space-6)' }}>
        <div style={{ flex: 1, maxWidth: '300px' }}>
          <input
            type="text"
            className="input"
            placeholder="Search tools..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-1">
          {['all', 'tested', 'featured', 'trending'].map((f) => (
            <button
              key={f}
              className={`chip ${filter === f ? 'chip-active' : ''}`}
              onClick={() => setFilter(f)}
              style={{ textTransform: 'capitalize' }}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="table-wrapper">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Category</th>
              <th>Pricing</th>
              <th>Score</th>
              <th>Status</th>
              <th>Last Updated</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((tool) => (
              <tr key={tool.id}>
                <td>
                  <div className="flex items-center gap-3">
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: 'var(--radius-sm)',
                      background: 'var(--gradient-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 600,
                      fontSize: 'var(--text-sm)',
                      flexShrink: 0,
                    }}>
                      {tool.name.charAt(0)}
                    </div>
                    <span style={{ fontWeight: 500 }}>{tool.name}</span>
                  </div>
                </td>
                <td>
                  <span className="badge badge-default">{tool.type}</span>
                </td>
                <td style={{ textTransform: 'capitalize' }}>
                  {tool.categories[0]}
                </td>
                <td>
                  <span className={`badge badge-${tool.pricing.model === 'free' ? 'free' : tool.pricing.model === 'freemium' ? 'freemium' : 'paid'}`}>
                    {getPricingLabel(tool.pricing.model)}
                  </span>
                </td>
                <td>
                  <RadarScore score={tool.evaluation.radarScore} size={36} />
                </td>
                <td>
                  <div className="flex gap-1">
                    {tool.tested && <span className="badge badge-tested">Tested</span>}
                    {tool.trending && <span className="badge badge-trending">Trending</span>}
                    {!tool.tested && !tool.trending && <span className="badge badge-default">Active</span>}
                  </div>
                </td>
                <td style={{ color: 'var(--text-tertiary)', whiteSpace: 'nowrap' }}>
                  {formatDate(tool.lastUpdated)}
                </td>
                <td>
                  <div className="flex gap-1">
                    <Link href={`/tools/${tool.slug}`} className="btn btn-ghost btn-sm">View</Link>
                    <button className="btn btn-ghost btn-sm">Edit</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
