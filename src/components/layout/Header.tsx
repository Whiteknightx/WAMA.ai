'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/explore', label: 'Explore' },
  { href: '/categories', label: 'Categories' },
  { href: '/professions', label: 'For You' },
  { href: '/new', label: 'New' },
  { href: '/trending', label: 'Trending' },
  { href: '/compare', label: 'Compare' },
  { href: '/reports', label: 'Reports' },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const isAdmin = pathname?.startsWith('/admin');
  if (isAdmin) return null;

  return (
    <header className="header">
      <div className="header-inner container-wide">
        <Link href="/" className="header-logo">
          <span className="header-logo-icon">◉</span>
          <span className="header-logo-text">
            <span className="text-gradient">WAMA</span>
          </span>
        </Link>

        <nav className="header-nav hide-mobile">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`header-nav-link ${pathname === link.href ? 'header-nav-link-active' : ''}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          <button
            className="header-search-toggle btn-icon btn-ghost"
            onClick={() => setSearchOpen(!searchOpen)}
            aria-label="Search"
          >
            🔍
          </button>

          <Link href="/submit" className="btn btn-primary btn-sm hide-mobile">
            Submit Tool
          </Link>

          <button
            className="header-hamburger hide-desktop"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            <span className={`hamburger-line ${mobileOpen ? 'open' : ''}`} />
            <span className={`hamburger-line ${mobileOpen ? 'open' : ''}`} />
            <span className={`hamburger-line ${mobileOpen ? 'open' : ''}`} />
          </button>
        </div>
      </div>

      {/* Search Overlay */}
      {searchOpen && (
        <div className="header-search-overlay animate-fade-in-down" style={{ animation: 'fadeInDown 0.2s ease' }}>
          <div className="container">
            <div className="search-input-wrapper">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                className="input input-lg"
                placeholder="Search AI tools, categories, professions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && searchQuery.trim()) {
                    window.location.href = `/explore?search=${encodeURIComponent(searchQuery)}`;
                    setSearchOpen(false);
                  }
                  if (e.key === 'Escape') setSearchOpen(false);
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="header-mobile-menu animate-fade-in">
          <nav className="header-mobile-nav">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="header-mobile-link"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/submit"
              className="btn btn-primary w-full"
              onClick={() => setMobileOpen(false)}
            >
              Submit Tool
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
