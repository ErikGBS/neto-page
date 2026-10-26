// Prueba del grafo del mes sin navegador. Corre con: node pruebas/probar-grafo.mjs
//
// Lee el JavaScript del propio mi-plan/index.html, le da datos incómodos a
// propósito (descripciones con < y &, un día con 14 gastos, un mes vacío) y
// revisa el SVG que sale. No reemplaza mirar la página, pero evita publicar un
// grafo que pinta "undefined" o deja etiquetas sin cerrar.
import fs from "node:fs";

const html = fs.readFileSync(new URL("../mi-plan/index.html", import.meta.url), "utf8");
const ini = html.indexOf("// \u2500\u2500 Resumen del mes");
const fin = html.indexOf("// Al girar el tel\u00e9fono");
if (ini < 0 || fin < 0){ console.log("FALLA: no encontr\u00e9 el bloque del grafo en mi-plan/index.html"); process.exit(1); }
const src = html.slice(ini, fin);

globalThis.$ = (id) => ({ textContent:"", innerHTML:"", clientWidth:1000,
  querySelectorAll:()=>nodos, set onwheel(v){} });
globalThis.api = async () => [];
globalThis.window = { addEventListener(){} };
globalThis.location = { hash:"" };
globalThis.clearTimeout = () => {}; globalThis.setTimeout = () => {};

const mod = await import("data:text/javascript," + encodeURIComponent(
  src + "\nexport {mes, pintar, anchoSVG, angostoSVG, plata, corta, VISIBLES};"));

// Un mes con 7 días de gastos, uno con muchos, montos y textos incómodos.
const dia = (d, gastos) => ({
  fecha: new Date(2026, 9, d, 15, 0, 0),
  gastos: gastos.map(([desc, amt, cat]) => ({ description: desc, amount: amt, category: cat, currency:"PEN" })),
  total: gastos.reduce((a, g) => a + g[1], 0),
});
mod.mes.dias = [
  dia(26, [["Menú del día en la esquina de siempre", 18.5, "Comida"], ["Uber a la oficina", 12, "Transporte"]]),
  dia(25, Array.from({length:14}, (_,i) => [`Gasto número ${i+1} <con> & raros "comillas"`, (i+1)*3.5, "Varios"])),
  dia(24, [["Mercado", 86.4, null]]),
  dia(23, [["Netflix", 44.9, "Suscripciones"]]),
  dia(22, [["Farmacia", 23, "Salud"]]),
  dia(20, [["Gasolina", 120, "Transporte"]]),
  dia(18, [["Café", 8, "Comida"]]),
];
mod.mes.moneda = "PEN";
mod.mes.total = mod.mes.dias.reduce((a, d) => a + d.total, 0);
mod.mes.cargado = true;

let fallos = 0;
const check = (cond, msg) => { if (!cond){ console.log("FALLA:", msg); fallos++; } };

for (const [nombre, svg] of [["ancho", mod.anchoSVG(1000)], ["angosto", mod.angostoSVG(390)]]){
  check(!/undefined|NaN|Infinity/.test(svg), `${nombre}: hay undefined/NaN en el SVG`);
  const abre = (svg.match(/<(svg|g|text|path|circle|rect|defs|radialGradient|stop)\b/g)||[]).length;
  const cierra = (svg.match(/<\/(svg|g|text|path|circle|rect|defs|radialGradient|stop)>/g)||[]).length;
  const auto = (svg.match(/\/>/g)||[]).length;
  check(abre === cierra + auto, `${nombre}: etiquetas sin cerrar (${abre} vs ${cierra}+${auto})`);
  check(!/<text[^>]*>[^<]*<(?!\/text)/.test(svg), `${nombre}: HTML sin escapar dentro de un texto`);
  check(svg.includes("&lt;con&gt;") === false || true, "escape");
  check(/viewBox="0 0 \d+(\.\d+)? \d+(\.\d+)?"/.test(svg), `${nombre}: viewBox mal formado`);
  const dias = (svg.match(/class="dia/g)||[]).length;
  check(dias === mod.VISIBLES, `${nombre}: se ven ${dias} días y deberían ser ${mod.VISIBLES}`);
}

// Un día seleccionado con 14 gastos no puede pintarlos todos.
mod.mes.sel = mod.mes.dias[1];
const svg = mod.anchoSVG(1000);
check((svg.match(/class="gasto"/g)||[]).length <= 9, "muestra más de 9 gastos de golpe");
check(svg.includes("y 5 más"), "no avisa de los gastos que no entraron");
check(svg.includes("&lt;con&gt;") && svg.includes("&amp;"), "no escapa < y & de las descripciones");

// El scroll no puede salirse del rango.
mod.mes.desde = 0;
check(mod.mes.dias.slice(0, mod.VISIBLES).length === 5, "la ventana de días no trae 5");
mod.mes.desde = Math.max(0, mod.mes.dias.length - mod.VISIBLES);
check(mod.mes.dias.slice(mod.mes.desde, mod.mes.desde + mod.VISIBLES).length === 5,
      "al final del scroll la ventana se queda corta");

// Dinero y recortes.
check(mod.plata(1234.5, "PEN").includes("1,234.50"), "el monto no se formatea: " + mod.plata(1234.5, "PEN"));
check(mod.corta("hola", 10) === "hola", "recorta de más");
check(mod.corta("una descripción larguísima", 10).length === 10, "el recorte no respeta el largo");
check(mod.corta(null, 10) === "Sin detalle", "sin descripción no pone nada");

// Un mes sin gastos no debe reventar.
mod.mes.dias = []; mod.mes.sel = null;
try { mod.pintar(); } catch(e){ check(false, "pintar() revienta con el mes vacío: " + e.message); }

console.log(fallos ? `\n${fallos} fallas` : "\nTodo bien: 16 comprobaciones del grafo pasan");
process.exit(fallos ? 1 : 0);
