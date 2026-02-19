"use client";

import { Pause, Play, Square } from "lucide-react";
import { useAudioSystem } from "@/components/audio/AudioProvider";

function formatTime(timeInSeconds: number) {
  if (!Number.isFinite(timeInSeconds) || timeInSeconds < 0) return "0:00";
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export default function GlobalPlayer() {
  const { currentTrack, isPlaying, currentTime, duration, togglePlayback, seekTo, stop } = useAudioSystem();

  if (!currentTrack) return null;

  return (
    <aside className="fixed bottom-4 right-4 z-50 w-[min(92vw,340px)] rounded-xl border border-border/70 bg-card/90 p-3 shadow-lg backdrop-blur-md">
      <div className="space-y-2">
        <p className="truncate text-xs text-muted-foreground">Lecture en cours</p>
        <h3 className="truncate text-sm font-semibold text-foreground">{currentTrack.title}</h3>
        {currentTrack.artist && <p className="truncate text-xs text-muted-foreground">{currentTrack.artist}</p>}

        <input
          type="range"
          min={0}
          max={duration || 0}
          step={0.1}
          value={currentTime}
          onChange={(event) => seekTo(Number(event.target.value))}
          className="w-full"
          aria-label="Position audio"
        />

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => void togglePlayback()}
            className="inline-flex items-center gap-1 rounded-md border border-border px-2 py-1 text-xs text-foreground hover:bg-muted"
          >
            {isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
            {isPlaying ? "Pause" : "Play"}
          </button>

          <button
            type="button"
            onClick={stop}
            className="inline-flex items-center gap-1 rounded-md border border-border px-2 py-1 text-xs text-foreground hover:bg-muted"
          >
            <Square className="h-3.5 w-3.5" />
            Stop
          </button>
        </div>
      </div>
    </aside>
  );
}
