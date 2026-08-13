'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const sidebarLinks = [
  { href: '/admin', label: 'Dashboard', icon: '📊' },
  { href: '/admin/tools', label: 'Tools', icon: '🔧' },
  { href: '/admin/inbox', label: 'Discovery Inbox', icon: '📥' },
  { href: '/admin/sources', label: 'Sources', icon: '🌐' },
  { href: '/admin/updates', label: 'Updates', icon: '🔄' },
  { href: '/admin/categories', label: 'Categories', icon: '📂' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-sidebar-header">
          <Link href="/admin" className="admin-logo">
            <span style={{ background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>◉</span>
            <span>WAMA</span>
          </Link>
          <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Admin
          </span>
        </div>

        <nav className="admin-nav">
          {sidebarLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`admin-nav-link ${pathname === link.href ? 'admin-nav-link-active' : ''}`}
            >
              <span>{link.icon}</span>
              <span>{link.label}</span>
            </Link>
          ))}
        </nav>

        <div className="admin-sidebar-footer">
          <Link href="/" className="admin-nav-link">
            ← Back to Site
          </Link>
        </div>
      </aside>

      <main className="admin-main">
        {children}
      </main>
    </div>
  );
}
