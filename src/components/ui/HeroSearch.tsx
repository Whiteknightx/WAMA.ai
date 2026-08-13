'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function HeroSearch() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/explore?search=${encodeURIComponent(query.trim())}`);
    } else {
      router.push('/explore');
    }
  };

  return (
    <form onSubmit={handleSearch} style={{ maxWidth: '560px', margin: '0 auto 2rem' }}>
      <div className="search-input-wrapper">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          className="input input-lg"
          placeholder="Search AI tools (e.g. video, code, 3D)..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ paddingLeft: '3.2rem', paddingRight: '6rem' }}
        />
        <button
          type="submit"
          className="btn btn-primary btn-sm"
          style={{
            position: 'absolute',
            right: '8px',
            top: '50%',
            transform: 'translateY(-50%)',
            borderRadius: 'var(--radius-md)',
          }}
        >
          Search
        </button>
      </div>
    </form>
  );
}
