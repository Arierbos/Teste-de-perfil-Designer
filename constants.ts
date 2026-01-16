import { ProfileType, Question } from './types';

export const QUESTIONS: Question[] = [
  {
    id: 1,
    title: 'Você recebe um tema de projeto bem aberto (“crie um app para…”)',
    options: [
      { tag: ProfileType.EXPLORADOR, text: 'Começo pesquisando e abrindo possibilidades: público, dores, referências, cenários.' },
      { tag: ProfileType.ARTISTICO, text: 'Começo pensando numa estética/experiência marcante e numa “vibe” que guie o projeto.' },
      { tag: ProfileType.ANALITICO, text: 'Começo definindo objetivo, recorte, premissas e critérios do que será “bom”.' },
    ]
  },
  {
    id: 2,
    title: 'Na hora de escolher um tema de portfólio…',
    options: [
      { tag: ProfileType.EXPLORADOR, text: 'Escolho o que me permite explorar problemas reais e aprender coisas novas.' },
      { tag: ProfileType.ARTISTICO, text: 'Escolho o que dá pra criar algo visualmente forte e autoral.' },
      { tag: ProfileType.ANALITICO, text: 'Escolho o que dá pra estruturar bem e mostrar processo e raciocínio.' },
    ]
  },
  {
    id: 3,
    title: 'Você precisa escrever o briefing do seu próprio projeto',
    options: [
      { tag: ProfileType.ANALITICO, text: 'Eu crio um mini-PRD: problema, público, objetivos, requisitos e métricas.' },
      { tag: ProfileType.EXPLORADOR, text: 'Eu monto um mapa do problema e faço perguntas pra definir melhor o recorte.' },
      { tag: ProfileType.ARTISTICO, text: 'Eu descrevo a intenção e o tipo de experiência que quero criar (emoção).' },
    ]
  },
  {
    id: 4,
    title: 'Ao ver um app/site incrível, você pensa:',
    options: [
      { tag: ProfileType.ARTISTICO, text: '“Que estética absurda! Como eles construíram essa linguagem visual?”' },
      { tag: ProfileType.ANALITICO, text: '“Como é a arquitetura e as regras? Por que esse fluxo funciona?”' },
      { tag: ProfileType.EXPLORADOR, text: '“Quais padrões e referências posso testar em outras soluções?”' },
    ]
  },
  {
    id: 5,
    title: 'Você tem que fazer uma pesquisa rápida com pessoas',
    options: [
      { tag: ProfileType.EXPLORADOR, text: 'Vou conversar, observar e tentar achar insights inesperados.' },
      { tag: ProfileType.ANALITICO, text: 'Defino perguntas e organizo as respostas em padrões e evidências.' },
      { tag: ProfileType.ARTISTICO, text: 'Foco em emoções, linguagem e contexto para traduzir em experiência.' },
    ]
  },
  {
    id: 6,
    title: 'Se você tivesse 2 horas pra melhorar seu projeto antes da entrega',
    options: [
      { tag: ProfileType.ARTISTICO, text: 'Melhoraria hierarquia, espaçamento, tipografia, microdetalhes e apresentação.' },
      { tag: ProfileType.ANALITICO, text: 'Melhoraria fluxo, consistência e explicação das decisões no case.' },
      { tag: ProfileType.EXPLORADOR, text: 'Melhoraria o recorte do problema, criaria variações e testaria com alguém.' },
    ]
  },
  {
    id: 7,
    title: 'Quando escolhe referências (benchmark/moodboard)',
    options: [
      { tag: ProfileType.EXPLORADOR, text: 'Busco variedade: soluções diferentes, até fora do digital.' },
      { tag: ProfileType.ARTISTICO, text: 'Busco estilo e direção de arte coerentes com a proposta.' },
      { tag: ProfileType.ANALITICO, text: 'Busco padrões comprovados e justificáveis por tipo de problema.' },
    ]
  },
  {
    id: 8,
    title: 'No trabalho em grupo, você costuma:',
    options: [
      { tag: ProfileType.ANALITICO, text: 'Organizar tarefas, prazos, decisões e padronizar a entrega.' },
      { tag: ProfileType.EXPLORADOR, text: 'Puxar discussão, provocar perguntas e trazer repertório/insights.' },
      { tag: ProfileType.ARTISTICO, text: 'Garantir que a solução tenha identidade, clareza e acabamento visual.' },
    ]
  },
  {
    id: 9,
    title: 'Seu professor dá feedback: “tá ok, mas não tá convincente”',
    options: [
      { tag: ProfileType.ANALITICO, text: 'Peço critérios e ajusto com base em clareza, consistência e lógica.' },
      { tag: ProfileType.EXPLORADOR, text: 'Investigo o porquê, busco referências e experimento caminhos diferentes.' },
      { tag: ProfileType.ARTISTICO, text: 'Reforço o conceito e o impacto visual/experiencial pra “dar presença” ao projeto.' },
    ]
  },
  {
    id: 10,
    title: 'Você vai montar um case de portfólio',
    options: [
      { tag: ProfileType.ANALITICO, text: 'Estruturo: problema → processo → decisões → resultados → aprendizados.' },
      { tag: ProfileType.EXPLORADOR, text: 'Mostro exploração: alternativas, testes, descobertas e iteração.' },
      { tag: ProfileType.ARTISTICO, text: 'Capricho no storytelling visual, mockups e na sensação de “produto real”.' },
    ]
  },
];

export const PROFILE_DESCRIPTIONS = {
  [ProfileType.EXPLORADOR]: {
    title: 'Explorador',
    description: 'Você é movido pela curiosidade. Adora descobrir novos caminhos, questionar o status quo e expandir as possibilidades antes de convergir.',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50',
    borderColor: 'border-yellow-200',
    imageSrc: 'designer_explorador.png'
  },
  [ProfileType.ARTISTICO]: {
    title: 'Artístico',
    description: 'Você tem um senso estético apurado e busca criar experiências que toquem as pessoas emocionalmente. Visual e sensação são seus pontos fortes.',
    color: 'text-pink-600',
    bgColor: 'bg-pink-50',
    borderColor: 'border-pink-200',
    imageSrc: 'designer_artistico.png'
  },
  [ProfileType.ANALITICO]: {
    title: 'Analítico',
    description: 'Você ama estrutura, lógica e processos. Para você, design bom é design que funciona, com regras claras, métricas e consistência.',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    imageSrc: 'designer_analítico3.png'
  },
};