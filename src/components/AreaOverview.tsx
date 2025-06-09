
import { Area } from '@/types/quest';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

interface AreaOverviewProps {
  area: Area;
  onClick: () => void;
}

export const AreaOverview = ({ area, onClick }: AreaOverviewProps) => {
  // Calculate overall progress for the area
  const totalJourneys = area.subAreas.reduce((acc, subArea) => acc + subArea.themes.length, 0);
  const completedJourneys = area.subAreas.reduce((acc, subArea) => 
    acc + subArea.themes.filter(theme => theme.journey.progress >= 100).length, 0
  );
  const overallProgress = totalJourneys > 0 ? (completedJourneys / totalJourneys) * 100 : 0;

  return (
    <Card 
      className="area-card cursor-pointer group"
      onClick={onClick}
      style={{ 
        borderColor: `${area.color}40`,
        boxShadow: `0 0 20px ${area.color}20`
      }}
    >
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="text-3xl">{area.icon}</div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
              {area.name}
            </h2>
            <p className="text-sm text-muted-foreground">{area.description}</p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Progresso Geral</span>
            <span className="font-medium">{Math.round(overallProgress)}%</span>
          </div>
          <Progress 
            value={overallProgress} 
            className="h-2"
            style={{ 
              background: `${area.color}20`
            }}
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {area.subAreas.map((subArea) => (
            <Badge 
              key={subArea.id}
              variant="secondary"
              className="text-xs"
              style={{ 
                backgroundColor: `${subArea.color}20`, 
                color: subArea.color 
              }}
            >
              {subArea.name}
            </Badge>
          ))}
        </div>

        <div className="pt-2 border-t border-border">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{area.subAreas.length} subáreas</span>
            <span>{totalJourneys} jornadas</span>
            <span>{completedJourneys} concluídas</span>
          </div>
        </div>
      </div>
    </Card>
  );
};
