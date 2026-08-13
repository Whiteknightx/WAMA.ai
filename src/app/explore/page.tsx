'use client';

import { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { filterTools, getCategories, getProfessions } from '@/lib/data';
import ToolCard from '@/components/ui/ToolCard';

const typeOptions = ['AI Tool', 'AI Model', 'AI Agent', 'AI Platform'];
const pricingOptions = ['free', 'freemium', 'paid'];
const platformOptions = ['Web', 'Windows', 'macOS', 'Linux', 'iOS', 'Android'];
const sortOptions = [
  { value: 'recommended', label: 'Recommended' },
  { value: 'newest', label: 'Newest' },
  { value: 'trending', label: 'Trending' },
  { value: 'highest-rated', label: 'Highest Rated' },
  { value: 'best-value', label: 'Best Value' },
];

function ExploreContent() {
  const searchParams = useSearchParams();
  const categories = getCategories();
  const professions = getProfessions();

  const [selectedCategory, setSelectedCategory] = useState(searchParams?.get('category') || '');
  const [selectedProfession, setSelectedProfession] = useState(searchParams?.get('profession') || '');
  const [selectedType, setSelectedType] = useState('');
  const [selectedPricing, setSelectedPricing] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState('');
  const [sort, setSort] = useState(searchParams?.get('sort') || 'recommended');
  const [search, setSearch] = useState(searchParams?.get('search') || '');

  const results = useMemo(() => {
    return filterTools({
      category: selectedCategory,
      profession: selectedProfession,
      type: selectedType ? selectedType.toLowerCase().replace(/\s+/g, '-') : undefined,
      pricing: selectedPricing,
      platform: selectedPlatform,
      search,
      sort,
    });
  }, [selectedCategory, selectedProfession, selectedType, selectedPricing, selectedPlatform, search, sort]);

  const clearFilters = () => {
    setSelectedCategory('');
    setSelectedProfession('');
    setSelectedType('');
    setSelectedPricing('');
    setSelectedPlatform('');
    setSearch('');
  };

  const hasFilters = selectedCategory || selectedProfession || selectedType || selectedPricing || selectedPlatform || search;

  return (
    <div className="page">
      <div className="container">
        <div style={{ marginBottom: 'var(--space-8)' }}>
          <p className="section-label">Explore</p>
          <h1 className="heading-1">AI Tools Directory</h1>
          <p className="text-muted" style={{ marginTop: 'var(--space-2)' }}>
            Browse {results.length} AI tools across every category and profession.
          </p>
        </div>

        <div className="explore-layout">
          {/* Sidebar Filters */}
          <aside className="explore-sidebar hide-mobile">
            <div className="explore-search" style={{ marginBottom: 'var(--space-6)' }}>
              <div className="search-input-wrapper">
                <span className="search-icon">🔍</span>
                <input
                  type="text"
                  className="input"
                  placeholder="Search tools..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            {/* Sort */}
            <div className="filter-group">
              <h4 className="filter-title">Sort By</h4>
              <select
                className="input"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                {sortOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>

            {/* Type */}
            <div className="filter-group">
              <h4 className="filter-title">Type</h4>
              {typeOptions.map((type) => (
                <label key={type} className="filter-checkbox">
                  <input
                    type="radio"
                    name="type"
                    checked={selectedType === type}
                    onChange={() => setSelectedType(selectedType === type ? '' : type)}
                  />
                  <span>{type}</span>
                </label>
              ))}
            </div>

            {/* Category */}
            <div className="filter-group">
              <h4 className="filter-title">Category</h4>
              {categories.map((cat) => (
                <label key={cat.id} className="filter-checkbox">
                  <input
                    type="radio"
                    name="category"
                    checked={selectedCategory === cat.id}
                    onChange={() => setSelectedCategory(selectedCategory === cat.id ? '' : cat.id)}
                  />
                  <span>{cat.icon} {cat.name}</span>
                </label>
              ))}
            </div>

            {/* Pricing */}
            <div className="filter-group">
              <h4 className="filter-title">Pricing</h4>
              {pricingOptions.map((p) => (
                <label key={p} className="filter-checkbox">
                  <input
                    type="radio"
                    name="pricing"
                    checked={selectedPricing === p}
                    onChange={() => setSelectedPricing(selectedPricing === p ? '' : p)}
                  />
                  <span style={{ textTransform: 'capitalize' }}>{p}</span>
                </label>
              ))}
            </div>

            {/* Platform */}
            <div className="filter-group">
              <h4 className="filter-title">Platform</h4>
              {platformOptions.map((p) => (
                <label key={p} className="filter-checkbox">
                  <input
                    type="radio"
                    name="platform"
                    checked={selectedPlatform === p}
                    onChange={() => setSelectedPlatform(selectedPlatform === p ? '' : p)}
                  />
                  <span>{p}</span>
                </label>
              ))}
            </div>

            {hasFilters && (
              <button className="btn btn-ghost w-full" onClick={clearFilters} style={{ marginTop: 'var(--space-4)' }}>
                Clear All Filters
              </button>
            )}
          </aside>

          {/* Results */}
          <div className="explore-results">
            {/* Active filters */}
            {hasFilters && (
              <div className="flex flex-wrap gap-2" style={{ marginBottom: 'var(--space-4)' }}>
                {selectedCategory && (
                  <button className="chip chip-active" onClick={() => setSelectedCategory('')}>
                    {categories.find(c => c.id === selectedCategory)?.icon} {selectedCategory} ✕
                  </button>
                )}
                {selectedType && (
                  <button className="chip chip-active" onClick={() => setSelectedType('')}>
                    {selectedType} ✕
                  </button>
                )}
                {selectedPricing && (
                  <button className="chip chip-active" onClick={() => setSelectedPricing('')}>
                    {selectedPricing} ✕
                  </button>
                )}
                {selectedPlatform && (
                  <button className="chip chip-active" onClick={() => setSelectedPlatform('')}>
                    {selectedPlatform} ✕
                  </button>
                )}
                {search && (
                  <button className="chip chip-active" onClick={() => setSearch('')}>
                    &quot;{search}&quot; ✕
                  </button>
                )}
              </div>
            )}

            <p className="text-muted" style={{ marginBottom: 'var(--space-4)', fontSize: 'var(--text-sm)' }}>
              Showing {results.length} result{results.length !== 1 ? 's' : ''}
            </p>

            {results.length > 0 ? (
              <div className="grid grid-3">
                {results.map((tool) => (
                  <ToolCard key={tool.id} tool={tool} />
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <div className="empty-state-icon">🔍</div>
                <h3 style={{ marginBottom: 'var(--space-2)' }}>No tools found</h3>
                <p>Try adjusting your filters or search query.</p>
                <button className="btn btn-secondary" onClick={clearFilters} style={{ marginTop: 'var(--space-4)' }}>
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ExplorePage() {
  return (
    <Suspense fallback={<div className="page"><div className="container"><p className="text-muted">Loading explore...</p></div></div>}>
      <ExploreContent />
    </Suspense>
  );
}
