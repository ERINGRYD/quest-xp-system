
import { EmotionalClimate, ClimateData } from '@/types/quest';
import { climateDatabase } from '@/utils/emotionalClimate';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface EmotionalClimateProps {
  climate: EmotionalClimate;
  className?: string;
}

export const EmotionalClimateCard = ({ climate, className }: EmotionalClimateProps) => {
  const climateData = climateDatabase[climate];

  return (
    <Card className={`p-4 ${className}`}>
      <div className="flex items-center gap-3 mb-3">
        <div className="text-3xl">{climateData.icon}</div>
        <div>
          <h3 className="font-semibold text-lg">{climateData.name}</h3>
          <p className="text-sm text-muted-foreground">Clima Interior Atual</p>
        </div>
      </div>

      <p className="text-sm mb-4 italic text-foreground">
        {climateData.message}
      </p>

      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground">Tarefas Ideais:</p>
        <div className="flex flex-wrap gap-1">
          {climateData.idealTaskTypes.map((type) => (
            <Badge 
              key={type} 
              variant="outline" 
              className="text-xs"
              style={{ borderColor: climateData.color, color: climateData.color }}
            >
              {type}
            </Badge>
          ))}
        </div>
      </div>
    </Card>
  );
};
