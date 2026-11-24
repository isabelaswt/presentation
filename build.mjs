// Gera index.html (arquivo único, abre direto no navegador) embutindo a fonte e o logo do site.
// Uso: node tools/deck/build.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const root = here;
const font = readFileSync(join(root, 'assets/HelveticaNowDisplay-Medium.ttf')).toString('base64');
const logo = readFileSync(join(root, 'assets/icon.svg'), 'utf8')
  .replace(/<\?xml[^>]*\?>/, '')
  .replace(/<!--[\s\S]*?-->/g, '')
  .replace(/<svg[^>]*>/, '')
  .replace(/<\/svg>/, '')
  .trim();
const html = readFileSync(join(here, 'src.html'), 'utf8')
  .replace('__FONT__', font)
  .replace('__LOGO__', logo);
writeFileSync(join(here, 'index.html'), html);
console.log('ok → index.html', Math.round(html.length / 1024) + ' KB');
