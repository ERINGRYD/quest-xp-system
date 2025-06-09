
import { EmotionalClimate, ClimateData, UserMood, DailySymbolicMessage } from '@/types/quest';

export const climateDatabase: Record<EmotionalClimate, ClimateData> = {
  'clear-sky': {
    climate: 'clear-sky',
    icon: '☀️',
    name: 'Céu Claro',
    message: 'Sua mente está cristalina, aproveitando o momento de clareza.',
    idealTaskTypes: ['Planejamento', 'Criatividade', 'Aprendizado'],
    color: '#FCD34D'
  },
  'inner-rain': {
    climate: 'inner-rain',
    icon: '🌧️',
    name: 'Chuva Interior',
    message: 'As águas interiores limpam e renovam sua alma.',
    idealTaskTypes: ['Reflexão', 'Autocuidado', 'Meditação'],
    color: '#60A5FA'
  },
  'mind-storm': {
    climate: 'mind-storm',
    icon: '🌪️',
    name: 'Tempestade Mental',
    message: 'A tempestade traz transformação, abraçe o caos criativo.',
    idealTaskTypes: ['Exercício Físico', 'Reorganização', 'Descarga Emocional'],
    color: '#A78BFA'
  },
  'snow': {
    climate: 'snow',
    icon: '❄️',
    name: 'Neve',
    message: 'O silêncio da neve convida à pausa e contemplação.',
    idealTaskTypes: ['Descanso', 'Leitura', 'Contemplação'],
    color: '#E5E7EB'
  },
  'fog': {
    climate: 'fog',
    icon: '🌫️',
    name: 'Nevoeiro',
    message: 'Entre as brumas, confie em seus instintos para encontrar o caminho.',
    idealTaskTypes: ['Pequenos Passos', 'Rotina Simples', 'Orientação'],
    color: '#9CA3AF'
  },
  'scorching-sun': {
    climate: 'scorching-sun',
    icon: '🔥',
    name: 'Sol Escaldante',
    message: 'A intensidade do fogo interior pede canalização sábia.',
    idealTaskTypes: ['Ação Direcionada', 'Resolução de Conflitos', 'Liderança'],
    color: '#F97316'
  },
  'alignment': {
    climate: 'alignment',
    icon: '🌈',
    name: 'Alinhamento',
    message: 'Todas as cores da sua essência dançam em harmonia perfeita.',
    idealTaskTypes: ['Integração', 'Celebração', 'Compartilhamento'],
    color: '#EC4899'
  }
};

export const calculateEmotionalClimate = (
  recentMoods: UserMood[],
  completedTasks: number,
  negligectedTasks: number,
  activeStreaks: number
): EmotionalClimate => {
  const avgMood = recentMoods.length > 0 
    ? recentMoods.reduce((sum, mood) => sum + mood.level, 0) / recentMoods.length 
    : 5;
  
  const taskRatio = completedTasks / Math.max(completedTasks + negligectedTasks, 1);
  const overallScore = (avgMood / 10) * 0.6 + taskRatio * 0.3 + (activeStreaks / 10) * 0.1;

  // Determine climate based on mood and performance patterns
  if (overallScore >= 0.85 && avgMood >= 8) return 'alignment';
  if (overallScore >= 0.7 && avgMood >= 7) return 'clear-sky';
  if (avgMood >= 7 && taskRatio < 0.5) return 'scorching-sun';
  if (avgMood <= 4 && negligectedTasks > 5) return 'mind-storm';
  if (avgMood <= 3) return 'inner-rain';
  if (taskRatio < 0.3 && avgMood < 6) return 'fog';
  if (avgMood < 5 && overallScore < 0.4) return 'snow';
  
  return 'clear-sky'; // default
};

export const generateSymbolicMessage = (
  climate: EmotionalClimate,
  recentXP: number,
  activeHabits: number,
  negligectedTasks: number,
  mood: number
): DailySymbolicMessage => {
  const climateData = climateDatabase[climate];
  let message = '';
  let tone: DailySymbolicMessage['tone'] = 'motivational';

  switch (climate) {
    case 'clear-sky':
      if (recentXP > 50) {
        message = '🌟 O sol dourado da sua determinação ilumina cada conquista. Continue brilhando, guerreiro da luz.';
        tone = 'celebratory';
      } else {
        message = '☀️ Seu céu interior está limpo e pronto para novas aventuras. Que missão escolherá hoje?';
        tone = 'motivational';
      }
      break;

    case 'inner-rain':
      message = '🌧️ As gotas da introspecção lavam antigas feridas. Permita-se sentir, curar e renascer mais forte.';
      tone = 'reflective';
      break;

    case 'mind-storm':
      if (negligectedTasks > 3) {
        message = '🌪️ A tempestade interior clama por ação. Canalize essa energia em uma única tarefa poderosa.';
        tone = 'challenging';
      } else {
        message = '⚡ O raio da transformação corta o céu da sua alma. Grande mudança se aproxima.';
        tone = 'motivational';
      }
      break;

    case 'snow':
      message = '❄️ No silêncio branco da pausa, sua sabedoria interior sussurra verdades importantes. Escute.';
      tone = 'reflective';
      break;

    case 'fog':
      message = '🌫️ Entre as brumas da incerteza, seus passos ganham significado. Um de cada vez, herói.';
      tone = 'motivational';
      break;

    case 'scorching-sun':
      message = '🔥 O fogo da paixão arde em você. Use essa chama para forjar o futuro que deseja.';
      tone = 'challenging';
      break;

    case 'alignment':
      message = '🌈 Todas as suas forças interiores dançam em perfeita harmonia. Você está no seu poder pleno.';
      tone = 'celebratory';
      break;
  }

  return {
    id: `msg-${Date.now()}`,
    date: new Date(),
    climate,
    message,
    tone,
    basedOn: {
      recentXP,
      activeHabits,
      negligectedTasks,
      mood
    }
  };
};
