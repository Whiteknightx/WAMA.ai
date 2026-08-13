import { getUpdates, formatDate } from '@/lib/data';

export default function AdminUpdatesPage() {
  const updates = getUpdates();

  return (
    <div>
      <div style={{ marginBottom: 'var(--space-6)' }}>
        <h1 className="heading-2">Updates Feed</h1>
        <p className="text-muted" style={{ marginTop: 'var(--space-1)' }}>
          {updates.length} recent updates tracked
        </p>
      </div>

      <div className="table-wrapper">
        <table className="table">
          <thead>
            <tr>
              <th>Type</th>
              <th>Tool</th>
              <th>Update</th>
              <th>Category</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {updates.map((update) => (
              <tr key={update.id}>
                <td>
                  <span style={{ fontSize: 'var(--text-lg)' }}>{update.icon}</span>
                </td>
                <td style={{ fontWeight: 500 }}>{update.toolName}</td>
                <td>
                  <div>
                    <span style={{ fontWeight: 500, fontSize: 'var(--text-sm)' }}>{update.title}</span>
                    <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', marginTop: '2px' }}>
                      {update.description.slice(0, 80)}...
                    </div>
                  </div>
                </td>
                <td>
                  <span className="badge badge-default" style={{ textTransform: 'capitalize' }}>{update.category}</span>
                </td>
                <td style={{ color: 'var(--text-tertiary)', whiteSpace: 'nowrap', fontSize: 'var(--text-sm)' }}>
                  {formatDate(update.date)}
                </td>
                <td>
                  <div className="flex gap-1">
                    <button className="btn btn-ghost btn-sm">View</button>
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
