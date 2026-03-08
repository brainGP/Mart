"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useAnimation } from "framer-motion"
import { memories } from "./data/memories" 
import LoveLetter from "./components/LoveLetter"

interface Station {
  id: number
  title: string
  message: string
  color: string
  bgGradient: string
  question: string
}
const stations: Station[] = memories


export default function Home() {
  const [current, setCurrent] = useState(0)
  const [maxUnlocked, setMaxUnlocked] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const pathRef = useRef<SVGPathElement>(null)
  const [points, setPoints] = useState<{ x: number; y: number }[]>([])
  const [pathLength, setPathLength] = useState(0)
  const pathControls = useAnimation()
  const trailControls = useAnimation()
  const zoomControls = useAnimation()
  const isManualScroll = useRef(false)
  const [hearts, setHearts] = useState<{ x: number; y: number; size: number; delay: number }[]>([])
  const [sparkles, setSparkles] = useState<{ x: number; y: number; size: number; delay: number }[]>([])
  const [showLetter, setShowLetter] = useState(false)

  // Generate floating hearts
  useEffect(() => {
    const arr = Array.from({ length: 30 }).map(() => ({
      x: Math.random() * 300,
      y: Math.random() * 1200,
      size: 8 + Math.random() * 12,
      delay: Math.random() * 5
    }))
    setHearts(arr)
  }, [])

  // Generate floating sparkles
  useEffect(() => {
    const arr = Array.from({ length: 25 }).map(() => ({
      x: Math.random() * 300,
      y: Math.random() * 1200,
      size: 2 + Math.random() * 4,
      delay: Math.random() * 5
    }))
    setSparkles(arr)
  }, [])

  // Calculate path points
  useEffect(() => {
    if (!pathRef.current) return
    const path = pathRef.current
    const totalLength = path.getTotalLength()
    setPathLength(totalLength)
    const pts = stations.map((_, i) => {
      const p = path.getPointAtLength((i / (stations.length - 1)) * totalLength)
      return { x: p.x, y: p.y }
    })
    setPoints(pts)
  }, [])

  // Animate main path
  useEffect(() => {
    pathControls.start({
      strokeDashoffset: 0,
      transition: { duration: 2, ease: "easeInOut" },
    })
  }, [pathLength])

  // Animate glowing trail along the path
  useEffect(() => {
    trailControls.start({
      strokeDashoffset: pathLength - (current / (stations.length - 1)) * pathLength,
      transition: { duration: 1, ease: "easeInOut" },
    })
    if (current > maxUnlocked) setMaxUnlocked(current)
  }, [current, pathLength])

  // Scroll and zoom to the active station
  const scrollAndZoom = () => {
    if (!containerRef.current || points.length === 0) return
    isManualScroll.current = false
    zoomControls.start({ scale: 1.5, transition: { duration: 0.8 } }) // Zoom in
    const containerHeight = containerRef.current.clientHeight
    const y = points[current].y
    containerRef.current.scrollTo({ top: y - containerHeight / 2, behavior: "smooth" })
  }

  // Detect manual scroll to zoom out
  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (!isManualScroll.current) {
  //       isManualScroll.current = true
  //       zoomControls.start({ scale: 1, transition: { duration: 0.5 } }) // Zoom out
  //     }
  //   }
  //   const container = containerRef.current
  //   container?.addEventListener("scroll", handleScroll)
  //   return () => container?.removeEventListener("scroll", handleScroll)
  // }, [])

  // Zoom to station whenever current changes
  useEffect(() => {
    scrollAndZoom()
  }, [current])

  const goNext = () => {
    if (current < stations.length - 1) setCurrent(current + 1)
  }

  const clickStation = (i: number) => {
    if (i <= maxUnlocked) setCurrent(i)
  }

  return (
    <main className="flex h-screen w-full relative overflow-hidden transition-all duration-1000" style={{ background: stations[current].bgGradient }}>
      <div className="absolute top-0 left-0 w-full h-full bg-black/20 backdrop-blur-sm z-0" >
        <h1 className="text-5xl font-bold text-center pt-10" style={{ background: "linear-gradient(90deg, #ff9a9e, #fad0c4)", WebkitBackgroundClip: "text", color: "pink" }}>
          2026.03.08
        </h1>
        <p className="text-center text-lg mt-2" style={{ background: "linear-gradient(90deg, #a1c4fd, #c2e9fb)", WebkitBackgroundClip: "text", color: "transparent" }}>
          Бидний түүх
        </p>
         <p className="text-center text-lg mt-2" style={{ background: "linear-gradient(90deg, #a1c4fd, #c2e9fb)", WebkitBackgroundClip: "text", color: "transparent" }}>
         Happy women's day
        </p>
      
      </div>
      {/* Left Map */}
      <div ref={containerRef} className="w-1/2 overflow-y-auto relative z-10">
        <motion.svg width="300" height="1200" className="mx-auto mt-20 relative z-10" animate={zoomControls}>
          <defs>
            <linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#f472b6" />
              <stop offset="100%" stopColor="#fbbf24" />
            </linearGradient>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Main path */}
          <motion.path
            ref={pathRef}
            d="M150 100 C50 250 250 400 150 550 C50 700 250 900 150 1000"
            stroke="#555"
            strokeWidth="8"
            fill="none"
            strokeDasharray={pathLength}
            strokeDashoffset={pathLength}
            animate={pathControls}
          />

          {/* Glowing trail */}
          <motion.path
            d="M150 100 C50 250 250 400 150 550 C50 700 250 900 150 1000"
            stroke="url(#grad)"
            strokeWidth="8"
            fill="none"
            strokeDasharray={pathLength}
            strokeDashoffset={pathLength}
            filter="url(#glow)"
            animate={trailControls}
          />

          {/* Stations */}
          {points.map((pt, i) => (
            <motion.g key={i} style={{ cursor: i <= maxUnlocked ? "pointer" : "not-allowed" }} onClick={() => clickStation(i)}>
              <motion.circle
                cx={pt.x}
                cy={pt.y}
                r={i === current ? 22 : 14}
                fill={stations[i].color}
                stroke={i === current ? "white" : "black"}
                strokeWidth={i === current ? 4 : 2}
                filter={i === current ? "url(#glow)" : undefined}
                animate={i === current ? { scale: [1, 1.3, 1] } : {}}
                transition={{ duration: 0.6 }}
              />
              <text x={pt.x} y={pt.y + 5} textAnchor="middle" fontSize="12" fontWeight="bold" fill={i === current ? "#fffacd" : "#ffffff"}>
                {i + 1}
              </text>
            </motion.g>
          ))}

          {/* Character */}
          {points.length > 0 && (
            <motion.text x={points[current].x} y={points[current].y - 30} fontSize={28} animate={{ x: points[current].x, y: points[current].y - 30 }} transition={{ type: "spring", stiffness: 120, damping: 15 }}>
              🧑‍🚀
            </motion.text>
          )}

          {/* Floating Hearts */}
          {hearts.map((h, i) => (
            <motion.div key={i} className="absolute w-3 h-3 rounded-full bg-pink-400 opacity-80" style={{ top: h.y, left: h.x }}
              animate={{ y: [h.y, h.y - 120], x: [h.x, h.x + 20, h.x - 20], scale: [0.8, 1.2, 0.8] }}
              transition={{ duration: 5 + Math.random() * 3, repeat: Infinity, delay: h.delay }}
            />
          ))}

          {/* Sparkles */}
          {sparkles.map((s, i) => (
            <motion.div key={i} className="absolute w-2 h-2 rounded-full bg-yellow-200 opacity-70" style={{ top: s.y, left: s.x }}
              animate={{ y: [s.y, s.y - 30], opacity: [0.2, 1, 0.2] }}
              transition={{ duration: 2 + Math.random() * 2, repeat: Infinity, delay: s.delay }}
            />
          ))}
        </motion.svg>
      </div>

      {/* Right Section */}
      <div className="w-1/2 top-40 flex items-center justify-center relative z-20">
        <motion.div key={current} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="p-10 flex flex-col items-center justify-center text-center max-w-md sticky top-1/2 -translate-y-1/2 bg-black/20 rounded-xl">
          <h2 className="text-4xl font-bold mb-4" style={{ background: "linear-gradient(90deg, #ff9a9e, #fad0c4)", WebkitBackgroundClip: "text", color: "transparent" }}>
            {stations[current].title}
          </h2>
          <p className="text-lg mb-4 font-semibold" style={{ background: "linear-gradient(90deg, #a1c4fd, #c2e9fb)", WebkitBackgroundClip: "text", color: "transparent" }}>
            {stations[current].message}
          </p>
          <p className="text-md mb-6 font-medium" style={{ background: "linear-gradient(90deg, #fbc2eb, #a6c1ee)", WebkitBackgroundClip: "text", color: "transparent" }}>
            {stations[current].question}
          </p>

          {current < stations.length - 1 && (
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="px-8 py-3 bg-pink-500 rounded-xl text-white font-bold hover:bg-pink-400 shadow-lg transition" onClick={goNext}>
              Next
            </motion.button>
          )}

          {current === stations.length - 1 && (
  <motion.button
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    className="px-8 py-3 bg-pink-500 rounded-xl text-white font-bold hover:bg-pink-400 shadow-lg transition"
    onClick={() => setShowLetter(true)}
  >
    Open
  </motion.button>
)}
{showLetter && (
  <LoveLetter onClose={() => setShowLetter(false)} />
)}
        </motion.div>
      </div>
    </main>
  )
}