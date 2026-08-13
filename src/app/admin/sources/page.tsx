export default function AdminSourcesPage() {
  const sources = [
    { name: 'Product Hunt', type: 'Discovery', url: 'producthunt.com', lastChecked: '2 min ago', status: 'active', items: 847, reliability: 94 },
    { name: 'GitHub Trending', type: 'Discovery', url: 'github.com/trending', lastChecked: '5 min ago', status: 'active', items: 1243, reliability: 97 },
    { name: 'Hugging Face', type: 'Models', url: 'huggingface.co', lastChecked: '3 min ago', status: 'active', items: 2156, reliability: 96 },
    { name: 'Hacker News', type: 'Discovery', url: 'news.ycombinator.com', lastChecked: '1 min ago', status: 'active', items: 512, reliability: 85 },
    { name: 'Reddit r/artificial', type: 'Discussion', url: 'reddit.com/r/artificial', lastChecked: '10 min ago', status: 'active', items: 389, reliability: 72 },
    { name: 'AI Newsletter', type: 'Newsletter', url: 'newsletter.example.com', lastChecked: '2 hours ago', status: 'active', items: 156, reliability: 88 },
    { name: 'TechCrunch AI', type: 'News', url: 'techcrunch.com/category/ai', lastChecked: '15 min ago', status: 'active', items: 234, reliability: 91 },
    { name: 'Twitter/X Lists', type: 'Social', url: 'twitter.com', lastChecked: '8 min ago', status: 'warning', items: 78, reliability: 65 },
    { name: 'YouTube AI Channels', type: 'Video', url: 'youtube.com', lastChecked: '1 hour ago', status: 'active', items: 167, reliability: 80 },
    { name: 'RSS Feed Aggregator', type: 'RSS', url: 'feeds.example.com', lastChecked: '30 min ago', status: 'active', items: 423, reliability: 90 },
    { name: 'Official AI Blogs', type: 'Blog', url: 'various', lastChecked: '45 min ago', status: 'active', items: 198, reliability: 98 },
    { name: 'Indie Hackers', type: 'Discovery', url: 'indiehackers.com', lastChecked: '20 min ago', status: 'error', items: 67, reliability: 75 },
  ];

  return (
    <div>
      <div className="flex items-center justify-between" style={{ marginBottom: 'var(--space-6)' }}>
        <div>
          <h1 className="heading-2">Sources</h1>
          <p className="text-muted" style={{ marginTop: 'var(--space-1)' }}>
            {sources.length} sources actively monitored
          </p>
        </div>
        <button className="btn btn-primary">+ Add Source</button>
      </div>

      <div className="table-wrapper">
        <table className="table">
          <thead>
            <tr>
              <th>Source</th>
              <th>Type</th>
              <th>Last Checked</th>
              <th>Status</th>
              <th>Items Found</th>
              <th>Reliability</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sources.map((source) => (
              <tr key={source.name}>
                <td>
                  <div>
                    <span style={{ fontWeight: 500 }}>{source.name}</span>
                    <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>{source.url}</div>
                  </div>
                </td>
                <td><span className="badge badge-default">{source.type}</span></td>
                <td style={{ color: 'var(--text-tertiary)', whiteSpace: 'nowrap' }}>{source.lastChecked}</td>
                <td>
                  <div className="flex items-center gap-2">
                    <div style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: source.status === 'active' ? 'var(--accent-green)' : source.status === 'warning' ? 'var(--accent-orange)' : 'var(--accent-red)',
                      boxShadow: `0 0 6px ${source.status === 'active' ? 'rgba(34,197,94,0.4)' : source.status === 'warning' ? 'rgba(249,115,22,0.4)' : 'rgba(239,68,68,0.4)'}`,
                    }} />
                    <span style={{ textTransform: 'capitalize', fontSize: 'var(--text-sm)' }}>{source.status}</span>
                  </div>
                </td>
                <td style={{ fontFamily: 'var(--font-mono)' }}>{source.items.toLocaleString()}</td>
                <td>
                  <div className="flex items-center gap-2">
                    <div style={{ width: '60px', height: '4px', background: 'rgba(255,255,255,0.06)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                      <div style={{
                        width: `${source.reliability}%`,
                        height: '100%',
                        background: source.reliability >= 90 ? 'var(--accent-green)' : source.reliability >= 75 ? 'var(--accent-cyan)' : 'var(--accent-orange)',
                        borderRadius: 'var(--radius-full)',
                      }} />
                    </div>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)' }}>{source.reliability}%</span>
                  </div>
                </td>
                <td>
                  <div className="flex gap-1">
                    <button className="btn btn-ghost btn-sm">Check</button>
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
