import { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Play, Pause, Music } from 'lucide-react';

const BGM_PREF_KEY = 'prayuddha_bgm_preference';

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem(BGM_PREF_KEY);
    if (saved === 'playing') {
      setIsPlaying(false); // default paused to respect autoplay browser policy, user clicks to play
    }
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      localStorage.setItem(BGM_PREF_KEY, 'paused');
    } else {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          localStorage.setItem(BGM_PREF_KEY, 'playing');
        })
        .catch((err) => {
          console.warn('Audio playback prevented by browser:', err);
        });
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <div className="fixed bottom-4 left-4 z-40 flex items-center gap-2 group">
      {/* Audio Element: Uses a royalty-free energetic instrumental audio track */}
      <audio
        ref={audioRef}
        loop
        preload="metadata"
        src="https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=ambient-tech-futuristic-112521.mp3"
      />

      <div className="surface-card p-1.5 rounded-full border border-[var(--border)] shadow-lg backdrop-blur-md bg-[var(--surface)]/90 flex items-center gap-1.5 transition-all duration-300 hover:scale-105">
        <button
          onClick={togglePlay}
          className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
            isPlaying
              ? 'bg-[var(--accent)] text-white animate-pulse'
              : 'bg-[var(--code-bg)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
          }`}
          aria-label={isPlaying ? 'Pause Symposium BGM' : 'Play Symposium BGM'}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          {isPlaying ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
        </button>

        {isPlaying && (
          <button
            onClick={toggleMute}
            className="w-8 h-8 rounded-full bg-[var(--code-bg)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] flex items-center justify-center transition-colors"
            aria-label={isMuted ? 'Unmute Audio' : 'Mute Audio'}
          >
            {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
          </button>
        )}

        <div className="hidden sm:flex items-center gap-1 px-2 text-xs font-medium text-[var(--text-secondary)]">
          <Music size={13} className="text-[var(--accent)]" />
          <span className="text-[11px] whitespace-nowrap">
            {isPlaying ? 'PRAYUDDHA BGM' : 'Symposium BGM'}
          </span>
        </div>
      </div>

      {showTooltip && !isPlaying && (
        <div className="absolute left-12 bottom-12 surface-card p-2 rounded-lg text-[11px] font-medium text-[var(--text-primary)] border border-[var(--border)] shadow-md whitespace-nowrap bg-[var(--surface)]">
          🎵 Click to play ambient PRAYUDDHA theme music
        </div>
      )}
    </div>
  );
}
