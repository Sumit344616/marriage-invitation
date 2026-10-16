"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Volume2, VolumeX, Play, Pause } from "lucide-react";
import { cn } from "cn";

/**
 * Ambient Wedding Music Controller.
 *
 * Requirements Met:
 * - STRICTLY NO AUTOPLAY — Audio only starts upon deliberate user click.
 * - Prioritizes the authentic wedding track /song/Kudmayi.mp3.
 * - Graceful fallback to a native Web Audio Tanpura synthesizer if the file is absent.
 * - Keyboard accessible, visible state indicators, clean audio teardown on unmount.
 */
export function MusicController() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const audioElementRef = useRef<HTMLAudioElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);

  // Setup HTML5 Audio element for /song/Kudmayi.mp3
  useEffect(() => {
    const audio = new Audio("/song/Kudmayi.mp3");
    audio.loop = true;
    audio.volume = 0.6;
    audioElementRef.current = audio;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);

    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.pause();
      audio.src = "";
    };
  }, []);

  // Web Audio synthesizer fallback
  const startSynthAudio = useCallback(() => {
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;

      if (!AudioCtx) return;

      if (!audioCtxRef.current) {
        const ctx = new AudioCtx();
        audioCtxRef.current = ctx;

        const masterGain = ctx.createGain();
        masterGain.gain.setValueAtTime(0.08, ctx.currentTime);
        masterGain.connect(ctx.destination);
        masterGainRef.current = masterGain;

        const filter = ctx.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(650, ctx.currentTime);
        filter.Q.setValueAtTime(3, ctx.currentTime);
        filter.connect(masterGain);

        const notes = [
          { freq: 138.59, type: "sawtooth" as const, gain: 0.04 },
          { freq: 207.65, type: "triangle" as const, gain: 0.05 },
          { freq: 277.18, type: "sine" as const, gain: 0.03 },
          { freq: 415.3, type: "sine" as const, gain: 0.02 },
        ];

        oscillatorsRef.current = notes.map(({ freq, type, gain }) => {
          const osc = ctx.createOscillator();
          const oscGain = ctx.createGain();

          osc.type = type;
          osc.frequency.setValueAtTime(freq, ctx.currentTime);

          const lfo = ctx.createOscillator();
          const lfoGain = ctx.createGain();
          lfo.frequency.setValueAtTime(0.25, ctx.currentTime);
          lfoGain.gain.setValueAtTime(0.015, ctx.currentTime);
          lfo.connect(oscGain.gain);
          lfo.start();

          oscGain.gain.setValueAtTime(gain, ctx.currentTime);
          osc.connect(oscGain);
          oscGain.connect(filter);
          osc.start();

          return osc;
        });
      }

      if (audioCtxRef.current.state === "suspended") {
        audioCtxRef.current.resume();
      }

      setIsPlaying(true);
    } catch {
      // Ignore
    }
  }, []);

  // Listen for deliberate user trigger (e.g. Unsealing the invitation envelope)
  useEffect(() => {
    const handlePlaySignal = () => {
      if (audioElementRef.current) {
        audioElementRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => {
            startSynthAudio();
          });
      } else {
        startSynthAudio();
      }
    };

    window.addEventListener("wedding:play-music", handlePlaySignal);
    return () => window.removeEventListener("wedding:play-music", handlePlaySignal);
  }, [startSynthAudio]);

  const togglePlay = () => {
    if (isPlaying) {
      if (audioElementRef.current && !audioElementRef.current.paused) {
        audioElementRef.current.pause();
      }
      if (audioCtxRef.current && audioCtxRef.current.state === "running") {
        audioCtxRef.current.suspend();
      }
      setIsPlaying(false);
    } else {
      if (audioElementRef.current) {
        audioElementRef.current
          .play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch(() => {
            // If file playback fails, seamlessly use the ambient Tanpura synth
            startSynthAudio();
          });
      } else {
        startSynthAudio();
      }
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newMuted = !isMuted;
    setIsMuted(newMuted);

    if (audioElementRef.current) {
      audioElementRef.current.muted = newMuted;
    }

    if (masterGainRef.current && audioCtxRef.current) {
      masterGainRef.current.gain.setValueAtTime(
        newMuted ? 0 : 0.08,
        audioCtxRef.current.currentTime
      );
    }
  };

  // Teardown synthesizer context on unmount
  useEffect(() => {
    return () => {
      oscillatorsRef.current.forEach((osc) => {
        try {
          osc.stop();
          osc.disconnect();
        } catch {
          // Ignore
        }
      });
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  return (
    <div
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full border border-champagne-400/50 bg-walnut-950/90 px-4 py-2.5 text-ivory-100 shadow-2xl backdrop-blur-md transition-all duration-300 hover:border-champagne hover:scale-105 cursor-pointer select-none focus:outline-none focus:ring-0"
      role="button"
      tabIndex={0}
      onClick={togglePlay}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          togglePlay();
        }
      }}
      aria-label={isPlaying ? "Pause wedding music" : "Play wedding music"}
    >
      {/* Play/Pause Status */}
      <div className="flex items-center gap-2 font-sans text-xs font-semibold text-champagne-200">
        {isPlaying ? (
          <Pause className="h-4 w-4 text-champagne-300" />
        ) : (
          <Play className="h-4 w-4 text-champagne-300" />
        )}
        <span className="text-[0.65rem] uppercase tracking-widest text-champagne-200">
          {isPlaying ? "Kudmayi Playing" : "Play Music"}
        </span>
      </div>

      {/* Music Waves Visualizer (Animated when playing) */}
      <div className="flex h-3 items-end gap-0.5 px-1 pointer-events-none" aria-hidden="true">
        <span
          className={cn(
            "w-0.5 rounded-full bg-champagne-400 transition-all duration-300",
            isPlaying ? "h-3.5 animate-pulse" : "h-1 opacity-40"
          )}
        />
        <span
          className={cn(
            "w-0.5 rounded-full bg-champagne-400 transition-all duration-500",
            isPlaying ? "h-2.5 animate-pulse delay-100" : "h-1.5 opacity-40"
          )}
        />
        <span
          className={cn(
            "w-0.5 rounded-full bg-champagne-400 transition-all duration-300",
            isPlaying ? "h-3 animate-pulse delay-200" : "h-1 opacity-40"
          )}
        />
      </div>

      {/* Mute/Unmute Toggle (visible when active) */}
      {isPlaying && (
        <button
          type="button"
          onClick={toggleMute}
          className="ml-1 p-1 text-champagne-300 hover:text-champagne-100 focus:outline-none focus:ring-0 focus-visible:outline-none cursor-pointer transition-colors"
          aria-label={isMuted ? "Unmute music" : "Mute music"}
        >
          {isMuted ? (
            <VolumeX className="h-4 w-4" />
          ) : (
            <Volume2 className="h-4 w-4" />
          )}
        </button>
      )}
    </div>
  );
}
