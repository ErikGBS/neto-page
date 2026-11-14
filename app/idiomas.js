// Idioma del portal. El portal se escribe en español y se traduce en el DOM:
// un observador reemplaza cada texto (y placeholder, aria-label, title, alt)
// que tenga traducción en TXT. Lo que no está en TXT queda en español, así que
// una frase nueva sin traducir nunca rompe nada.
//
// - Claves: el texto en español tal como queda en pantalla, con los espacios
//   colapsados. `{}` marca un trozo variable y `{n}` uno que solo puede ser una
//   cifra (así "{n} días" no atrapa "Menú del día"); en la traducción, `{}` los
//   toma en orden y `{1}`, `{2}`... permiten reordenarlos. Cada trozo se traduce
//   a su vez.
// - Lo marcado con translate="no" (el panel admin) no se toca.
// - Los nombres de categoría son datos del usuario y no se traducen (igual que
//   en la app, strings_categories.dart).
// - Fechas y cifras no pasan por aquí: usan LOC al pintarse.
const IDIOMAS_LOC = { es:"es-PE", en:"en-US", pt:"pt-BR" };
let LANG = "es", LOC = "es-PE";

// [inglés, portugués]
const TXT = {
"Mi dinero": ["My money", "Meu dinheiro"],
"Resumen": ["Summary", "Resumo"],
"Gastos": ["Spending", "Gastos"],
"Fin de mes": ["Month end", "Fim do mês"],
"Movimientos": ["Transactions", "Movimentações"],
"Compromisos": ["Commitments", "Compromissos"],
"Metas": ["Goals", "Metas"],
"Mi cuenta": ["My account", "Minha conta"],
"Mi plan": ["My plan", "Meu plano"],
"Activar Pro": ["Get Pro", "Ativar Pro"],
"Ajustes": ["Settings", "Ajustes"],
"En qué se te va": ["Where your money goes", "Para onde vai seu dinheiro"],
"¿Llegas a fin de mes?": ["Will you make it to month end?", "Você chega ao fim do mês?"],
"Ver mi plan": ["See my plan", "Ver meu plano"],
"Salir": ["Log out", "Sair"],
"Tu cuenta": ["Your account", "Sua conta"],
"Más": ["More", "Mais"],
"Más opciones": ["More options", "Mais opções"],
"Navegación": ["Navigation", "Navegação"],
"Plegar el menú": ["Collapse menu", "Recolher menu"],
"Desplegar el menú": ["Expand menu", "Expandir menu"],
"Cambiar foto": ["Change photo", "Alterar foto"],
"Cambiar foto de perfil": ["Change profile photo", "Alterar foto do perfil"],
"Subiendo tu foto…": ["Uploading your photo…", "Enviando sua foto…"],
"No se pudo subir, prueba con otra foto": ["Couldn't upload it, try another photo", "Não foi possível enviar, tente outra foto"],
"Moneda": ["Currency", "Moeda"],
"Moneda del resumen": ["Summary currency", "Moeda do resumo"],
"Tus registros se hacen en la app": ["You log your money in the app", "Seus registros são feitos no app"],
"Aquí solo se mira tu mes. Anota tus gastos desde el celular y aparecen al instante.": ["Here you just see your month. Log your spending on your phone and it shows up instantly.", "Aqui você só acompanha seu mês. Registre seus gastos pelo celular e eles aparecem na hora."],
"Vincular WhatsApp": ["Link WhatsApp", "Vincular WhatsApp"],
"Conectar WhatsApp": ["Connect WhatsApp", "Conectar WhatsApp"],
"Cerrar el aviso": ["Close notice", "Fechar aviso"],
"Cerrar": ["Close", "Fechar"],
"fin de mes": ["month end", "fim do mês"],
"Disponible": ["Available", "Disponível"],
"Tu mes": ["Your month", "Seu mês"],
"Ver en qué se te va": ["See where it goes", "Ver para onde vai"],
"Gastado": ["Spent", "Gasto"],
"Ingresos": ["Income", "Receitas"],
"En qué se te fue": ["Where it went", "Para onde foi"],
"Ver todo el historial": ["See full history", "Ver todo o histórico"],
"Cargando tu mes…": ["Loading your month…", "Carregando seu mês…"],
"Cargando…": ["Loading…", "Carregando…"],
"Calculando…": ["Calculating…", "Calculando…"],
"Pregúntale a tu cerebro": ["Ask your brain", "Pergunte ao seu cérebro"],
"Pregúntale a tu cerebro: ¿cuánto gasté en comida?": ["Ask your brain: how much did I spend on food?", "Pergunte ao seu cérebro: quanto gastei com comida?"],
"Preguntar": ["Ask", "Perguntar"],
"Top categorías del mes": ["Top categories this month", "Principais categorias do mês"],
"Tu cerebro financiero": ["Your financial brain", "Seu cérebro financeiro"],
"Tu plan": ["Your plan", "Seu plano"],
"Qué incluye": ["What's included", "O que inclui"],
"Se paga por Yape y se activa a mano, así que no guardamos ninguna tarjeta ni se renueva solo.": ["You pay with Yape and we activate it by hand, so we never store a card and it never renews on its own.", "O pagamento é pelo Yape e a ativação é manual, então não guardamos nenhum cartão e nada se renova sozinho."],
"Tu WhatsApp": ["Your WhatsApp", "Seu WhatsApp"],
"Preferencias": ["Preferences", "Preferências"],
"Idioma": ["Language", "Idioma"],
"El de la web, la app y el asistente de WhatsApp.": ["For the web, the app and the WhatsApp assistant.", "Da web, do app e do assistente do WhatsApp."],
"País": ["Country", "País"],
"Para ubicar tu número y tus fechas.": ["To place your number and your dates.", "Para localizar seu número e suas datas."],
"Se usará en tus nuevos movimientos. Los anteriores se mantienen en la moneda con la que los registraste.": ["Used for your new transactions. Earlier ones keep the currency you logged them in.", "Será usada nas suas novas movimentações. As anteriores ficam na moeda em que você as registrou."],
"Cómo te habla": ["How it talks to you", "Como ele fala com você"],
"Así te hablará Y Altoque en la app y por WhatsApp.": ["This is how Y Altoque will talk to you in the app and on WhatsApp.", "É assim que o Y Altoque vai falar com você no app e no WhatsApp."],
"Bienvenida": ["Welcome", "Boas-vindas"],
"Los primeros pasos: tu idioma, tu moneda, cómo te habla y tu WhatsApp.": ["The first steps: your language, your currency, how it talks to you and your WhatsApp.", "Os primeiros passos: seu idioma, sua moeda, como ele fala com você e seu WhatsApp."],
"Ver la bienvenida otra vez": ["See the welcome again", "Ver as boas-vindas de novo"],
"Guardando…": ["Saving…", "Salvando…"],
"Idioma guardado": ["Language saved", "Idioma salvo"],
"País guardado": ["Country saved", "País salvo"],
"Moneda cambiada a {}": ["Currency changed to {}", "Moeda alterada para {}"],
"Tono activado": ["Tone on", "Tom ativado"],
"No pudimos leer tus preferencias: {}": ["We couldn't read your preferences: {}", "Não conseguimos ler suas preferências: {}"],
"No se pudo guardar: {}": ["Couldn't save: {}", "Não foi possível salvar: {}"],
"🌎 Elige tu país": ["🌎 Choose your country", "🌎 Escolha seu país"],
"Cariño": ["Sweetie", "Carinho"],
"Pana": ["Buddy", "Parceiro"],
"Sargento": ["Sergeant", "Sargento"],
"Cálido y cariñoso, siempre pendiente de ti.": ["Warm and caring, always looking out for you.", "Caloroso e carinhoso, sempre atento a você."],
"Un pata de confianza, al natural.": ["A trusted buddy, just being real.", "Um parceiro de confiança, do jeito natural."],
"Directo y sin rodeos. Te jala las orejas.": ["Blunt, no sugarcoating. Calls you out.", "Direto, sem rodeios. Te puxa a orelha."],
"Holi 🤍 anoté tus {p}240 de hoy. Cuídate un poquito ¿ya?": ["Hey love 🤍 I logged your {p}240 today. Take care of yourself, okay?", "Oi 🤍 anotei seus {p}240 de hoje. Se cuida um pouquinho, tá?"],
"Ojo, hoy van {p}240. Vamos tranqui pero atentos 👀": ["Heads up, {p}240 today. Easy does it, but stay sharp 👀", "Atenção, hoje deu {p}240. De boa, mas ligado 👀"],
"{p}240 en un día. Para la mano YA. Esto no va.": ["{p}240 in one day. Stop right now. This is not it.", "{p}240 num dia. Para a mão JÁ. Assim não dá."],
"Cargando tus gastos…": ["Loading your spending…", "Carregando seus gastos…"],
"Tus mundos este mes": ["Your worlds this month", "Seus mundos este mês"],
"· cada uno pesa lo que gastaste": ["· each one weighs what you spent", "· cada um pesa o que você gastou"],
"Ver movimientos": ["See transactions", "Ver movimentações"],
"Tu mes contra tu promedio": ["Your month vs. your average", "Seu mês contra sua média"],
"Cuánto se aleja cada categoría de lo que sueles gastar en ella.": ["How far each category is from what you usually spend on it.", "Quanto cada categoria se afasta do que você costuma gastar nela."],
"Cómo ha ido el año": ["How the year has gone", "Como foi o ano"],
"Contra el mes pasado": ["Vs. last month", "Contra o mês passado"],
"A quién le pagas": ["Who you pay", "Para quem você paga"],
"Cómo lo pagas": ["How you pay", "Como você paga"],
"Qué días se te va": ["Which days it goes", "Em que dias ele vai"],
"Cómo va a bajar tu saldo": ["How your balance will go down", "Como seu saldo vai cair"],
"Tu saldo de hoy menos lo que gastas al día, con cada fijo cayendo en su fecha. Punteado porque es una proyección, no un hecho.": ["Today's balance minus what you spend per day, with each fixed expense landing on its date. Dotted because it's a projection, not a fact.", "Seu saldo de hoje menos o que você gasta por dia, com cada gasto fixo caindo na sua data. Pontilhado porque é uma projeção, não um fato."],
"Lo que falta pagar": ["What's left to pay", "O que falta pagar"],
"Mes": ["Month", "Mês"],
"Tipo": ["Type", "Tipo"],
"Todo": ["All", "Tudo"],
"Categoría": ["Category", "Categoria"],
"Todas las categorías": ["All categories", "Todas as categorias"],
"Buscar en todo tu historial": ["Search your whole history", "Buscar em todo o seu histórico"],
"Buscar movimientos": ["Search transactions", "Buscar movimentações"],
"Cargando movimientos…": ["Loading transactions…", "Carregando movimentações…"],
"Detalle del movimiento": ["Transaction details", "Detalhe da movimentação"],
"Cargando tus compromisos…": ["Loading your commitments…", "Carregando seus compromissos…"],
"Gastos fijos": ["Fixed expenses", "Gastos fixos"],
"Ingresos fijos": ["Fixed income", "Receitas fixas"],
"Deudas": ["Debts", "Dívidas"],
"Cargando tus metas…": ["Loading your goals…", "Carregando suas metas…"],
"Ahora no": ["Not now", "Agora não"],
"Continuar": ["Continue", "Continuar"],
"Elige tu idioma": ["Choose your language", "Escolha seu idioma"],
"Así verás toda la app. Podrás cambiarlo luego en Ajustes.": ["This is how you'll see the whole app. You can change it later in Settings.", "É assim que você verá todo o app. Você pode mudar depois em Ajustes."],
"¿En qué moneda manejas tu dinero?": ["What currency do you use?", "Em que moeda você usa seu dinheiro?"],
"La usaremos para registrar tus movimientos (también desde WhatsApp). Podrás cambiarla luego en Ajustes.": ["We'll use it to log your transactions (on WhatsApp too). You can change it later in Settings.", "Vamos usá-la para registrar suas movimentações (também pelo WhatsApp). Você pode mudar depois em Ajustes."],
"Buscar (sol, dólar, euro…)": ["Search (dollar, euro, sol…)", "Buscar (real, dólar, euro…)"],
"Buscar moneda": ["Search currency", "Buscar moeda"],
"¿Cómo quieres que te hable?": ["How do you want it to talk to you?", "Como você quer que ele fale com você?"],
"Tu asistente Y Altoque puede tratarte de tres formas. Lo cambias cuando quieras desde Ajustes.": ["Your Y Altoque assistant can talk to you in three ways. Change it anytime in Settings.", "Seu assistente Y Altoque pode falar com você de três jeitos. Mude quando quiser em Ajustes."],
"Conecta tu WhatsApp": ["Connect your WhatsApp", "Conecte seu WhatsApp"],
"Registra gastos mandándole un mensaje, una nota de voz o la foto de tu boleta. Es totalmente opcional: puedes activarlo cuando quieras desde Ajustes.": ["Log spending by sending it a message, a voice note or a photo of your receipt. It's totally optional: you can turn it on anytime in Settings.", "Registre gastos enviando uma mensagem, um áudio ou a foto do seu recibo. É totalmente opcional: você pode ativar quando quiser em Ajustes."],
"Antes de seguir": ["Before you go on", "Antes de continuar"],
"Desde la web no se anotan movimientos: aquí solo ves tu mes. Tus gastos e ingresos se registran": ["You can't log transactions on the web: here you just see your month. Your spending and income are logged", "Na web não se registram movimentações: aqui você só vê seu mês. Seus gastos e receitas são registrados"],
"únicamente desde la app o por WhatsApp": ["only in the app or on WhatsApp", "somente pelo app ou pelo WhatsApp"],
"Entendido, usaré la app": ["Got it, I'll use the app", "Entendi, vou usar o app"],
"No pudimos guardar tu elección. Puedes cambiarla luego en Ajustes.": ["We couldn't save your choice. You can change it later in Settings.", "Não conseguimos salvar sua escolha. Você pode mudar depois em Ajustes."],
"Buenos días": ["Good morning", "Bom dia"],
"Buenas tardes": ["Good afternoon", "Boa tarde"],
"Buenas noches": ["Good evening", "Boa noite"],
"Hoy": ["Today", "Hoje"],
"Este mes": ["This month", "Este mês"],
"este mes": ["this month", "este mês"],
"el mes pasado": ["last month", "o mês passado"],
"la semana pasada": ["last week", "a semana passada"],
"este año": ["this year", "este ano"],
"en este mes": ["this month", "neste mês"],
"en todo tu historial": ["in your whole history", "em todo o seu histórico"],
"Crédito": ["Credit", "Crédito"],
"Débito": ["Debit", "Débito"],
"Efectivo u otro": ["Cash or other", "Dinheiro ou outro"],
"Saldo": ["Balance", "Saldo"],
"Debes": ["You owe", "Você deve"],
"Te deben": ["They owe you", "Te devem"],
"Vencido": ["Overdue", "Vencido"],
"Falta pagar": ["Left to pay", "Falta pagar"],
"Suman": ["Total", "Somam"],
"Quedan": ["Left", "Restam"],
"Consumido": ["Used", "Consumido"],
"Comprometido al mes": ["Committed per month", "Comprometido por mês"],
"Devolución": ["Refund", "Devolução"],
"Sin datos": ["No data", "Sem dados"],
"Sin detalle": ["No details", "Sem detalhes"],
"Sin gráfico": ["No chart", "Sem gráfico"],
"Sin historial": ["No history", "Sem histórico"],
"Sin ingresos": ["No income", "Sem receitas"],
"Sin ingresos fijos": ["No fixed income", "Sem receitas fixas"],
"Sin deudas abiertas": ["No open debts", "Sem dívidas em aberto"],
"Sin mes anterior": ["No previous month", "Sem mês anterior"],
"Sin comparación todavía": ["No comparison yet", "Ainda sem comparação"],
"Nada pendiente": ["Nothing pending", "Nada pendente"],
"Nada por acá": ["Nothing here", "Nada por aqui"],
"Nada todavía": ["Nothing yet", "Nada ainda"],
"Nada más hasta fin de mes": ["Nothing else until month end", "Nada mais até o fim do mês"],
"Lo que viene": ["Coming up", "O que vem por aí"],
"Encontrados": ["Found", "Encontrados"],
"Registrados": ["Logged", "Registrados"],
"registrados este mes": ["logged this month", "registrados este mês"],
"Tienes hoy": ["You have today", "Você tem hoje"],
"Ya tienes": ["You already have", "Você já tem"],
"Entra fijo": ["Fixed income", "Entra fixo"],
"Gasto diario supuesto": ["Assumed daily spending", "Gasto diário estimado"],
"Si gastara": ["If spending", "Se gastasse"],
"Tu día más caro": ["Your most expensive day", "Seu dia mais caro"],
"Donde más gastaste": ["Where you spent most", "Onde você mais gastou"],
"Tu mes, por categorías": ["Your month, by category", "Seu mês, por categoria"],
"Ver el detalle": ["See details", "Ver detalhes"],
"Verlo en Gastos": ["See it in Spending", "Ver em Gastos"],
"Volver a mi ritmo": ["Back to my pace", "Voltar ao meu ritmo"],
"volver al mes": ["back to the month", "voltar ao mês"],
"Tocar para ver en grande": ["Tap to see it bigger", "Toque para ver maior"],
"Todavía no hay gastos este mes.": ["No spending this month yet.", "Ainda não há gastos este mês."],
"Todavía no hay gastos este mes. En cuanto registres uno, su neurona se enciende.": ["No spending this month yet. As soon as you log one, its neuron lights up.", "Ainda não há gastos este mês. Assim que você registrar um, o neurônio dele acende."],
"Todavía no hay mundos: tu primer gasto del mes pone el primero.": ["No worlds yet: your first expense of the month places the first one.", "Ainda não há mundos: seu primeiro gasto do mês coloca o primeiro."],
"Todavía no hay planetas: tu primer gasto del mes pone el primero.": ["No planets yet: your first expense of the month places the first one.", "Ainda não há planetas: seu primeiro gasto do mês coloca o primeiro."],
"Todavía no hay nada que proyectar": ["Nothing to project yet", "Ainda não há nada para projetar"],
"Todavía no tienes metas": ["You don't have any goals yet", "Você ainda não tem metas"],
"Una meta es una plata que apartas con fecha: el viaje, la laptop, el colchón de emergencia.": ["A goal is money you set aside with a date: the trip, the laptop, the emergency fund.", "Uma meta é um dinheiro que você separa com data: a viagem, o notebook, a reserva de emergência."],
"Cuando registres gastos, acá verás a quién le pagas más.": ["Once you log spending, you'll see here who you pay the most.", "Quando você registrar gastos, verá aqui para quem paga mais."],
"Cuando tengas dos meses registrados, acá verás qué subió y qué bajó.": ["Once you have two months logged, you'll see here what went up and what went down.", "Quando tiver dois meses registrados, verá aqui o que subiu e o que caiu."],
"Cuando tengas un par de meses registrados, acá verás si este mes te estás pasando.": ["Once you have a couple of months logged, you'll see here if you're overspending this month.", "Quando tiver alguns meses registrados, verá aqui se está passando do ponto este mês."],
"Con un par de meses registrados aparece el año.": ["The year shows up once you have a couple of months logged.", "Com alguns meses registrados, o ano aparece."],
"Acá verás cuánto va por tarjeta y cuánto en efectivo.": ["Here you'll see how much goes on card and how much in cash.", "Aqui você verá quanto vai no cartão e quanto em dinheiro."],
"Acá salen los préstamos que hiciste y los que te hicieron.": ["Loans you made and loans made to you show up here.", "Aqui aparecem os empréstimos que você fez e os que fizeram para você."],
"El alquiler, el internet o el gimnasio se configuran en la app.": ["Rent, internet or the gym are set up in the app.", "Aluguel, internet ou academia são configurados no app."],
"Registra tus movimientos del mes y, si tienes sueldo fijo o gastos fijos, configúralos en la app.": ["Log your transactions for the month and, if you have a fixed salary or fixed expenses, set them up in the app.", "Registre suas movimentações do mês e, se tiver salário fixo ou gastos fixos, configure-os no app."],
"Si tienes sueldo o una renta, configúralo y la proyección mejora.": ["If you have a salary or a regular income, set it up and the projection gets better.", "Se você tem salário ou uma renda, configure e a projeção melhora."],
"configúralo en la app y esta cuenta mejora": ["set it up in the app and this estimate gets better", "configure no app e esta conta melhora"],
"No te queda ningún gasto fijo por pagar.": ["You have no fixed expenses left to pay.", "Não resta nenhum gasto fixo para pagar."],
"Prueba con otro mes o quita los filtros.": ["Try another month or clear the filters.", "Tente outro mês ou tire os filtros."],
"Buscando en tu historial…": ["Searching your history…", "Buscando no seu histórico…"],
"Buscando en todo tu historial…": ["Searching your whole history…", "Buscando em todo o seu histórico…"],
"No lo encontré este mes, buscando en tu historial…": ["Didn't find it this month, searching your history…", "Não encontrei este mês, buscando no seu histórico…"],
"No pudimos buscar.": ["We couldn't search.", "Não conseguimos buscar."],
"No pudimos leer ese mes": ["We couldn't read that month", "Não conseguimos ler esse mês"],
"No pudimos leer esta parte": ["We couldn't read this part", "Não conseguimos ler esta parte"],
"No pudimos leer tus metas": ["We couldn't read your goals", "Não conseguimos ler suas metas"],
"No pudimos leer tus movimientos.": ["We couldn't read your transactions.", "Não conseguimos ler suas movimentações."],
"no pudimos leer el mes": ["we couldn't read the month", "não conseguimos ler o mês"],
"Inténtalo de nuevo en un momento.": ["Try again in a moment.", "Tente de novo em um momento."],
"No cargó la librería de gráficos. Recarga la página.": ["The charts library didn't load. Reload the page.", "A biblioteca de gráficos não carregou. Recarregue a página."],
"Faltan meses que no pude traer.": ["Some months couldn't be loaded.", "Faltam meses que não consegui trazer."],
"trayendo tu historial…": ["loading your history…", "trazendo seu histórico…"],
"Hay otra moneda que no entra en ese total.": ["There's another currency not included in that total.", "Há outra moeda que não entra nesse total."],
"Hay otras monedas que no entran en ese total.": ["There are other currencies not included in that total.", "Há outras moedas que não entram nesse total."],
"No entendí la pregunta. Prueba con algo como \"cuánto gasté en comida este mes\".": ["I didn't get the question. Try something like \"how much did I spend on food this month\".", "Não entendi a pergunta. Tente algo como \"quanto gastei com comida este mês\"."],
"Por ahora solo sé de tus gastos: pregúntame por una categoría, un comercio o un periodo.": ["For now I only know about your spending: ask me about a category, a store or a period.", "Por enquanto só sei dos seus gastos: me pergunte sobre uma categoria, uma loja ou um período."],
"No puedo señalarlo en este cerebro: pruébalo en todo el historial.": ["I can't point to it in this brain: try it across your whole history.", "Não consigo apontar isso neste cérebro: tente em todo o histórico."],
"Toca un nodo para ver su detalle: el centro es tu mes, los anillos tus categorías y sus días.": ["Tap a node to see its details: the center is your month, the rings are your categories and their days.", "Toque em um nó para ver o detalhe: o centro é seu mês, os anéis são suas categorias e seus dias."],
"Cambiar de plan": ["Change plan", "Mudar de plano"],
"Elige tu plan. Todos se pagan por Yape y no se renuevan solos: cuando se acabe, tú decides si sigues.": ["Choose your plan. They're all paid with Yape and never renew on their own: when it ends, you decide whether to keep going.", "Escolha seu plano. Todos são pagos pelo Yape e não se renovam sozinhos: quando acabar, você decide se continua."],
"La app Y Altoque es gratis siempre, con todo adentro. El plan Pro es para el asistente de WhatsApp: registrar tu plata desde el chat y mandarle fotos de vouchers sin abrir el app.": ["The Y Altoque app is always free, with everything in it. The Pro plan is for the WhatsApp assistant: log your money from the chat and send it receipt photos without opening the app.", "O app Y Altoque é sempre grátis, com tudo dentro. O plano Pro é para o assistente do WhatsApp: registrar seu dinheiro pelo chat e mandar fotos de comprovantes sem abrir o app."],
"La app sigue gratis y sin límite: esto es solo el chat.": ["The app stays free and unlimited: this is just the chat.", "O app continua grátis e sem limite: isto é só o chat."],
"la app, completa y gratis": ["the app, complete and free", "o app, completo e grátis"],
"Mensajes sin tope": ["Unlimited messages", "Mensagens sem limite"],
"Preparando tu pago…": ["Preparing your payment…", "Preparando seu pagamento…"],
"QR de Yape para pagar": ["Yape QR code to pay", "QR do Yape para pagar"],
"Tu referencia": ["Your reference", "Sua referência"],
"Escríbela en el mensaje del Yape si puedes.": ["Write it in the Yape message if you can.", "Escreva na mensagem do Yape se puder."],
"Mándanos la": ["Send us the", "Mande para nós a"],
"captura del Yape": ["Yape screenshot", "captura do Yape"],
"por WhatsApp.": ["on WhatsApp.", "pelo WhatsApp."],
"La revisamos y te activamos Pro por": ["We'll check it and turn on Pro for", "Vamos conferir e ativar o Pro por"],
"La captura tiene que entrar por WhatsApp, que es donde el asistente la reconoce. Se revisa a mano, así que no es automático: normalmente es rápido y te avisamos por ahí mismo.": ["The screenshot has to come in through WhatsApp, which is where the assistant recognizes it. It's checked by hand, so it isn't automatic: it's usually quick and we'll let you know right there.", "A captura tem que chegar pelo WhatsApp, que é onde o assistente a reconhece. É conferida à mão, então não é automático: normalmente é rápido e avisamos você por lá mesmo."],
"Ya la mandé": ["I already sent it", "Já mandei"],
"Escríbele": ["Message it", "Escreva para ele"],
"pago en revisión": ["payment under review", "pagamento em análise"],
"¡Gracias por apoyar Y Altoque!": ["Thanks for supporting Y Altoque!", "Obrigado por apoiar o Y Altoque!"],
"· 2 meses de regalo": ["· 2 months free", "· 2 meses de presente"],
"al mes": ["per month", "por mês"],
"al año": ["per year", "por ano"],
"un mes": ["one month", "um mês"],
"un año": ["one year", "um ano"],
"cada mes": ["every month", "todo mês"],
"Con tu WhatsApp vinculado registras tu plata desde el chat y le mandas fotos de vouchers.": ["With your WhatsApp linked you log your money from the chat and send it receipt photos.", "Com seu WhatsApp vinculado, você registra seu dinheiro pelo chat e manda fotos de comprovantes."],
"Escríbele al asistente y tus gastos quedan anotados aquí.": ["Message the assistant and your spending gets logged here.", "Escreva para o assistente e seus gastos ficam registrados aqui."],
"Tu número de WhatsApp": ["Your WhatsApp number", "Seu número de WhatsApp"],
"Tu número de WhatsApp, sin el código de país": ["Your WhatsApp number, without the country code", "Seu número de WhatsApp, sem o código do país"],
"Sin el código de país": ["Without the country code", "Sem o código do país"],
"Código del país": ["Country code", "Código do país"],
"Enviarme el WhatsApp": ["Send me the WhatsApp", "Me enviar o WhatsApp"],
"Te llega un mensaje de Y Altoque con un botón para confirmar.": ["You'll get a message from Y Altoque with a button to confirm.", "Você recebe uma mensagem do Y Altoque com um botão para confirmar."],
"No pudimos enviarte el WhatsApp.": ["We couldn't send you the WhatsApp.", "Não conseguimos enviar o WhatsApp."],
"¿No te llegó? Revisa el número y": ["Didn't get it? Check the number and", "Não chegou? Confira o número e"],
"usa otro número": ["use another number", "use outro número"],
"Desvincular": ["Unlink", "Desvincular"],
"Listo, esa eres tú": ["Done, that's you", "Pronto, essa é você"],
"Aceptar": ["Accept", "Aceitar"],
"y esta tarjeta se actualiza sola.": ["and this card updates itself.", "e este cartão se atualiza sozinho."],
"al asistente por WhatsApp y te activa todo desde ahí.": ["to the assistant on WhatsApp and it sets everything up from there.", "para o assistente pelo WhatsApp e ele ativa tudo por lá."],
"sin ingreso fijo": ["no fixed income", "sem receita fixa"],
"sin ingreso fijo configurado": ["no fixed income set up", "sem receita fixa configurada"],
"sin ingresos anotados: anota tu sueldo": ["no income logged: log your salary", "sem receitas registradas: registre seu salário"],
"con lo que traías de antes": ["with what you carried over", "com o que você trazia de antes"],
"sin contar lo que traías de antes": ["not counting what you carried over", "sem contar o que você trazia de antes"],
"del mes, sin lo que traías": ["this month, without what you carried over", "do mês, sem o que você trazia"],
"neto de este mes": ["net this month", "líquido deste mês"],
"te queda a favor": ["left over", "sobra a seu favor"],
"gastaste de más": ["overspent", "você gastou a mais"],
"gastas más": ["you spend more", "você gasta mais"],
"a fin de mes": ["by month end", "até o fim do mês"],
"hasta fin de mes": ["until month end", "até o fim do mês"],
"hasta tu próximo ingreso": ["until your next income", "até sua próxima receita"],
"a tu próximo ingreso": ["to your next income", "até sua próxima receita"],
"Sí, te quedarían": ["Yes, you'd have left", "Sim, sobrariam"],
"No, te faltarían": ["No, you'd be short", "Não, faltariam"],
"Si gastaras así, te faltarían": ["If you spent like this, you'd be short", "Se gastasse assim, faltariam"],
"Si gastaras así, te quedarían": ["If you spent like this, you'd have left", "Se gastasse assim, sobrariam"],
"¿Llegas?": ["Will you make it?", "Você chega?"],
"Ver todo": ["See all", "Ver tudo"],
"Otros": ["Other", "Outros"],
"{} · {}": ["{} · {}", "{} · {}"],
"· {}": ["· {}", "· {}"],
"{} ·": ["{} ·", "{} ·"],
"Gratis": ["Free", "Grátis"],
"Inicio": ["Home", "Início"],
"Términos": ["Terms", "Termos"],
"Privacidad": ["Privacy", "Privacidade"],
"día": ["day", "dia"],
"días": ["days", "dias"],
"mañana": ["tomorrow", "amanhã"],
"Ayer": ["Yesterday", "Ontem"],
"Neto": ["Net", "Líquido"],
"Pendiente": ["Pending", "Pendente"],
"Pagado": ["Paid", "Pago"],
"pagado": ["paid", "pago"],
"vencido": ["overdue", "vencido"],
"vencida": ["overdue", "vencida"],
"sin fecha": ["no date", "sem data"],
"cada semana": ["every week", "toda semana"],
"cada quincena": ["every two weeks", "a cada quinze dias"],
"gasto": ["expense", "gasto"],
"gastos": ["expenses", "gastos"],
"fijo": ["fixed expense", "fixo"],
"fijos": ["fixed expenses", "fixos"],
"cuenta": ["account", "conta"],
"A mano": ["Manual", "Manual"],
"Correo": ["Email", "E-mail"],
"Tarjeta de crédito": ["Credit card", "Cartão de crédito"],
"Tarjeta de débito": ["Debit card", "Cartão de débito"],
"gastas menos": ["you spend less", "você gasta menos"],
"Próximo ingreso": ["Next income", "Próxima receita"],
"ingresos configurados": ["income set up", "receitas configuradas"],
"de racha": ["streak", "de sequência"],
"registra hoy": ["log something today", "registre hoje"],
"de lo que entró este mes ya se fue": ["of this month's income is already gone", "do que entrou este mês já foi"],
"de lo que entró ya se fue todo, y más": ["all of your income is gone, and more", "tudo o que entrou já foi, e mais"],
"Llegas: te quedarían": ["You'll make it: you'd have left", "Você chega: sobrariam"],
"No llegas: te faltarían": ["You won't make it: you'd be short", "Você não chega: faltariam"],
"llegas con": ["you get there with", "você chega com"],
"te faltarían": ["you'd be short", "faltariam"],
"te debe": ["owes you", "te deve"],
"le debes": ["you owe", "você deve"],
"Mensajes de WhatsApp sin tope.": ["Unlimited WhatsApp messages.", "Mensagens de WhatsApp sem limite."],
"Pro activo": ["Pro active", "Pro ativo"],
"activo": ["active", "ativo"],
"vinculado": ["linked", "vinculado"],
"2 meses de regalo": ["2 months free", "2 meses de presente"],
"Ya recibimos tu comprobante y lo estamos revisando. Te avisamos por WhatsApp apenas quede activo.": ["We got your receipt and we're reviewing it. We'll let you know on WhatsApp as soon as it's active.", "Já recebemos seu comprovante e estamos conferindo. Avisamos pelo WhatsApp assim que estiver ativo."],
"Mandar la captura por WhatsApp": ["Send the screenshot on WhatsApp", "Mandar a captura pelo WhatsApp"],
"con este QR": ["with this QR code", "com este QR"],
"Yapea": ["Pay with Yape", "Pague com Yape"],
"Tócale": ["Tap", "Toque em"],
"No se pudo desvincular: {}": ["Couldn't unlink: {}", "Não foi possível desvincular: {}"],
"No pudimos leer tu WhatsApp: {}": ["We couldn't read your WhatsApp: {}", "Não conseguimos ler seu WhatsApp: {}"],
"No pudimos leer tu plan: {}": ["We couldn't read your plan: {}", "Não conseguimos ler seu plano: {}"],
"No pudimos preparar tu pago: {}": ["We couldn't prepare your payment: {}", "Não conseguimos preparar seu pagamento: {}"],
"No pudimos leer tus movimientos: {}": ["We couldn't read your transactions: {}", "Não conseguimos ler suas movimentações: {}"],
"No se pudo abrir {}. Reintentar": ["Couldn't open {}. Retry", "Não foi possível abrir {}. Tentar de novo"],
"Sin gastos fijos": ["No fixed expenses", "Sem gastos fixos"],
"Dónde": ["Where", "Onde"],
"Método": ["Method", "Método"],
"Contexto": ["Context", "Contexto"],
"Deducible": ["Deductible", "Dedutível"],
"Referencia": ["Reference", "Referência"],
"ingreso": ["income", "receita"],
"Pro vence": ["Pro expires", "Pro vence"],
"enero": ["January", "janeiro"],
"febrero": ["February", "fevereiro"],
"marzo": ["March", "março"],
"abril": ["April", "abril"],
"mayo": ["May", "maio"],
"junio": ["June", "junho"],
"julio": ["July", "julho"],
"agosto": ["August", "agosto"],
"septiembre": ["September", "setembro"],
"octubre": ["October", "outubro"],
"noviembre": ["November", "novembro"],
"diciembre": ["December", "dezembro"],
"hoy, día {n}": ["today, day {}", "hoje, dia {}"],
"día {n}": ["day {}", "dia {}"],
"hoy {n}": ["today {}", "hoje {}"],
"Buenos días, {}": ["Good morning, {}", "Bom dia, {}"],
"Buenas tardes, {}": ["Good afternoon, {}", "Boa tarde, {}"],
"Buenas noches, {}": ["Good evening, {}", "Boa noite, {}"],
"{} este mes · día {n} de {n}": ["{} this month · day {} of {}", "{} este mês · dia {} de {}"],
"{n} días": ["{} days", "{} dias"],
"{n} día": ["{} day", "{} dia"],
"{n}% más": ["{}% more", "{}% a mais"],
"{n}% menos": ["{}% less", "{}% a menos"],
"que el mes pasado al día {n}": ["than last month by day {}", "que o mês passado até o dia {}"],
"que el mes pasado al día {n} ({}%)": ["than last month by day {} ({}%)", "que o mês passado até o dia {} ({}%)"],
"va {} por encima de lo que sueles gastar ({} este mes).": ["is {} above what you usually spend ({} this month).", "está {} acima do que você costuma gastar ({} este mês)."],
"Todo el mes, {}, {n} gastos": ["Whole month, {}, {} expenses", "O mês todo, {}, {} gastos"],
"Categoría {}, {}, {n} gastos": ["Category {}, {}, {} expenses", "Categoria {}, {}, {} gastos"],
"Mes de {}, {}, {n} gastos": ["{} month, {}, {} expenses", "Mês de {}, {}, {} gastos"],
"{}, {}, {n} gastos": ["{}, {}, {} expenses", "{}, {}, {} gastos"],
"y {n} categorías más": ["and {} more categories", "e mais {} categorias"],
"y {n} más": ["and {} more", "e mais {}"],
"{n} gastos este mes": ["{} expenses this month", "{} gastos este mês"],
"{} vs. tu promedio": ["{} vs. your average", "{} vs. sua média"],
"{} este mes": ["{} this month", "{} este mês"],
"sueles {}": ["you usually spend {}", "costuma gastar {}"],
"techo {}": ["cap {}", "teto {}"],
"mes pasado {}": ["last month {}", "mês passado {}"],
"Faltan {n} {} para tu próximo ingreso": ["{} {} until your next income", "Faltam {} {} para sua próxima receita"],
"Falta {n} {} para tu próximo ingreso": ["{} {} until your next income", "Falta {} {} para sua próxima receita"],
"Quedan {n} {} de mes, y no tienes ingreso fijo configurado": ["{} {} left in the month, and you have no fixed income set up", "Restam {} {} no mês, e você não tem receita fixa configurada"],
"¿Llegas al {}?": ["Will you make it to {}?", "Você chega a {}?"],
"¿Llegas {}?": ["Will you make it {}?", "Você chega {}?"],
"tienes {}": ["you have {}", "você tem {}"],
"gastas {} al día": ["you spend {} a day", "você gasta {} por dia"],
"{} de fijos por pagar": ["{} in fixed expenses to pay", "{} de fixos a pagar"],
"Faltan {n} {}; {n} {} por pagar": ["{} {} left; {} {} to pay", "Faltam {} {}; {} {} a pagar"],
"hoy {n} · faltan {n} {}": ["today {} · {} {} left", "hoje {} · faltam {} {}"],
"faltan {n} {}": ["{} {} left", "faltam {} {}"],
"faltan {}": ["{} to go", "faltam {}"],
"{} al día": ["{} a day", "{} por dia"],
"llegas con {}": ["you get there with {}", "você chega com {}"],
"te faltarían {}": ["you'd be short {}", "faltariam {}"],
"si gastaras {} al día (hoy gastas {})": ["if you spent {} a day (today you spend {})", "se gastasse {} por dia (hoje você gasta {})"],
"{n} fijos pendientes": ["{} fixed expenses pending", "{} fixos pendentes"],
"{n} fijo pendiente": ["{} fixed expense pending", "{} fixo pendente"],
"en {n} días": ["in {} days", "em {} dias"],
"en {n} día": ["in {} day", "em {} dia"],
"venció el {n}": ["was due on day {}", "venceu no dia {}"],
"{} venció el día {n}": ["{} was due on day {}", "{} venceu no dia {}"],
"vence el {}": ["due {}", "vence em {}"],
"próximo ingreso": ["next income", "próxima receita"],
"{n} movimientos": ["{} transactions", "{} movimentações"],
"{n} movimiento": ["{} transaction", "{} movimentação"],
"Hoy · {}": ["Today · {}", "Hoje · {}"],
"Ayer · {}": ["Yesterday · {}", "Ontem · {}"],
"Los {n} gastos fijos del mes sobre los {n} días": ["The month's {} fixed expenses across its {} days", "Os {} gastos fixos do mês ao longo dos {} dias"],
"{n} gastos fijos": ["{} fixed expenses", "{} gastos fixos"],
"ya pagaste {}": ["you already paid {}", "você já pagou {}"],
"{n} cuentas": ["{} accounts", "{} contas"],
"{n} cuenta": ["{} account", "{} conta"],
"{n}% de {}": ["{}% of {}", "{}% de {}"],
"~{} de {}": ["{} of {}", "{} de {}"],
"{n} de {n} cuotas": ["{} of {} installments", "{} de {} parcelas"],
"la próxima el {} ({})": ["next on {} ({})", "a próxima em {} ({})"],
"{n} de {n} mensajes de WhatsApp este mes. Se reinician el 1 del próximo mes.": ["{} of {} WhatsApp messages this month. They reset on the 1st of next month.", "{} de {} mensagens de WhatsApp este mês. Reiniciam no dia 1 do próximo mês."],
"{n} mensajes de WhatsApp este mes, sin tope.": ["{} WhatsApp messages this month, no cap.", "{} mensagens de WhatsApp este mês, sem limite."],
"{} al mes": ["{} per month", "{} por mês"],
"{} al año": ["{} per year", "{} por ano"],
": {n} mensajes con el asistente.": [": {} messages with the assistant.", ": {} mensagens com o assistente."],
": {n} mensajes con el asistente, con 2 meses de regalo.": [": {} messages with the assistant, plus 2 months free.", ": {} mensagens com o assistente, com 2 meses de presente."],
"{n} mensajes al mes con el asistente": ["{} messages a month with the assistant", "{} mensagens por mês com o assistente"],
"{n} mensajes al mes": ["{} messages a month", "{} mensagens por mês"],
"con el asistente de WhatsApp hasta el {}.": ["with the WhatsApp assistant until {}.", "com o assistente do WhatsApp até {}."],
"con el asistente de WhatsApp.": ["with the WhatsApp assistant.", "com o assistente do WhatsApp."],
"activo hasta el {}": ["active until {}", "ativo até {}"],
"hasta el {}": ["until {}", "até {}"],
"número terminado en {}": ["number ending in {}", "número terminado em {}"],
"Te mandamos un WhatsApp al número terminado en {}.": ["We sent a WhatsApp to the number ending in {}.", "Enviamos um WhatsApp para o número terminado em {}."],
"Te mandamos un WhatsApp.": ["We sent you a WhatsApp.", "Enviamos um WhatsApp para você."],
"Ya tienes {} activo. ¡Gracias por apoyar Y Altoque!": ["You already have {} active. Thanks for supporting Y Altoque!", "Você já tem {} ativo. Obrigado por apoiar o Y Altoque!"],
"activo. ¡Gracias por apoyar Y Altoque!": ["active. Thanks for supporting Y Altoque!", "ativo. Obrigado por apoiar o Y Altoque!"],
"{} en total": ["{} in total", "{} no total"],
"gastos en {}": ["expenses in {}", "gastos em {}"],
"Resultados de \"{}\"": ["Results for \"{}\"", "Resultados de \"{}\""],
"{}, por categorías": ["{}, by category", "{}, por categoria"],
"{} · {n}% de tu mes": ["{} · {}% of your month", "{} · {}% do seu mês"],
"{n} {} con movimientos": ["{} {} with transactions", "{} {} com movimentações"],
"{n} {} en otra moneda fuera": ["{} {} in another currency left out", "{} {} em outra moeda de fora"],
"trayendo tu historial · {n} de {n} meses": ["loading your history · {} of {} months", "trazendo seu histórico · {} de {} meses"],
"{} el mes pasado": ["{} last month", "{} o mês passado"],
"{} la semana pasada": ["{} last week", "{} a semana passada"],
"{} este año": ["{} this year", "{} este ano"],
"en los últimos {n} {}": ["in the last {} {}", "nos últimos {} {}"],
"los últimos {n} {}": ["the last {} {}", "os últimos {} {}"],
"~el {}": ["on {}", "em {}"],
"¡Lograda!": ["Achieved!", "Alcançada!"],
"la próxima el {}": ["next on {}", "a próxima em {}"],
"Gasto": ["Expense", "Gasto"],
"A quién": ["Paid to", "Para quem"],
"De quién": ["From", "De quem"],
"Sin tarjeta": ["No card", "Sem cartão"],
"Negocio": ["Business", "Negócio"],
"Personal": ["Personal", "Pessoal"],
"Sí": ["Yes", "Sim"],
"Peso en {}": ["Share of {}", "Peso em {}"],
"A {} este mes": ["To {} this month", "Para {} este mês"],
"De {} este mes": ["From {} this month", "De {} este mês"],
"{n} veces": ["{} times", "{} vezes"],
"promedio {}": ["average {}", "média {}"],
"el dorado es este": ["the gold one is this one", "o dourado é este"],
"Armando tu universo": ["Building your universe", "Montando seu universo"],
"Entra con la misma cuenta de la app para ver tu mes y tu plan.": ["Sign in with the same account you use in the app to see your month and your plan.", "Entre com a mesma conta do app para ver seu mês e seu plano."],
"Continuar con Google": ["Continue with Google", "Continuar com Google"],
"El acceso con {} todavía no está abierto.": ["Signing in with {} isn't open yet.", "O acesso com {} ainda não está aberto."],
"~Cuenta de {}": ["{}'s account", "Conta de {}"],
"~en {}": ["in {}", "em {}"],
"~No encontré gastos {} en tu historial.": ["I didn't find expenses {} in your history.", "Não encontrei gastos {} no seu histórico."],
"~{} no hay nada este mes, pero desde {} llevas {} en {}.": ["nothing {} this month, but since {} you've spent {} on {}.", "{} não há nada este mês, mas desde {} você soma {} em {}."],
"~No encontré gastos{}{}.": ["I didn't find expenses{}{}.", "Não encontrei gastos{}{}."],
"~Donde más gastaste{} fue {}: {}, el {}% del total.": ["Where you spent the most{} was {}: {}, {}% of the total.", "Onde você mais gastou{} foi {}: {}, {}% do total."],
"~Tu día más caro{} fue el {}: {}.": ["Your most expensive day{} was {}: {}.", "Seu dia mais caro{} foi {}: {}."],
"~Tienes {}{}{}, {} en total.": ["You have {}{}{}, {} in total.", "Você tem {}{}{}, {} no total."],
"~{}{} gastaste {} en {}.": ["{}{} you spent {} on {}.", "{}{} você gastou {} em {}."],
"~{}, por categorías": ["{}, by category", "{}, por categoria"],
"En total": ["In total", "No total"],
"desde S/ {}": ["from S/ {}", "a partir de S/ {}"],
"Activar Pro desde S/ {}": ["Get Pro from S/ {}", "Ativar Pro a partir de S/ {}"],
"al": ["to", "para"],
"con este QR.": ["with this QR code.", "com este QR."],
", con": [", with", ", com"],
"Descargar QR": ["Download QR", "Baixar QR"],
"Descargando…": ["Downloading…", "Baixando…"],
"A": ["To", "Para"],
"De": ["From", "De"],
"Peso en": ["Share of", "Peso em"],
", {}, {n} gastos": [", {}, {} expenses", ", {}, {} gastos"],
", {}, {n} gasto": [", {}, {} expense", ", {}, {} gasto"],
"{n} {} en {n} {}": ["{} {} in {} {}", "{} {} em {} {}"],
"categoría": ["category", "categoria"],
"categorías": ["categories", "categorias"],
"{n} gastos": ["{} expenses", "{} gastos"],
"{n} gasto": ["{} expense", "{} gasto"],
"{} aparte": ["{} separate", "{} à parte"],
};

const escRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const TXT_FIJO = new Map(), TXT_PATRON = [];
for (const [es, tr] of Object.entries(TXT)){
  if (es.startsWith("~")) continue;                // solo para tf(): no se busca en el DOM
  if (!/\{n?\}/.test(es)) { TXT_FIJO.set(es, tr); continue; }
  const re = es.split(/(\{n?\})/).map((p) => p === "{}" ? "(.+?)" : p === "{n}" ? "([\\d.,]+)" : escRe(p)).join("");
  TXT_PATRON.push([new RegExp("^" + re + "$", "s"), tr, es.replace(/\{n?\}/g, "").length]);
}
// Gana el patrón con más texto fijo: "en {} días" antes que "en {}", y el
// genérico "{} · {}" (parte por el separador y traduce cada trozo) al final.
TXT_PATRON.sort((a, b) => b[2] - a[2]);

// El texto traducido, o null si no hay traducción (o el idioma es español).
function traducirTexto(s){
  if (LANG === "es") return null;
  const i = LANG === "en" ? 0 : 1;
  const fijo = TXT_FIJO.get(s);
  if (fijo) return fijo[i];
  for (const [re, tr] of TXT_PATRON){
    const m = s.match(re);
    if (!m) continue;
    let k = 1;
    return tr[i].replace(/\{(\d?)\}/g, (_, n) => t(m[n ? +n : k++]));
  }
  return null;
}
// Para el JS: t("texto") devuelve la traducción o el mismo texto. Respeta los
// espacios de los bordes, porque los trozos de los patrones los traen.
function t(s){
  const nucleo = String(s).trim().replace(/\s+/g, " ");
  const x = nucleo && traducirTexto(nucleo);
  return x == null ? String(s) : String(s).replace(String(s).trim(), x);
}

// Para frases que el DOM no puede reconocer sin arriesgar datos del usuario
// ("{} de {}" partiría "Seguro de salud"): tf("~{} de {}", a, b).
function tf(clave, ...v){
  const tr = LANG !== "es" && TXT[clave];
  const s = tr ? tr[LANG === "en" ? 0 : 1] : clave.replace(/^~/, "");
  let k = 0;
  return s.replace(/\{(\d?)\}/g, (_, n) => v[n ? n - 1 : k++]);
}
// Alias para las funciones del portal que ya usan `t` como variable local.
const traducir = (s) => t(s);

// Cada nodo recuerda su español: así se vuelve a español o se pasa de inglés a
// portugués, y si el JS le escribe otro texto, ese pasa a ser el original.
const ORIG = new WeakMap(), PUESTO = new WeakMap();
const ATRIBS = ["placeholder", "aria-label", "title", "alt"];
const omitir = (el) => !el || el.closest("[translate=no], script, style, textarea");
function traducirValor(clave, actual){
  const previo = PUESTO.get(clave);
  const es = previo && previo.puesto === actual ? previo.es : actual;
  const nuevo = t(es);
  PUESTO.set(clave, { es, puesto: nuevo });
  return nuevo;
}
function traducirNodo(n){
  if (n.nodeType === 3){
    if (omitir(n.parentElement) || !n.data.trim()) return;
    const nuevo = traducirValor(n, n.data);
    if (nuevo !== n.data) n.data = nuevo;
    return;
  }
  if (n.nodeType !== 1 || omitir(n)) return;
  for (const a of ATRIBS){
    if (!n.hasAttribute(a)) continue;
    let mapa = ORIG.get(n); if (!mapa) ORIG.set(n, mapa = {});
    const actual = n.getAttribute(a);
    const previo = mapa[a];
    const es = previo && previo.puesto === actual ? previo.es : actual;
    const nuevo = t(es);
    mapa[a] = { es, puesto: nuevo };
    if (nuevo !== actual) n.setAttribute(a, nuevo);
  }
}
function traducirArbol(raiz){
  traducirNodo(raiz);
  if (raiz.nodeType !== 1) return;
  const w = document.createTreeWalker(raiz, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT);
  for (let n = w.nextNode(); n; n = w.nextNode()) traducirNodo(n);
}

let observador = null;
function ponerIdioma(lang){
  lang = IDIOMAS_LOC[lang] ? lang : "es";
  try{ localStorage.setItem("neto:idioma", lang); }catch{}
  if (lang === LANG && observador) return false;
  LANG = lang; LOC = IDIOMAS_LOC[lang];
  document.documentElement.lang = lang;
  traducirArbol(document.body);
  if (!observador){
    observador = new MutationObserver((cambios) => {
      for (const c of cambios){
        if (c.type === "childList") c.addedNodes.forEach(traducirArbol);
        else traducirNodo(c.target);
      }
    });
    observador.observe(document.body, { subtree:true, childList:true, characterData:true,
      attributes:true, attributeFilter:ATRIBS });
  }
  return true;
}

// Las categorías que crea el backend (DEFAULT_CATEGORIES) se muestran en el
// idioma elegido, con las mismas traducciones que la app (finance-app:
// strings.dart, _categoryI18n). Las que creó el usuario se quedan tal cual.
// Solo cambia lo que se ve: filtros y claves siguen con el nombre guardado.
const CATEGORIAS = {
  "alimentación": ["Food", "Alimentação"], "transporte": ["Transport", "Transporte"],
  "entretenimiento": ["Entertainment", "Entretenimento"], "servicios": ["Utilities", "Serviços"],
  "salud": ["Health", "Saúde"], "compras": ["Shopping", "Compras"], "educación": ["Education", "Educação"],
  "vivienda": ["Housing", "Moradia"], "transferencia": ["Transfer", "Transferência"], "banco": ["Bank", "Banco"],
  "ingreso": ["Income", "Receita"], "otros": ["Other", "Outros"],
};
function nombreCategoria(c){
  c = String(c ?? "");
  const tr = LANG !== "es" && CATEGORIAS[c.trim().toLowerCase()];
  if (!tr) return c;
  const x = tr[LANG === "en" ? 0 : 1];
  return c.trim()[0] === c.trim()[0].toLowerCase() ? x.toLowerCase() : x;   // respeta "alimentación" / "Alimentación"
}

// Países y monedas: los nombres los trae el navegador en cada idioma.
function nombreEn(tipo, codigo, enEspanol){
  if (LANG === "es") return enEspanol;
  try{ return new Intl.DisplayNames([LOC], { type: tipo }).of(codigo) || enEspanol; }
  catch{ return enEspanol; }
}

// Antes de saber quién entra: lo último que se eligió en este navegador, y si
// no hay nada, el idioma del navegador.
function idiomaInicial(){
  try{ const g = localStorage.getItem("neto:idioma"); if (IDIOMAS_LOC[g]) return g; }catch{}
  const nav = (navigator.language || "es").slice(0, 2);
  return IDIOMAS_LOC[nav] ? nav : "es";
}
