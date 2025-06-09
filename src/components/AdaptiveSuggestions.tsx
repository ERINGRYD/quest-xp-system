
import { AdaptiveSuggestion } from '@/types/quest';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Lightbulb, Target, Zap, Archive, CheckCircle, X } from 'lucide-react';

interface AdaptiveSuggestionsProps {
  suggestions: AdaptiveSuggestion[];
  onAcceptSuggestion: (suggestionId: string) => void;
  onDismissSuggestion: (suggestionId: string) => void;
}

export const AdaptiveSuggestions = ({ 
  suggestions, 
  onAcceptSuggestion, 
  onDismissSuggestion 
}: AdaptiveSuggestionsProps) => {
  const getTypeIcon = (type: AdaptiveSuggestion['type']) => {
    switch (type) {
      case 'new-goal': return <Target className="w-4 h-4" />;
      case 'habit-simplification': return <Zap className="w-4 h-4" />;
      case 'habit-alternative': return <Lightbulb className="w-4 h-4" />;
      case 'habit-archive': return <Archive className="w-4 h-4" />;
    }
  };

  const getTypeLabel = (type: AdaptiveSuggestion['type']) => {
    switch (type) {
      case 'new-goal': return 'Nova Meta';
      case 'habit-simplification': return 'Simplificação';
      case 'habit-alternative': return 'Alternativa';
      case 'habit-archive': return 'Arquivar';
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return 'text-green-600';
    if (confidence >= 60) return 'text-yellow-600';
    return 'text-orange-600';
  };

  if (suggestions.length === 0) {
    return (
      <Card className="p-6 text-center">
        <Lightbulb className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
        <p className="text-muted-foreground">
          Nenhuma sugestão disponível no momento. Continue completando tarefas!
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {suggestions
        .filter(s => s.status === 'pending')
        .map((suggestion) => (
          <Card key={suggestion.id} className="p-4">
            <div className="space-y-4">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    {getTypeIcon(suggestion.type)}
                    <h3 className="font-semibold">{suggestion.title}</h3>
                    <Badge variant="outline">
                      {getTypeLabel(suggestion.type)}
                    </Badge>
                  </div>
                  <p className="text-sm text-primary font-medium">
                    "{suggestion.symbolicName}"
                  </p>
                </div>
                
                <div className={`text-xs font-medium ${getConfidenceColor(suggestion.confidence)}`}>
                  {suggestion.confidence}% confiança
                </div>
              </div>

              {/* Content */}
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  {suggestion.description}
                </p>
                
                <div className="bg-accent/20 p-3 rounded-lg">
                  <p className="text-sm font-medium mb-1">Propósito:</p>
                  <p className="text-sm italic">{suggestion.purpose}</p>
                </div>

                <p className="text-xs text-muted-foreground">
                  💡 {suggestion.reasoning}
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button
                  onClick={() => onAcceptSuggestion(suggestion.id)}
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <CheckCircle className="w-3 h-3" />
                  Aceitar
                </Button>
                <Button
                  onClick={() => onDismissSuggestion(suggestion.id)}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <X className="w-3 h-3" />
                  Dispensar
                </Button>
              </div>
            </div>
          </Card>
        ))}
    </div>
  );
};
