// Vista previa del portal entero (barra lateral + hoja), sin Supabase ni
// backend: se rellena el DOM a mano con datos de ejemplo y se quita el JS, que
// es la misma técnica que ya usamos para juzgar el panel admin sin publicarlo.
//
//   node pruebas/vista-portal.mjs && open /tmp/portal-ancho.html
//
// En macOS, `qlmanage -t -s 1500 -o . /tmp/portal-ancho.html` saca un PNG.
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const SALIDA = process.argv[2] || os.tmpdir();
const html = fs.readFileSync(new URL("../app/index.html", import.meta.url), "utf8");

// 1) El grafo, generado con el mismo código que usa la página.
const src = html.slice(html.indexOf("// ── Resumen del mes"), html.indexOf("// Al girar el teléfono"));
globalThis.$ = () => ({ textContent:"", innerHTML:"", clientWidth:900, querySelectorAll:()=>[], set onwheel(v){} });
globalThis.api = async () => []; globalThis.window = { addEventListener(){} };
globalThis.location = { hash:"" }; globalThis.clearTimeout = ()=>{}; globalThis.setTimeout = ()=>{};
const m = await import("data:text/javascript," + encodeURIComponent(src + "\nexport {mes,anchoSVG,angostoSVG};"));
const dia = (d, g) => ({ fecha:new Date(2026,9,d,15),
  gastos:g.map(([x,a,c]) => ({description:x, amount:a, category:c, currency:"PEN"})),
  total:g.reduce((s,q)=>s+q[1],0) });
m.mes.dias = [
  dia(26,[["Yape a Giancarlos Nuñez",24,"transferencia"]]),
  dia(25,[["Compra en IZI* Helu San Isidro",13.9,"otros"],["Vendomatica",2.2,"otros"]]),
  dia(24,[["Pago de Netflix",292,"suscripciones"]]),
  dia(23,[["Mercado",344.87,"mercado"],["Taxi",22,"transporte"]]),
  dia(22,[["Almuerzo menú",18.5,"comida"],["Gasolina",120,"transporte"],["Farmacia",23,"salud"]]),
];
m.mes.moneda = "PEN"; m.mes.total = 7081.85; m.mes.cargado = true; m.mes.sel = m.mes.dias[4];

// 2) El marco, con el JS fuera y el DOM ya relleno.
const kpi = (cls,l,v,s) => `<div class="kpi ${cls}"><span class="lbl">${l}</span><span class="val">${v}</span><span class="sub">${s}</span></div>`;
const KPIS = kpi("rojo","Gastado","S/ 7,081.85","5 días con movimientos")
  + kpi("verde","Ingresos","S/ 9,450.00","registrados este mes")
  + kpi("oro","Balance","S/ 2,368.15","te queda a favor")
  + kpi("cyan","Racha","12 días","hoy ya registraste");

// Las media queries miran el viewport, y la captura siempre es ancha: para
// juzgar el teléfono hay que aplicar ese bloque como CSS plano.
function movil(p){
  const i = p.indexOf("@media (max-width:900px){");
  if (i < 0) return p;
  let j = i + "@media (max-width:900px){".length, nivel = 1;
  while (j < p.length && nivel > 0){ if (p[j] === "{") nivel++; if (p[j] === "}") nivel--; j++; }
  const reglas = p.slice(i + "@media (max-width:900px){".length, j - 1);
  return p.slice(0, i) + reglas + p.slice(j)
    + `<style>body{width:390px}.kpis{grid-template-columns:1fr 1fr!important}</style>`;
}

function pagina(svg, ancho){
  let p = html.slice(0, html.indexOf('<script src='));          // sin nada de JS
  p = p.replace('<div id="app" class="shell" style="display:none">', '<div id="app" class="shell">');
  p = p.replace('<div class="ava" id="ava">·</div>', '<div class="ava" id="ava">E</div>');
  p = p.replace('<b id="nombre">Tu cuenta</b>', '<b id="nombre">Erik Abanto</b>');
  p = p.replace('<span id="correo"></span>', '<span id="correo">erik@yaltoque.com</span>');
  p = p.replace('<div class="v" id="miniPlan">...</div>', '<div class="v" id="miniPlan">Gratis</div>');
  p = p.replace('<div class="s" id="miniSub"></div>', '<div class="s" id="miniSub">14 de 20 mensajes</div>');
  p = p.replace('<button class="primary" id="ctaPro" style="display:none">', '<button class="primary" id="ctaPro">');
  p = p.replace(/<h2 id="hola"[\s\S]*?<\/h2>/, '<h2 id="hola" style="font-size:1.1rem">Buenas tardes, Erik <span class="muted" style="font-weight:400">· octubre de 2026</span></h2>');
  p = p.replace('<p id="frase"></p>', '<p id="frase">Vas S/ 7,081 este mes y lo que más pesa es mercado. Tranquilo, todavía estás dentro de tu promedio.</p>');
  p = p.replace('<div class="kpis" id="kpis"></div>', `<div class="kpis" id="kpis">${KPIS}</div>`);
  p = p.replace(/<div class="graf" id="graf">[\s\S]*?<\/div>/, `<div class="graf" id="graf">${svg}</div>`);
  // La captura congela el primer fotograma: con fill-mode both todo nacería invisible.
  p = p.replace("</style>", "*{animation:none!important}</style>");
  return p + `</body></html>\n<!-- ancho de referencia: ${ancho}px -->`;
}

fs.writeFileSync(path.join(SALIDA,"portal-ancho.html"), pagina(m.anchoSVG(900), 1200));
fs.writeFileSync(path.join(SALIDA,"portal-angosto.html"), movil(pagina(m.angostoSVG(340), 390)));
console.log("generados en " + SALIDA);
