import React, { useState, useEffect } from 'react';

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/timeline_plan.json')
      .then(res => {
        if (!res.ok) throw new Error('Failed to load timeline plan');
        return res.json();
      })
      .then(json => {
        setData(json);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.loading}>Loading timeline plan...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.container}>
        <div style={styles.error}>Error: {error}</div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Smart B-Roll Inserter</h1>
        <p style={styles.subtitle}>Timeline Plan Viewer</p>
      </header>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>A-Roll Information</h2>
        <div style={styles.card}>
          <p style={styles.duration}>
            <strong>Duration:</strong> {data.a_roll_duration_sec.toFixed(2)}s
          </p>
        </div>
      </section>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Transcript</h2>
        <div style={styles.transcriptContainer}>
          {data.transcript_segments.map((seg, idx) => (
            <div key={idx} style={styles.transcriptItem}>
              <div style={styles.timestamp}>
                {seg.start.toFixed(1)}s - {seg.end.toFixed(1)}s
              </div>
              <div style={styles.transcriptText}>{seg.text}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>
          B-Roll Insertions ({data.insertions.length})
        </h2>
        <div style={styles.insertionsContainer}>
          {data.insertions.map((ins, idx) => (
            <div key={idx} style={styles.insertionCard}>
              <div style={styles.insertionHeader}>
                <span style={styles.insertionBadge}>{ins.broll_id}</span>
                <span style={styles.confidence}>
                  {(ins.confidence * 100).toFixed(0)}% confidence
                </span>
              </div>
              <div style={styles.insertionTime}>
                At {ins.start_sec.toFixed(1)}s for {ins.duration_sec.toFixed(1)}s
              </div>
              <div style={styles.insertionReason}>{ins.reason}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    backgroundColor: '#f5f5f5',
    minHeight: '100vh',
  },
  header: {
    textAlign: 'center',
    marginBottom: '40px',
    paddingBottom: '20px',
    borderBottom: '2px solid #ddd',
  },
  title: {
    fontSize: '32px',
    fontWeight: '700',
    color: '#222',
    margin: '0 0 8px 0',
  },
  subtitle: {
    fontSize: '16px',
    color: '#666',
    margin: '0',
  },
  section: {
    marginBottom: '32px',
  },
  sectionTitle: {
    fontSize: '20px',
    fontWeight: '600',
    color: '#333',
    marginBottom: '16px',
  },
  card: {
    backgroundColor: '#fff',
    padding: '16px',
    borderRadius: '8px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  },
  duration: {
    fontSize: '16px',
    color: '#444',
    margin: '0',
  },
  transcriptContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  transcriptItem: {
    backgroundColor: '#fff',
    padding: '12px 16px',
    borderRadius: '6px',
    boxShadow: '0 1px 2px rgba(0,0,0,0.08)',
    borderLeft: '3px solid #4a90e2',
  },
  timestamp: {
    fontSize: '12px',
    fontWeight: '600',
    color: '#4a90e2',
    marginBottom: '6px',
  },
  transcriptText: {
    fontSize: '14px',
    color: '#333',
    lineHeight: '1.5',
  },
  insertionsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  insertionCard: {
    backgroundColor: '#fff',
    padding: '16px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    borderLeft: '4px solid #27ae60',
  },
  insertionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px',
  },
  insertionBadge: {
    backgroundColor: '#27ae60',
    color: '#fff',
    padding: '4px 12px',
    borderRadius: '12px',
    fontSize: '13px',
    fontWeight: '600',
  },
  confidence: {
    fontSize: '12px',
    color: '#999',
    fontWeight: '500',
  },
  insertionTime: {
    fontSize: '14px',
    color: '#555',
    fontWeight: '600',
    marginBottom: '8px',
  },
  insertionReason: {
    fontSize: '14px',
    color: '#666',
    lineHeight: '1.4',
    fontStyle: 'italic',
  },
  loading: {
    textAlign: 'center',
    fontSize: '18px',
    color: '#666',
    padding: '60px 20px',
  },
  error: {
    textAlign: 'center',
    fontSize: '16px',
    color: '#e74c3c',
    padding: '60px 20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
};

export default App;