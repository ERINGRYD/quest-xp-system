import { useState, useEffect } from 'react';
import { areas, attributes, quickTasks } from '@/data/questData';
import { createHeroJourney } from '@/data/heroJourney';
import { calculateEmotionalClimate, generateSymbolicMessage } from '@/utils/emotionalClimate';
import { AreaOverview } from './AreaOverview';
import { AttributeCard } from './AttributeCard';
import { QuickTaskCard } from './QuickTaskCard';
import { EmotionalClimateCard } from './EmotionalClimate';
import { HeroJourneyCard } from './HeroJourneyCard';
import { DailySymbolicMessageCard } from './DailySymbolicMessage';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Zap, Target, Sword, Compass, Map, Scroll } from 'lucide-react';
import { UserMood, HeroPhase, DailySymbolicMessage, EmotionalClimate } from '@/types/quest';

export const QuestDashboard = () => {
  const [tasks, setTasks] = useState(quickTasks);
  const [playerAttributes, setPlayerAttributes] = useState(attributes);
  const [currentMood, setCurrentMood] = useState<number>(7);
  const [recentMoods, setRecentMoods] = useState<UserMood[]>([
    { date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), level: 6 },
    { date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), level: 7 },
    { date: new Date(), level: 7 }
  ]);
  
  // Hero Journey for Emotional Intelligence theme (example)
  const [heroPhases, setHeroPhases] = useState<HeroPhase[]>(() => 
    createHeroJourney('emotional-intelligence')
  );
  
  // Calculate current emotional climate
  const completedTasksCount = tasks.filter(t => t.completed).length;
  const negligectedTasksCount = tasks.filter(t => t.consecutiveIgnores > 0).length;
  const activeStreaks = playerAttributes.reduce((sum, attr) => sum + attr.level, 0);
  
  const currentClimate: EmotionalClimate = calculateEmotionalClimate(
    recentMoods,
    completedTasksCount,
    negligectedTasksCount,
    activeStreaks
  );

  // Generate daily symbolic message
  const [dailyMessage, setDailyMessage] = useState<DailySymbolicMessage>(() =>
    generateSymbolicMessage(
      currentClimate,
      playerAttributes.reduce((sum, attr) => sum + attr.currentXP, 0),
      3, // active habits
      negligectedTasksCount,
      currentMood
    )
  );

  const handleTaskComplete = (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    // Mark task as completed
    setTasks(prev => prev.map(t => 
      t.id === taskId 
        ? { ...t, completed: true, completedAt: new Date(), consecutiveIgnores: 0 }
        : t
    ));

    // Add XP to corresponding attribute
    setPlayerAttributes(prev => prev.map(attr => 
      attr.id === task.attributeId
        ? { 
            ...attr, 
            currentXP: attr.currentXP + task.xpValue,
            level: attr.currentXP + task.xpValue >= attr.nextLevelXP ? attr.level + 1 : attr.level
          }
        : attr
    ));

    console.log(`🎉 Tarefa "${task.name}" concluída! +${task.xpValue} XP em ${task.attributeId}`);
  };

  const handlePhaseTaskComplete = (taskId: string) => {
    setHeroPhases(prev => prev.map(phase => 
      phase.miniTask.id === taskId
        ? { 
            ...phase, 
            miniTask: { ...phase.miniTask, completed: true, completedAt: new Date() }
          }
        : phase
    ));
    
    // Add XP to self-knowledge attribute
    const xpValue = heroPhases.find(p => p.miniTask.id === taskId)?.miniTask.xpValue || 0;
    setPlayerAttributes(prev => prev.map(attr => 
      attr.id === 'self-knowledge'
        ? { 
            ...attr, 
            currentXP: attr.currentXP + xpValue,
            level: attr.currentXP + xpValue >= attr.nextLevelXP ? attr.level + 1 : attr.level
          }
        : attr
    ));
  };

  const handlePhaseComplete = (phaseId: string) => {
    setHeroPhases(prev => prev.map(phase => 
      phase.id === phaseId
        ? { ...phase, completed: true, unlockedAt: new Date() }
        : phase
    ));
  };

  const updateMood = (newMood: number) => {
    setCurrentMood(newMood);
    setRecentMoods(prev => [
      ...prev.slice(-2),
      { date: new Date(), level: newMood }
    ]);
  };

  const totalXP = playerAttributes.reduce((sum, attr) => sum + attr.currentXP, 0);
  const averageLevel = Math.round(playerAttributes.reduce((sum, attr) => sum + attr.level, 0) / playerAttributes.length);
  const completedTasks = tasks.filter(t => t.completed).length;

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Sistema de XP Quest
          </h1>
          <p className="text-lg text-muted-foreground">
            Transforme sua vida em uma jornada épica de crescimento pessoal
          </p>
          
          <div className="flex justify-center gap-6">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-primary" />
              <span className="font-semibold">{totalXP} XP Total</span>
            </div>
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-accent" />
              <span className="font-semibold">Nível {averageLevel} Médio</span>
            </div>
            <div className="flex items-center gap-2">
              <Sword className="w-5 h-5 text-area-mastery" />
              <span className="font-semibold">{completedTasks} Tarefas Completas</span>
            </div>
          </div>
        </div>

        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="climate">Clima Interior</TabsTrigger>
            <TabsTrigger value="hero-journey">Jornada do Herói</TabsTrigger>
            <TabsTrigger value="attributes">Atributos</TabsTrigger>
            <TabsTrigger value="quick-tasks">Tarefas Rápidas</TabsTrigger>
            <TabsTrigger value="areas">Áreas & Jornadas</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            {/* Daily Message */}
            <DailySymbolicMessageCard message={dailyMessage} />

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <EmotionalClimateCard climate={currentClimate} className="md:col-span-1" />
              {playerAttributes.slice(0, 3).map((attribute) => (
                <AttributeCard key={attribute.id} attribute={attribute} />
              ))}
            </div>

            {/* Recent Quick Tasks */}
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Zap className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-semibold">Tarefas Rápidas Disponíveis</h2>
                <Badge variant="secondary">{tasks.filter(t => !t.completed).length} pendentes</Badge>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tasks.filter(t => !t.completed).slice(0, 4).map((task) => {
                  const attribute = playerAttributes.find(a => a.id === task.attributeId);
                  return (
                    <QuickTaskCard
                      key={task.id}
                      task={task}
                      attributeName={attribute?.name || ''}
                      attributeColor={attribute?.color || '#888'}
                      onComplete={handleTaskComplete}
                    />
                  );
                })}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="climate" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <EmotionalClimateCard climate={currentClimate} />
              
              <Card className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Compass className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-semibold">Registrar Humor</h3>
                </div>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Como você se sente hoje? (1-10)
                  </p>
                  <div className="grid grid-cols-5 gap-2">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((mood) => (
                      <Button
                        key={mood}
                        variant={currentMood === mood ? "default" : "outline"}
                        size="sm"
                        onClick={() => updateMood(mood)}
                        className="h-8"
                      >
                        {mood}
                      </Button>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Humor atual: {currentMood}/10
                  </p>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="hero-journey" className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Map className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-semibold">Jornada do Herói: Inteligência Emocional</h2>
              </div>
              <p className="text-muted-foreground mb-6">
                Siga as 6 fases da jornada para desenvolver sua mestria emocional
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {heroPhases.map((phase, index) => {
                  const isUnlocked = index === 0 || heroPhases[index - 1]?.completed;
                  return (
                    <HeroJourneyCard
                      key={phase.id}
                      phase={phase}
                      isUnlocked={isUnlocked}
                      onCompleteTask={handlePhaseTaskComplete}
                      onCompletePhase={handlePhaseComplete}
                    />
                  );
                })}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="attributes" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {playerAttributes.map((attribute) => (
                <AttributeCard key={attribute.id} attribute={attribute} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="quick-tasks" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tasks.map((task) => {
                const attribute = playerAttributes.find(a => a.id === task.attributeId);
                return (
                  <QuickTaskCard
                    key={task.id}
                    task={task}
                    attributeName={attribute?.name || ''}
                    attributeColor={attribute?.color || '#888'}
                    onComplete={handleTaskComplete}
                  />
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="areas" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {areas.map((area) => (
                <AreaOverview
                  key={area.id}
                  area={area}
                  onClick={() => console.log(`Explorando ${area.name}`)}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
