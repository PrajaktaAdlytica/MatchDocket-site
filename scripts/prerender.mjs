import {build} from 'esbuild';
import {readFile,writeFile,mkdir,rm} from 'node:fs/promises';
import {pathToFileURL} from 'node:url';
await build({entryPoints:['src/render.jsx'],bundle:true,platform:'node',format:'esm',outfile:'.ssr/render.mjs',loader:{'.css':'empty'},packages:'external'});
const {render}=await import(pathToFileURL(`${process.cwd()}/.ssr/render.mjs`));
const config=JSON.parse(await readFile('routes.json','utf8'));const seed=JSON.parse(await readFile('src/data.json','utf8'));
const origin='https://matchdocket-warm-ledger.artfullarch32.chatgpt.site';
const pages=[...config.pages,...seed.cases.filter(c=>c.id!=='AP-0418').map(c=>({route:`/demo/cases/${c.id}`,page:`${c.id} — ${c.vendor}`}))];
const shell=await readFile('dist/index.html','utf8');
for(const {route,page} of pages){let html=shell.replace('<div id="root"></div>',`<div id="root">${render(route)}</div>`);const title=route==='/'?'MatchDocket — Every exception. An accountable decision.':`${page} | MatchDocket`;html=html.replace(/<title>.*?<\/title>/,`<title>${title}</title>`).replace('content="MatchDocket — Controllers in control"',`content="${title}"`).replace('</head>',`<link rel="canonical" href="${origin}${route}"/><meta property="og:url" content="${origin}${route}"/><meta property="og:image" content="${origin}/social-preview.png"/></head>`);const dir=route==='/'?'dist':`dist${route}`;await mkdir(dir,{recursive:true});await writeFile(`${dir}/index.html`,html);}
await writeFile('dist/404.html',shell.replace('<div id="root"></div>',`<div id="root">${render('/not-found')}</div>`));
await writeFile('dist/sitemap.xml',`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${config.pages.filter(p=>!p.route.startsWith('/demo')&&p.route!=='/sign-in').map(p=>`<url><loc>${origin}${p.route}</loc></url>`).join('')}</urlset>`);
await writeFile('dist/robots.txt',`User-agent: *\nDisallow: /demo\nDisallow: /sign-in\nSitemap: ${origin}/sitemap.xml\n`);
await rm('.ssr',{recursive:true});console.log(`Rendered ${pages.length} routes with readable HTML and route metadata.`);
