'use client';

import { useState } from 'react';
import { getCategories, getToolsByCategory } from '@/lib/data';

export default function AdminCategoriesPage() {
  const categories = getCategories();

  return (
    <div>
      <div className="flex items-center justify-between" style={{ marginBottom: 'var(--space-6)' }}>
        <div>
          <h1 className="heading-2">Categories</h1>
          <p className="text-muted" style={{ marginTop: 'var(--space-1)' }}>
            {categories.length} categories configured
          </p>
        </div>
        <button className="btn btn-primary">+ Add Category</button>
      </div>

      <div className="table-wrapper">
        <table className="table">
          <thead>
            <tr>
              <th>Icon</th>
              <th>Name</th>
              <th>Slug</th>
              <th>Tools</th>
              <th>Color</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => {
              const tools = getToolsByCategory(cat.id);
              return (
                <tr key={cat.id}>
                  <td style={{ fontSize: 'var(--text-xl)' }}>{cat.icon}</td>
                  <td style={{ fontWeight: 500 }}>{cat.name}</td>
                  <td style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)', color: 'var(--text-tertiary)' }}>
                    /{cat.slug}
                  </td>
                  <td>
                    <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, color: 'var(--text-accent)' }}>
                      {tools.length}
                    </span>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <div style={{
                        width: '16px',
                        height: '16px',
                        borderRadius: 'var(--radius-sm)',
                        background: cat.color,
                      }} />
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>
                        {cat.color}
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className="flex gap-1">
                      <button className="btn btn-ghost btn-sm">Edit</button>
                      <button className="btn btn-ghost btn-sm">View</button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
