"use client"

import { motion } from "framer-motion"

export default function StationCard({station}:{station:any}){

return(

<motion.div
initial={{opacity:0,y:40}}
animate={{opacity:1,y:0}}
transition={{duration:0.6}}
className="card"
>

<h2>{station.title}</h2>

{station.date && (
<p className="date">{station.date}</p>
)}

<p>{station.message}</p>

{station.photo && (
<img src={station.photo} className="photo"/>
)}

{station.song && (
<audio controls src={station.song}/>
)}

</motion.div>

)

}