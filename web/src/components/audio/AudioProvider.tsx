"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

export interface GlobalTrack {
  title: string;
  artist?: string;
  audioUrl: string;
  cover?: string;
}

interface AudioContextValue {
  currentTrack: GlobalTrack | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  playTrack: (track: GlobalTrack) => Promise<void>;
  togglePlayback: () => Promise<void>;
  seekTo: (time: number) => void;
  stop: () => void;
  playThemeSound: (theme: "paper" | "vectrex") => void;
}

const AudioSystemContext = createContext<AudioContextValue | null>(null);

function createNoiseBuffer(context: AudioContext, duration = 0.05) {
  const sampleRate = context.sampleRate;
  const bufferSize = Math.floor(sampleRate * duration);
  const buffer = context.createBuffer(1, bufferSize, sampleRate);
  const output = buffer.getChannelData(0);

  for (let index = 0; index < bufferSize; index += 1) {
    output[index] = (Math.random() * 2 - 1) * (1 - index / bufferSize);
  }

  return buffer;
}

export function AudioProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  const [currentTrack, setCurrentTrack] = useState<GlobalTrack | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = new Audio();
    audio.preload = "metadata";
    audioRef.current = audio;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime || 0);
    const handleLoadedMetadata = () => setDuration(audio.duration || 0);
    const handleEnded = () => setIsPlaying(false);
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    return () => {
      audio.pause();
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
    };
  }, []);

  const ensureAudioContext = useCallback(() => {
    if (typeof window === "undefined") return null;
    if (!audioContextRef.current) {
      const AudioCtx = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return null;
      audioContextRef.current = new AudioCtx();
    }

    const context = audioContextRef.current;
    if (context?.state === "suspended") {
      void context.resume();
    }

    return context;
  }, []);

  const playThemeSound = useCallback(
    (theme: "paper" | "vectrex") => {
      const context = ensureAudioContext();
      if (!context) return;

      const now = context.currentTime;

      if (theme === "paper") {
        const clickOsc = context.createOscillator();
        clickOsc.type = "triangle";
        clickOsc.frequency.setValueAtTime(220, now);
        clickOsc.frequency.exponentialRampToValueAtTime(140, now + 0.055);

        const clickGain = context.createGain();
        clickGain.gain.setValueAtTime(0.0001, now);
        clickGain.gain.exponentialRampToValueAtTime(0.16, now + 0.008);
        clickGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.065);

        const noiseSource = context.createBufferSource();
        noiseSource.buffer = createNoiseBuffer(context, 0.04);
        const noiseFilter = context.createBiquadFilter();
        noiseFilter.type = "lowpass";
        noiseFilter.frequency.setValueAtTime(1200, now);

        const noiseGain = context.createGain();
        noiseGain.gain.setValueAtTime(0.0001, now);
        noiseGain.gain.exponentialRampToValueAtTime(0.08, now + 0.004);
        noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);

        clickOsc.connect(clickGain);
        clickGain.connect(context.destination);

        noiseSource.connect(noiseFilter);
        noiseFilter.connect(noiseGain);
        noiseGain.connect(context.destination);

        clickOsc.start(now);
        clickOsc.stop(now + 0.07);
        noiseSource.start(now);
        noiseSource.stop(now + 0.04);
        return;
      }

      const beepOsc = context.createOscillator();
      beepOsc.type = "square";
      beepOsc.frequency.setValueAtTime(920, now);
      beepOsc.frequency.exponentialRampToValueAtTime(620, now + 0.14);

      const beepGain = context.createGain();
      beepGain.gain.setValueAtTime(0.0001, now);
      beepGain.gain.exponentialRampToValueAtTime(0.14, now + 0.01);
      beepGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.16);

      const filter = context.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(1200, now);
      filter.Q.setValueAtTime(6, now);

      beepOsc.connect(filter);
      filter.connect(beepGain);
      beepGain.connect(context.destination);

      beepOsc.start(now);
      beepOsc.stop(now + 0.17);
    },
    [ensureAudioContext],
  );

  const playTrack = useCallback(async (track: GlobalTrack) => {
    const audio = audioRef.current;
    if (!audio) return;

    const isSameTrack = currentTrack?.audioUrl === track.audioUrl;

    try {
      if (!isSameTrack) {
        audio.src = track.audioUrl;
        setCurrentTrack(track);
      }
      await audio.play();
    } catch {
      setIsPlaying(false);
    }
  }, [currentTrack?.audioUrl]);

  const togglePlayback = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio || !currentTrack) return;

    if (audio.paused) {
      try {
        await audio.play();
      } catch {
        setIsPlaying(false);
      }
      return;
    }

    audio.pause();
  }, [currentTrack]);

  const seekTo = useCallback((time: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Math.max(0, Math.min(time, duration || 0));
  }, [duration]);

  const stop = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    audio.currentTime = 0;
    setCurrentTime(0);
    setIsPlaying(false);
  }, []);

  const value = useMemo<AudioContextValue>(
    () => ({
      currentTrack,
      isPlaying,
      currentTime,
      duration,
      playTrack,
      togglePlayback,
      seekTo,
      stop,
      playThemeSound,
    }),
    [currentTrack, isPlaying, currentTime, duration, playTrack, togglePlayback, seekTo, stop, playThemeSound],
  );

  return <AudioSystemContext.Provider value={value}>{children}</AudioSystemContext.Provider>;
}

export function useAudioSystem() {
  const context = useContext(AudioSystemContext);
  if (!context) {
    throw new Error("useAudioSystem must be used inside AudioProvider");
  }
  return context;
}
