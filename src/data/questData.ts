
import { Area, Attribute } from '@/types/quest';

export const attributes: Attribute[] = [
  {
    id: 'resilience',
    name: 'Resiliência',
    currentXP: 150,
    nextLevelXP: 300,
    level: 2,
    color: '#EF4444',
    icon: '🛡️'
  },
  {
    id: 'communication',
    name: 'Comunicação',
    currentXP: 75,
    nextLevelXP: 200,
    level: 1,
    color: '#06B6D4',
    icon: '💬'
  },
  {
    id: 'self-efficacy',
    name: 'Autoeficácia',
    currentXP: 220,
    nextLevelXP: 400,
    level: 3,
    color: '#F59E0B',
    icon: '⚡'
  },
  {
    id: 'self-knowledge',
    name: 'Autoconhecimento',
    currentXP: 90,
    nextLevelXP: 200,
    level: 1,
    color: '#8B5CF6',
    icon: '🧠'
  },
  {
    id: 'strength',
    name: 'Força',
    currentXP: 180,
    nextLevelXP: 300,
    level: 2,
    color: '#DC2626',
    icon: '💪'
  },
  {
    id: 'wisdom',
    name: 'Sabedoria',
    currentXP: 45,
    nextLevelXP: 150,
    level: 1,
    color: '#7C3AED',
    icon: '🦉'
  }
];

export const quickTasks = [
  {
    id: 'resilience-1',
    name: 'Escudo do Pensamento',
    symbolicName: 'O Guardião Interior',
    instruction: 'Identifique um pensamento negativo atual e reescreva-o de forma construtiva em uma frase.',
    attributeId: 'resilience',
    xpValue: 10,
    estimatedTime: 2,
    completed: false,
    consecutiveIgnores: 0
  },
  {
    id: 'resilience-2',
    name: 'Respiração do Guerreiro',
    symbolicName: 'O Mestre do Ar',
    instruction: 'Faça 5 respirações profundas, contando 4 segundos para inspirar, 4 para segurar, 4 para expirar.',
    attributeId: 'resilience',
    xpValue: 8,
    estimatedTime: 1,
    completed: false,
    consecutiveIgnores: 0
  },
  {
    id: 'communication-1',
    name: 'Mensagem do Herói',
    symbolicName: 'O Portador da Palavra',
    instruction: 'Envie uma mensagem de apreço sincera para alguém que você valoriza.',
    attributeId: 'communication',
    xpValue: 15,
    estimatedTime: 2,
    completed: false,
    consecutiveIgnores: 0
  },
  {
    id: 'communication-2',
    name: 'Espelho da Eloquência',
    symbolicName: 'O Orador Sábio',
    instruction: 'Pratique falar sobre seu dia em voz alta por 1 minuto, como se estivesse contando para um amigo.',
    attributeId: 'communication',
    xpValue: 12,
    estimatedTime: 1,
    completed: false,
    consecutiveIgnores: 0
  },
  {
    id: 'self-efficacy-1',
    name: 'Conquista Relâmpago',
    symbolicName: 'O Realizador Veloz',
    instruction: 'Complete uma tarefa que você tem adiado por menos de 5 minutos.',
    attributeId: 'self-efficacy',
    xpValue: 20,
    estimatedTime: 2,
    completed: false,
    consecutiveIgnores: 0
  },
  {
    id: 'self-knowledge-1',
    name: 'Cristal da Reflexão',
    symbolicName: 'O Vidente Interior',
    instruction: 'Escreva 3 palavras que descrevem como você se sente agora e reflita sobre uma delas.',
    attributeId: 'self-knowledge',
    xpValue: 15,
    estimatedTime: 2,
    completed: false,
    consecutiveIgnores: 0
  },
  {
    id: 'strength-1',
    name: 'Postura do Titã',
    symbolicName: 'O Guardião Poderoso',
    instruction: 'Fique em pé, endireite os ombros e mantenha uma postura confiante por 30 segundos.',
    attributeId: 'strength',
    xpValue: 8,
    estimatedTime: 1,
    completed: false,
    consecutiveIgnores: 0
  },
  {
    id: 'wisdom-1',
    name: 'Pergunta do Sábio',
    symbolicName: 'O Buscador da Verdade',
    instruction: 'Faça uma pergunta profunda sobre algo que te intriga e pense na resposta por 1 minuto.',
    attributeId: 'wisdom',
    xpValue: 18,
    estimatedTime: 2,
    completed: false,
    consecutiveIgnores: 0
  }
];

export const areas: Area[] = [
  {
    id: 'well-being',
    name: 'Bem-Estar',
    description: 'O domínio do equilíbrio interior e da saúde física e mental',
    color: '#4ADE80',
    icon: '🌱',
    subAreas: [
      {
        id: 'physical-health',
        name: 'Saúde Física',
        description: 'Força corporal e vitalidade',
        color: '#10B981',
        themes: [
          {
            id: 'fitness-mastery',
            name: 'Maestria Física',
            description: 'Desenvolva força, resistência e flexibilidade',
            icon: '💪',
            journey: {
              id: 'fitness-journey',
              name: 'Jornada do Guerreiro Físico',
              description: 'Transforme seu corpo em um templo de força',
              heroStage: 'ordinary-world',
              progress: 0,
              goal: {
                id: 'fitness-goal',
                name: 'Corpo de Guerreiro',
                description: 'Alcançar condicionamento físico ideal',
                currentLevel: 1,
                totalXP: 0,
                levels: []
              }
            }
          },
          {
            id: 'nutrition-wisdom',
            name: 'Sabedoria Nutricional',
            description: 'Domine a arte da alimentação consciente',
            icon: '🥗',
            journey: {
              id: 'nutrition-journey',
              name: 'Jornada do Alquimista da Nutrição',
              description: 'Transforme alimentos em energia vital',
              heroStage: 'ordinary-world',
              progress: 0,
              goal: {
                id: 'nutrition-goal',
                name: 'Nutrição Equilibrada',
                description: 'Criar hábitos alimentares saudáveis',
                currentLevel: 1,
                totalXP: 0,
                levels: []
              }
            }
          },
          {
            id: 'sleep-restoration',
            name: 'Restauração do Sono',
            description: 'Optimize seu descanso e recuperação',
            icon: '😴',
            journey: {
              id: 'sleep-journey',
              name: 'Jornada do Mestre dos Sonhos',
              description: 'Alcançar o sono perfeito e restaurador',
              heroStage: 'ordinary-world',
              progress: 0,
              goal: {
                id: 'sleep-goal',
                name: 'Sono Reparador',
                description: 'Estabelecer ciclo de sono saudável',
                currentLevel: 1,
                totalXP: 0,
                levels: []
              }
            }
          }
        ]
      },
      {
        id: 'mental-health',
        name: 'Saúde Mental',
        description: 'Equilíbrio emocional e clareza mental',
        color: '#06B6D4',
        themes: [
          {
            id: 'emotional-intelligence',
            name: 'Inteligência Emocional',
            description: 'Domine suas emoções e as dos outros',
            icon: '❤️',
            journey: {
              id: 'emotional-journey',
              name: 'Jornada do Mestre Emocional',
              description: 'Torne-se senhor de suas emoções',
              heroStage: 'call-to-adventure',
              progress: 15,
              goal: {
                id: 'emotional-goal',
                name: 'Equilíbrio Emocional',
                description: 'Desenvolver inteligência emocional',
                currentLevel: 1,
                totalXP: 45,
                levels: []
              }
            }
          },
          {
            id: 'stress-management',
            name: 'Gestão do Stress',
            description: 'Transforme pressão em força',
            icon: '🧘',
            journey: {
              id: 'stress-journey',
              name: 'Jornada do Zen Warrior',
              description: 'Encontre paz no meio do caos',
              heroStage: 'ordinary-world',
              progress: 0,
              goal: {
                id: 'stress-goal',
                name: 'Calma Interior',
                description: 'Gerenciar stress efetivamente',
                currentLevel: 1,
                totalXP: 0,
                levels: []
              }
            }
          },
          {
            id: 'mindfulness',
            name: 'Mindfulness',
            description: 'Presença consciente no momento atual',
            icon: '🌸',
            journey: {
              id: 'mindfulness-journey',
              name: 'Jornada do Observador Consciente',
              description: 'Viva plenamente cada momento',
              heroStage: 'meeting-mentor',
              progress: 30,
              goal: {
                id: 'mindfulness-goal',
                name: 'Presença Plena',
                description: 'Cultivar mindfulness diário',
                currentLevel: 2,
                totalXP: 120,
                levels: []
              }
            }
          }
        ]
      },
      {
        id: 'relationships',
        name: 'Relacionamentos',
        description: 'Conexões humanas profundas e significativas',
        color: '#F59E0B',
        themes: [
          {
            id: 'communication-mastery',
            name: 'Maestria da Comunicação',
            description: 'Conecte-se profundamente com outros',
            icon: '💬',
            journey: {
              id: 'communication-journey',
              name: 'Jornada do Grande Comunicador',
              description: 'Torne-se um mestre da palavra e escuta',
              heroStage: 'crossing-threshold',
              progress: 25,
              goal: {
                id: 'communication-goal',
                name: 'Comunicação Efetiva',
                description: 'Melhorar habilidades de comunicação',
                currentLevel: 1,
                totalXP: 75,
                levels: []
              }
            }
          },
          {
            id: 'empathy-development',
            name: 'Desenvolvimento da Empatia',
            description: 'Compreenda e sinta com os outros',
            icon: '🤝',
            journey: {
              id: 'empathy-journey',
              name: 'Jornada do Coração Compassivo',
              description: 'Desenvolva empatia profunda',
              heroStage: 'ordinary-world',
              progress: 0,
              goal: {
                id: 'empathy-goal',
                name: 'Conexão Empática',
                description: 'Cultivar empatia e compaixão',
                currentLevel: 1,
                totalXP: 0,
                levels: []
              }
            }
          },
          {
            id: 'social-confidence',
            name: 'Confiança Social',
            description: 'Seja autêntico em qualquer situação social',
            icon: '🌟',
            journey: {
              id: 'social-journey',
              name: 'Jornada do Líder Carismático',
              description: 'Irradie confiança e autenticidade',
              heroStage: 'ordinary-world',
              progress: 0,
              goal: {
                id: 'social-goal',
                name: 'Presença Social',
                description: 'Desenvolver confiança social',
                currentLevel: 1,
                totalXP: 0,
                levels: []
              }
            }
          }
        ]
      }
    ]
  },
  {
    id: 'business',
    name: 'Business',
    description: 'O reino do empreendedorismo, liderança e prosperidade financeira',
    color: '#3B82F6',
    icon: '💼',
    subAreas: [
      {
        id: 'entrepreneurship',
        name: 'Empreendedorismo',
        description: 'Criação e crescimento de negócios',
        color: '#1D4ED8',
        themes: [
          {
            id: 'business-strategy',
            name: 'Estratégia de Negócios',
            description: 'Planeje e execute estratégias vencedoras',
            icon: '♟️',
            journey: {
              id: 'strategy-journey',
              name: 'Jornada do Estrategista Mestre',
              description: 'Torne-se um arquiteto de sucessos',
              heroStage: 'ordinary-world',
              progress: 0,
              goal: {
                id: 'strategy-goal',
                name: 'Visão Estratégica',
                description: 'Desenvolver pensamento estratégico',
                currentLevel: 1,
                totalXP: 0,
                levels: []
              }
            }
          },
          {
            id: 'innovation-mindset',
            name: 'Mentalidade Inovadora',
            description: 'Crie soluções revolucionárias',
            icon: '💡',
            journey: {
              id: 'innovation-journey',
              name: 'Jornada do Inventor Visionário',
              description: 'Transforme ideias em realidade',
              heroStage: 'call-to-adventure',
              progress: 10,
              goal: {
                id: 'innovation-goal',
                name: 'Inovação Constante',
                description: 'Cultivar mentalidade inovadora',
                currentLevel: 1,
                totalXP: 30,
                levels: []
              }
            }
          },
          {
            id: 'market-analysis',
            name: 'Análise de Mercado',
            description: 'Decodifique tendências e oportunidades',
            icon: '📊',
            journey: {
              id: 'market-journey',
              name: 'Jornada do Oráculo do Mercado',
              description: 'Preveja o futuro dos negócios',
              heroStage: 'ordinary-world',
              progress: 0,
              goal: {
                id: 'market-goal',
                name: 'Inteligência de Mercado',
                description: 'Dominar análise de mercado',
                currentLevel: 1,
                totalXP: 0,
                levels: []
              }
            }
          }
        ]
      },
      {
        id: 'leadership',
        name: 'Liderança',
        description: 'Inspiração e orientação de pessoas',
        color: '#2563EB',
        themes: [
          {
            id: 'team-building',
            name: 'Construção de Equipes',
            description: 'Una pessoas em torno de uma visão',
            icon: '👥',
            journey: {
              id: 'team-journey',
              name: 'Jornada do Grande Unificador',
              description: 'Forme equipes extraordinárias',
              heroStage: 'ordinary-world',
              progress: 0,
              goal: {
                id: 'team-goal',
                name: 'Liderança de Equipe',
                description: 'Desenvolver habilidades de liderança',
                currentLevel: 1,
                totalXP: 0,
                levels: []
              }
            }
          },
          {
            id: 'decision-making',
            name: 'Tomada de Decisão',
            description: 'Decida com sabedoria sob pressão',
            icon: '⚖️',
            journey: {
              id: 'decision-journey',
              name: 'Jornada do Juiz Sábio',
              description: 'Torne-se um decisor excepcional',
              heroStage: 'ordinary-world',
              progress: 0,
              goal: {
                id: 'decision-goal',
                name: 'Decisões Sábias',
                description: 'Melhorar tomada de decisão',
                currentLevel: 1,
                totalXP: 0,
                levels: []
              }
            }
          },
          {
            id: 'influence-persuasion',
            name: 'Influência e Persuasão',
            description: 'Inspire ação através da palavra',
            icon: '🎭',
            journey: {
              id: 'influence-journey',
              name: 'Jornada do Persuasor Ético',
              description: 'Influencie positivamente o mundo',
              heroStage: 'ordinary-world',
              progress: 0,
              goal: {
                id: 'influence-goal',
                name: 'Influência Positiva',
                description: 'Desenvolver capacidade de influência',
                currentLevel: 1,
                totalXP: 0,
                levels: []
              }
            }
          }
        ]
      },
      {
        id: 'financial-intelligence',
        name: 'Inteligência Financeira',
        description: 'Gestão e multiplicação de recursos',
        color: '#1E40AF',
        themes: [
          {
            id: 'investment-strategy',
            name: 'Estratégia de Investimento',
            description: 'Multiplique seu patrimônio inteligentemente',
            icon: '📈',
            journey: {
              id: 'investment-journey',
              name: 'Jornada do Alquimista Financeiro',
              description: 'Transforme dinheiro em mais dinheiro',
              heroStage: 'ordinary-world',
              progress: 0,
              goal: {
                id: 'investment-goal',
                name: 'Crescimento Patrimonial',
                description: 'Desenvolver estratégias de investimento',
                currentLevel: 1,
                totalXP: 0,
                levels: []
              }
            }
          },
          {
            id: 'budgeting-mastery',
            name: 'Maestria Orçamentária',
            description: 'Controle total sobre suas finanças',
            icon: '💰',
            journey: {
              id: 'budget-journey',
              name: 'Jornada do Guardião do Tesouro',
              description: 'Proteja e organize sua riqueza',
              heroStage: 'call-to-adventure',
              progress: 20,
              goal: {
                id: 'budget-goal',
                name: 'Controle Financeiro',
                description: 'Dominar gestão de orçamento',
                currentLevel: 1,
                totalXP: 60,
                levels: []
              }
            }
          },
          {
            id: 'passive-income',
            name: 'Renda Passiva',
            description: 'Crie fluxos de renda automáticos',
            icon: '🌊',
            journey: {
              id: 'passive-journey',
              name: 'Jornada do Arquiteto da Abundância',
              description: 'Construa rios de renda passiva',
              heroStage: 'ordinary-world',
              progress: 0,
              goal: {
                id: 'passive-goal',
                name: 'Independência Financeira',
                description: 'Criar fontes de renda passiva',
                currentLevel: 1,
                totalXP: 0,
                levels: []
              }
            }
          }
        ]
      }
    ]
  },
  {
    id: 'mastery',
    name: 'Maestria',
    description: 'O caminho do aprendizado contínuo e excelência pessoal',
    color: '#A855F7',
    icon: '🎯',
    subAreas: [
      {
        id: 'skills-development',
        name: 'Desenvolvimento de Habilidades',
        description: 'Aprimoramento técnico e profissional',
        color: '#9333EA',
        themes: [
          {
            id: 'technical-mastery',
            name: 'Maestria Técnica',
            description: 'Domine ferramentas e tecnologias',
            icon: '🔧',
            journey: {
              id: 'technical-journey',
              name: 'Jornada do Artífice Digital',
              description: 'Torne-se mestre das ferramentas',
              heroStage: 'tests-allies-enemies',
              progress: 40,
              goal: {
                id: 'technical-goal',
                name: 'Excelência Técnica',
                description: 'Desenvolver habilidades técnicas',
                currentLevel: 2,
                totalXP: 180,
                levels: []
              }
            }
          },
          {
            id: 'creative-expression',
            name: 'Expressão Criativa',
            description: 'Libere sua criatividade única',
            icon: '🎨',
            journey: {
              id: 'creative-journey',
              name: 'Jornada do Artista Visionário',
              description: 'Expresse sua alma através da arte',
              heroStage: 'ordinary-world',
              progress: 0,
              goal: {
                id: 'creative-goal',
                name: 'Criatividade Florescente',
                description: 'Desenvolver expressão criativa',
                currentLevel: 1,
                totalXP: 0,
                levels: []
              }
            }
          },
          {
            id: 'problem-solving',
            name: 'Resolução de Problemas',
            description: 'Encontre soluções elegantes para qualquer desafio',
            icon: '🧩',
            journey: {
              id: 'problem-journey',
              name: 'Jornada do Solucionador Épico',
              description: 'Transforme problemas em oportunidades',
              heroStage: 'meeting-mentor',
              progress: 25,
              goal: {
                id: 'problem-goal',
                name: 'Pensamento Analítico',
                description: 'Aprimorar resolução de problemas',
                currentLevel: 1,
                totalXP: 90,
                levels: []
              }
            }
          }
        ]
      },
      {
        id: 'learning-optimization',
        name: 'Otimização do Aprendizado',
        description: 'Métodos eficazes de aquisição de conhecimento',
        color: '#7C3AED',
        themes: [
          {
            id: 'memory-techniques',
            name: 'Técnicas de Memória',
            description: 'Transforme sua mente em uma biblioteca',
            icon: '🧠',
            journey: {
              id: 'memory-journey',
              name: 'Jornada do Arquivista Mental',
              description: 'Desbloqueie o poder total da memória',
              heroStage: 'approach-ordeal',
              progress: 60,
              goal: {
                id: 'memory-goal',
                name: 'Memória Excepcional',
                description: 'Desenvolver técnicas de memorização',
                currentLevel: 3,
                totalXP: 220,
                levels: []
              }
            }
          },
          {
            id: 'speed-learning',
            name: 'Aprendizagem Acelerada',
            description: 'Absorva conhecimento em velocidade máxima',
            icon: '⚡',
            journey: {
              id: 'speed-journey',
              name: 'Jornada do Devorador de Conhecimento',
              description: 'Aprenda qualquer coisa rapidamente',
              heroStage: 'ordinary-world',
              progress: 0,
              goal: {
                id: 'speed-goal',
                name: 'Aprendizado Eficiente',
                description: 'Acelerar processo de aprendizagem',
                currentLevel: 1,
                totalXP: 0,
                levels: []
              }
            }
          },
          {
            id: 'critical-thinking',
            name: 'Pensamento Crítico',
            description: 'Analise informações com precisão cirúrgica',
            icon: '🔍',
            journey: {
              id: 'critical-journey',
              name: 'Jornada do Detective da Verdade',
              description: 'Descubra a verdade em qualquer situação',
              heroStage: 'ordinary-world',
              progress: 0,
              goal: {
                id: 'critical-goal',
                name: 'Análise Crítica',
                description: 'Desenvolver pensamento crítico',
                currentLevel: 1,
                totalXP: 0,
                levels: []
              }
            }
          }
        ]
      },
      {
        id: 'personal-excellence',
        name: 'Excelência Pessoal',
        description: 'Busca contínua pela melhor versão de si mesmo',
        color: '#6D28D9',
        themes: [
          {
            id: 'self-discipline',
            name: 'Autodisciplina',
            description: 'Domine a arte do autocontrole',
            icon: '🥋',
            journey: {
              id: 'discipline-journey',
              name: 'Jornada do Monge Guerreiro',
              description: 'Conquiste a si mesmo primeiro',
              heroStage: 'reward',
              progress: 70,
              goal: {
                id: 'discipline-goal',
                name: 'Disciplina Férrea',
                description: 'Desenvolver autodisciplina',
                currentLevel: 3,
                totalXP: 280,
                levels: []
              }
            }
          },
          {
            id: 'goal-achievement',
            name: 'Conquista de Objetivos',
            description: 'Transforme sonhos em realidade',
            icon: '🏆',
            journey: {
              id: 'goal-journey',
              name: 'Jornada do Conquistador de Sonhos',
              description: 'Realize todos os seus objetivos',
              heroStage: 'road-back',
              progress: 80,
              goal: {
                id: 'goal-goal',
                name: 'Realizador de Sonhos',
                description: 'Alcançar objetivos sistematicamente',
                currentLevel: 4,
                totalXP: 350,
                levels: []
              }
            }
          },
          {
            id: 'continuous-improvement',
            name: 'Melhoria Contínua',
            description: 'Evolua 1% todos os dias',
            icon: '📈',
            journey: {
              id: 'improvement-journey',
              name: 'Jornada do Evolucionista Perpétuo',
              description: 'Nunca pare de evoluir',
              heroStage: 'return-elixir',
              progress: 95,
              goal: {
                id: 'improvement-goal',
                name: 'Evolução Constante',
                description: 'Implementar melhoria contínua',
                currentLevel: 5,
                totalXP: 450,
                levels: []
              }
            }
          }
        ]
      }
    ]
  }
];
