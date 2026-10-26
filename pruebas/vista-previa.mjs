// Vista previa del grafo sin navegador ni datos reales. Escribe dos HTML con
// el SVG ya pintado para mirarlos a ojo:
//
//   node pruebas/vista-previa.mjs && open /tmp/vista-ancho.html
//
// En macOS, `qlmanage -t -s 1300 -o . /tmp/vista-ancho.html` saca un PNG. Las
// animaciones se desactivan: la captura congela el primer fotograma y, con
// `animation-fill-mode:both`, todo nace en opacidad 0 y saldría en blanco.
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
const SALIDA = process.argv[2] || os.tmpdir();
const html = fs.readFileSync(new URL("../app/index.html", import.meta.url), "utf8");
const src = html.slice(html.indexOf("// ── Resumen del mes"), html.indexOf("// Al girar el teléfono"));
const css = html.slice(html.indexOf("  /* Grafo del mes */"), html.indexOf("  footer{margin-top:28px"));
const vars = html.slice(html.indexOf(":root{"), html.indexOf("*,*::before"));
globalThis.$ = () => ({ textContent:"", innerHTML:"", clientWidth:1100, querySelectorAll:()=>[], set onwheel(v){} });
globalThis.api = async () => []; globalThis.window = { addEventListener(){} };
globalThis.location = { hash:"" }; globalThis.clearTimeout = ()=>{}; globalThis.setTimeout = ()=>{};
const m = await import("data:text/javascript,"+encodeURIComponent(src+"\nexport {mes,anchoSVG,angostoSVG};"));
const dia = (d,g)=>({fecha:new Date(2026,9,d,15),gastos:g.map(([x,a,c])=>({description:x,amount:a,category:c,currency:"PEN"})),total:g.reduce((s,q)=>s+q[1],0)});
m.mes.dias=[dia(25,[["Yape a Giancarlos Nuñez",35.27,"transferencia"],["Compra en IZI* Helu San Isidro",13.9,"otros"]]),
 dia(24,[["Pago de Netflix",292,"suscripciones"]]),
 dia(23,[["Mercado de la esquina",344.87,"mercado"],["Taxi",22,"transporte"]]),
 dia(22,[["Almuerzo menú",18.5,"comida"],["Gasolina",120,"transporte"],["Farmacia Inkafarma",23,"salud"]]),
 dia(21,[["Café",14,"comida"]])];
m.mes.moneda="PEN"; m.mes.total=7057.85; m.mes.cargado=true; m.mes.sel=m.mes.dias[3];
const pag=(svg,w)=>`<!doctype html><meta charset="utf-8"><style>${vars}}
body{background:#080b12;margin:0;padding:20px;font-family:-apple-system,'Segoe UI',Roboto,sans-serif;width:${w}px}
${css}
/* la vista previa congela el primer fotograma: sin esto todo nace en opacidad 0 */
*{animation:none!important}
html,body{background:#080b12!important}</style><div class="graf">${svg}</div>`;
fs.writeFileSync(path.join(SALIDA, "vista-ancho.html"), pag(m.anchoSVG(1100), 1140));
fs.writeFileSync(path.join(SALIDA, "vista-angosto.html"), pag(m.angostoSVG(380), 420));
console.log("generados en " + SALIDA);
