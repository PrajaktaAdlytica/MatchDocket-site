import {useEffect} from 'react';

// Entrance motion owns individual `translate`, leaving hover transforms untouched.
// Content is visible without JavaScript; leaving the viewport re-arms the entrance.
const selectors=[
 '.signal-hero-copy','.signal-hero-art','.signal-heading-row > *',
 '.signal-source-card','.signal-variance-card','.signal-desk-grid > a',
 '.signal-control-grid > .signal-state-paper','.signal-audit-mini',
 '.signal-start-grid > div','.buyer-grid > div',
 '.section-heading > *','.workflow-steps > div','.workflow-rule',
 '.demo-entry-head > *','.preview-workbench',
 '.context-grid > div','.pilot-grid > *','.two-col > *','.data-fit-band > .container > *',
 '.secondary-hero-grid > div','.three-col > *','.module-directory > a',
 '.context-directory > a','.research-cards > a','.source-register > article',
 '.faq-list > details','.page-cta > *','.sign-in-layout > div',
 '.inquiry-layout > aside','.annotated-checklist > li','.method-explanation > *',
 '.footer-top > *','.footer-grid > div'
].join(',');

export default function useScrollEntrances(route){
 useEffect(()=>{
  if(route.startsWith('/demo')||typeof IntersectionObserver==='undefined'||!Element.prototype.animate)return;
  const main=document.querySelector('main');main.dataset.scrollSurface='';const footer=document.querySelector('.site-footer');
  const raw=[...main.querySelectorAll(selectors),...footer.querySelectorAll('.footer-top > *, .footer-grid > div')];
  const excluded='.journey-section,.inquiry-form,.inquiry-result,.demo-page,.table-wrap,.authority-sequence';
  const dynamic='.product-motion,.receipt-flow,.authority-sequence,.journey-sticky';
  const candidates=[...new Set(raw)].filter(el=>!el.closest(excluded)&&!el.matches(dynamic)&&!el.querySelector(dynamic));
  // Avoid animating a nested block twice. Every grid sibling retains its own order.
  const nodes=candidates.filter(el=>!candidates.some(parent=>parent!==el&&parent.contains(el)));
  const index=new Map();nodes.forEach((el,i)=>{index.set(el,i);el.dataset.scrollEntry='';el.dataset.scrollSide=i%2?'right':'left';el.dataset.scrollState='ready';});
  const animations=new Map();const inView=new Set();const media=matchMedia('(prefers-reduced-motion: reduce)');
  let observer=null,lastY=window.scrollY,direction=1,disposed=false;
  const enabled=()=>!media.matches&&document.documentElement.dataset.motion!=='reduced';
  function settle(el){animations.get(el)?.cancel();animations.delete(el);el.dataset.scrollState='settled';}
  function animate(el,delay){if(el.contains(document.activeElement)||!enabled())return;settle(el);el.dataset.scrollState='entering';const distance=matchMedia('(max-width: 760px)').matches?24:48;const x=el.dataset.scrollSide==='left'?-distance:distance;
   const animation=el.animate([{opacity:.12,translate:`${x}px 0`},{opacity:1,translate:'0px 0'}],{duration:560,delay,easing:'cubic-bezier(.2,.75,.25,1)',fill:'backwards'});animations.set(el,animation);animation.onfinish=()=>{if(animations.get(el)===animation){animations.delete(el);animation.cancel();el.dataset.scrollState='settled';}};
  }
  function configure(){observer?.disconnect();observer=null;animations.forEach(a=>a.cancel());animations.clear();inView.clear();nodes.forEach(el=>el.dataset.scrollState='settled');if(!enabled()||disposed)return;
   observer=new IntersectionObserver(entries=>{const entering=[];entries.forEach(entry=>{const el=entry.target;if(entry.isIntersecting){if(!inView.has(el)){inView.add(el);entering.push(el);}}else{inView.delete(el);settle(el);el.dataset.scrollState='ready';}});
    entering.sort((a,b)=>direction*(index.get(a)-index.get(b)));entering.forEach((el,i)=>animate(el,Math.min(i*85,255)));
   },{threshold:0,rootMargin:'-76px 0px -4% 0px'});nodes.forEach(el=>observer.observe(el));
  }
  function scrollDirection(){const y=window.scrollY;if(Math.abs(y-lastY)>1)direction=y>lastY?1:-1;lastY=y;}
  function focus(event){nodes.filter(el=>el.contains(event.target)).forEach(settle);}
  const preferences=new MutationObserver(configure);preferences.observe(document.documentElement,{attributes:true,attributeFilter:['data-motion']});media.addEventListener('change',configure);window.addEventListener('scroll',scrollDirection,{passive:true});document.addEventListener('focusin',focus);configure();
  return()=>{delete main.dataset.scrollSurface;disposed=true;observer?.disconnect();preferences.disconnect();media.removeEventListener('change',configure);window.removeEventListener('scroll',scrollDirection);document.removeEventListener('focusin',focus);animations.forEach(a=>a.cancel());nodes.forEach(el=>{delete el.dataset.scrollEntry;delete el.dataset.scrollSide;delete el.dataset.scrollState;});};
 },[route]);
}
