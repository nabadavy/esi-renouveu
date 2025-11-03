import React, { useRef, useImperativeHandle, useState, useEffect } from "react";
import { Play, Pause, Maximize2 } from "lucide-react";

export const VideoPlayer = React.forwardRef(
  ({ src, poster, className = "", ...props }, ref) => {
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);

    useImperativeHandle(ref, () => videoRef.current);

    const togglePlay = () => {
      const v = videoRef.current;
      if (!v) return;
      if (v.paused) {
        v.play().catch((e) => console.error("Lecture impossible:", e));
        setIsPlaying(true);
      } else {
        v.pause();
        setIsPlaying(false);
      }
    };

    const toggleFullscreen = () => {
      const v = videoRef.current;
      if (!v) return;
      if (document.fullscreenElement) document.exitFullscreen();
      else v.requestFullscreen();
    };

    useEffect(() => {
      const v = videoRef.current;
      if (!v) return;

      const updateProgress = () => {
        const percent = (v.currentTime / v.duration) * 100;
        setProgress(isNaN(percent) ? 0 : percent);
      };

      v.addEventListener("timeupdate", updateProgress);
      v.addEventListener("ended", () => setIsPlaying(false));

      return () => {
        v.removeEventListener("timeupdate", updateProgress);
        v.removeEventListener("ended", () => setIsPlaying(false));
      };
    }, []);

    return (
      <div className={`relative group rounded-xl overflow-hidden shadow-xl ${className}`}>
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          controls
          controlsList="nodownload"
          className="w-full aspect-video bg-black transform transition-transform duration-300 group-hover:scale-[1.03]"
          playsInline
          preload="metadata"
          {...props}
        />

        {/* Overlay Play/Pause + Plein écran */}
        

        {/* Barre de progression personnalisée */}
        <div className="absolute bottom-0 left-0 h-[6px] w-full bg-black/30">
          <div
            className="h-full bg-gradient-to-r from-[#58D5BA] to-[#7AA2FF] transition-all duration-150"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    );
  }
);
