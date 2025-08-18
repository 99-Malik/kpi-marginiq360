'use client'

import React, { useId } from 'react'

interface Point { x: number; y: number }

interface CustomLineChartProps {
  /** The SVG scales to its parent; these are logical units for the viewBox */
  width?: number
  height?: number
  data: number[]
  strokeColor?: string
  fillGradientFrom?: string
  fillGradientTo?: string
  className?: string
}

export default function CustomLineChart({
  width = 120,
  height = 64,
  data,
  strokeColor = '#0099a8',
  fillGradientFrom = '#0099a8',
  fillGradientTo = 'transparent',
  className,
}: CustomLineChartProps) {
  const id = useId()
  const gradientId = `chart-gradient-${id}`
  const clipId = `chart-clip-${id}`

  // Padding so stroke/area never touch edges
  const PAD_X = 8
  const PAD_Y = 8
  const innerW = Math.max(1, width - PAD_X * 2)
  const innerH = Math.max(1, height - PAD_Y * 2)

  // ----- Baseline + vertical bumps mapping -----
  const baseline = data.reduce((a, b) => a + b, 0) / Math.max(1, data.length)
  const maxDev = data.reduce((m, v) => Math.max(m, Math.abs(v - baseline)), 0) || 1

  const centerY = PAD_Y + innerH / 2
  const amplitude = innerH * 0.28 // tweak for larger/smaller bumps

  const clamp = (v: number, lo: number, hi: number) => Math.min(Math.max(v, lo), hi)

  const points: Point[] =
    data.length === 1
      ? (() => {
          const dev = (data[0] - baseline) / maxDev
          const yRaw = centerY - dev * amplitude
          const y = clamp(yRaw, PAD_Y, PAD_Y + innerH)
          const x = PAD_X + innerW / 2
          return [{ x, y: y - 4 }, { x, y: y + 4 }]
        })()
      : data.map((value, i) => {
          const x = PAD_X + (i / (data.length - 1)) * innerW
          const dev = (value - baseline) / maxDev
          const yRaw = centerY - dev * amplitude
          const y = clamp(yRaw, PAD_Y, PAD_Y + innerH)
          return { x, y }
        })

  const path = generateBezierPath(points, 0.6) // lower tension => smoother, flatter humps
  const areaPath = `${path} L ${PAD_X + innerW} ${PAD_Y + innerH} L ${PAD_X} ${PAD_Y + innerH} Z`

  return (
    <svg
      className={className}
      viewBox={`0 0 ${width} ${height}`}
      width="100%"
      height="100%"
      preserveAspectRatio="none"
      style={{ display: 'block', overflow: 'hidden' }}
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={fillGradientFrom} stopOpacity="0.15" />
          <stop offset="100%" stopColor={fillGradientTo} stopOpacity="0" />
        </linearGradient>
        <clipPath id={clipId}>
          <rect x="0" y="0" width={width} height={height} rx="8" ry="8" />
        </clipPath>
      </defs>

      <g clipPath={`url(#${clipId})`}>
        <path d={areaPath} fill={`url(#${gradientId})`} />
        <path
          d={path}
          fill="none"
          stroke={strokeColor}
          strokeWidth={1.5}
          strokeLinecap="round"
        />
      </g>
    </svg>
  )
}

function generateBezierPath(points: Point[], tension = 0.6) {
  if (points.length < 2) {
    const p = points[0]
    return `M ${p.x} ${p.y} L ${p.x + 1} ${p.y}`
  }
  const d = [`M ${points[0].x} ${points[0].y}`]
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i]
    const p1 = points[i + 1]
    const dx = (p1.x - p0.x) * tension
    d.push(`C ${p0.x + dx} ${p0.y}, ${p1.x - dx} ${p1.y}, ${p1.x} ${p1.y}`)
  }
  return d.join(' ')
}
