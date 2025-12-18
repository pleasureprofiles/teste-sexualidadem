const WEBAPP_URL = "https://script.google.com/macros/s/AKfycbx25OnBB3BgbSK_1PcmHyPZneMSyoMfjnA2cxB7OLdwdWnDJmHH_I5mux9cZR7HC9hKqw/exec";

const answers = {};
let telaAtual = 0;
let enviando = false;
let pontuacaoTotal = 0;

// Pontuação para perguntas de experiência
const pontuacaoRespostas = {
    "Nunca fiz e não tenho vontade": 1,
    "Nunca fiz mas tenho curiosidade": 2,
    "Já fiz e não gostei": 2,
    "Já fiz e repetiria com prazer": 4,
    "Não me sinto confortável com encenações ou fetiches.": 1,
    "A ideia de contratar ou encenar esse papel me desperta curiosidade.": 2,
    "Tentamos o personagem, mas a cena pareceu forçada e não nos conectou.": 2,
    "Encarnar essa fantasia e vê-la como objeto de desejo é meu ápice.": 4,
    "Prefiro ser conduzido ou manter a igualdade no sexo.": 1,
    "A ideia de ter ela totalmente sob o meu controle me instiga.": 2,
    "Tentei assumir o comando, mas achei a dinâmica cansativa.": 2,
    "Eu nasci para dominar e amo ver a entrega total dela a mim.": 4,
    "Acho que quebraria o clima.": 1,
    "A ideia de ser humilhado por ela me dá muito tesão": 2,
    "Tentamos, mas nos sentimos ridículos e sem tesão.": 2,
    "Ser rebaixado por ela é o meu combustível favorito.": 3,
    "É o ápice da minha submissão e da dominação dela.": 4,
    "Fora de questão: prefiro um sexo livre de acessórios e restrições.": 1,
    "Instigante: sinto um frio na barriga com a ideia de ser dominado.": 2,
    "Excitante: sinto um frio na barriga com a ideia de dominar": 2,
    "Frustrante: a teoria foi muito melhor do que a prática real.": 2,
    "Animalesco: nossa conexão atinge o ápice através desse jogo bruto.": 4,
    "Aterrorizante: a dor real aniquila qualquer desejo em mim.": 1,
    "Obscuro: a ideia de testar meus limites físicos me fascina.": 2,
    "Traumático: a experiência ultrapassou o prazer e foi negativa.": 1,
    "Transcendental: a dor é o portal para o meu prazer mais profundo.": 4,
    "Não tenho interesse em receber penetração.": 1,
    "Sinto muita curiosidade de explorar esse lado com ela.": 2,
    "A logística e a sensação não foram o que eu esperava.": 2,
    "Viciante, amamos a liberdade dessa troca de posições": 4,
    "Inviável: sinto vergonha ou invasão; minha intimidade é só para ela.": 1,
    "Provocante: adoro exibi-la para outros, sabendo que ela sente orgulho e tesão nisso.": 3,
    "Inseguro: já tentei expô-la, mas o ciúme dela ou o meu desconforto estragaram o clima.": 2,
    "Poder Absoluto: vê-la como \"troféu\" cobiçado e sentir o desejo alheio por ela é meu ápice.": 4,
    "Prefiro o sexo tradicional, olho no olho e pele na pele.": 1,
    "A ideia de observá-la à distância sem poder tocá-la de imediato me excita.": 2,
    "Tentamos esse jogo de distância, mas a conexão esfriou em vez de esquentar.": 2,
    "O jogo de vê-la como \"presa\" sob meu olhar atento é o que mais nos incendeia.": 4,
    "Inconcebível: a falta de vínculo me trava totalmente.": 1,
    "Instigante: o mistério de uma estranha me fascina.": 2,
    "Vazio: tentei, mas a falta de conexão esfriou tudo.": 2,
    "Libertador: o anonimato é o que mais me incendeia.": 4,
    "Fora de questão: meu desejo exige exclusividade total entre nós dois.": 1,
    "Pura adrenalina: ser o centro das atenções de duas mulheres seria o meu ápice.": 3,
    "Página virada: a experiência trouxe desconforto.": 2,
    "Nosso combustível: nada nos incendeia mais do que ela me vendo com outra.": 4,
    "Fora de questão: meu desejo exige exclusividade total dela.": 1,
    "Pura adrenalina: ver ela sendo desejada por outro seria um ápice.": 3,
    "Página virada: ver a cena ao vivo trouxe sentimentos que preferi evitar.": 2,
    "Nada me dá mais tesão do que vê-la com outro homem.": 4,
    "Jamais: a ideia de vê-la com outro homem me repele.": 1,
    "Tentador: um convite desses me deixaria muito balançado.": 2,
    "Frustrante: a experiência real ficou longe do que imaginei.": 2,
    "Essencial: adoramos o ambiente e a adrenalina da troca.": 4,
    "Fora de cogitação: abomino a ideia de sexo em grupo.": 1,
    "Tentador: a adrenalina da bagunça organizada me atrai.": 2,
    "Decepcionante: na prática, não foi tão prazeroso quanto na fantasia.": 2,
    "Nosso ápice: adoramos a liberdade sem regras das festas tradicionais.": 4,
    "Meu desejo é alimentado exclusivamente pela nossa exclusividade.": 1,
    "O aval dela é o gatilho que faltava para minha ousadia.": 2,
    "Já me imaginei algumas vezes vendo isso acontecer.": 3,
    "Vê-la como Hotwife com minha aprovação seria meu ápice.": 4,
    "Acho que não": 1,
    "Seria o verdadeiro Grand Finale": 3,
    "Já tentamos e não fluiu": 2,
    "Faz parte de nosso ritual secreto": 4,
    "Não curtiria": 1,
    "Prefiro manter nossa privacidade visual.": 1,
    "Um sonho ousado: ver o rosto dela enquanto se perde com outro seria único.": 3,
    "Página virada: a experiência visual ao vivo trouxe mais peso do que prazer.": 2,
    "É o nosso ápice: sou o espectador favorito dela no momento mais intenso.": 4
};

const telas = [
    // TELA 0 - Boas-vindas
    { tipo: "boasvindas" },
    
    // 1-5: MENU SUSPENSO
    { tipo: "pergunta", texto: "Qual é o seu signo?", campo: "q1_signo", menu: ["Áries","Touro","Gêmeos","Câncer","Leão","Virgem","Libra","Escorpião","Sagitário","Capricórnio","Aquário","Peixes"] },
    { tipo: "pergunta", texto: "Qual sua faixa etária?", campo: "q2_idade", menu: ["18-24","25-34","35-44","45-54","55-64","65+"] },
    { tipo: "pergunta", texto: "Qual é a sua orientação sexual?", campo: "q3_orientacao", menu: ["Heterossexual","Bissexual","Homossexual","Liberal"] },
    { tipo: "pergunta", texto: "Você está:", campo: "q4_status", menu: ["Solteiro","Namorando","Noivo","Casado","União Estável","Relacionamento Aberto","Divorciado","Viúvo","É complicado"] },
    { tipo: "pergunta", texto: "Quantas parceiras sexuais você já teve?", campo: "q5_parceiros", menu: ["0-1","2-5","6-10","11-20","21-30","31-50","51+"] },
    
    // 6: ESCOLHA ÚNICA (radio)
    { tipo: "pergunta", texto: "Quem prefere que tome a iniciativa na hora H?", campo: "q6_iniciativa", radio: ["Eu","Outra pessoa","Depende do momento"] },
    
    // 7: MÚLTIPLA ESCOLHA (checkbox)
    { tipo: "pergunta", texto: "Seu gatilho principal é:", campo: "q7_gatilho", checkbox: [
        "Sensorial: (Toque, temperatura, cheiro)",
        "Visual: (Estética, roupas, espelhos)",
        "Verbal: (Dirty talk, gemidos, histórias)",
        "Psicológico: (Poder, submissão, tabu)"
    ]},
    
    // 8: MÚLTIPLA ESCOLHA
    { tipo: "pergunta", texto: "Posição preferida?", campo: "q8_posicao", checkbox: ["Ela por cima","Ela de costas por cima","Papai Mamãe","De quatro","De pé","69","De lado"] },
    
    // 9: MÚLTIPLA ESCOLHA
    { tipo: "pergunta", texto: "O que mais te excita visualmente nela?", campo: "q9_visual", checkbox: ["Seios","Bumbum","Pernas","Lingerie","Salto alto","Olhar"] },
    
    // 10: ESCOLHA ÚNICA
    { tipo: "pergunta", texto: "Quantos orgasmos você tem na semana?", campo: "q10_orgasmos", radio: ["Nenhum","1","2–3","4–6","6-8","+9"] },
    
    // 11: MÚLTIPLA ESCOLHA
    { tipo: "pergunta", texto: "Qual o seu gatilho principal para o orgasmo?", campo: "q11_gatilhoOrgasmo", checkbox: ["Sexo oral nela","Sexo oral recebido","Penetração","Estímulo anal","Brinquedos","Visual dela gozando"] },
    
    // 12: MÚLTIPLA ESCOLHA
    { tipo: "pergunta", texto: "Quando a imaginação bate sozinha, a que você recorre?", campo: "q12_sozinha", checkbox: ["Contos eróticos","Vídeo pornô","Masturbador","Fotos/nudes","Memórias"] },
    
    // 13: MÚLTIPLA ESCOLHA
    { tipo: "pergunta", texto: "Experiências com pessoas do mesmo sexo?", campo: "q13_mesmoSexo", checkbox: ["Apenas com mulheres","Sinto uma ponta de curiosidade","Já fiquei, mas prefiro mulheres","Gosto e me envolvo com os dois"] },
    
    // 14: ESCOLHA ÚNICA
    { tipo: "pergunta", texto: "Experiências com pessoas trans?", campo: "q14_trans", radio: ["Nunca fiz e não tenho vontade","Nunca fiz mas tenho curiosidade","Já fiz e não gostei","Já fiz e repetiria com prazer"], pontuavel: true },
    
    // 15: MÚLTIPLA ESCOLHA
    { tipo: "pergunta", texto: "Sobre o Jogo de Personagens (Roleplay):", descricao: "Interpretar papéis em um jogo de sedução", campo: "q15_roleplay", checkbox: [
        "O \"Cliente\": Contratar uma garota de programa (foco em poder e sedução)",
        "A \"Autoridade\": Professor e aluna ou Chefe e funcionária (foco em hierarquia)",
        "O \"Cuidado\": Médico e paciente (foco em vulnerabilidade)",
        "Os \"Estranhos\": Duas pessoas que se conhecem em um bar (foco no mistério)"
    ]},
    
    // 16: ESCOLHA ÚNICA
    { tipo: "pergunta", texto: "Sobre encenar fetiches como contratar uma \"garota de programa\" ou vê-la sendo desejada:", campo: "q16_fetiche", radio: [
        "Não me sinto confortável com encenações ou fetiches.",
        "A ideia de contratar ou encenar esse papel me desperta curiosidade.",
        "Tentamos o personagem, mas a cena pareceu forçada e não nos conectou.",
        "Encarnar essa fantasia e vê-la como objeto de desejo é meu ápice."
    ], pontuavel: true },
    
    // 17: ESCOLHA ÚNICA
    { tipo: "pergunta", texto: "No jogo do prazer, como você se posiciona?", campo: "q17_posicionamento", radio: [
        "Totalmente Passivo: (Prefiro ser guiado e me entregar)",
        "Totalmente Ativo: (Gosto de ter o controle e ditar o ritmo)",
        "Versátil (Switch): (Gosto de alternar entre mandar e obedecer)",
        "Protagonista: (Gosto de ser o centro das atenções)",
        "Espectador: (Meu maior tesão é observar a cena acontecer)"
    ]},
    
    // 18: ESCOLHA ÚNICA
    { tipo: "pergunta", texto: "Prática de Maledom (Dominação Masculina):", campo: "q18_maledom", radio: [
        "Prefiro ser conduzido ou manter a igualdade no sexo.",
        "A ideia de ter ela totalmente sob o meu controle me instiga.",
        "Tentei assumir o comando, mas achei a dinâmica cansativa.",
        "Eu nasci para dominar e amo ver a entrega total dela a mim."
    ], pontuavel: true },
    
    // 19: ESCOLHA ÚNICA
    { tipo: "pergunta", texto: "Humilhação erótica recebida:", descricao: "Ser humilhado, provocado, rebaixado por ela, chamado de \"escravo\", \"corno\", \"manso\", como parte do jogo de poder.", campo: "q19_humilhacao", radio: [
        "Acho que quebraria o clima.",
        "A ideia de ser humilhado por ela me dá muito tesão",
        "Tentamos, mas nos sentimos ridículos e sem tesão.",
        "Ser rebaixado por ela é o meu combustível favorito.",
        "É o ápice da minha submissão e da dominação dela."
    ], pontuavel: true },
    
    // 20: ESCOLHA ÚNICA
    { tipo: "pergunta", texto: "Prática de Sadomasoquismo Moderado", descricao: "Ser imobilizado ou imobilizar ela com algemas, cordas, amarras, uso de chicotes, castigar ou ser castigado.", campo: "q20_sadoModerado", radio: [
        "Fora de questão: prefiro um sexo livre de acessórios e restrições.",
        "Instigante: sinto um frio na barriga com a ideia de ser dominado.",
        "Excitante: sinto um frio na barriga com a ideia de dominar",
        "Frustrante: a teoria foi muito melhor do que a prática real.",
        "Animalesco: nossa conexão atinge o ápice através desse jogo bruto."
    ], pontuavel: true },
    
    // 21: ESCOLHA ÚNICA
    { tipo: "pergunta", texto: "Práticas de Sadomasoquismo (BDSM de alta intensidade):", campo: "q21_bdsmIntenso", radio: [
        "Aterrorizante: a dor real aniquila qualquer desejo em mim.",
        "Obscuro: a ideia de testar meus limites físicos me fascina.",
        "Traumático: a experiência ultrapassou o prazer e foi negativa.",
        "Transcendental: a dor é o portal para o meu prazer mais profundo."
    ], pontuavel: true },
    
    // 22: ESCOLHA ÚNICA
    { tipo: "pergunta", texto: "Prática de Pegging:", descricao: "Receber penetração com uso de acessórios dela.", campo: "q22_pegging", radio: [
        "Não tenho interesse em receber penetração.",
        "Sinto muita curiosidade de explorar esse lado com ela.",
        "A logística e a sensação não foram o que eu esperava.",
        "Viciante, amamos a liberdade dessa troca de posições"
    ], pontuavel: true },
    
    // 23: MÚLTIPLA ESCOLHA
    { tipo: "pergunta", texto: "Rompendo os tabus modernos, a \"chuva dourada\" para você seria:", campo: "q23_golden", checkbox: [
        "Me dá mais nojo do que tesão",
        "Sinto curiosidade, mas ainda sem saber se ia rolar na prática",
        "Vejo como parte de humilhação erótica",
        "Vejo como um ato de dominação/submissão bem intenso",
        "Enxergo como uma forma extrema de intimidade e confiança",
        "Me excita mais a ideia do que a prática em si"
    ]},
    
    // 24: ESCOLHA ÚNICA
    { tipo: "pergunta", texto: "Exibicionismo e o \"Olhar do Outro\":", descricao: "Sobre o prazer de exibi-la em público (com um traje provocante) enquanto você assiste à reação das pessoas.", campo: "q24_exibicionismo", radio: [
        "Inviável: sinto vergonha ou invasão; nossa intimidade é só nossa.",
        "Provocante: adoro exibi-la para outros, sabendo que ela sente orgulho e tesão nisso.",
        "Inseguro: já tentei expô-la, mas o ciúme dela ou o meu desconforto estragaram o clima.",
        "Poder Absoluto: vê-la como \"troféu\" cobiçado e sentir o desejo alheio por ela é meu ápice."
    ], pontuavel: true },
    
    // 25: ESCOLHA ÚNICA
    { tipo: "pergunta", texto: "Voyeurismo e Distância (O Jogo do Observador):", descricao: "Sobre o fetiche de observá-la à distância, ou vê-la em situações de \"risco planejado\" (como ela sair sozinha ou ser abordada).", campo: "q25_voyeurismo", radio: [
        "Prefiro o sexo tradicional, olho no olho e pele na pele.",
        "A ideia de observá-la à distância sem poder tocá-la de imediato me excita.",
        "Tentamos esse jogo de distância, mas a conexão esfriou em vez de esquentar.",
        "O jogo de vê-la como \"presa\" sob meu olhar atento é o que mais nos incendeia."
    ], pontuavel: true },
    
    // 26: ESCOLHA ÚNICA
    { tipo: "pergunta", texto: "Sexo com total desconhecida?", campo: "q26_desconhecido", radio: [
        "Inconcebível: a falta de vínculo me trava totalmente.",
        "Instigante: o mistério de uma estranha me fascina.",
        "Vazio: tentei, mas a falta de conexão esfriou tudo.",
        "Libertador: o anonimato é o que mais me incendeia."
    ], pontuavel: true },
    
    // 27: ESCOLHA ÚNICA
    { tipo: "pergunta", texto: "Toparia um Menage com duas mulheres (1H x 2M)?", campo: "q27_menageFem", radio: [
        "Fora de questão: meu desejo exige exclusividade total entre nós dois.",
        "Pura adrenalina: ser o centro das atenções de duas mulheres seria o meu ápice.",
        "Página virada: a experiência trouxe desconforto.",
        "Nosso combustível: nada nos incendeia mais do que ela me vendo com outra."
    ], pontuavel: true },
    
    // 28: ESCOLHA ÚNICA
    { tipo: "pergunta", texto: "No cenário do Menage com duas mulheres, qual dessas cenas mais te chama atenção?", campo: "q28_cenaMenageFem", radio: [
        "Elas focadas em você: as duas disputando cada centímetro do seu corpo.",
        "Você no comando: você ditando como elas devem te dar prazer.",
        "Interação total: você entre as duas, explorando ambas ao mesmo tempo.",
        "Foco nelas: você assistindo as duas juntas enquanto espera sua vez.",
        "Dominação e entrega: as duas totalmente entregues aos seus desejos."
    ]},
    
    // 29: ESCOLHA ÚNICA
    { tipo: "pergunta", texto: "Toparia um Menage com outro homem (2H x 1M)?", descricao: "Ver ela com outro homem junto com você.", campo: "q29_menageMasc", radio: [
        "Fora de questão: meu desejo exige exclusividade total dela.",
        "Pura adrenalina: ver ela sendo desejada por outro seria um ápice.",
        "Página virada: ver a cena ao vivo trouxe sentimentos que preferi evitar.",
        "Nada me dá mais tesão do que vê-la com outro homem."
    ], pontuavel: true },
    
    // 30: MÚLTIPLA ESCOLHA
    { tipo: "pergunta", texto: "No cenário do Menage com outro homem, qual dessas cenas mais te chama atenção?", campo: "q30_cenaMenageMasc", checkbox: [
        "Você no comando: ditando como o outro deve dar prazer a ela",
        "Os dois focados nela: ela sendo o centro das atenções",
        "Você assistindo: ela com o outro enquanto você observa",
        "Ela no comando: ela decidindo o que cada um faz",
        "Revezar: hora você com ela, hora ele com ela"
    ]},
    
    // 31: ESCOLHA ÚNICA
    { tipo: "pergunta", texto: "E o ciúmes nessa história com outro homem?", campo: "q31_ciumes", radio: [
        "Eu travaria, não consigo nem imaginar dividir ela",
        "Teria ciúmes, mas acho que a excitação falaria mais alto",
        "Se tiver regra clara, confiança e combinado, eu relaxo",
        "Me excita justamente ver ela com outro na minha frente",
        "Eu seria mais ciumento com ele do que com ela"
    ]},
    
    // 32: ESCOLHA ÚNICA
    { tipo: "pergunta", texto: "Se convidado, como você reage à ideia de Swing?", campo: "q32_swing", radio: [
        "Jamais: a ideia de vê-la com outro homem me repele.",
        "Tentador: um convite desses me deixaria muito balançado.",
        "Frustrante: a experiência real ficou longe do que imaginei.",
        "Essencial: adoramos o ambiente e a adrenalina da troca."
    ], pontuavel: true },
    
    // 33: ESCOLHA ÚNICA
    { tipo: "pergunta", texto: "Experiência com sexo grupal (+4 pessoas)?", campo: "q33_grupal", radio: [
        "Fora de cogitação: abomino a ideia de sexo em grupo.",
        "Tentador: a adrenalina da bagunça organizada me atrai.",
        "Decepcionante: na prática, não foi tão prazeroso quanto na fantasia.",
        "Nosso ápice: adoramos a liberdade sem regras das festas tradicionais."
    ], pontuavel: true },
    
    // 34: ESCOLHA ÚNICA
    { tipo: "pergunta", texto: "Já imaginou ela ficando com outro, sabendo que você aprova?", campo: "q34_hotwifeIdeia", radio: [
        "Meu desejo é alimentado exclusivamente pela nossa exclusividade.",
        "O aval dela é o gatilho que faltava para minha ousadia.",
        "Já me imaginei algumas vezes vendo isso acontecer.",
        "Vê-la como Hotwife com minha aprovação seria meu ápice."
    ], pontuavel: true },
    
    // 35: ESCOLHA ÚNICA
    { tipo: "pergunta", texto: "E se, após essa aventura, o retorno dela para casa fosse marcado por uma confissão de cada detalhe sórdido para tirar o seu fôlego de tesão?", campo: "q35_confissao", radio: [
        "Acho que não",
        "Seria o verdadeiro Grand Finale",
        "Já tentamos e não fluiu",
        "Faz parte de nosso ritual secreto"
    ], pontuavel: true },
    
    // 36: ESCOLHA ÚNICA
    { tipo: "pergunta", texto: "E agora, se além de só ficar sabendo, você visse ela perder totalmente o controle e se entregar ao outro com uma intensidade que você nunca viu?", campo: "q36_euAssistindo", radio: [
        "Não curtiria",
        "Prefiro manter nossa privacidade visual.",
        "Um sonho ousado: ver o rosto dela enquanto se perde com outro seria único.",
        "Página virada: a experiência visual ao vivo trouxe mais peso do que prazer.",
        "É o nosso ápice: sou o espectador favorito dela no momento mais intenso."
    ], pontuavel: true }
];

// RESULTADOS MASCULINOS
const resultados = {
    1: {
        titulo: "O Iniciante",
        subtitulo: "Conexão Sensorial / Descoberta",
        descricao: "O foco é sair do \"automático\" e despertar os sentidos. Não é sobre performance, é sobre presença. O tesão vem da quebra da rotina e da exploração lenta de toques que foram esquecidos no dia a dia.",
        brinquedos: [
            { nome: "Anel peniano vibratório", desc: "Aumenta a rigidez e introduz vibração para ela durante a penetração." },
            { nome: "Óleo de massagem térmico", desc: "Transforma o toque em experiência de temperatura e cheiro." },
            { nome: "Lubrificante premium", desc: "Remove qualquer atrito mecânico, deixando só a sensação." },
            { nome: "Vibrador bullet para ela", desc: "Pequeno e direto, para descobrir pontos externos juntos." },
            { nome: "Venda de seda", desc: "Elimina a visão para obrigar o corpo a sentir o triplo." }
        ],
        roupas: [
            { nome: "Cueca boxer premium", desc: "Confortável e visualmente atraente para ela." },
            { nome: "Perfume marcante", desc: "O cheiro certo ativa memórias e desejo antes do toque." },
            { nome: "Robe masculino", desc: "Cria um clima de intimidade e sedução lenta." },
            { nome: "Camisa social semi-aberta", desc: "Clássico visual que sugere sem revelar tudo." },
            { nome: "Lingerie para ela escolher", desc: "Deixe ela escolher o que te excita mais visualmente." }
        ],
        fantasias: [
            { nome: "O Jogo do Silêncio", desc: "Proibido falar. Vocês se comunicam apenas pelo toque e pela respiração, forçando uma atenção total à linguagem corporal do outro." },
            { nome: "Massagem Cega", desc: "Ela vendada, você usa diferentes texturas (pena, gelo, óleo) no corpo dela. Ela não sabe o que vem, apenas sente." },
            { nome: "Primeiro Encontro", desc: "Vocês fingem que não se conhecem, se encontram na sala e conversam como estranhos tentando se seduzir pela primeira vez." },
            { nome: "Espelho, Espelho", desc: "Transar na frente do espelho, mas o foco é você ver ela sendo tocada, validando o desejo por ela." },
            { nome: "Slow Motion", desc: "Tudo deve ser feito em câmera lenta. O beijo, o toque, a penetração. A proibição da velocidade aumenta a urgência interna." }
        ]
    },
    2: {
        titulo: "O Explorador",
        subtitulo: "Aprofundamento / Brinquedos e Tecnologia",
        descricao: "A curiosidade assume o controle. O foco é ampliar o prazer usando tecnologia e novos estímulos. O tesão vem da novidade e de descobrir que o corpo pode sentir coisas que a \"biologia sozinha\" não entrega.",
        brinquedos: [
            { nome: "Masturbador masculino", desc: "Texturas internas que simulam sensações impossíveis manualmente." },
            { nome: "Vibrador remote para ela", desc: "Controle à distância - você decide quando e quanto ela sente." },
            { nome: "Anel peniano com estimulador", desc: "Dupla função: sustenta a ereção e estimula o clitóris dela." },
            { nome: "Plug anal iniciante", desc: "Para ela ou para você - quebra o tabu da sensação de preenchimento." },
            { nome: "Algemas de pelúcia/velcro", desc: "Restrição simbólica, fácil de tirar, apenas para a sensação de \"preso\"." }
        ],
        roupas: [
            { nome: "Cueca com abertura frontal", desc: "Acesso rápido mantendo o visual." },
            { nome: "Gravata (para amarrar)", desc: "Transforma acessório comum em ferramenta de jogo." },
            { nome: "Lingerie para ela (você escolhe)", desc: "Escolher o que ela vai usar aumenta a antecipação." },
            { nome: "Meia arrastão para ela", desc: "Textura agressiva e visualmente estimulante." },
            { nome: "Uniforme temático leve", desc: "Introdução ao roleplay visual sem ser fantasia completa." }
        ],
        fantasias: [
            { nome: "O Controle é Seu", desc: "Você usa o vibrador nela, controlando quando ela goza e em qual velocidade. O poder está nas suas mãos." },
            { nome: "Lugar Proibido (em casa)", desc: "Transar na cozinha, na lavanderia ou na varanda (escondidos). O risco é zero, mas a quebra da regra \"quarto\" excita." },
            { nome: "Voyeurismo Digital", desc: "Vocês filmam uma parte do ato (sem rosto) apenas para assistirem juntos logo depois e apagarem. O tesão é se ver \"de fora\"." },
            { nome: "A Boneca", desc: "Ela fica passiva, você a move, veste ou despe como quer. O prazer está no controle total." },
            { nome: "Strip-tease para Você", desc: "Ela coloca uma música e dança para você. O foco é você desejá-la enquanto não pode tocá-la." }
        ]
    },
    3: {
        titulo: "O Ousado",
        subtitulo: "Limites / Poder e Dor Leve",
        descricao: "Entrada no mundo do poder e controle. O tesão vem da hierarquia: alguém manda, alguém obedece. Envolve confiança para testar dor leve (spanking) e restrições que começam a ser psicológicas, não só físicas.",
        brinquedos: [
            { nome: "Paddle ou Chibata de couro", desc: "Para introduzir o impacto e a marca na pele." },
            { nome: "Algemas de metal ou couro", desc: "Restrição real, onde ela não solta sozinha." },
            { nome: "Mordaça (Gag) ball", desc: "Silencia a voz, forçando a submissão e o foco na sensação física." },
            { nome: "Venda blackout total", desc: "Bloqueio visual completo para aumentar a vulnerabilidade." },
            { nome: "Grampos de mamilo", desc: "Dor pontual que se transforma em prazer intenso." }
        ],
        roupas: [
            { nome: "Couro ou couro sintético", desc: "A estética do fetiche - textura, cheiro e visual de poder." },
            { nome: "Máscara dominador", desc: "Esconde a identidade, liberta a persona." },
            { nome: "Coleira de couro para ela", desc: "Símbolo de quem detém o controle." },
            { nome: "Lingerie strappy para ela", desc: "Moldura o corpo como se fosse um pacote a ser aberto." },
            { nome: "Botas para ela", desc: "Símbolo de autoridade ou submissão dependendo do jogo." }
        ],
        fantasias: [
            { nome: "O Chefe", desc: "Você é uma autoridade (chefe, professor) e ela está em apuros. O sexo é uma negociação de poder e punição." },
            { nome: "Negação (Edging)", desc: "Você a leva à beira do orgasmo e para. Repetidas vezes. Ela implora, mas você decide quando (e se) ela goza." },
            { nome: "O Objeto", desc: "Ela é tratada não como parceira, mas como um objeto de prazer seu. Sem beijos românticos, apenas uso intenso e focado." },
            { nome: "Exibicionismo na Janela", desc: "Transar com a janela aberta ou no carro em lugar deserto. A chance real de ser visto é o gatilho." },
            { nome: "Marcação de Território", desc: "Palmadas que deixam a pele vermelha ou chupões em lugares visíveis (se permitido). A dor vira a lembrança do ato." }
        ]
    },
    4: {
        titulo: "O Aventureiro",
        subtitulo: "Stag / Cuckold Leve",
        descricao: "O tesão aqui é o jogo mental: você se sentir orgulhoso de exibi-la, e ela sentir excitação por ser desejada por outros. Tudo gira em torno de roteiro e limites bem claros.",
        brinquedos: [
            { nome: "Vibrador remote para ela sair", desc: "Você controla o prazer dela à distância, em público." },
            { nome: "Consolo realístico \"terceiro\"", desc: "Simula a presença de outro, mantendo a fantasia privada." },
            { nome: "Coleira + guia discreta", desc: "Simbolismo de posse que só vocês sabem." },
            { nome: "Masturbador masculino premium", desc: "Para seu prazer enquanto assiste ou imagina a cena." },
            { nome: "Câmera/celular para fotos", desc: "Registrar momentos sensuais dela para vocês reverem juntos." }
        ],
        roupas: [
            { nome: "Vestido provocante para ela", desc: "Look de alto impacto que atrai olhares externos." },
            { nome: "Lingerie aparente para ela", desc: "Sugere exposição controlada sem ser vulgar." },
            { nome: "Salto alto fino para ela", desc: "Confere poder e postura, elevando a presença dela." },
            { nome: "Saia curta + meia 7/8 para ela", desc: "Visual sedutor que facilita a adrenalina da exposição." },
            { nome: "Você elegante/casual", desc: "Contraste: ela provocante, você observador confiante." }
        ],
        fantasias: [
            { nome: "O Troféu", desc: "Ela usa um look que provoca. Você vê as reações externas e sente orgulho e tesão de ser o dono do segredo." },
            { nome: "Date Solo Roteirizado", desc: "Ela sai sozinha, manda 2–3 mensagens curtas e volta pra você com o clima pronto." },
            { nome: "Cena da Porta no Hotel", desc: "Ela simula uma \"cena de retorno\" — não é sobre o que houve lá fora, mas sobre o papel." },
            { nome: "Casa de Swing como Passeio", desc: "Vocês vão pelo ambiente. Não \"precisam\" fazer nada; só absorver o clima e ir embora com o tesão acumulado." },
            { nome: "Relato Guiado", desc: "Ela conta uma cena imaginada, olhando nos olhos, pausando, aumentando detalhes. Você escuta excitado." }
        ]
    },
    5: {
        titulo: "O Radical",
        subtitulo: "Stag / Cuckold Avançado",
        descricao: "Aqui vira experiência completa: preparação, performance, suspense, \"pós-cena\" e repetição como ritual. Você não só participa — você dirige e ritualiza a noite.",
        brinquedos: [
            { nome: "Cinto de castidade masculino", desc: "Transforma o \"final\" em evento raro e ritualístico." },
            { nome: "Masturbador premium", desc: "Para seu prazer enquanto assiste ela com outro (real ou imaginado)." },
            { nome: "Plug anal para você", desc: "Aumenta a intensidade enquanto você observa a cena." },
            { nome: "Consolo grande/realístico", desc: "Acessório de impacto para a cena, elevando a fantasia." },
            { nome: "Algemas para você", desc: "Você preso enquanto assiste - submissão total ao prazer dela." }
        ],
        roupas: [
            { nome: "Conjunto provocante completo para ela", desc: "Look de impacto total, sinalizando a personagem Hotwife." },
            { nome: "Lingerie transparente para ela", desc: "Aumenta a sensação de exposição controlada." },
            { nome: "Peruca + óculos para ela (persona)", desc: "Cria uma personagem e separa fantasia da realidade." },
            { nome: "Salto altíssimo para ela", desc: "Transforma o andar dela em performance." },
            { nome: "Você: roupa casual/discreta", desc: "O contraste reforça o papel de espectador/cúmplice." }
        ],
        fantasias: [
            { nome: "A Noite da Hotwife", desc: "Ela se monta como persona (roupa, peruca, postura) e você assiste ao que sempre desejou — ela conduz tudo com calma e autoridade." },
            { nome: "Castidade como tensão", desc: "A brincadeira não é o \"final\", é o caminho — ela provoca, domina, aumenta a vontade, e transforma a liberação em evento." },
            { nome: "Roteiro em 3 atos", desc: "(1) produção e provocação (2) suspense e cena (3) recapture intenso com você — começo/meio/fim, como um filme." },
            { nome: "Mensagens ao vivo", desc: "Ela manda áudios curtos durante a aventura e você fica carregando o tesão esperando ela voltar." },
            { nome: "Debrief cinematográfico", desc: "Ela volta e conta com riqueza de sensação (olhares, frases, clima, poder), e isso vira o gatilho direto para a cena final da noite." }
        ]
    }
};

function atualizarProgresso() {
    const progressBar = document.getElementById('progress-bar');
    if (progressBar) {
        const progresso = (telaAtual / (telas.length - 1)) * 100;
        progressBar.style.width = `${progresso}%`;
    }
}

function contarPerguntas() {
    return telas.filter(t => t.tipo === 'pergunta').length;
}

function getPerguntaAtual() {
    let count = 0;
    for (let i = 0; i <= telaAtual; i++) {
        if (telas[i].tipo === 'pergunta') count++;
    }
    return count;
}

function mostrarTela() {
    const tela = telas[telaAtual];
    const container = document.getElementById("quiz-container");
    const btnContainer = document.getElementById("btn-container");
    
    atualizarProgresso();
    
    if (tela.tipo === "boasvindas") {
        container.innerHTML = `
            <div class="tela-inicial fade-in">
                <div class="badge-18">+18</div>
                <h1>Guia de<br>Sexualidade</h1>
                <p class="subtitulo">Teste o nível do seu presente.<br>Projete o nível do seu futuro.</p>
                <p class="descricao">Este guia irá te auxiliar a explorar suas preferências, da rotina ao fetiche. No final, você recebe um nível (1–5) e sugestões que facilitam suas escolhas no nosso catálogo, para encontrar acessórios que combinam com o seu perfil e elevam sua experiência.</p>
                <p class="aviso">Conteúdo exclusivo para maiores de 18 anos.</p>
            </div>
        `;
        btnContainer.innerHTML = `<button type="button" id="btn-iniciar">Tenho 18 anos ou mais</button>`;
        setTimeout(() => {
            document.getElementById('btn-iniciar').onclick = () => avancarTela();
        }, 50);
        
    } else if (tela.tipo === "pergunta") {
        const numPergunta = getPerguntaAtual();
        const totalPerguntas = contarPerguntas();
        
        let html = `
            <div id="question-box" class="fade-in">
                <div class="question-number">Pergunta ${numPergunta} de ${totalPerguntas}</div>
                <div class="question-title">${tela.texto}</div>
                ${tela.descricao ? `<div class="question-desc">${tela.descricao}</div>` : ''}
            </div>
            <div id="options-box" class="fade-in">
        `;
        
        if (tela.menu) {
            html += '<select id="resposta"><option value="">Selecione uma opção</option>';
            tela.menu.forEach(o => html += `<option value="${o}">${o}</option>`);
            html += '</select></div>';
            container.innerHTML = html;
            btnContainer.innerHTML = '';
            
            setTimeout(() => {
                document.getElementById('resposta').onchange = function() {
                    if (this.value) {
                        salvarResposta(tela, this.value);
                        setTimeout(() => avancarTela(), 250);
                    }
                };
            }, 50);
        }
        
        else if (tela.radio) {
            tela.radio.forEach(o => {
                html += `<label class="option-card"><input type="radio" name="radio" value="${o}"><span>${o}</span></label>`;
            });
            html += '</div>';
            container.innerHTML = html;
            btnContainer.innerHTML = '<button type="button" id="btn-proxima">Continuar</button>';
            
            setTimeout(() => {
                document.getElementById('btn-proxima').onclick = () => {
                    const selected = document.querySelector('input[name="radio"]:checked');
                    if (!selected) {
                        document.getElementById('options-box').style.animation = 'none';
                        document.getElementById('options-box').offsetHeight;
                        document.getElementById('options-box').style.animation = 'shake 0.4s ease';
                        return;
                    }
                    salvarResposta(tela, selected.value);
                    avancarTela();
                };
            }, 50);
        }
        
        else if (tela.checkbox) {
            tela.checkbox.forEach(o => {
                html += `<label class="option-card"><input type="checkbox" name="check" value="${o}"><span>${o}</span></label>`;
            });
            html += '</div>';
            container.innerHTML = html;
            btnContainer.innerHTML = '<button type="button" id="btn-proxima">Continuar</button>';
            
            setTimeout(() => {
                document.getElementById('btn-proxima').onclick = () => {
                    const checks = document.querySelectorAll('input[name="check"]:checked');
                    if (checks.length === 0) {
                        document.getElementById('options-box').style.animation = 'none';
                        document.getElementById('options-box').offsetHeight;
                        document.getElementById('options-box').style.animation = 'shake 0.4s ease';
                        return;
                    }
                    salvarResposta(tela, Array.from(checks).map(c => c.value).join(", "));
                    avancarTela();
                };
            }, 50);
        }
    }
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function salvarResposta(tela, valor) {
    answers[tela.campo] = valor;
    if (tela.pontuavel && pontuacaoRespostas[valor]) {
        pontuacaoTotal += pontuacaoRespostas[valor];
    }
}

function avancarTela() {
    if (enviando) return;
    telaAtual++;
    if (telaAtual >= telas.length) {
        calcularResultado();
    } else {
        mostrarTela();
    }
}

function calcularResultado() {
    const perguntasPontuaveis = telas.filter(t => t.pontuavel).length;
    const pontuacaoMaxima = perguntasPontuaveis * 4;
    const porcentagem = (pontuacaoTotal / pontuacaoMaxima) * 100;
    
    let nivel;
    if (porcentagem <= 25) nivel = 1;
    else if (porcentagem <= 40) nivel = 2;
    else if (porcentagem <= 55) nivel = 3;
    else if (porcentagem <= 75) nivel = 4;
    else nivel = 5;
    
    mostrarResultado(nivel);
}

function mostrarResultado(nivel) {
    const r = resultados[nivel];
    const container = document.getElementById("quiz-container");
    const btnContainer = document.getElementById("btn-container");
    const progressContainer = document.getElementById("progress-container");
    
    if (progressContainer) progressContainer.style.display = 'none';
    
    container.innerHTML = `
        <div class="resultado-container fade-in">
            <div class="resultado-nivel">
                <div class="nivel-badge">Nível ${nivel}</div>
                <h1>${r.titulo}</h1>
                <div class="subtitulo">${r.subtitulo}</div>
            </div>
            
            <p class="resultado-descricao">${r.descricao}</p>
            
            <div class="resultado-secao">
                <h2>Brinquedos Sugeridos</h2>
                <ul>
                    ${r.brinquedos.map(b => `<li><strong>${b.nome}</strong><span>${b.desc}</span></li>`).join('')}
                </ul>
            </div>
            
            <div class="resultado-secao">
                <h2>Roupas e Acessórios</h2>
                <ul>
                    ${r.roupas.map(ro => `<li><strong>${ro.nome}</strong><span>${ro.desc}</span></li>`).join('')}
                </ul>
            </div>
            
            <div class="resultado-secao">
                <h2>Fantasias a Explorar</h2>
                <ul>
                    ${r.fantasias.map(f => `<li><strong>${f.nome}</strong><span>${f.desc}</span></li>`).join('')}
                </ul>
            </div>
        </div>
    `;
    
    btnContainer.innerHTML = '';
    answers['nivel_resultado'] = nivel;
    enviarParaPlanilha();
}

async function enviarParaPlanilha() {
    enviando = true;
    const respostasArray = Object.values(answers);
    
    try {
        const formData = new FormData();
        formData.append('respostas', JSON.stringify(respostasArray));
        await fetch(WEBAPP_URL, { method: 'POST', body: formData });
        console.log('✅ Enviado');
    } catch (e) {
        console.error('❌ Erro:', e);
    } finally {
        enviando = false;
    }
}

const style = document.createElement('style');
style.textContent = `@keyframes shake { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-6px)} 75%{transform:translateX(6px)} }`;
document.head.appendChild(style);

window.addEventListener('DOMContentLoaded', () => mostrarTela());
