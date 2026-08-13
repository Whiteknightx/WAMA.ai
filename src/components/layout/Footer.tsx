import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link href="/" className="footer-logo">
              <span className="footer-logo-icon">◉</span>
              <span className="footer-logo-text">
                <span className="text-gradient">WAMA</span>
              </span>
            </Link>
            <p className="footer-tagline">
              Where AI Meets Application.
            </p>
          </div>

          <div className="footer-col">
            <h4 className="footer-col-title">Explore</h4>
            <Link href="/explore" className="footer-link">All Tools</Link>
            <Link href="/categories" className="footer-link">Categories</Link>
            <Link href="/professions" className="footer-link">Professions</Link>
            <Link href="/new" className="footer-link">New</Link>
            <Link href="/trending" className="footer-link">Trending</Link>
            <Link href="/compare" className="footer-link">Compare</Link>
          </div>

          <div className="footer-col">
            <h4 className="footer-col-title">Resources</h4>
            <Link href="/reports" className="footer-link">Reports</Link>
            <span className="footer-link footer-coming-soon">AI Guides <span className="badge badge-default" style={{ fontSize: '0.65rem', padding: '1px 6px' }}>Soon</span></span>
            <span className="footer-link footer-coming-soon">AI Workflows <span className="badge badge-default" style={{ fontSize: '0.65rem', padding: '1px 6px' }}>Soon</span></span>
            <span className="footer-link footer-coming-soon">Newsletter <span className="badge badge-default" style={{ fontSize: '0.65rem', padding: '1px 6px' }}>Soon</span></span>
          </div>

          <div className="footer-col">
            <h4 className="footer-col-title">Community</h4>
            <Link href="/submit" className="footer-link">Submit a Tool</Link>
            <span className="footer-link footer-coming-soon">Discord <span className="badge badge-default" style={{ fontSize: '0.65rem', padding: '1px 6px' }}>Soon</span></span>
            <span className="footer-link footer-coming-soon">YouTube <span className="badge badge-default" style={{ fontSize: '0.65rem', padding: '1px 6px' }}>Soon</span></span>
          </div>

          <div className="footer-col">
            <h4 className="footer-col-title">Company</h4>
            <span className="footer-link">About</span>
            <span className="footer-link">Contact</span>
            <span className="footer-link">Privacy</span>
            <span className="footer-link">Terms</span>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            © 2026 WAMA. All rights reserved.
          </p>
          <p className="footer-built">
            Where AI Meets Application.
          </p>
        </div>
      </div>
    </footer>
  );
}
