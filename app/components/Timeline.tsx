export default function Timeline({items}:{items:any[]}){

return(

<div className="timeline">

<h2>Бидний мөчүүд</h2>

{items.map((e,i)=>(
<div key={i} className="timelineItem">

<h3>{e.title}</h3>
<p>{e.date}</p>
<span>{e.text}</span>

</div>
))}

</div>

)

}