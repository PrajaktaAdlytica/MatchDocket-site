import React,{useEffect,useRef,useState} from 'react';
import {Player} from '@remotion/player';
import {CanyonIntro} from './CanyonFilm';
import './entry-intro.css';

export default function EntryIntro(){
 const section=useRef(null),film=useRef(null),visible=useRef(false),armed=useRef(true),reduced=useRef(false);
 const [canvas,setCanvas]=useState({width:1920,height:1080});
 const [ready,setReady]=useState(false),[playing,setPlaying]=useState(false),[progress,setProgress]=useState(0),[ended,setEnded]=useState(false);
 useEffect(()=>{
  const measure=()=>{const rect=section.current.getBoundingClientRect();setCanvas({width:Math.max(1,Math.round(rect.width)),height:Math.max(1,Math.round(rect.height))});setReady(true);};
  measure();const observer=new ResizeObserver(measure);observer.observe(section.current);return()=>observer.disconnect();
 },[]);
 const play=()=>{setEnded(false);if(reduced.current&&film.current?.getCurrentFrame()>=1000)film.current.seekTo(0);film.current?.play();};
 const replay=()=>{film.current?.seekTo(0);setProgress(0);play();};
 const hero=()=>{film.current?.pause();const target=document.getElementById('home-hero');if(!target)return;const header=document.querySelector('.site-header')?.getBoundingClientRect().height||66;window.scrollTo({top:target.getBoundingClientRect().top+window.scrollY-header,behavior:reduced.current?'instant':'smooth'});if(section.current?.contains(document.activeElement))target.focus({preventScroll:true});};
 useEffect(()=>{
  if(!ready||!film.current)return;
  const player=film.current,media=matchMedia('(prefers-reduced-motion: reduce)');
  const onPlay=()=>setPlaying(true),onPause=()=>setPlaying(false),onFrame=e=>setProgress(e.detail.frame/1079);
  const onEnd=()=>{setPlaying(false);setEnded(true);if(visible.current&&!reduced.current)hero();};
  player.addEventListener('play',onPlay);player.addEventListener('pause',onPause);player.addEventListener('frameupdate',onFrame);player.addEventListener('ended',onEnd);
  function preference(){reduced.current=media.matches||document.documentElement.dataset.motion==='reduced';if(reduced.current){player.pause();player.seekTo(1020);}}
  preference();media.addEventListener('change',preference);const prefs=new MutationObserver(preference);prefs.observe(document.documentElement,{attributes:true,attributeFilter:['data-motion']});
  const observer=new IntersectionObserver(([entry])=>{
   const now=entry.isIntersecting&&entry.intersectionRatio>=.6;visible.current=now;
   if(now&&armed.current){setEnded(false);if(!reduced.current&&document.visibilityState==='visible'){armed.current=false;player.seekTo(0);setProgress(0);player.play();}}
   else if(entry.intersectionRatio<.2){armed.current=true;player.pause();}
  },{threshold:[0,.2,.6,1]});observer.observe(section.current);
  const visibility=()=>{if(document.hidden)player.pause();else if(visible.current&&armed.current&&!reduced.current){armed.current=false;player.seekTo(0);setProgress(0);player.play();}};document.addEventListener('visibilitychange',visibility);
  return()=>{observer.disconnect();prefs.disconnect();media.removeEventListener('change',preference);document.removeEventListener('visibilitychange',visibility);player.removeEventListener('play',onPlay);player.removeEventListener('pause',onPause);player.removeEventListener('frameupdate',onFrame);player.removeEventListener('ended',onEnd);player.pause();};
 },[ready]);
 return <section ref={section} className="entry-intro" id="intro" aria-label="MatchDocket cinematic introduction">
  <div className="entry-intro-backdrop" aria-hidden="true"/>
  {ready?<Player ref={film} className="entry-intro-video" component={CanyonIntro} durationInFrames={1080} compositionWidth={canvas.width} compositionHeight={canvas.height} fps={60} initiallyMuted controls={false} clickToPlay={false} doubleClickToFullscreen={false} spaceKeyToPlayOrPause={false} moveToBeginningWhenEnded={false} style={{width:'100%',height:'100%'}}/>:<img className="entry-intro-video" src="/brand/intro/poster.jpg" alt="Sunrise across a sandstone canyon and winding river"/>}
  <h2 className="sr-only">Clear evidence. Human control.</h2>
  <p className="sr-only">18-second synthetic demonstration: $10,400 invoice, $10,000 purchase order, 98 units received, $600 disputed. Review pending. No payment, bank change or ERP write.</p>
  <div className="entry-intro-controls"><span className="entry-intro-caption">DOCKET SIGNAL <i/> 18 SECOND INTRO</span><div>
   <button type="button" onClick={()=>playing?film.current?.pause():ended?replay():play()} aria-label={playing?'Pause introduction':'Play introduction'}>{playing?'Pause':'Play'}<span aria-hidden="true">{playing?'Ⅱ':'▷'}</span></button>
   <button type="button" onClick={replay} aria-label="Replay introduction from beginning">Replay <span aria-hidden="true">↻</span></button>
   <button type="button" className="entry-intro-skip" onClick={hero}>Skip to hero <span aria-hidden="true">↓</span></button>
  </div></div>
  <div className="entry-intro-progress" role="progressbar" aria-label="Introduction progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(progress*100)}><span style={{transform:`scaleX(${progress})`}}/></div>
 </section>;
}
