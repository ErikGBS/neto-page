---
name: neto-design
description: Guía de diseño de neto-page (landing + dashboard admin de Y Altoque). Úsala SIEMPRE antes de crear o modificar páginas, secciones, componentes o gráficos del sitio, para que todo quede moderno, consistente y con la marca. También para piezas visuales de marketing/redes que deban verse alineadas con el producto.
---

# Diseño de neto-page (Y Altoque)

Objetivo: que el sitio (landing y dashboard admin) se vea **moderno, limpio y
profesional**, con identidad consistente. Es un sitio estático (HTML + CSS +
JS vanilla) con Chart.js. Mantén ese stack salvo que se pida lo contrario.

Regla de estilo del proyecto: **no usar em dashes** en copy ni código. Usa coma,
dos puntos, paréntesis o guion simple.

## 1. Fundamentos de marca

### Color (tema oscuro primero)

```
Fondo base      #080B12   (página)
Superficie      #0D1320   (cards, paneles)
Superficie alta #111A2B   (cards elevadas, inputs)
Borde           #1C2740   (líneas, divisores sutiles)

Dorado base     #D0A55C   (acento de marca, CTAs)
Dorado claro    #F3CE7F   (gradiente, highlights)
Dorado profundo #A8803F   (texto/hover sobre dorado)
Sobre dorado    #1A1206   (texto/iconos encima del dorado)

Texto principal #F3F5FA
Texto secundario#B3BCCD
Texto tenue     #8893A6

Funcionales:  cyan #5BD6F0 · verde #4ADE80 · rojo #F87171 · morado #8B6CF0
Paleta charts: ["#D0A55C","#5BD6F0","#4ADE80","#8B6CF0","#F3CE7F","#F87171","#B3BCCD"]
```

Uso: el **dorado es el acento**, no el fondo. Fondos siempre oscuros y neutros.
Verde = positivo/ingreso, rojo = negativo/gasto, cyan = info. No inventes colores
fuera de esta paleta.

### Tipografía

- Familia: `-apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif`.
- Jerarquía clara y con peso, no con tamaño solo: títulos `700-800`, cuerpo `400-500`.
- Escala sugerida: display 28-34px, h2 20-24px, h3 15-17px, cuerpo 14-15px, micro 12px.
- Interlineado cómodo (1.4-1.6 en cuerpo). Limita el ancho de lectura a ~70ch.

### Espaciado, radios y elevación

- Escala de espaciado en múltiplos de 4: 4, 8, 12, 16, 20, 24, 32, 48.
- Radios generosos y consistentes: 10-12px en cards, 14-20px en paneles/hero, 8-9px en chips/botones.
- Elevación con borde sutil (`1px solid #1C2740`) + sombra muy suave, no sombras duras.
- Aire: deja respirar. El look moderno viene del whitespace y la jerarquía, no de rellenar.

## 2. Layout

- Contenedor central con `max-width` ~1100-1200px y padding lateral; nunca texto a borde de pantalla.
- Grid responsive: filas de 2 columnas (`.row2`) que colapsan a 1 en móvil (`@media (max-width:760px)`).
- Ritmo vertical constante entre secciones (ej. 24-32px).
- Mobile-first: usa unidades relativas, `flex`/`grid`, `max-width:100%` en medios; nada debe provocar scroll horizontal.

## 3. Componentes

- **Header:** logo + acciones a la derecha; sticky con fondo translúcido y blur opcional.
- **Botón primario:** dorado (sólido o gradiente `#F3CE7F → #D0A55C`), texto oscuro (`#1A1206`), radio 10-12px, estados hover/active claros.
- **Botón secundario:** transparente con borde `#1C2740`, texto claro.
- **Card / sección:** fondo `#0D1320`/`#111A2B`, borde `#1C2740`, radio 12-16px, título en h3 y contenido con buen padding.
- **KPI card:** etiqueta tenue arriba, número grande y con color funcional, subtítulo de contexto debajo.
- **Tabla:** encabezado en mayúsculas, tenue, con fondo de superficie; filas con divisor `#1C2740`; zebra muy sutil; números alineados.
- **Badge/chip:** pill con color funcional translúcido (ej. `color + "1A"` de fondo y `color` de texto).
- **Inputs:** fondo superficie, borde `#1C2740`, foco con anillo dorado.
- **Estados vacíos y de carga:** siempre contémplalos (skeleton sutil con `#1C2740`, o texto tenue "Sin datos").

## 4. Patrones de "web moderna"

- Jerarquía visual fuerte: una sola cosa dominante por pantalla.
- Whitespace generoso; menos elementos, mejor agrupados.
- Microinteracciones suaves: transiciones de 150-250ms en hover, color y elevación. Nada que rebote o distraiga.
- Gradientes solo como acento (hero, CTA), nunca en bloques grandes de texto.
- Bordes redondeados consistentes en todo el sitio.
- Hero claro: titular con beneficio + subtítulo + CTA único y visible.
- Consistencia > creatividad suelta: reusa los mismos tokens y componentes.

## 5. Gráficos (Chart.js)

Mantén el estilo ya definido en el dashboard admin:

- `Chart.defaults.color = "#8893A6"`, fuente del sistema, size 11.
- Grid `rgba(28,39,64,.55)`; sin bordes de ejes (`border:{display:false}`).
- Tooltip oscuro: fondo `#111A2B`, borde `#1C2740`, radio 11, sin caja de color.
- Línea: `tension .35`, `pointRadius 0` (hover 5), relleno con degradado vertical del color.
- Barras: `borderRadius 7`, `maxBarThickness ~34`, horizontal (`indexAxis:"y"`) para rankings.
- Dona (distribución): `cutout ~60%`, leyenda abajo con `pointStyle:"circle"`, tooltip con conteo y %.
- Series múltiples: usa la paleta en orden. `responsive:true, maintainAspectRatio:false` dentro de un contenedor con altura fija.

## 6. Accesibilidad

- Contraste: texto principal `#F3F5FA` sobre fondos oscuros (AA holgado). Evita texto tenue para información crítica.
- Sobre dorado, usa texto oscuro (`#1A1206`), nunca blanco.
- Estados de foco visibles (anillo dorado) en todo lo interactivo.
- Tamaño mínimo de toque 40px; tamaño de fuente base >= 14px.
- No transmitas información solo por color (acompaña con texto o icono).

## 7. Voz y copy

- Cercano, claro y peruano, sin sonar corporativo ni robot. Tú/usted según contexto, consistente.
- Frases cortas, orientadas a beneficio. Evita jerga técnica en la landing.
- Sin em dashes (regla del proyecto).

## 8. Antes de publicar una página (checklist)

- [ ] Usa solo tokens de color de la paleta.
- [ ] Jerarquía y espaciado consistentes (escala de 4).
- [ ] Responsive verificado (sin scroll horizontal en móvil).
- [ ] Estados hover, foco, carga y vacío contemplados.
- [ ] Gráficos con el estilo Chart.js de la sección 5.
- [ ] Contraste y tamaños accesibles.
- [ ] Copy sin em dashes, claro y de marca.

## Do & Don't

- DO: fondos oscuros neutros, dorado como acento, mucho aire, bordes redondeados consistentes.
- DO: reusar componentes y tokens existentes del sitio.
- DON'T: usar el dorado como fondo de bloques grandes; sombras duras; muchos colores compitiendo; texto pegado a los bordes; gradientes en cuerpos de texto.
