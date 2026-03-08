export default function MapConnection(){

return(

<div className="map">

<h2>Бидний хооронд</h2>

<svg viewBox="0 0 800 400">

<circle cx="300" cy="120" r="6" fill="#00ffd0"/>
<text x="260" y="110">Finland</text>

<circle cx="520" cy="220" r="6" fill="#00ffd0"/>
<text x="500" y="240">Mongolia</text>

<path
d="M300 120 Q420 40 520 220"
stroke="#ff4da6"
strokeWidth="3"
fill="none"
className="line"
/>

</svg>

</div>

)
}