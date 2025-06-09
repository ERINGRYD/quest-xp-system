
import { useState } from 'react';
import { Task } from '@/types/quest';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Star, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

interface QuickTaskCardProps {
  task: Task;
  attributeName: string;
  attributeColor: string;
  onComplete: (taskId: string) => void;
}

export const QuickTaskCard = ({ task, attributeName, attributeColor, onComplete }: QuickTaskCardProps) => {
  const [isCompleting, setIsCompleting] = useState(false);

  const handleComplete = async () => {
    setIsCompleting(true);
    setTimeout(() => {
      onComplete(task.id);
      setIsCompleting(false);
    }, 500);
  };

  return (
    <Card className={cn(
      "quest-card transition-all duration-300",
      task.completed && "opacity-60 scale-95",
      isCompleting && "animate-pulse"
    )}>
      <div className="space-y-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h3 className="font-semibold text-foreground">{task.name}</h3>
            <p className="text-sm text-muted-foreground italic">{task.symbolicName}</p>
          </div>
          <Badge 
            variant="secondary" 
            className="flex items-center gap-1"
            style={{ backgroundColor: `${attributeColor}20`, color: attributeColor }}
          >
            <Zap className="w-3 h-3" />
            {task.xpValue} XP
          </Badge>
        </div>

        <p className="text-sm text-foreground">{task.instruction}</p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {task.estimatedTime} min
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3" />
              {attributeName}
            </div>
          </div>

          <Button
            onClick={handleComplete}
            disabled={task.completed || isCompleting}
            variant={task.completed ? "outline" : "default"}
            size="sm"
            className={cn(
              "transition-all duration-300",
              !task.completed && "hover:scale-105 hover:shadow-lg"
            )}
          >
            {task.completed ? "Concluída" : isCompleting ? "Completando..." : "Completar"}
          </Button>
        </div>

        {task.consecutiveIgnores > 0 && (
          <div className="text-xs text-destructive flex items-center gap-1">
            ⚠️ Ignorada por {task.consecutiveIgnores} dia(s)
          </div>
        )}
      </div>
    </Card>
  );
};
