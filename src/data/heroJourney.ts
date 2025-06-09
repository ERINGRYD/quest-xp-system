
import { HeroPhase, HeroStage } from '@/types/quest';

export const createHeroJourney = (themeId: string): HeroPhase[] => {
  const basePhases: Omit<HeroPhase, 'id' | 'miniTask'>[] = [
    {
      name: 'O Chamado',
      stage: 'call-to-adventure',
      description: 'O despertar para uma nova possibilidade de crescimento',
      symbolicMeaning: 'O universo convoca você para transcender seus limites atuais',
      reflection: 'Que voz interior está chamando por mudança? O que sua alma deseja transformar?',
      ritual: 'Acenda uma vela e declare em voz alta sua intenção de crescimento',
      completed: false
    },
    {
      name: 'O Mentor',
      stage: 'meeting-mentor',
      description: 'O encontro com a sabedoria que guiará sua jornada',
      symbolicMeaning: 'A sabedoria ancestral e sua própria experiência se unem como guias',
      reflection: 'Que conhecimento ou pessoa pode me orientar nesta jornada? Como posso ser meu próprio mentor?',
      ritual: 'Escreva três conselhos que daria para alguém iniciando esta mesma jornada',
      completed: false
    },
    {
      name: 'A Travessia',
      stage: 'crossing-threshold',
      description: 'O primeiro passo corajoso rumo ao desconhecido',
      symbolicMeaning: 'Você deixa a zona de conforto e entra no território da transformação',
      reflection: 'Que medo estou pronto(a) para enfrentar? Qual será meu primeiro ato de coragem?',
      ritual: 'Tome uma ação concreta hoje que represente sua travessia do limiar',
      completed: false
    },
    {
      name: 'A Caverna',
      stage: 'approach-ordeal',
      description: 'O confronto com seus maiores desafios e medos',
      symbolicMeaning: 'No coração da escuridão, você encontra sua verdadeira força',
      reflection: 'Qual é meu maior obstáculo interno? Como posso transformar esse desafio em poder?',
      ritual: 'Medite por 10 minutos visualizando-se superando seu maior medo',
      completed: false
    },
    {
      name: 'A Recompensa',
      stage: 'reward',
      description: 'A conquista do tesouro interior após superar os desafios',
      symbolicMeaning: 'Sua coragem é recompensada com sabedoria e poder interior',
      reflection: 'Que habilidade ou qualidade desenvolvi? Como posso honrar esse crescimento?',
      ritual: 'Celebre sua conquista com um gesto de gratidão para consigo mesmo',
      completed: false
    },
    {
      name: 'O Retorno',
      stage: 'return-elixir',
      description: 'O compartilhamento da sabedoria adquirida com o mundo',
      symbolicMeaning: 'Você se torna uma fonte de inspiração e sabedoria para outros',
      reflection: 'Como posso usar o que aprendi para ajudar outros? Qual é meu legado?',
      ritual: 'Compartilhe uma lição aprendida com alguém que pode se beneficiar dela',
      completed: false
    }
  ];

  return basePhases.map((phase, index) => ({
    ...phase,
    id: `${themeId}-phase-${index + 1}`,
    miniTask: createMiniTaskForPhase(phase.stage, themeId, index)
  }));
};

const createMiniTaskForPhase = (stage: HeroStage, themeId: string, index: number) => {
  const baseTasks = {
    'call-to-adventure': {
      name: 'Definição do Chamado',
      instruction: 'Escreva em uma frase qual transformação você busca nesta jornada',
      xpValue: 15
    },
    'meeting-mentor': {
      name: 'Busca por Orientação',
      instruction: 'Identifique uma fonte de conhecimento (livro, pessoa, curso) relacionada ao seu objetivo',
      xpValue: 20
    },
    'crossing-threshold': {
      name: 'Primeiro Passo Corajoso',
      instruction: 'Execute uma ação que demonstre seu comprometimento com a mudança',
      xpValue: 25
    },
    'approach-ordeal': {
      name: 'Enfrentamento do Medo',
      instruction: 'Identifique e tome uma pequena ação contra seu maior obstáculo nesta área',
      xpValue: 30
    },
    'reward': {
      name: 'Reconhecimento da Conquista',
      instruction: 'Liste três habilidades ou qualidades que você desenvolveu até aqui',
      xpValue: 25
    },
    'return-elixir': {
      name: 'Compartilhamento da Sabedoria',
      instruction: 'Ajude alguém com o conhecimento que você adquiriu nesta jornada',
      xpValue: 35
    }
  };

  const taskData = baseTasks[stage];
  
  return {
    id: `${themeId}-${stage}-task`,
    name: taskData.name,
    symbolicName: `O ${stage.replace('-', ' ')} Sagrado`,
    instruction: taskData.instruction,
    attributeId: 'self-knowledge', // Hero journey tasks develop self-knowledge
    xpValue: taskData.xpValue,
    estimatedTime: 5,
    completed: false,
    consecutiveIgnores: 0
  };
};
