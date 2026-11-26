"""Genera en/index.html y pt/index.html a partir de index.html (español).

La landing se edita SOLO en español. Después se corre, desde la raíz del repo:

    python3 scripts/traducir_landing.py

Cada texto en español tiene su traducción en la tabla T. El script falla y dice
qué pasa si un texto de T ya no está en index.html, si un texto nuevo sale sin
traducir (salvo los de IGUALES) o si cambió la cabecera que ajusta por idioma:
así las tres versiones no vuelven a quedar desfasadas.
"""
import pathlib
import re
import sys

RAIZ = pathlib.Path(__file__).resolve().parent.parent

# (español, inglés, portugués). Se reemplazan todas las apariciones, de la más
# larga a la más corta, para que una frase no rompa a otra que la contiene.
T = [
    # cabecera y SEO
    ('Y Altoque · Tu dinero, bajo control', 'Y Altoque · Your money, under control', 'Y Altoque · Seu dinheiro, sob controle'),
    ('Y Altoque: registra tus gastos por WhatsApp (texto o foto), deja que la IA los categorice y míralo todo en un dashboard. Multimoneda y en español, inglés y portugués. Gratis.',
     'Y Altoque: track your expenses on WhatsApp (text or photo), let AI categorize them and see everything in one dashboard. Multi-currency, in Spanish, English and Portuguese. Free.',
     'Y Altoque: registre seus gastos pelo WhatsApp (texto ou foto), deixe a IA categorizar tudo e acompanhe em um dashboard. Multimoeda e em português, espanhol e inglês. Grátis.'),
    ('Y Altoque: registra tus gastos por WhatsApp (texto o foto) y la IA los categoriza en un dashboard. Gratis, multimoneda y multilingüe.',
     'Y Altoque: track your expenses on WhatsApp (text or photo) and AI categorizes them in a dashboard. Free, multi-currency and multilingual.',
     'Y Altoque: registre seus gastos pelo WhatsApp (texto ou foto) e a IA categoriza tudo em um dashboard. Grátis, multimoeda e multilíngue.'),
    ('"Logo de Y Altoque"', '"Y Altoque logo"', '"Logo do Y Altoque"'),

    # navegación
    ('>Finanzas &middot; Ahorro<', '>Finance &middot; Savings<', '>Finanças &middot; Economia<'),
    ('>Producto<', '>Product<', '>Produto<'),
    ('>Cómo funciona<', '>How it works<', '>Como funciona<'),
    ('>Precio<', '>Pricing<', '>Preço<'),
    ('>Privacidad<', '>Privacy<', '>Privacidade<'),
    ('>Iniciar sesión<', '>Sign in<', '>Entrar<'),
    ('aria-label="Idioma"', 'aria-label="Language"', 'aria-label="Idioma"'),
    ('aria-label="Abrir menú"', 'aria-label="Open menu"', 'aria-label="Abrir menu"'),

    # 1. despegue
    ('Tu dinero,<br>bajo control.', 'Your money,<br><span class="ajusta">under control.</span>', 'Seu dinheiro,<br>sob controle.'),
    ('Mándale tus gastos por WhatsApp, en texto o con la foto de la boleta. La IA los ordena y tú ves tu mes completo, gratis.',
     'Send your expenses on WhatsApp, as text or a photo of the receipt. AI sorts them out and you see your whole month, free.',
     'Mande seus gastos pelo WhatsApp, em texto ou com a foto do comprovante. A IA organiza tudo e você vê o mês inteiro, grátis.'),
    ('>Descargar para iPhone<', '>Download for iPhone<', '>Baixar para iPhone<'),
    ('>Descargar para Android<', '>Download for Android<', '>Baixar para Android<'),
    ('¿Ya tienes cuenta? <a class="lnk" href="/app/">Inicia sesión</a>. Funciona con Yape, Plin y todos los bancos.',
     'Already have an account? <a class="lnk" href="/app/">Sign in</a>. Works with Yape, Plin and every bank.',
     'Já tem conta? <a class="lnk" href="/app/">Entre</a>. Funciona com Yape, Plin e todos os bancos.'),
    ('cuentas creadas y contando', 'accounts created and counting', 'contas criadas e contando'),
    ('El astronauta de Y Altoque despegando en su cohete', 'The Y Altoque astronaut taking off on a rocket', 'O astronauta do Y Altoque decolando no foguete'),

    # 2. tus mundos
    ('>Tus mundos.<', '>Your worlds.<', '>Seus mundos.<'),
    ('Todo lo que la app hace por ti, en siete mundos que giran alrededor de tu plata.',
     'Everything the app does for you, in seven worlds orbiting your money.',
     'Tudo o que o app faz por você, em sete mundos que giram em torno do seu dinheiro.'),
    ('>Resumen<', '>Overview<', '>Resumo<'),
    ('Lo que entra, lo que sale y lo que te queda, de un vistazo.', "What comes in, what goes out and what's left, at a glance.", 'O que entra, o que sai e o que sobra, num relance.'),
    ('disponibles este mes', 'available this month', 'disponíveis este mês'),
    ('>Cómo vas<', ">How you're doing<", '>Como você está indo<'),
    ('Tu gasto de hoy contra el mismo día del mes pasado.', "Today's spending against the same day last month.", 'Seu gasto de hoje contra o mesmo dia do mês passado.'),
    ('menos que el mes pasado a esta fecha', 'less than last month by this date', 'menos que o mês passado nesta data'),
    ('>Proyección<', '>Forecast<', '>Projeção<'),
    ('Cuánto vas a cerrar el mes y si vas en déficit.', "How you'll close the month and whether you're in the red.", 'Como você vai fechar o mês e se está no vermelho.'),
    ('te sobran al cierre', 'left over at month end', 'sobram no fechamento'),
    ('>Fijos<', '>Fixed<', '>Fixos<'),
    ('Alquiler, luz e internet te avisan antes de vencer.', "Rent, electricity and internet remind you before they're due.", 'Aluguel, luz e internet avisam antes de vencer.'),
    ('pagos fijos vencen esta semana', 'fixed payments due this week', 'pagamentos fixos vencem esta semana'),
    ('>Ahorro<', '>Savings<', '>Poupança<'),
    ('Cada meta con su alcancía, y ves cuánto te falta.', 'Each goal with its piggy bank, so you see how much is left.', 'Cada meta com seu cofrinho, e você vê quanto falta.'),
    ('de tu meta para el viaje', 'of your trip goal', 'da sua meta da viagem'),
    ('>Por cobrar<', '>To collect<', '>A receber<'),
    ('Lo que te deben, anotado y con recordatorio.', 'What people owe you, logged and with a reminder.', 'O que te devem, anotado e com lembrete.'),
    ('te debe Carlos desde el viernes', 'owed by Carlos since Friday', 'Carlos te deve desde sexta'),
    ('>Análisis<', '>Analytics<', '>Análises<'),
    ('Qué día gastas más y en qué se te va.', 'Which day you spend the most and where it goes.', 'Em que dia você gasta mais e para onde vai.'),
    ('se te van los viernes', 'spent on Fridays', 'vão embora às sextas'),

    # 3. whatsapp
    ('>Mándale lo que sea.<', '>Send it anything.<', '>Mande o que quiser.<'),
    ('Afilia tu WhatsApp una vez y envíale la foto de una boleta, tu recibo de luz, una captura de Yape o Plin, o un mensaje. Y Altoque lo lee, te pregunta lo justo y lo anota ya categorizado.',
     'Link your WhatsApp once and send it a photo of a receipt, your electricity bill, a Yape or Plin screenshot, or just a message. Y Altoque reads it, asks only what it needs and logs it already categorized.',
     'Vincule seu WhatsApp uma vez e mande a foto de um comprovante, sua conta de luz, um print do Yape ou Plin, ou uma mensagem. O Y Altoque lê, pergunta só o necessário e registra já categorizado.'),
    ('Elige cómo te habla. Lo cambias cuando quieras en Ajustes.', 'Choose how it talks to you. Change it anytime in Settings.', 'Escolha como ele fala com você. Mude quando quiser em Ajustes.'),
    ('>Cariño<', '>Sweetie<', '>Carinho<'),
    ('>Pana<', '>Buddy<', '>Parça<'),
    ('>Sargento<', '>Sergeant<', '>Sargento<'),
    ('Cómo te habla el asistente', 'How the assistant talks to you', 'Como o assistente fala com você'),
    ('Lee boletas, recibos y capturas de:', 'Reads receipts, bills and screenshots from:', 'Lê comprovantes, contas e prints de:'),
    ('Boletas y facturas', 'Receipts and invoices', 'Notas e faturas'),
    ('Recibos de luz y agua', 'Electricity and water bills', 'Contas de luz e água'),
    ('>En tu app<', '>In your app<', '>No seu app<'),
    ('1 gasto hoy', '1 expense today', '1 gasto hoje'),
    ("' gastos hoy'", "' expenses today'", "' gastos hoje'"),
    ('>en línea<', '>online<', '>online<'),
    ('Chat de ejemplo con Y Altoque', 'Sample chat with Y Altoque', 'Chat de exemplo com o Y Altoque'),
    ('>Arroz 5 kg<', '>Rice 5 kg<', '>Arroz 5 kg<'),
    ('>Aceite y pollo<', '>Oil and chicken<', '>Óleo e frango<'),
    ('Anotado: <span class="monto">', 'Logged: <span class="monto">', 'Anotado: <span class="monto">'),
    ('</span> en Alimentación.<span id="tonoIni"> Ojo, hoy van S/ 94.00. Vamos tranqui pero atentos.</span>',
     '</span> in Food.<span id="tonoIni"> Heads up, S/ 94.00 so far today. Easy does it, but stay sharp.</span>',
     '</span> em Alimentação.<span id="tonoIni"> Olha, hoje já foram S/ 94.00. Tranquilo, mas atento.</span>'),
    ("</span> en '+b.c", "</span> in '+b.c", "</span> em '+b.c"),
    ("'Holi, van '+soles(t)+' hoy. Cuídate un poquito, ¿ya?'", "'Hi sweetie, that is '+soles(t)+' today. Go easy, okay?'", "'Oi, já são '+soles(t)+' hoje. Se cuida um pouquinho, tá?'"),
    ("'Ojo, hoy van '+soles(t)+'. Vamos tranqui pero atentos.'", "'Heads up, '+soles(t)+' so far today. Easy does it, but stay sharp.'", "'Olha, hoje já foram '+soles(t)+'. Tranquilo, mas atento.'"),
    ("' en un día. Para la mano YA. Esto no va.'", "' in one day. Stop spending NOW. This will not do.'", "' em um dia. Pare AGORA. Assim não dá.'"),
    ('Leyendo tu comprobante…', 'Reading your receipt…', 'Lendo seu comprovante…'),
    ('>Mensaje<', '>Message<', '>Mensagem<'),
    ('>Mandar otra boleta<', '>Send another receipt<', '>Mandar outro comprovante<'),
    # comprobantes de ejemplo (chat y chips)
    ("'Recibo de luz'", "'Electricity bill'", "'Conta de luz'"),
    ("'Noviembre 2026'", "'November 2026'", "'Novembro 2026'"),
    ("'Vence el 28/11'", "'Due Nov 28'", "'Vence em 28/11'"),
    ("'Yape a Juan P.'", "'Yape to Juan P.'", "'Yape para Juan P.'"),
    ("'Pago enviado'", "'Payment sent'", "'Pagamento enviado'"),
    ("'26 nov · 7:42 p. m.'", "'26 Nov · 7:42 p.m.'", "'26 nov · 19:42'"),
    ("'26 nov · 1:15 p. m.'", "'26 Nov · 1:15 p.m.'", "'26 nov · 13:15'"),
    ("'Pasaje'", "'Bus fare'", "'Passagem'"),
    ("'Pan francés'", "'Bread rolls'", "'Pão francês'"),
    ("'Leche y huevos'", "'Milk and eggs'", "'Leite e ovos'"),
    ("'Boleta de venta'", "'Sales receipt'", "'Nota fiscal'"),
    ("'Pan, leche y huevos'", "'Bread, milk and eggs'", "'Pão, leite e ovos'"),
    ("'Pago con Yape'", "'Paid with Yape'", "'Pago com Yape'"),
    ("'Pago con Plin'", "'Paid with Plin'", "'Pago com Plin'"),
    ("'a Juan P.'", "'to Juan P.'", "'para Juan P.'"),
    ("'a María R.'", "'to María R.'", "'para María R.'"),
    ("'a Carlos M.'", "'to Carlos M.'", "'para Carlos M.'"),
    ("'a Lucía V.'", "'to Lucía V.'", "'para Lucía V.'"),
    ("'Transferencia BCP'", "'BCP transfer'", "'Transferência BCP'"),
    ("'Transferencia Interbank'", "'Interbank transfer'", "'Transferência Interbank'"),
    ("'Operación 004512'", "'Transaction 004512'", "'Operação 004512'"),
    ("'Operación 118230'", "'Transaction 118230'", "'Operação 118230'"),
    ("'Pago de tarjeta'", "'Card payment'", "'Pagamento de cartão'"),
    ("'Cuenta de ahorros'", "'Savings account'", "'Conta poupança'"),
    ("'Consumo con débito'", "'Debit purchase'", "'Compra no débito'"),
    ("'Supermercado'", "'Supermarket'", "'Supermercado'"),
    ("'Compra con tarjeta'", "'Card purchase'", "'Compra no cartão'"),
    ("'Cuota 1 de 3'", "'Installment 1 of 3'", "'Parcela 1 de 3'"),
    ("'En una cuota'", "'Single payment'", "'À vista'"),
    ("'Alimentación'", "'Food'", "'Alimentação'"),
    ("'Servicios'", "'Utilities'", "'Serviços'"),
    ("'Transferencias'", "'Transfers'", "'Transferências'"),
    ("'Transporte'", "'Transport'", "'Transporte'"),
    ("'Tarjetas'", "'Cards'", "'Cartões'"),
    ("'Compras'", "'Shopping'", "'Compras'"),

    # 4. film
    ('>Tu mes, también en la web.<', '>Your month, on the web too.<', '>Seu mês, também na web.<'),
    ('Lo que anotas en el celular o por WhatsApp aparece al instante en tu panel: en qué se te va, si llegas a fin de mes y lo fijo que viene.',
     "What you log on your phone or on WhatsApp shows up instantly in your dashboard: where your money goes, whether you'll make it to month end and which fixed costs are coming.",
     'O que você registra no celular ou pelo WhatsApp aparece na hora no seu painel: para onde vai o dinheiro, se você chega ao fim do mês e o que de fixo vem por aí.'),
    ('>Míralo con tus datos<', '>See it with your data<', '>Veja com seus dados<'),
    ('Video: recorrido por el panel web de Y Altoque', 'Video: a tour of the Y Altoque web dashboard, in Spanish', 'Vídeo: um tour pelo painel web do Y Altoque, em espanhol'),

    # 5. monedas (cada país conserva el idioma de su mensaje: es la idea de la escena)
    ('>Tu idioma, tu moneda.<', '>Your language, your currency.<', '>Seu idioma, sua moeda.<'),
    ('Nació en Perú y ya se prueba en España. Más de 20 monedas y la app en español, inglés y portugués. Cada gasto guarda su moneda y los totales nunca se mezclan.',
     'Born in Peru and already being tested in Spain. Over 20 currencies, and the app in Spanish, English and Portuguese. Every expense keeps its currency and totals never mix.',
     'Nasceu no Peru e já está em testes na Espanha. Mais de 20 moedas e o app em espanhol, inglês e português. Cada gasto guarda sua moeda e os totais nunca se misturam.'),
    ('EE. UU.', 'USA', 'EUA'),
    ('Perú', 'Peru', 'Peru'),
    ('España', 'Spain', 'Espanha'),
    ('México', 'Mexico', 'México'),
    ('Brasil', 'Brazil', 'Brasil'),
    ('Colombia', 'Colombia', 'Colômbia'),
    ('Uruguay', 'Uruguay', 'Uruguai'),
    ('Ecuador', 'Ecuador', 'Equador'),

    # 6. precio
    ('>La app es gratis. El asistente tiene plan.<', '>The app is free. The assistant is Pro.<', '>O app é grátis. O assistente é Pro.<'),
    ('Dos trofeos dorados', 'Two gold trophies', 'Dois troféus dourados'),
    ('<h3>La app</h3>', '<h3>The app</h3>', '<h3>O app</h3>'),
    ('>para siempre<', '>forever<', '>para sempre<'),
    ('Todas las funciones, para todos. Sin tarjeta, sin anuncios y sin compras dentro.', 'Every feature, for everyone. No card, no ads and no in-app purchases.', 'Todas as funções, para todos. Sem cartão, sem anúncios e sem compras dentro do app.'),
    ('Categorización con IA y panel en tiempo real', 'AI categorization and a real-time dashboard', 'Categorização com IA e painel em tempo real'),
    ('Proyección de flujo y análisis mes a mes', 'Cash-flow projection and month-by-month analysis', 'Projeção de fluxo e análise mês a mês'),
    ('Resumen de negocio y gastos deducibles', 'Business summary and deductible expenses', 'Resumo do negócio e despesas dedutíveis'),
    ('Gastos fijos, cuentas por cobrar e historial completo', 'Fixed expenses, receivables and full history', 'Despesas fixas, contas a receber e histórico completo'),
    ('Multimoneda, en español, inglés y portugués', 'Multi-currency, in Spanish, English and Portuguese', 'Multimoeda, em espanhol, inglês e português'),
    ('10 mensajes gratis con el asistente de WhatsApp al vincularlo', '10 free messages with the WhatsApp assistant when you link it', '10 mensagens grátis com o assistente do WhatsApp ao vincular'),
    ('>Descargar gratis<', '>Download for free<', '>Baixar grátis<'),
    ('Pro, el asistente en tu WhatsApp', 'Pro, the assistant in your WhatsApp', 'Pro, o assistente no seu WhatsApp'),
    ('>al mes, por Yape<', '>a month, via Yape<', '>por mês, via Yape<'),
    ('Para quien registra todo desde el chat, sin abrir la app.', 'For people who log everything from the chat, without opening the app.', 'Para quem registra tudo pelo chat, sem abrir o app.'),
    ('100 mensajes al mes con el asistente', '100 messages a month with the assistant', '100 mensagens por mês com o assistente'),
    ('Fotos de vouchers que se leen solas', 'Receipt photos read on the spot', 'Fotos de comprovantes lidas na hora'),
    ('Registra tu plata desde el chat, estés donde estés', 'Log your money from the chat, wherever you are', 'Registre seu dinheiro pelo chat, onde estiver'),
    ('Se paga por Yape: sin tarjeta y sin renovación automática', 'Paid with Yape: no card and no auto-renewal', 'Pago por Yape: sem cartão e sem renovação automática'),
    ('>Ver mi plan<', '>See my plan<', '>Ver meu plano<'),
    ('Pro anual, dos meses gratis', 'Pro yearly, two months free', 'Pro anual, dois meses grátis'),
    ('>al año, por Yape<', '>a year, via Yape<', '>por ano, via Yape<'),
    ('Para quien ya sabe que lo va a usar todo el año.', "For when you already know you'll use it all year.", 'Para quem já sabe que vai usar o ano todo.'),
    ('Todo lo del Pro mensual, sin cambiar nada', 'Everything in monthly Pro, nothing changes', 'Tudo do Pro mensal, sem mudar nada'),
    ('Pagas 10 meses y usas 12', 'Pay for 10 months, use 12', 'Paga 10 meses e usa 12'),
    ('Un solo Yape al año: te olvidas de renovar', 'One Yape a year: no monthly renewal to remember', 'Um Yape por ano: sem renovar todo mês'),
    ('Ahorras S/ 20 frente a pagarlo mes a mes', 'You save S/ 20 compared to paying month by month', 'Você economiza S/ 20 em vez de pagar mês a mês'),
    ('La app no tiene compras dentro ni anuncios. El Pro es solo para el asistente de WhatsApp.', 'The app has no in-app purchases and no ads. Pro is only for the WhatsApp assistant.', 'O app não tem compras dentro do app nem anúncios. O Pro é só para o assistente do WhatsApp.'),

    # 7. privacidad
    ('>Privado. Cifrado. Tuyo.<', '>Private. Encrypted. Yours.<', '>Privado. Cifrado. Seu.<'),
    ('Una caja fuerte con monedas y billetes', 'A safe full of coins and bills', 'Um cofre com moedas e notas'),
    ('<h3>Qué usamos</h3>', '<h3>What we use</h3>', '<h3>O que usamos</h3>'),
    ('Solo tu inicio de sesión de Google o Apple: nombre y correo para identificarte. No leemos tu correo ni entramos a otros datos. Tus movimientos los registras tú, por WhatsApp o a mano.',
     "Only your Google or Apple sign-in: name and email to identify you. We don't read your email or access any other data. You log your transactions yourself, on WhatsApp or by hand.",
     'Só seu login do Google ou Apple: nome e e-mail para identificar você. Não lemos seu e-mail nem acessamos outros dados. Você mesmo registra suas movimentações, pelo WhatsApp ou manualmente.'),
    ('<h3>Qué guardamos</h3>', '<h3>What we store</h3>', '<h3>O que guardamos</h3>'),
    ('Monto, fecha y categoría. La descripción y la contraparte van cifradas con AES-256. Nunca tu contraseña.',
     'Amount, date and category. Description and counterparty are encrypted with AES-256. Never your password.',
     'Valor, data e categoria. Descrição e contraparte vão cifradas com AES-256. Nunca sua senha.'),
    ('<h3>Qué no hacemos</h3>', "<h3>What we don't do</h3>", '<h3>O que não fazemos</h3>'),
    ('No vendemos ni compartimos tus datos, ni los usamos para publicidad. Los borras para siempre cuando quieras.',
     'We never sell or share your data, or use it for ads. Delete it for good whenever you want.',
     'Não vendemos nem compartilhamos seus dados, nem usamos para publicidade. Você apaga tudo para sempre quando quiser.'),
    ('>Lee la política de privacidad<', '>Read the privacy policy<', '>Leia a política de privacidade<'),

    # 8. aterrizaje
    ('>Empieza hoy, gratis.<', '>Start today, free.<', '>Comece hoje, grátis.<'),
    ('Ya está en el App Store y en Google Play. Descárgala, entra con Google o Apple y toma el control de tu dinero.',
     "It's on the App Store and Google Play. Download it, sign in with Google or Apple and take control of your money.",
     'Já está na App Store e no Google Play. Baixe, entre com Google ou Apple e assuma o controle do seu dinheiro.'),
    ('¿Ya tienes cuenta? <a class="lnk" href="/app/">Inicia sesión en la web</a>.', 'Already have an account? <a class="lnk" href="/app/">Sign in on the web</a>.', 'Já tem conta? <a class="lnk" href="/app/">Entre pela web</a>.'),
    ('"La luna"', '"The moon"', '"A lua"'),
    ('El astronauta de Y Altoque llegando a la luna', 'The Y Altoque astronaut arriving at the moon', 'O astronauta do Y Altoque chegando à lua'),

    # pie
    ('Tu dinero, bajo control. Nace en Perú 🇵🇪, ya se prueba en España 🇪🇸 y crece para el mundo: funciona con cualquier banco o billetera digital, en tu idioma y tu moneda.',
     'Your money, under control. Born in Peru 🇵🇪, already being tested in Spain 🇪🇸 and growing for the world: it works with any bank or digital wallet, in your language and your currency.',
     'Seu dinheiro, sob controle. Nasceu no Peru 🇵🇪, já está em testes na Espanha 🇪🇸 e cresce para o mundo: funciona com qualquer banco ou carteira digital, no seu idioma e na sua moeda.'),
    ('>Síguenos<', '>Follow us<', '>Siga a gente<'),
    ('Síguenos en ', 'Follow us on ', 'Siga a gente no '),
    ('>Mi plan<', '>My plan<', '>Meu plano<'),
    ('>Política de privacidad<', '>Privacy policy<', '>Política de privacidade<'),
    ('Fotos del espacio:', 'Space photos:', 'Fotos do espaço:'),
    (' de NASA, ESA y N. Smith (dominio público) y', ' by NASA, ESA and N. Smith (public domain) and', ' da NASA, ESA e N. Smith (domínio público) e'),
    (' de NASA, ESA y STScI (', ' by NASA, ESA and STScI (', ' da NASA, ESA e STScI ('),
    ('), vía Wikimedia Commons.', '), via Wikimedia Commons.', '), via Wikimedia Commons.'),
    ('Todos los derechos reservados.', 'All rights reserved.', 'Todos os direitos reservados.'),
]

BANDERA = {'es': '🇵🇪', 'en': '🇺🇸', 'pt': '🇧🇷'}
RUTA = {'es': '/', 'en': '/en/', 'pt': '/pt/'}
LANG = {'en': 'en', 'pt': 'pt-BR'}

# Textos que se quedan igual en los tres idiomas: nombres propios, marcas, platos
# peruanos del chat de ejemplo y los mensajes de la escena de monedas (cada país
# habla su idioma). Todo lo demás que salga igual que en español es un texto que
# falta traducir.
IGUALES = {
    'Y Altoque', 'Altoque', 'AG Carinae', 'NGC 3372', 'marketing@yaltoque.com', 'Total S/ 94.00',
    'Yape', 'Plin', 'BCP', 'BBVA', 'Interbank', 'Scotiabank', 'Ripley', 'Falabella', 'Oechsle',
    'Argentina', 'Chile', 'Colombia', 'Uruguay', 'Ecuador', 'Brasil', 'México',
    'Minimarket La Esquina', 'Bodega Don Lucho', 'Menú El Rinconcito', 'Lomo saltado', 'Chicha morada', 'Combi Javier Prado',
    'Anotado en soles.', 'Anotado en euros.', 'Anotado em reais.', 'Logged in dollars.',
    'Anotado en pesos mexicanos.', 'Anotado en pesos colombianos.', 'Perú · Anotado en soles.', 'COP 251,000',
    # iguales en portugués
    'Idioma', 'Sargento', 'Transporte', 'Compras', 'Supermercado', 'Arroz 5 kg', 'Anotado:',
}

PAISES = {'EE. UU.', 'Perú', 'España', 'México', 'Brasil', 'Colombia', 'Uruguay', 'Ecuador'}


def selector(actual):
    """El selector de idioma: el actual en negrita, los otros como enlace."""
    partes = []
    for cod in ('es', 'en', 'pt'):
        txt = f'{BANDERA[cod]}<span class="lc">&nbsp;{cod.upper()}</span>'
        if cod == actual:
            partes.append(f'<b style="color:var(--gold)">{txt}</b>')
        else:
            partes.append(f'<a href="{RUTA[cod]}" style="color:var(--mute);text-decoration:none">{txt}</a>')
    return '<span class="lsep">&nbsp;·&nbsp;</span>'.join(partes)


def cambiar(h, a, b, n=None):
    """Reemplaza y exige que el texto exista (n: cuántas veces debe aparecer)."""
    c = h.count(a)
    if not c or (n is not None and c != n):
        sys.exit(f'index.html cambió: no encuentro {a!r} (aparece {c} veces)')
    return h.replace(a, b)


def legibles(h):
    """Lo que una persona lee o escucha: texto, alt, aria-label, data-unidad y las
    cadenas del JS de la misión que no son código."""
    cuerpo = h[h.index('<nav id="nav">'):]
    sin = re.sub(r'<(script|style)\b.*?</\1>', '', cuerpo, flags=re.S)
    out = [x.strip() for x in re.findall(r'>([^<>]+)<', sin)]
    out += re.findall(r'(?:alt|aria-label|data-unidad)="([^"]+)"', sin)
    for js in re.findall(r'<script>(.*?)</script>', h, flags=re.S):
        if '// Misión' in js:
            out += re.findall(r"'([^'\n]*)'", js)
    return out


def es_texto(x):
    """Descarta lo que es código (selectores, nombres de eventos, fragmentos de HTML)."""
    return bool(re.search(r'[A-Za-zÁÉÍÓÚáéíóúñ]{3}', x)) and not re.search(r'[(){};=<>$\\]|^\.|nbsp|^https?:|^[a-z][\w -]*$|^[A-Z][a-z]+[A-Z]\w*$', x)


def traducir(es, lang):
    col = {'en': 1, 'pt': 2}[lang]
    h = cambiar(es, '<html lang="es">', f'<html lang="{LANG[lang]}">', 1)
    # rutas absolutas: la página vive en /en/ o /pt/
    h = re.sub(r'(src|href|poster)="(?!/|#|https?:|mailto:)', r'\1="/', h)
    h = cambiar(h, '<link rel="canonical" href="https://yaltoque.com/" />', f'<link rel="canonical" href="https://yaltoque.com{RUTA[lang]}" />', 1)
    h = cambiar(h, '<meta property="og:url" content="https://yaltoque.com/" />', f'<meta property="og:url" content="https://yaltoque.com{RUTA[lang]}" />', 1)
    h = cambiar(h, selector('es'), selector(lang), 2)
    for fila in sorted(T, key=lambda f: -len(f[0])):
        h = h.replace(fila[0], fila[col])
    return h


def main():
    es = (RAIZ / 'index.html').read_text()
    faltan = [f[0] for f in T if f[0] not in es]
    if faltan:
        sys.exit('Estos textos de T ya no están en index.html (actualiza la tabla):\n  ' + '\n  '.join(faltan))
    # palabras sueltas que T cambia en todo el texto (países): un texto que solo
    # cambió por ellas sigue en español
    sueltas = [f for f in T if f[0] in PAISES]
    origen = legibles(es)
    for lang in ('en', 'pt'):
        col = {'en': 1, 'pt': 2}[lang]
        out = traducir(es, lang)
        dest = legibles(out)
        if len(dest) != len(origen):
            sys.exit(f'{lang}: la traducción cambió la cantidad de textos ({len(origen)} y {len(dest)}); revisa T')
        sin_traducir = []
        for a, b in zip(origen, dest):
            if not es_texto(a) or a in PAISES:
                continue
            solo_paises = a
            for f in sueltas:
                solo_paises = solo_paises.replace(f[0], f[col])
            if b == solo_paises and b not in IGUALES and a not in IGUALES:
                sin_traducir.append(a)
        if sin_traducir:
            sys.exit(f'{lang}: estos textos siguen en español, agrégalos a T (o a IGUALES si van así):\n  ' + '\n  '.join(dict.fromkeys(sin_traducir)))
        (RAIZ / lang / 'index.html').write_text(out)
        print(f'{lang}/index.html listo')


if __name__ == '__main__':
    main()
