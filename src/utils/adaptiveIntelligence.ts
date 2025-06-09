
import { 
  AdaptiveSuggestion, 
  UserPattern, 
  Task, 
  Habit, 
  Attribute, 
  PersonalCycle, 
  CycleTemplate 
} from '@/types/quest';

export const analyzeUserPatterns = (
  tasks: Task[],
  habits: Habit[],
  attributes: Attribute[]
): UserPattern => {
  const completedTasks = tasks.filter(t => t.completed);
  const totalTasks = tasks.length;
  
  // Analyze completion rates by attribute
  const completionRateByAttribute: Record<string, number> = {};
  attributes.forEach(attr => {
    const attrTasks = tasks.filter(t => t.attributeId === attr.id);
    const attrCompleted = attrTasks.filter(t => t.completed);
    completionRateByAttribute[attr.id] = attrTasks.length > 0 
      ? attrCompleted.length / attrTasks.length 
      : 0;
  });

  // Analyze habit consistency
  const habitConsistency: Record<string, number> = {};
  habits.forEach(habit => {
    // Simplified consistency calculation based on streak
    habitConsistency[habit.id] = Math.min(habit.streak / 7, 1); // normalized to 0-1
  });

  // Identify struggling and strong areas
  const strugglingAreas = attributes
    .filter(attr => completionRateByAttribute[attr.id] < 0.3)
    .map(attr => attr.id);
    
  const strongAreas = attributes
    .filter(attr => completionRateByAttribute[attr.id] > 0.7)
    .map(attr => attr.id);

  return {
    completionRateByAttribute,
    habitConsistency,
    preferredTaskTypes: ['quick-win', 'creative', 'learning'], // simplified
    peakPerformanceTimes: ['morning', 'evening'], // simplified
    strugglingAreas,
    strongAreas,
    averageXPPerDay: completedTasks.length > 0 
      ? completedTasks.reduce((sum, t) => sum + t.xpValue, 0) / 7 
      : 0,
    longestStreak: Math.max(...habits.map(h => h.streak), 0)
  };
};

export const generateAdaptiveSuggestions = (
  patterns: UserPattern,
  attributes: Attribute[],
  habits: Habit[]
): AdaptiveSuggestion[] => {
  const suggestions: AdaptiveSuggestion[] = [];

  // 1. Suggest new goals based on strong areas
  if (patterns.strongAreas.length > 0) {
    const strongAttr = attributes.find(a => a.id === patterns.strongAreas[0]);
    if (strongAttr) {
      suggestions.push({
        id: `goal-${Date.now()}`,
        type: 'new-goal',
        title: `Expandir Maestria em ${strongAttr.name}`,
        symbolicName: getSymbolicGoalName(strongAttr.name),
        description: `Aprofunde ainda mais sua força natural em ${strongAttr.name}`,
        purpose: `Transformar uma força existente em verdadeira maestria`,
        reasoning: `Você tem ${Math.round(patterns.completionRateByAttribute[strongAttr.id] * 100)}% de conclusão nesta área`,
        confidence: 85,
        initialTasks: generateInitialTasks(strongAttr.id),
        createdAt: new Date(),
        status: 'pending'
      });
    }
  }

  // 2. Identify low-adherence habits and suggest improvements
  Object.entries(patterns.habitConsistency).forEach(([habitId, consistency]) => {
    if (consistency < 0.3) {
      const habit = habits.find(h => h.id === habitId);
      if (habit) {
        // Suggest simplification
        suggestions.push({
          id: `simplify-${habitId}`,
          type: 'habit-simplification',
          title: `Simplificar: ${habit.name}`,
          symbolicName: `${habit.name} - Versão Essencial`,
          description: `Uma versão mais simples e sustentável do hábito`,
          purpose: `Criar consistência através da simplicidade`,
          reasoning: `Consistência atual: ${Math.round(consistency * 100)}%`,
          confidence: 75,
          originalHabitId: habitId,
          simplifiedVersion: createSimplifiedHabit(habit),
          createdAt: new Date(),
          status: 'pending'
        });

        // Suggest alternative approach
        suggestions.push({
          id: `alternative-${habitId}`,
          type: 'habit-alternative',
          title: `Alternativa: ${habit.name}`,
          symbolicName: `${habit.name} - Novo Caminho`,
          description: `Uma abordagem diferente para o mesmo objetivo`,
          purpose: `Encontrar um método mais alinhado com seu estilo`,
          reasoning: `Baixa adesão pode indicar incompatibilidade de método`,
          confidence: 70,
          originalHabitId: habitId,
          alternativeVersion: createAlternativeHabit(habit),
          createdAt: new Date(),
          status: 'pending'
        });
      }
    }
  });

  return suggestions;
};

const getSymbolicGoalName = (attributeName: string): string => {
  const symbolicNames: Record<string, string[]> = {
    'physical-strength': ['Forja do Corpo', 'Templo da Força', 'Reino da Vitalidade'],
    'mental-clarity': ['Lâmina da Mente', 'Cristal do Pensamento', 'Torre da Clareza'],
    'emotional-intelligence': ['Coração Sábio', 'Rio das Emoções', 'Jardim Interior'],
    'self-knowledge': ['Espelho da Alma', 'Caverna do Ser', 'Chama Interior'],
    'leadership': ['Trono da Influência', 'Bastão do Líder', 'Farol da Direção'],
    'creativity': ['Caldeirão da Criação', 'Prisma da Imaginação', 'Fonte da Arte']
  };

  const names = symbolicNames[attributeName] || ['Jornada do Crescimento'];
  return names[Math.floor(Math.random() * names.length)];
};

const generateInitialTasks = (attributeId: string): Task[] => {
  return [
    {
      id: `init-task-${Date.now()}-1`,
      name: 'Reflexão sobre Forças',
      symbolicName: 'contemplacao-inicial',
      instruction: 'Reflita sobre seus pontos fortes nesta área e defina próximos desafios',
      attributeId,
      xpValue: 25,
      estimatedTime: 15,
      completed: false,
      consecutiveIgnores: 0
    },
    {
      id: `init-task-${Date.now()}-2`,
      name: 'Pequeno Experimento',
      symbolicName: 'primeiro-passo',
      instruction: 'Teste uma nova abordagem ou técnica nesta área',
      attributeId,
      xpValue: 30,
      estimatedTime: 20,
      completed: false,
      consecutiveIgnores: 0
    }
  ];
};

const createSimplifiedHabit = (originalHabit: Habit): Habit => {
  return {
    ...originalHabit,
    id: `${originalHabit.id}-simplified`,
    name: `${originalHabit.name} - Simples`,
    description: `Versão simplificada: ${originalHabit.description}`,
    xpValue: Math.max(Math.floor(originalHabit.xpValue * 0.6), 5),
    streak: 0,
    subHabits: originalHabit.subHabits?.slice(0, 1) // Keep only first sub-habit
  };
};

const createAlternativeHabit = (originalHabit: Habit): Habit => {
  const alternatives: Record<string, string> = {
    'exercitar': 'caminhada matinal',
    'meditar': 'respiração consciente',
    'ler': 'escutar audiobook',
    'escrever': 'gravar áudio-diário'
  };

  const altName = alternatives[originalHabit.name.toLowerCase()] || `${originalHabit.name} - Alternativo`;

  return {
    ...originalHabit,
    id: `${originalHabit.id}-alternative`,
    name: altName,
    description: `Abordagem alternativa para: ${originalHabit.description}`,
    streak: 0
  };
};

export const cycleTemplates: CycleTemplate[] = [
  {
    id: 'clarity-cycle',
    name: 'Ciclo da Clareza',
    symbolicNames: ['Clareza Brutal', 'Lâmina da Verdade', 'Espelho Cristalino'],
    description: 'Período focado em autodescoberta e definição de direção',
    dominantEmotions: ['determinação', 'foco', 'introspecção'],
    suggestedDuration: 30,
    icon: '🔍',
    color: '#3B82F6'
  },
  {
    id: 'transformation-cycle',
    name: 'Ciclo da Transformação',
    symbolicNames: ['Metamorfose Profunda', 'Fogo da Mudança', 'Nascimento do Novo'],
    description: 'Período de mudanças intensas e crescimento acelerado',
    dominantEmotions: ['coragem', 'ansiedade', 'expectativa'],
    suggestedDuration: 45,
    icon: '🔥',
    color: '#F59E0B'
  },
  {
    id: 'integration-cycle',
    name: 'Ciclo da Integração',
    symbolicNames: ['Harmonia das Partes', 'Dança do Equilíbrio', 'União dos Opostos'],
    description: 'Período de consolidação e harmonização de conquistas',
    dominantEmotions: ['paz', 'gratidão', 'realização'],
    suggestedDuration: 60,
    icon: '🌈',
    color: '#10B981'
  }
];

export const generatePersonalCycle = (
  template: CycleTemplate,
  customization: {
    symbolicName?: string;
    intention?: string;
    startDate?: Date;
    duration?: number;
  }
): PersonalCycle => {
  const startDate = customization.startDate || new Date();
  const duration = customization.duration || template.suggestedDuration;
  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + duration);

  return {
    id: `cycle-${Date.now()}`,
    name: template.name,
    symbolicName: customization.symbolicName || 
      template.symbolicNames[Math.floor(Math.random() * template.symbolicNames.length)],
    startDate,
    endDate,
    dominantEmotion: template.dominantEmotions[0],
    journeyStage: 'ordinary-world', // Will be updated based on progress
    intention: customization.intention || `Explorar ${template.description.toLowerCase()}`,
    color: template.color,
    icon: template.icon,
    description: template.description,
    active: true
  };
};
