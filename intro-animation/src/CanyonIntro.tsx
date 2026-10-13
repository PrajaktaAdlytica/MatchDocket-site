import React from 'react';
import {AbsoluteFill, CanvasImage, Composition, Easing, Sequence, interpolate, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {loadFont} from '@remotion/fonts';

await Promise.all([
  loadFont({family:'Manrope',url:staticFile('brand/fonts/Manrope-variable.woff2'),weight:'200 800'}),
  loadFont({family:'Teko',url:staticFile('brand/fonts/Teko-variable.woff2'),weight:'300 700'}),
  loadFont({family:'Newsreader',url:staticFile('brand/fonts/Newsreader-variable.woff2'),weight:'200 800'}),
]);

const ease = {extrapolateLeft:'clamp' as const,extrapolateRight:'clamp' as const,easing:Easing.bezier(.22,.78,.24,1)};
const ivory='#FFF9EF';
const muted='#ECE2D2';
const accent='#F0A19A';
const line='rgba(255,249,239,.23)';
const mono:React.CSSProperties={fontFamily:'ui-monospace, monospace',fontSize:17,letterSpacing:2.5};
const glass:React.CSSProperties={background:'linear-gradient(125deg,rgba(88,71,55,.84),rgba(64,48,39,.87))',border:'1px solid rgba(255,242,220,.47)',borderRadius:6,backdropFilter:'blur(16px)',boxShadow:'0 18px 48px rgba(25,13,9,.14)',color:ivory};

function FileIcon(){return <svg width="25" height="29" viewBox="0 0 24 28" fill="none" aria-hidden="true"><path d="M4 2h10l6 6v18H4zM14 2v7h6M8 14h8M8 19h8" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/></svg>}

function SourceChip({id,description,detail,start,side}:{id:string;description:string;detail:string;start:number;side:'left'|'right'}){
 const f=useCurrentFrame();const {fps}=useVideoConfig();
 return <div style={{...glass,width:248,padding:'19px 22px',display:'flex',gap:16,alignItems:'center',opacity:interpolate(f,[start*fps,(start+.75)*fps],[0,1],ease),translate:`${interpolate(f,[start*fps,(start+.9)*fps],[side==='left'?-55:55,0],ease)}px 0`}}>
  <span style={{color:accent}}><FileIcon/></span><div style={{fontSize:20}}><strong style={{fontSize:21,fontWeight:600}}>{id}</strong><div style={{color:muted,fontSize:17,marginTop:4}}>{description}</div><div style={{fontSize:15,opacity:.7,marginTop:5}}>{detail}</div></div>
 </div>;
}

function Sources(){const f=useCurrentFrame();const {fps}=useVideoConfig();return <div style={{position:'absolute',inset:0,opacity:interpolate(f,[0,10.3*fps,11.2*fps],[1,1,0],ease)}}>
 <div style={{position:'absolute',left:360,top:420}}><SourceChip id="INV-418" description="100 × $104" detail="Original invoice" start={3.1} side="left"/></div>
 <div style={{position:'absolute',left:710,top:395}}><SourceChip id="PO-772" description="100 × $100" detail="Purchase order" start={3.8} side="left"/></div>
 <div style={{position:'absolute',left:1060,top:420}}><SourceChip id="GR-09" description="98 received" detail="Source linked" start={4.5} side="right"/></div>
 <svg style={{position:'absolute',left:0,top:0,width:1920,height:1080,overflow:'visible'}}>
  <path d="M507 530 C507 556 610 550 650 561 M858 506 L858 561 M1207 530 C1207 556 1150 550 1120 561" fill="none" stroke="#F9DFC0" strokeWidth="1" pathLength="1" strokeDasharray="1" strokeDashoffset={interpolate(f,[5*fps,6.3*fps],[1,0],ease)} opacity={.55}/>
 </svg>
 </div>}

function Comparison(){const f=useCurrentFrame();const {fps}=useVideoConfig();return <div style={{paddingRight:28,borderRight:`1px solid ${line}`,opacity:interpolate(f,[5.8*fps,6.6*fps],[0,1],ease),translate:`0 ${interpolate(f,[5.8*fps,6.6*fps],[18,0],ease)}px`}}>
 <div style={{fontSize:18,fontWeight:600,marginBottom:16}}>Three-way comparison</div>
 <div style={{display:'flex',justifyContent:'space-between',fontSize:13,color:muted,letterSpacing:1.2,marginBottom:8}}><span>SOURCE</span><span>VALUE</span></div>
 {[['Invoice','INV-418','$10,400'],['Purchase order','PO-772','$10,000'],['Goods receipt','GR-09','98 EA']].map((r,i)=><div key={r[1]} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'5px 0',borderTop:`1px solid ${line}`,opacity:interpolate(f,[(6.1+i*.22)*fps,(6.7+i*.22)*fps],[0,1],ease)}}><div><div style={{fontSize:16,lineHeight:'20px'}}>{r[0]}</div><div style={{fontSize:12,lineHeight:'14px',color:muted,marginTop:2}}>{r[1]}</div></div><strong style={{fontSize:22,fontWeight:600,fontVariantNumeric:'tabular-nums'}}>{r[2]}</strong></div>)}
 </div>}

function Variance(){const f=useCurrentFrame();const {fps}=useVideoConfig();return <div style={{padding:'0 26px',borderRight:`1px solid ${line}`,opacity:interpolate(f,[7.4*fps,8.2*fps],[0,1],ease)}}>
 <div style={{fontSize:18,fontWeight:600}}>Variance analysis</div>
 <svg viewBox="0 0 440 215" width="100%" height="160" style={{overflow:'visible',marginTop:8,fontFamily:'Manrope'}} role="img" aria-label="Invoice 10,400 dollars less 400 price difference and 200 quantity difference equals a supported comparison of 9,800 dollars. Zero baseline.">
  <path d="M10 181H432" stroke={line}/>
  <path d="M54 25H167M167 31H277M277 34H389" fill="none" stroke={muted} strokeDasharray="3 4" opacity={interpolate(f,[8.7*fps,9.8*fps],[0,.5],ease)}/>
  <g style={{opacity:interpolate(f,[7.8*fps,8.3*fps],[0,1],ease)}}><rect x="27" y={181-156*interpolate(f,[7.8*fps,8.8*fps],[0,1],ease)} width="54" height={156*interpolate(f,[7.8*fps,8.8*fps],[0,1],ease)} fill="#CBB89E" rx="2"/><text x="54" y="13" textAnchor="middle" fill={ivory} fontSize="17">$10,400</text><text x="54" y="206" textAnchor="middle" fill={muted} fontSize="13">Invoice</text></g>
  <g style={{opacity:interpolate(f,[8.5*fps,9*fps],[0,1],ease)}}><rect x="139" y="25" width={56*interpolate(f,[8.5*fps,9.2*fps],[0,1],ease)} height="6" rx="1" fill={accent}/><text x="167" y="13" textAnchor="middle" fill={accent} fontSize="17">−$400</text><text x="167" y="206" textAnchor="middle" fill={muted} fontSize="13">Price</text></g>
  <g style={{opacity:interpolate(f,[9*fps,9.5*fps],[0,1],ease)}}><rect x="249" y="31" width={56*interpolate(f,[9*fps,9.7*fps],[0,1],ease)} height="3" rx="1" fill={accent}/><text x="277" y="17" textAnchor="middle" fill={accent} fontSize="17">−$200</text><text x="277" y="206" textAnchor="middle" fill={muted} fontSize="13">Quantity</text></g>
  <g style={{opacity:interpolate(f,[9.5*fps,10*fps],[0,1],ease)}}><rect x="362" y={181-147*interpolate(f,[9.5*fps,10.5*fps],[0,1],ease)} width="54" height={147*interpolate(f,[9.5*fps,10.5*fps],[0,1],ease)} fill="#DED0B7" rx="2"/><text x="389" y="20" textAnchor="middle" fill={ivory} fontSize="17">$9,800</text><text x="389" y="206" textAnchor="middle" fill={muted} fontSize="13">Supported</text></g>
 </svg><div style={{fontSize:12,color:muted,textAlign:'right'}}>USD · Zero baseline · No payment authorization</div>
 </div>}

function Review(){const f=useCurrentFrame();const {fps}=useVideoConfig();return <div style={{paddingLeft:27,opacity:interpolate(f,[10.1*fps,11*fps],[0,1],ease),translate:`${interpolate(f,[10.1*fps,11*fps],[22,0],ease)}px 0`}}>
 <div style={{fontSize:18,fontWeight:600}}>Controller review</div><div style={{font:'600 64px/1 Teko',color:accent,marginTop:12,fontVariantNumeric:'tabular-nums'}}>$600 <span style={{fontSize:32}}>held</span></div>
 <div style={{fontSize:14,color:muted,margin:'4px 0 12px'}}>$400 price + $200 quantity</div>
 <div style={{borderTop:`1px solid ${line}`,paddingTop:10,display:'flex',alignItems:'center',gap:12}}><div style={{width:31,height:31,borderRadius:'50%',background:'#F7EBD520',display:'grid',placeItems:'center',fontSize:11}}>EP</div><div><div style={{fontSize:17,fontWeight:600}}>Elena Park</div><div style={{fontSize:13,color:muted,marginTop:4}}>Named controller · Fictional</div></div></div>
 <div style={{marginTop:12,fontSize:14,display:'flex',alignItems:'center',gap:8}}><div style={{width:6,height:6,borderRadius:'50%',background:accent}}/>Review pending</div>
 </div>}

function Dashboard(){const f=useCurrentFrame();const {fps}=useVideoConfig();return <div style={{...glass,position:'absolute',left:420,top:561,width:1180,height:360,opacity:interpolate(f,[5.1*fps,5.9*fps],[0,1],ease),translate:`0 ${interpolate(f,[5.1*fps,6.6*fps],[65,0],ease)}px`}}>
 <div style={{height:39,margin:'0 26px',borderBottom:`1px solid ${line}`,display:'flex',alignItems:'center',justifyContent:'space-between',fontSize:12}}><div style={{display:'flex',alignItems:'center',gap:14}}><CanvasImage src={staticFile('brand/logo/mark-white.svg')} style={{width:16,height:19}}/><span>AP Review</span><span style={{opacity:.5}}>›</span><span>AP-0418</span></div><span style={{...mono,fontSize:10,letterSpacing:1.5}}>DEMO — SYNTHETIC DATA</span></div>
 <div style={{margin:'0 27px',padding:'13px 0 12px',borderBottom:`1px solid ${line}`}}><div style={{fontSize:25,display:'flex',gap:16,alignItems:'baseline'}}><strong style={{fontFamily:'Teko',fontSize:29}}>AP-0418</strong><span style={{fontSize:21,fontWeight:400}}>Exception review</span></div><div style={{fontSize:13,color:muted,marginTop:3}}>Northforge Tools / NF-01 · Cedar Components</div></div>
 <div style={{display:'grid',gridTemplateColumns:'320px 465px 1fr',padding:'18px 27px 12px'}}><Comparison/><Variance/><Review/></div>
 </div>}

export function CanyonIntro(){const f=useCurrentFrame();const {fps}=useVideoConfig();return <AbsoluteFill style={{background:'#4F352A',fontFamily:'Manrope',lineHeight:1.2,overflow:'hidden'}}>
 <Sequence name="Canyon camera — establish, approach, focus, release" premountFor={fps}><CanvasImage src={staticFile('canyon-landscape.png')} style={{width:1920,height:1080,objectFit:'cover',scale:interpolate(f,[0,5*fps,11*fps,14*fps,18*fps],[1.08,1.04,1.13,1.16,1.05],ease),translate:`${interpolate(f,[0,6*fps,14*fps,18*fps],[-25,20,-26,0],ease)}px ${interpolate(f,[0,10*fps,18*fps],[16,-18,0],ease)}px`,filter:`blur(${interpolate(f,[0,9.8*fps,11.5*fps,14.5*fps,16.5*fps],[0,0,2.8,2.8,0],ease)}px)`}}/></Sequence>
 <AbsoluteFill style={{background:'linear-gradient(180deg,rgba(255,248,229,.12),transparent 35%,rgba(32,16,10,.2))'}}/>
 <Sequence name="Brand signature" premountFor={fps}><div style={{position:'absolute',top:48,left:70,display:'flex',alignItems:'center',gap:16,opacity:interpolate(f,[.3*fps,1.3*fps],[0,1],ease)}}><CanvasImage src={staticFile('brand/logo/mark-signal.svg')} style={{width:42,height:53}}/><span style={{fontSize:29,fontWeight:800,color:'#271E18'}}>MatchDocket</span></div><div style={{...mono,position:'absolute',right:70,top:59,color:'#3D2C21',fontSize:14}}>CONCEPT PREVIEW / SYNTHETIC DATA</div></Sequence>
 <Sequence name="Opening statement" premountFor={fps}><div style={{position:'absolute',left:142,top:150,color:'#251E1A',opacity:interpolate(f,[.9*fps,2*fps,10.4*fps,11.2*fps],[0,1,1,0],ease),translate:`0 ${interpolate(f,[.9*fps,2.2*fps],[25,0],ease)}px`}}><div style={{font:'600 110px/.93 Teko',letterSpacing:-1}}>Every exception.<br/>An accountable decision.</div><div style={{display:'flex',gap:18,alignItems:'center',marginTop:25}}><span style={{height:1,width:38,background:'#802E34'}}/><span style={{...mono,fontSize:14,letterSpacing:2}}>EVIDENCE BEFORE PAYMENT.</span></div></div></Sequence>
 <Sequence name="Evidence camera — slim software panels" premountFor={fps}><AbsoluteFill style={{perspective:2200}}><AbsoluteFill style={{transformOrigin:'67% 66%',transformStyle:'preserve-3d',scale:interpolate(f,[0,5*fps,8*fps,10.5*fps,13*fps,15*fps,17.2*fps],[.85,.85,1,1.02,1.24,1.24,.94],ease),translate:`${interpolate(f,[0,6*fps,10*fps,13*fps,15*fps,17.2*fps],[65,40,0,-95,-95,0],ease)}px ${interpolate(f,[0,5*fps,10*fps,13*fps,15*fps,17.2*fps],[45,20,0,-95,-95,15],ease)}px`,transform:`rotateY(${interpolate(f,[0,5*fps,9*fps,13*fps,17*fps],[-12,-12,2,-4,0],ease)}deg) rotateX(${interpolate(f,[0,5*fps,9*fps,13*fps,17*fps],[5,5,0,2,0],ease)}deg)`}}><Sources/><Dashboard/></AbsoluteFill></AbsoluteFill></Sequence>
 <Sequence name="Human control close-up" premountFor={fps}><div style={{position:'absolute',left:142,top:165,color:'#281E18',opacity:interpolate(f,[11.2*fps,12*fps,14.4*fps,15.3*fps],[0,1,1,0],ease)}}><div style={{...mono,fontSize:14,color:'#802E34',marginBottom:20}}>THE PERSON OWNS THE DECISION</div><div style={{font:'500 67px/1.04 Newsreader'}}>The evidence is connected.<br/>The decision stays human.</div></div></Sequence>
 <Sequence name="Final brand message" premountFor={fps}><div style={{position:'absolute',left:142,top:155,color:'#251E1A',opacity:interpolate(f,[15.2*fps,16.4*fps],[0,1],ease),translate:`0 ${interpolate(f,[15.2*fps,16.6*fps],[22,0],ease)}px`}}><div style={{font:'600 116px/.92 Teko',letterSpacing:-1}}>Clear evidence.<br/>Human control.</div><div style={{font:'30px Newsreader',marginTop:22}}>A clearer path from exception to review.</div></div></Sequence>
 <Sequence name="Concept boundaries" premountFor={fps}><div style={{position:'absolute',left:70,right:70,bottom:42,display:'flex',justifyContent:'space-between',color:ivory,...mono,fontSize:13,letterSpacing:1.5,textShadow:'0 1px 8px #28180D'}}><span>DEMO — SYNTHETIC DATA</span><span>NO PAYMENT · NO BANK CHANGE · NO ERP WRITE</span></div></Sequence>
 <AbsoluteFill style={{background:'#31251D',opacity:interpolate(f,[0,.65*fps],[1,0],ease),pointerEvents:'none'}}/>
 </AbsoluteFill>}

export const CanyonComposition=()=> <Composition id="MatchDocket-Canyon-Intro" component={CanyonIntro} durationInFrames={1080} fps={60} width={1920} height={1080}/>;
