#!/bin/zsh
# Graba los clips del portal para el vídeo de presentación (pruebas/video/compo.html).
#
#   cd pruebas/video && ./grabar-clips.sh [URL_DEMO]
#
# Cada clip es una sesión de playwright-cli con Chrome real a 1920x1080 y 30 fps.
# La demo (URL_DEMO) es app/index.html con el stub de usuario y datos de ejemplo,
# servida por http; el login se graba de producción sin sesión, que no muestra
# datos de nadie. Cada clip dura un par de segundos más que su escena.
set -e
DEMO="${1:-http://localhost:8777/index.html}"
cd "$(dirname "$0")"
mkdir -p clips

clip() {   # nombre, url, segundos de espera inicial
  local nombre="$1" url="$2" espera="$3"
  playwright-cli -s="v-$nombre" open --browser=chrome "about:blank" >/dev/null
  playwright-cli -s="v-$nombre" resize 1920 1080 >/dev/null
  playwright-cli -s="v-$nombre" video-start "clips/$nombre.webm" --size 1920x1080 --fps 30 >/dev/null
  playwright-cli -s="v-$nombre" goto "$url" >/dev/null
  sleep "$espera"
}
fin() { playwright-cli -s="v-$1" video-stop >/dev/null; playwright-cli -s="v-$1" close >/dev/null; echo "clip $1 listo"; }
ev() { playwright-cli -s="v-$1" --raw eval "$2" >/dev/null; }

# Login (producción, sin sesión): 6 s de pantalla de entrada.
clip login "https://yaltoque.com/app/" 7; fin login

# Resumen: los planetas nacen y las cifras suben; a los 6 s el puntero toca el mundo grande.
clip resumen "$DEMO#resumen" 6
playwright-cli -s=v-resumen hover ".planeta.oro" >/dev/null; sleep 4
fin resumen

# Gastos: cinturón de mundos; después baja despacio por las columnas y la dona.
clip gastos "$DEMO#gastos" 3
ev gastos "(window.scrollTo({top:720,behavior:'smooth'}),'ok')"; sleep 3
ev gastos "(window.scrollTo({top:1500,behavior:'smooth'}),'ok')"; sleep 3
fin gastos

# Fin de mes: el deslizador "Si gastara" sube y vuelve, y toda la proyección cambia.
clip finmes "$DEMO#finmes" 3
ev finmes "(()=>{const r=document.getElementById('fmRango');if(!r)return 'sin rango';const v0=+r.value,v1=+r.max*.92,t0=performance.now();const paso=(t)=>{const e=Math.min(1,(t-t0)/1800);r.value=v0+(v1-v0)*(1-Math.pow(1-e,3));r.dispatchEvent(new Event('input'));if(e<1)requestAnimationFrame(paso);};requestAnimationFrame(paso);return 'ok'})()"; sleep 2.6
ev finmes "(()=>{const r=document.getElementById('fmRango');const v0=+r.value,v1=+r.max*.42,t0=performance.now();const paso=(t)=>{const e=Math.min(1,(t-t0)/1600);r.value=v0+(v1-v0)*(1-Math.pow(1-e,3));r.dispatchEvent(new Event('input'));if(e<1)requestAnimationFrame(paso);};requestAnimationFrame(paso);return 'ok'})()"; sleep 2.6
fin finmes

# Movimientos: las tejas entran y se abre un movimiento con su detalle.
clip movs "$DEMO#movs" 3
ev movs "(document.querySelectorAll('.mov')[1].click(),'ok')"; sleep 4
fin movs

# Compromisos: la línea del mes y las tejas; baja un poco a los fijos.
clip compromisos "$DEMO#compromisos" 3
ev compromisos "(window.scrollTo({top:420,behavior:'smooth'}),'ok')"; sleep 4
fin compromisos

# Metas: el camino de cuotas con los trofeos.
clip metas "$DEMO#metas" 6; fin metas

# Planes: la pestaña Activar Pro.
clip pro "$DEMO#pro" 5.5; fin pro

ls -la clips

# Los webm de Playwright no traen índice (no se puede buscar dentro) y arrancan con
# la página en blanco: se pasan a mp4 h264 recortando ese primer segundo.
for par in login:1.2 resumen:1.1 gastos:1.2 finmes:1.2 movs:1.2 compromisos:1.2 metas:1.2 pro:2.0; do
  n="${par%%:*}"; corte="${par##*:}"   # Planes tarda más en cargar
  ffmpeg -v error -y -i "clips/$n.webm" -ss "$corte" -an -c:v libx264 -preset fast -crf 18 -pix_fmt yuv420p -r 30 -movflags +faststart "clips/$n.mp4"
done
ls -la clips/*.mp4
