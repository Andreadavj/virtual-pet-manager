// Mapeo de moods a colores de Bootstrap
const moodConfig = {
  'Feliz':       { color: 'success',  icon: '😄' },
  'Triste':      { color: 'info',     icon: '😢' },
  'Emocionado':  { color: 'warning',  icon: '🤩' },
  'Hambriento':  { color: 'danger',   icon: '🍖' },
  'Cansado':     { color: 'secondary',icon: '😴' },
  'Juguetón':    { color: 'primary',  icon: '🎮' },
  'Enojado':     { color: 'danger',   icon: '😤' },
};

function MoodBadge({ mood }) {
  const config = moodConfig[mood] || { color: 'secondary', icon: '❓' };

  return (
    <span className={`badge bg-${config.color} mood-badge`}>
      {config.icon} {mood}
    </span>
  );
}

export default MoodBadge;