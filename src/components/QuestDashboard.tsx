
import { useState } from 'react';
import { areas, attributes, quickTasks } from '@/data/questData';
import { AreaOverview } from './AreaOverview';
import { AttributeCard } from './AttributeCard';
import { QuickTaskCard } from './QuickTaskCard';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Zap, Target, Sword } from 'lucide-react';

export const QuestDashboard = () => {
  const [tasks, setTasks] = useState(quickTasks);
  const [playerAttributes, setPlayerAttributes] = useState(attributes);

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
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="attributes">Atributos</TabsTrigger>
            <TabsTrigger value="quick-tasks">Tarefas Rápidas</TabsTrigger>
            <TabsTrigger value="areas">Áreas & Jornadas</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

            {/* Areas Overview */}
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Target className="w-5 h-5 text-accent" />
                <h2 className="text-xl font-semibold">Áreas de Desenvolvimento</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {areas.map((area) => (
                  <AreaOverview
                    key={area.id}
                    area={area}
                    onClick={() => console.log(`Navegando para ${area.name}`)}
                  />
                ))}
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
