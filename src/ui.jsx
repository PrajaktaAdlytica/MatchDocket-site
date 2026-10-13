import React from 'react';
import {Link} from 'react-router-dom';

const events=[];
const allowed=new Set(['landing_view','buyer_qualified','offer_11_selected','demo_open','evidence_view','override_view','price_view','pilot_request','consent_submit']);
const campaign={};
for(const key of ['utm_source','utm_campaign']){const value=new URLSearchParams(typeof location==='undefined'?'':location.search).get(key);if(value&&/^[a-zA-Z0-9_-]{1,64}$/.test(value))campaign[key]=value;}
export function track(name,properties={}){if(!allowed.has(name))return;const clean={};for(const key of ['selected_offer_id','route','action','qualified'])if(key in properties)clean[key]=properties[key];events.push({name,...campaign,...clean,at:new Date().toISOString(),preview:true});if(events.length>200)events.shift();}
export const getEvents=()=>[...events];
export function Icon({name='arrow-right',className='',...props}){return <img className={`icon ${className}`} src={`/brand/icons/${name}.svg`} alt="" aria-hidden="true" {...props}/>;}
export function Button({to,children,secondary=false,className='',onClick,...props}){const content=<><span className="button-copy"><span>{children}</span><span aria-hidden="true">{children}</span></span><Icon name="arrow-up-right"/></>;const classes=`button ${secondary?'button-secondary':''} ${className}`;return to?<Link to={to} className={classes} onClick={onClick} {...props}>{content}</Link>:<button type="button" className={classes} onClick={onClick} {...props}>{content}</button>;}
export function Tag({children,tone='sage',className=''}){return <span className={`tag tag-${tone} ${className}`}>{children}</span>;}
export function Eyebrow({children}){return <div className="eyebrow"><span className="eyebrow-rule"/>{children}</div>;}
export function SectionHeading({eyebrow,title,children}){return <div className="section-heading"><div>{eyebrow&&<Eyebrow>{eyebrow}</Eyebrow>}<h2>{title}</h2></div>{children&&<div className="section-intro">{children}</div>}</div>;}
export function Figure({kind='workflow',caption,className=''}){return <figure className={`brand-figure ${className}`}><img src={`/brand/figures/${kind}.svg`} alt={caption||`${kind} — illustrative synthetic data`} loading="lazy"/>{caption&&<figcaption>{caption}</figcaption>}</figure>;}
export function Callout({children}){return <aside className="callout"><Icon name="circle-alert"/><div>{children}</div></aside>;}
export function PageCTA({title='Start with the exception that keeps coming back.',body='A bounded historical audit. One entity, one workflow, your policy.',to='/request-audit',label='Request an exception audit'}){return <section className="page-cta container"><div><Eyebrow>A smaller place to start</Eyebrow><h2>{title}</h2><p>{body}</p></div><Button to={to}>{label}</Button></section>;}
export const offers=[
 {id:1,slug:'invoice-intake',name:'Invoice Intake',icon:'files',figure:'duplicate',desc:'Separate new invoices from duplicate and identity questions.',detail:'Invoice intake and duplicate/identity triage.',effect:'trace'},
 {id:2,slug:'variance-review',name:'Variance Review',icon:'git-compare-arrows',figure:'compare',desc:'Put the invoice, purchase order, and receipt side by side.',detail:'PO–receipt–invoice variance desk with evidence requests.',effect:'shutter'},
 {id:3,slug:'vendor-verification',name:'Vendor Verification',icon:'shield-alert',figure:'bank',desc:'Give sensitive vendor changes a separate verification queue.',detail:'Vendor tax/bank-change verification queue. Independent review; no bank edits.',effect:'corners'},
 {id:4,slug:'coding-approvals',name:'Coding & Approvals',icon:'route',figure:'approvals',desc:'Propose the coding. Make the approval path explicit.',detail:'GL coding and approval-path proposal, with approver sign-off.',effect:'rise'},
 {id:5,slug:'pay-run-readiness',name:'Pay-run Readiness',icon:'clipboard-list',figure:'packet',desc:'Carry decisions, evidence, and unresolved holds into one packet.',detail:'Pay-run readiness packet and ERP reconciliation export.',effect:'lift'}
];
