// VideoPlayer.js - Custom HTML5 video player
import React, { useRef, useState, useEffect } from "react";
import "./VideoPlayer.css";

export default function VideoPlayer({ src, poster, title }) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const controlsTimer = useRef(null);

  const fmt = (s) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (playing) { v.pause(); } else { v.play(); }
    setPlaying(!playing);
  };

  const handleTimeUpdate = () => {
    const v = videoRef.current;
    if (!v) return;
    setCurrentTime(v.currentTime);
    setProgress((v.currentTime / v.duration) * 100 || 0);
  };

  const handleSeek = (e) => {
    const v = videoRef.current;
    const pct = e.nativeEvent.offsetX / e.currentTarget.clientWidth;
    v.currentTime = pct * v.duration;
  };

  const handleVolume = (e) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    videoRef.current.volume = val;
    setMuted(val === 0);
  };

  const toggleMute = () => {
    const v = videoRef.current;
    v.muted = !muted;
    setMuted(!muted);
  };

  const toggleFullscreen = () => {
    const el = videoRef.current.parentElement;
    if (!document.fullscreenElement) {
      el.requestFullscreen?.();
      setFullscreen(true);
    } else {
      document.exitFullscreen?.();
      setFullscreen(false);
    }
  };

  // Auto-hide controls
  const resetControlsTimer = () => {
    setShowControls(true);
    clearTimeout(controlsTimer.current);
    if (playing) {
      controlsTimer.current = setTimeout(() => setShowControls(false), 3000);
    }
  };

  useEffect(() => () => clearTimeout(controlsTimer.current), []);

  return (
    <div
      className={`vplayer ${showControls || !playing ? "controls-visible" : ""}`}
      onMouseMove={resetControlsTimer}
      onMouseLeave={() => playing && setShowControls(false)}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        className="vplayer-video"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={() => setDuration(videoRef.current.duration)}
        onEnded={() => setPlaying(false)}
        onClick={togglePlay}
      />

      {/* Overlay controls */}
      <div className="vplayer-controls">
        {/* Progress bar */}
        <div className="vplayer-progress" onClick={handleSeek}>
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>

        <div className="vplayer-row">
          {/* Left */}
          <div className="vplayer-left">
            <button className="vctrl-btn" onClick={togglePlay} aria-label={playing ? "Pause" : "Play"}>
              {playing ? "⏸" : "▶"}
            </button>
            <button className="vctrl-btn" onClick={toggleMute} aria-label="Toggle mute">
              {muted || volume === 0 ? "🔇" : volume < 0.5 ? "🔉" : "🔊"}
            </button>
            <input
              type="range" min="0" max="1" step="0.05"
              value={muted ? 0 : volume}
              onChange={handleVolume}
              className="volume-slider"
              aria-label="Volume"
            />
            <span className="vtime">{fmt(currentTime)} / {fmt(duration)}</span>
          </div>

          {/* Title */}
          <span className="vtitle">{title}</span>

          {/* Right */}
          <div className="vplayer-right">
            <button className="vctrl-btn" onClick={toggleFullscreen} aria-label="Fullscreen">
              {fullscreen ? "⊡" : "⛶"}
            </button>
          </div>
        </div>
      </div>

      {/* Big play button when paused */}
      {!playing && (
        <button className="big-play" onClick={togglePlay} aria-label="Play">
          ▶
        </button>
      )}
    </div>
  );
}
