
import { DailySymbolicMessage } from '@/types/quest';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { climateDatabase } from '@/utils/emotionalClimate';
import { Sparkles, Heart, Sword, Trophy } from 'lucide-react';

interface DailySymbolicMessageProps {
  message: DailySymbolicMessage;
  className?: string;
}

export const DailySymbolicMessageCard = ({ message, className }: DailySymbolicMessageProps) => {
  const climateData = climateDatabase[message.climate];
  
  const getToneIcon = () => {
    switch (message.tone) {
      case 'motivational': return <Sword className="w-4 h-4" />;
      case 'reflective': return <Heart className="w-4 h-4" />;
      case 'challenging': return <Sparkles className="w-4 h-4" />;
      case 'celebratory': return <Trophy className="w-4 h-4" />;
    }
  };

  const getToneColor = () => {
    switch (message.tone) {
      case 'motivational': return '#3B82F6';
      case 'reflective': return '#8B5CF6';
      case 'challenging': return '#F59E0B';
      case 'celebratory': return '#10B981';
    }
  };

  return (
    <Card className={`p-6 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20 ${className}`}>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{climateData.icon}</span>
            <div>
              <h3 className="font-semibold">Mensagem do Guerreiro</h3>
              <p className="text-xs text-muted-foreground">
                {climateData.name} • {new Date().toLocaleDateString('pt-BR')}
              </p>
            </div>
          </div>
          
          <Badge 
            variant="outline" 
            className="flex items-center gap-1"
            style={{ color: getToneColor(), borderColor: getToneColor() }}
          >
            {getToneIcon()}
            {message.tone === 'motivational' && 'Motivacional'}
            {message.tone === 'reflective' && 'Reflexiva'}
            {message.tone === 'challenging' && 'Desafiadora'}
            {message.tone === 'celebratory' && 'Celebrativa'}
          </Badge>
        </div>

        {/* Message */}
        <div className="bg-card/50 p-4 rounded-lg border border-primary/10">
          <p className="text-foreground leading-relaxed font-medium">
            {message.message}
          </p>
        </div>

        {/* Insights */}
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span>XP Recente: {message.basedOn.recentXP}</span>
          <span>Hábitos Ativos: {message.basedOn.activeHabits}</span>
          <span>Humor: {message.basedOn.mood}/10</span>
        </div>
      </div>
    </Card>
  );
};
