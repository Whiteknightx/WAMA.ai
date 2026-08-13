interface RadarScoreProps {
  score: number;
  size?: number;
  showLabel?: boolean;
}

export default function RadarScore({ score, size = 60, showLabel = true }: RadarScoreProps) {
  const radius = (size - 6) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (score / 100) * circumference;
  const offset = circumference - progress;

  const getColor = (s: number) => {
    if (s >= 90) return '#22c55e';
    if (s >= 80) return '#3b82f6';
    if (s >= 70) return '#eab308';
    return '#ef4444';
  };

  const color = getColor(score);

  return (
    <div className="radar-score" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="3"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={{
            filter: `drop-shadow(0 0 4px ${color}40)`,
            transition: 'stroke-dashoffset 1s ease',
          }}
        />
      </svg>
      {showLabel && (
        <span
          className="radar-score-value"
          style={{
            fontSize: size < 50 ? '0.7rem' : size < 70 ? '0.85rem' : '1rem',
            color,
          }}
        >
          {score}
        </span>
      )}
    </div>
  );
}
