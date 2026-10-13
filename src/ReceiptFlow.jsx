import React,{useEffect,useRef,useState} from 'react';
import {Icon} from './ui';
const steps=[['file-text','Purchase order','100','units ordered','PO-772 · $100 / unit'],['receipt','Goods receipt','98','units received','GR-09 · 2 still unreceived'],['git-compare-arrows','Quantity exception','$200','needs an explanation','2 units × $100 PO price'],['eye','Controller review','$600','payment held','$200 quantity + $400 price']];
export default function ReceiptFlow(){
 const ref=useRef(null);const [active,setActive]=useState(-1);const [playing,setPlaying]=useState(false);const [entered,setEntered]=useState(false);
 useEffect(()=>{const node=ref.current;const io=new IntersectionObserver(([e])=>{if(e.isIntersecting){setEntered(true);io.disconnect();if(!matchMedia('(prefers-reduced-motion: reduce)').matches&&document.documentElement.dataset.motion!=='reduced')setPlaying(true);}},{threshold:.3});io.observe(node);return()=>io.disconnect();},[]);
 useEffect(()=>{if(!playing)return;let n=0;setActive(0);const t=setInterval(()=>{n++;if(n>3){setPlaying(false);clearInterval(t);}else setActive(n);},1400);return()=>clearInterval(t);},[playing]);
 const descriptions=['The purchase order establishes the quantity and price basis.','Receiving confirms 98 of the 100 ordered units. Two units are not supported by this receipt.','The missing receipt support accounts for $200. A separate $400 price difference is also unresolved.','Both exceptions reach Elena Park for review. The $600 hold stays in place; nothing is paid or posted.'];
 return <figure className={`receipt-flow ${entered?'has-entered':''} ${playing?'is-playing':''}`} ref={ref} aria-label="Illustrative receipt-to-controller exception flow">
 <figcaption><span>RECEIPT → REVIEW</span><span className="demo-label">DEMO · SYNTHETIC</span></figcaption>
 <h3>100 ordered.<br/>98 received.</h3><p className="receipt-subtitle">Two units need an explanation.</p>
 <div className="receipt-count" aria-label="98 units received and 2 units unreceived out of 100 ordered"><div className="receipt-count-track"><span/><b/></div><div><span><i/>98 received</span><span><i/>2 unreceived</span></div></div>
 <ol className="receipt-flow-nodes">{steps.map(([icon,title,value,label,source],i)=><li key={title} className={active===i?'is-active':''}><button type="button" onClick={()=>{setPlaying(false);setActive(i);}} aria-pressed={active===i} aria-label={`Step ${i+1}: ${title}`}><span className="receipt-node-icon"><Icon name={icon}/></span><span className="receipt-node-copy"><small>0{i+1} / {title}</small><strong>{value} <em>{label}</em></strong><span>{source}</span></span><Icon name="arrow-right" className="receipt-flow-arrow"/></button></li>)}</ol>
 <div className="receipt-narration" aria-live="polite">{descriptions[active<0?1:active]}</div>
 <div className="receipt-flow-footer"><span><Icon name="lock-keyhole"/>Review pending · No payment or ERP write</span><button type="button" onClick={()=>{if(playing)setPlaying(false);else setPlaying(true);}}>{playing?'Pause':'Replay'}<Icon name={playing?'pause':'arrow-right'}/></button></div>
 <p className="receipt-provenance">AP-0418 · NF-01 · INV-418:L1 / PO-772:L1 / GR-09:L1<br/>01–09 Oct 2026 · Zero tolerance · No tax, freight or returns</p>
 </figure>;
}
