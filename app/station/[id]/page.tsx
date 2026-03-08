"use client"

import { useParams } from "next/navigation"
import Quiz from "@/app/components/Quiz"
import Timeline from "@/app/components/TimeLine"
import Fireworks from "@/app/components/FireWorks"

export default function StationPage() {
  const params = useParams()
  const id = Number(params.id)

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#11111b] text-white p-8">
      {id === 1 && (
        <div className="text-center max-w-lg">
          <h2 className="text-4xl font-bold mb-6 text-pink-400">
            Welcome
          </h2>
          <p className="text-gray-300">
            This journey is made just for you. Let's start our path together!
          </p>
        </div>
      )}

      {id === 2 && <Quiz />}

      {id === 3 && <Timeline />}

      {id === 4 && (
        <div className="text-center max-w-md">
          <h2 className="text-3xl font-bold text-pink-400 mb-4">
            You mean a lot to me
          </h2>
          <p className="text-gray-300">
            Every step with you is a happy memory.
          </p>
        </div>
      )}

      {id === 5 && <Fireworks />}
    </div>
  )
}