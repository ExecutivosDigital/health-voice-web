"use client";

import { useEffect, useRef } from "react";

interface AudioVisualizerProps {
  isRecording: boolean;
  getVisualizerData: () => {
    dataArray: Uint8Array;
    bufferLength: number;
  } | null;
  width?: number;
  height?: number;
  barCount?: number;
  barColor?: string;
  className?: string;
}

export function AudioVisualizer({
  isRecording,
  getVisualizerData,
  width,
  height,
  barCount = 84,
  barColor = "rgba(4, 116, 237, 0.6)",
  className = "",
}: AudioVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isRecording) {
      // Para animação quando não está gravando
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }

      // Limpa canvas
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
      }
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const draw = () => {
      const visualizerData = getVisualizerData();
      if (!visualizerData) return;

      const { dataArray, bufferLength } = visualizerData;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const barWidth = (canvas.width / barCount) * 0.8;
      const gap = (canvas.width / barCount) * 0.2;

      for (let i = 0; i < barCount; i++) {
        // Mapeia índices do array de frequência para as barras
        const dataIndex = Math.floor((i / barCount) * bufferLength);
        const value = dataArray[dataIndex] || 0;

        // Normaliza valor (0-255 -> 0-1)
        const normalizedValue = value / 255;

        // Altura mínima e máxima
        const minHeight = 4;
        const maxHeight = canvas.height * 0.9;
        const barHeight = minHeight + normalizedValue * (maxHeight - minHeight);

        const x = i * (barWidth + gap);
        const y = (canvas.height - barHeight) / 2;

        // Gradiente para as barras
        const gradient = ctx.createLinearGradient(0, y, 0, y + barHeight);
        gradient.addColorStop(0, barColor);
        gradient.addColorStop(1, barColor.replace("0.6", "0.3"));

        ctx.fillStyle = gradient;
        ctx.fillRect(x, y, barWidth, barHeight);
      }

      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isRecording, getVisualizerData, barCount, barColor]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className={className}
    />
  );
}
