import {readFile, writeFile, readdir, copyFile, unlink} from 'node:fs/promises';

// Run after the regular build. Hostinger Git serves these files without Node.js.
const previousOrigin = 'https://matchdocket-warm-ledger.artfullarch32.chatgpt.site';
const input = process.env.SITE_URL?.trim();
let origin;
if (input) {
  const url = new URL(input);
  if (url.protocol !== 'https:' || url.pathname !== '/' || url.search || url.hash || url.username || url.password) {
    throw new Error('SITE_URL must be an HTTPS origin, e.g. https://example.com');
  }
  origin = url.origin;
}
async function prepare(directory) {
  for (const entry of await readdir(directory, {withFileTypes: true})) {
    const path = `${directory}/${entry.name}`;
    if (entry.isDirectory()) await prepare(path);
    else if (entry.name.endsWith('.html')) {
      let html = await readFile(path, 'utf8');
      if (origin) html = html.replaceAll(previousOrigin, origin);
      else html = html.replace(/<link rel="canonical"[^>]*\/>/g, '')
        .replace(/<meta property="og:(?:url|image)"[^>]*\/>/g, '');
      await writeFile(path, html);
    }
  }
}
await prepare('dist');
if (origin) {
  for (const name of ['sitemap.xml', 'robots.txt']) {
    const path = `dist/${name}`;
    await writeFile(path, (await readFile(path, 'utf8')).replaceAll(previousOrigin, origin));
  }
} else {
  await unlink('dist/sitemap.xml');
  await writeFile('dist/robots.txt', 'User-agent: *\nDisallow: /demo\nDisallow: /sign-in\n');
}
await copyFile('hosting/hostinger.htaccess', 'dist/.htaccess');
console.log(`Hostinger files prepared. ${origin ? `Canonical origin: ${origin}` : 'Domain not supplied: canonical URLs and sitemap omitted until SITE_URL is configured.'}`);
