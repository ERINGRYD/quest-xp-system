
import { Area, SubArea, Theme } from '@/types/quest';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Play, CheckCircle } from 'lucide-react';

interface AreaJourneyViewProps {
  area: Area;
  onBack: () => void;
  onStartJourney: (themeId: string) => void;
}

export const AreaJourneyView = ({ area, onBack, onStartJourney }: AreaJourneyViewProps) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar
        </Button>
        <div className="flex items-center gap-3">
          <div className="text-4xl">{area.icon}</div>
          <div>
            <h1 className="text-3xl font-bold">{area.name}</h1>
            <p className="text-muted-foreground">{area.description}</p>
          </div>
        </div>
      </div>

      {/* Sub-areas */}
      <div className="space-y-8">
        {area.subAreas.map((subArea) => (
          <Card key={subArea.id} className="p-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <div 
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: subArea.color }}
                />
                <h2 className="text-2xl font-semibold">{subArea.name}</h2>
              </div>
              <p className="text-muted-foreground mb-6">{subArea.description}</p>

              {/* Themes/Journeys */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {subArea.themes.map((theme) => (
                  <ThemeCard 
                    key={theme.id}
                    theme={theme}
                    subAreaColor={subArea.color}
                    onStartJourney={onStartJourney}
                  />
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

const ThemeCard = ({ 
  theme, 
  subAreaColor, 
  onStartJourney 
}: { 
  theme: Theme; 
  subAreaColor: string; 
  onStartJourney: (themeId: string) => void;
}) => {
  const isCompleted = theme.journey.progress >= 100;
  const currentStageIndex = theme.journey.phases.findIndex(phase => !phase.completed);
  const currentPhase = currentStageIndex >= 0 ? theme.journey.phases[currentStageIndex] : null;

  return (
    <Card className="p-4 hover:shadow-lg transition-all duration-300">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="text-2xl">{theme.icon}</div>
          <div className="flex-1">
            <h3 className="font-semibold">{theme.name}</h3>
            <p className="text-sm text-muted-foreground">{theme.description}</p>
          </div>
          {isCompleted && (
            <CheckCircle className="w-5 h-5 text-green-500" />
          )}
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Progresso</span>
            <span className="font-medium">{Math.round(theme.journey.progress)}%</span>
          </div>
          <Progress 
            value={theme.journey.progress} 
            className="h-2"
            style={{ 
              background: `${subAreaColor}20`
            }}
          />
        </div>

        {currentPhase && (
          <div className="space-y-2">
            <Badge variant="outline" className="text-xs">
              Fase Atual: {currentPhase.name}
            </Badge>
            <p className="text-xs text-muted-foreground">
              {currentPhase.description}
            </p>
          </div>
        )}

        <div className="pt-2 border-t border-border">
          <div className="flex justify-between items-center">
            <div className="text-xs text-muted-foreground">
              {theme.journey.phases.filter(p => p.completed).length} de {theme.journey.phases.length} fases
            </div>
            <Button 
              size="sm" 
              variant={isCompleted ? "outline" : "default"}
              onClick={() => onStartJourney(theme.id)}
            >
              <Play className="w-3 h-3 mr-1" />
              {isCompleted ? 'Revisar' : 'Continuar'}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};
