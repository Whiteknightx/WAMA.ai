'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { getTools, getPricingLabel, type Tool } from '@/lib/data';
import RadarScore from '@/components/ui/RadarScore';

function CompareContent() {
  const searchParams = useSearchParams();
  const initialToolsParam = searchParams?.get('tools');
  const initialTools = initialToolsParam ? initialToolsParam.split(',') : [];

  const tools = getTools();
  const [selected, setSelected] = useState<string[]>(initialTools);
  const [searchQuery, setSearchQuery] = useState('');

  const addTool = (slug: string) => {
    if (selected.length < 4 && !selected.includes(slug)) {
      setSelected([...selected, slug]);
    }
    setSearchQuery('');
  };

  const removeTool = (slug: string) => {
    setSelected(selected.filter((s) => s !== slug));
  };

  const selectedTools = selected
    .map((slug) => tools.find((t) => t.slug === slug))
    .filter(Boolean) as Tool[];

  const filteredTools = searchQuery
    ? tools.filter(
        (t) =>
          t.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !selected.includes(t.slug)
      )
    : [];

  const comparisonFields = [
    { label: 'Type', getValue: (t: Tool) => t.type },
    { label: 'Pricing', getValue: (t: Tool) => getPricingLabel(t.pricing.model) },
    { label: 'Free Tier', getValue: (t: Tool) => t.pricing.freeTier ? '✓' : '✕' },
    { label: 'Platforms', getValue: (t: Tool) => t.platforms.join(', ') },
    { label: 'API', getValue: (t: Tool) => t.capabilities.api ? '✓' : '✕' },
    { label: 'Commercial Use', getValue: (t: Tool) => t.pricing.commercialRights ? '✓' : '✕' },
    { label: 'Open Source', getValue: (t: Tool) => t.openSource ? '✓' : '✕' },
    { label: 'WAMA Score', getValue: (t: Tool) => String(t.evaluation.radarScore) },
    { label: 'Capability', getValue: (t: Tool) => String(t.evaluation.capability) },
    { label: 'Quality', getValue: (t: Tool) => String(t.evaluation.quality) },
    { label: 'Ease of Use', getValue: (t: Tool) => String(t.evaluation.easeOfUse) },
    { label: 'Value', getValue: (t: Tool) => String(t.evaluation.value) },
    { label: 'Best For', getValue: (t: Tool) => t.bestFor.slice(0, 3).join(', ') },
  ];

  return (
    <div className="page">
      <div className="container">
        <div style={{ marginBottom: 'var(--space-8)' }}>
          <p className="section-label">Compare</p>
          <h1 className="heading-1">Compare AI Tools</h1>
          <p className="text-muted" style={{ marginTop: 'var(--space-2)' }}>
            Select up to 4 tools to compare side by side.
          </p>
        </div>

        {/* Tool Selector */}
        <div className="card" style={{ marginBottom: 'var(--space-8)' }}>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div className="flex flex-wrap gap-3 items-center">
              {selectedTools.map((tool) => (
                <div key={tool.slug} className="chip chip-active">
                  {tool.name}
                  <button onClick={() => removeTool(tool.slug)} style={{ marginLeft: '4px', cursor: 'pointer', background: 'none', border: 'none', color: 'inherit' }}>✕</button>
                </div>
              ))}

              {selected.length < 4 && (
                <div style={{ position: 'relative', flex: 1, minWidth: '200px' }}>
                  <input
                    type="text"
                    className="input"
                    placeholder="Search to add a tool..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  {filteredTools.length > 0 && (
                    <div className="compare-dropdown">
                      {filteredTools.slice(0, 6).map((t) => (
                        <button
                          key={t.slug}
                          className="compare-dropdown-item"
                          onClick={() => addTool(t.slug)}
                        >
                          <span style={{ fontWeight: 500 }}>{t.name}</span>
                          <span style={{ color: 'var(--text-tertiary)', fontSize: 'var(--text-xs)' }}>{t.type}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Comparison Table */}
        {selectedTools.length >= 2 ? (
          <div className="table-wrapper">
            <table className="table">
              <thead>
                <tr>
                  <th style={{ minWidth: '140px' }}>Feature</th>
                  {selectedTools.map((tool) => (
                    <th key={tool.slug} style={{ textAlign: 'center' }}>
                      <div className="flex flex-col items-center gap-2">
                        <div style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: 'var(--radius-md)',
                          background: 'var(--gradient-primary)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 700,
                        }}>
                          {tool.name.charAt(0)}
                        </div>
                        <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{tool.name}</span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonFields.map((field) => (
                  <tr key={field.label}>
                    <td style={{ fontWeight: 500, color: 'var(--text-secondary)' }}>{field.label}</td>
                    {selectedTools.map((tool) => {
                      const value = field.getValue(tool);
                      return (
                        <td key={tool.slug} style={{ textAlign: 'center' }}>
                          <span style={{
                            color: value === '✓' ? 'var(--accent-green)' : value === '✕' ? 'var(--text-tertiary)' : 'var(--text-primary)',
                            fontWeight: value === '✓' || value === '✕' ? 600 : 400,
                            fontSize: value === '✓' || value === '✕' ? 'var(--text-lg)' : 'var(--text-sm)',
                          }}>
                            {value}
                          </span>
                        </td>
                      );
                    })}
                  </tr>
                ))}
                {/* WAMA Score Row with visual */}
                <tr>
                  <td style={{ fontWeight: 500, color: 'var(--text-secondary)' }}>WAMA Score</td>
                  {selectedTools.map((tool) => (
                    <td key={tool.slug} style={{ textAlign: 'center' }}>
                      <div className="flex justify-center">
                        <RadarScore score={tool.evaluation.radarScore} size={56} />
                      </div>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-state-icon">⚖️</div>
            <h3 style={{ marginBottom: 'var(--space-2)' }}>Select at least 2 tools to compare</h3>
            <p>Use the search above to add tools to the comparison.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ComparePage() {
  return (
    <Suspense fallback={<div className="page"><div className="container"><p className="text-muted">Loading compare...</p></div></div>}>
      <CompareContent />
    </Suspense>
  );
}
