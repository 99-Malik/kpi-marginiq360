'use client'

import React, { useId } from 'react'

interface Point {
  x: number
  y: number
}

interface CustomLineChartProps {
  width?: number
  height?: number
  data: number[]
  strokeColor?: string
  fillGradientFrom?: string
  fillGradientTo?: string
}

export default function CustomLineChart({
  width = 100,
  height = 100,
  data,
  strokeColor = '#0099a8',
  fillGradientFrom = '#0099a8',
  fillGradientTo = 'transparent',
}: CustomLineChartProps) {
  const id = useId()
  const gradientId = `chart-gradient-${id}`

  const maxData = Math.max(...data)
  const minData = Math.min(...data)
  const range = maxData - minData || 1

  const centerY = height / 1
  const amplitude = height * 0.2

  const points: Point[] =
  data.length === 1
    ? (() => {
        const normalized = (data[0] - minData) / range
        const y = centerY - (normalized - 0.5) * amplitude * 2
        const x = width / 2
        return [
          { x, y: y - 4 }, // short vertical line
          { x, y: y + 4 },
        ]
      })()
    : data.map((value, i) => {
        const x = (i / (data.length - 1)) * width
        const normalized = (value - minData) / range
        const y = centerY - (normalized - 0.5) * amplitude * 2
        return { x, y }
      })

  const path = generateBezierPath(points)

  return (
    <svg width={width} height={height} className="overflow-visible">
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={fillGradientFrom} stopOpacity="0.2" />
          <stop offset="100%" stopColor={fillGradientTo} stopOpacity="0" />
        </linearGradient>
      </defs>

      <path
        d={`${path} L ${width} ${height} L 0 ${height} Z`}
        fill={`url(#${gradientId})`}
      />
      <path
        d={path}
        fill="none"
        stroke={strokeColor}
        strokeWidth={2}
        strokeLinecap="round"
      />
    </svg>
  )
}

// Updated to handle fallback for 1 or 2 points
function generateBezierPath(points: Point[], tension = 0.8) {
  if (points.length < 2) {
    return `M ${points[0].x} ${points[0].y} L ${points[0].x + 1} ${points[0].y}` // short flat line
  }

  const d = [`M ${points[0].x} ${points[0].y}`]

  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i]
    const p1 = points[i + 1]
    const dx = (p1.x - p0.x) * tension

    const c1x = p0.x + dx
    const c1y = p0.y
    const c2x = p1.x - dx
    const c2y = p1.y

    d.push(`C ${c1x} ${c1y}, ${c2x} ${c2y}, ${p1.x} ${p1.y}`)
  }

  return d.join(' ')
}
