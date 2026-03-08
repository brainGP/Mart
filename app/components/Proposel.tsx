"use client"

import confetti from "canvas-confetti"
import { useState } from "react"

export default function Proposal(){

const [yes,setYes]=useState(false)

function yesClick(){

confetti({
particleCount:200,
spread:120,
origin:{y:0.6}
})

setYes(true)

}

function moveNo(e:any){

const btn=e.target

btn.style.position="absolute"
btn.style.left=Math.random()*80+"%"
btn.style.top=Math.random()*80+"%"

}

return(

<div className="proposal">

<h2>Сүндер...</h2>

<p>Чи миний найз охин болох уу?</p>

{yes?(
<h1 className="yes">💚 Тийм гэж хэлсэнд баярлалаа 💚</h1>
):(

<div className="buttons">

<button onClick={yesClick} className="yesBtn">
YES 💚
</button>

<button onMouseEnter={moveNo} className="noBtn">
NO
</button>

</div>

)}

</div>

)

}