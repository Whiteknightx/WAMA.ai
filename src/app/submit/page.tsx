'use client';

import { useState } from 'react';
import { getCategories, getProfessions } from '@/lib/data';
import type { Metadata } from 'next';

export default function SubmitPage() {
  const categories = getCategories();
  const professions = getProfessions();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="page">
        <div className="container" style={{ maxWidth: '600px', textAlign: 'center' }}>
          <div style={{ fontSize: '4rem', marginBottom: 'var(--space-4)' }}>✅</div>
          <h1 className="heading-2" style={{ marginBottom: 'var(--space-3)' }}>
            Tool Submitted!
          </h1>
          <p className="text-muted" style={{ marginBottom: 'var(--space-6)' }}>
            Thank you for your submission. Our team will review it and add it to WAMA if it meets our criteria.
          </p>
          <button className="btn btn-primary" onClick={() => setSubmitted(false)}>
            Submit Another Tool
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="container" style={{ maxWidth: '700px' }}>
        <div style={{ marginBottom: 'var(--space-8)' }}>
          <p className="section-label">Submit</p>
          <h1 className="heading-1">Submit an AI Tool</h1>
          <p className="text-muted" style={{ marginTop: 'var(--space-2)' }}>
            Know an AI tool we&apos;re missing? Help us build the most comprehensive AI database.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="card" style={{ position: 'relative' }}>
          <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
            <div>
              <label style={{ display: 'block', fontSize: 'var(--text-sm)', fontWeight: 600, marginBottom: 'var(--space-2)', color: 'var(--text-secondary)' }}>
                Tool Name *
              </label>
              <input type="text" className="input" placeholder="e.g., ToolName AI" required />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 'var(--text-sm)', fontWeight: 600, marginBottom: 'var(--space-2)', color: 'var(--text-secondary)' }}>
                Website URL *
              </label>
              <input type="url" className="input" placeholder="https://..." required />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 'var(--text-sm)', fontWeight: 600, marginBottom: 'var(--space-2)', color: 'var(--text-secondary)' }}>
                Description *
              </label>
              <textarea
                className="input"
                rows={3}
                placeholder="What does this tool do?"
                required
                style={{ resize: 'vertical' }}
              />
            </div>

            <div className="grid grid-2" style={{ gap: 'var(--space-4)' }}>
              <div>
                <label style={{ display: 'block', fontSize: 'var(--text-sm)', fontWeight: 600, marginBottom: 'var(--space-2)', color: 'var(--text-secondary)' }}>
                  Category
                </label>
                <select className="input">
                  <option value="">Select category...</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.icon} {cat.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 'var(--text-sm)', fontWeight: 600, marginBottom: 'var(--space-2)', color: 'var(--text-secondary)' }}>
                  Best For
                </label>
                <select className="input">
                  <option value="">Select profession...</option>
                  {professions.map((prof) => (
                    <option key={prof.id} value={prof.id}>{prof.icon} {prof.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 'var(--text-sm)', fontWeight: 600, marginBottom: 'var(--space-2)', color: 'var(--text-secondary)' }}>
                Pricing
              </label>
              <select className="input">
                <option value="">Select pricing model...</option>
                <option value="free">Free</option>
                <option value="freemium">Freemium</option>
                <option value="paid">Paid</option>
                <option value="open-source">Open Source</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 'var(--text-sm)', fontWeight: 600, marginBottom: 'var(--space-2)', color: 'var(--text-secondary)' }}>
                Why should we add it?
              </label>
              <textarea
                className="input"
                rows={3}
                placeholder="What makes this tool interesting or unique?"
                style={{ resize: 'vertical' }}
              />
            </div>

            <button type="submit" className="btn btn-primary btn-lg w-full">
              Submit Tool
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
