
import { HeroPhase } from '@/types/quest';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Circle, Lock, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HeroJourneyCardProps {
  phase: HeroPhase;
  isUnlocked: boolean;
  onCompleteTask: (taskId: string) => void;
  onCompletePhase: (phaseId: string) => void;
}

export const HeroJourneyCard = ({ 
  phase, 
  isUnlocked, 
  onCompleteTask, 
  onCompletePhase 
}: HeroJourneyCardProps) => {
  const handleCompleteTask = () => {
    onCompleteTask(phase.miniTask.id);
    if (!phase.completed) {
      onCompletePhase(phase.id);
    }
  };

  return (
    <Card className={cn(
      "p-4 transition-all duration-300",
      !isUnlocked && "opacity-50 bg-muted/30",
      phase.completed && "border-primary bg-primary/5"
    )}>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              {phase.completed ? (
                <CheckCircle className="w-5 h-5 text-primary" />
              ) : isUnlocked ? (
                <Circle className="w-5 h-5 text-muted-foreground" />
              ) : (
                <Lock className="w-5 h-5 text-muted-foreground" />
              )}
              <h3 className="font-semibold">{phase.name}</h3>
            </div>
            <p className="text-sm text-muted-foreground">{phase.description}</p>
          </div>
          
          {phase.completed && (
            <Badge variant="secondary" className="flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              Completa
            </Badge>
          )}
        </div>

        {/* Symbolic Meaning */}
        <div className="bg-accent/20 p-3 rounded-lg">
          <p className="text-sm italic text-accent-foreground">
            ✨ {phase.symbolicMeaning}
          </p>
        </div>

        {/* Mini Task */}
        {isUnlocked && (
          <div className="space-y-3">
            <div className="border-l-2 border-primary/30 pl-4 space-y-2">
              <h4 className="font-medium text-sm">Mini-Tarefa: {phase.miniTask.name}</h4>
              <p className="text-sm text-muted-foreground">{phase.miniTask.instruction}</p>
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="text-xs">
                  +{phase.miniTask.xpValue} XP
                </Badge>
                <Button
                  onClick={handleCompleteTask}
                  disabled={phase.miniTask.completed}
                  size="sm"
                  variant={phase.miniTask.completed ? "outline" : "default"}
                >
                  {phase.miniTask.completed ? "Concluída" : "Completar"}
                </Button>
              </div>
            </div>

            {/* Reflection & Ritual */}
            <details className="text-sm">
              <summary className="cursor-pointer font-medium text-primary hover:underline">
                Reflexão e Ritual
              </summary>
              <div className="mt-2 space-y-2 pl-4">
                <div>
                  <p className="font-medium text-xs text-muted-foreground uppercase tracking-wide">
                    Reflexão
                  </p>
                  <p className="text-sm">{phase.reflection}</p>
                </div>
                <div>
                  <p className="font-medium text-xs text-muted-foreground uppercase tracking-wide">
                    Ritual de Transição
                  </p>
                  <p className="text-sm">{phase.ritual}</p>
                </div>
              </div>
            </details>
          </div>
        )}
      </div>
    </Card>
  );
};
