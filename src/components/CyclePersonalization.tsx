
import { useState } from 'react';
import { PersonalCycle, CycleTemplate } from '@/types/quest';
import { cycleTemplates, generatePersonalCycle } from '@/utils/adaptiveIntelligence';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Calendar, Sparkles, Edit } from 'lucide-react';

interface CyclePersonalizationProps {
  currentCycle?: PersonalCycle;
  onCreateCycle: (cycle: PersonalCycle) => void;
  onUpdateCycle: (cycle: PersonalCycle) => void;
}

export const CyclePersonalization = ({ 
  currentCycle, 
  onCreateCycle, 
  onUpdateCycle 
}: CyclePersonalizationProps) => {
  const [selectedTemplate, setSelectedTemplate] = useState<CycleTemplate | null>(null);
  const [customization, setCustomization] = useState({
    symbolicName: '',
    intention: '',
    duration: 30
  });
  const [editingCurrent, setEditingCurrent] = useState(false);

  const handleCreateCycle = () => {
    if (!selectedTemplate) return;

    const newCycle = generatePersonalCycle(selectedTemplate, {
      ...customization,
      startDate: new Date()
    });

    onCreateCycle(newCycle);
    setSelectedTemplate(null);
    setCustomization({ symbolicName: '', intention: '', duration: 30 });
  };

  const handleUpdateCurrent = () => {
    if (!currentCycle) return;

    const updatedCycle: PersonalCycle = {
      ...currentCycle,
      symbolicName: customization.symbolicName || currentCycle.symbolicName,
      intention: customization.intention || currentCycle.intention
    };

    onUpdateCycle(updatedCycle);
    setEditingCurrent(false);
    setCustomization({ symbolicName: '', intention: '', duration: 30 });
  };

  return (
    <div className="space-y-6">
      {/* Current Cycle */}
      {currentCycle && (
        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{currentCycle.icon}</span>
                <div>
                  <h3 className="font-semibold">{currentCycle.name}</h3>
                  <p className="text-sm text-primary font-medium">
                    "{currentCycle.symbolicName}"
                  </p>
                </div>
              </div>
              
              <Button
                onClick={() => setEditingCurrent(!editingCurrent)}
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
              >
                <Edit className="w-3 h-3" />
                Personalizar
              </Button>
            </div>

            <div className="bg-accent/20 p-3 rounded-lg">
              <p className="text-sm italic">"{currentCycle.intention}"</p>
            </div>

            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span>🗓️ {currentCycle.startDate.toLocaleDateString('pt-BR')}</span>
              <span>→</span>
              <span>🏁 {currentCycle.endDate.toLocaleDateString('pt-BR')}</span>
            </div>

            {editingCurrent && (
              <div className="space-y-3 border-t pt-4">
                <div>
                  <Label htmlFor="symbolic-name">Nome Simbólico</Label>
                  <Input
                    id="symbolic-name"
                    placeholder={currentCycle.symbolicName}
                    value={customization.symbolicName}
                    onChange={(e) => setCustomization(prev => ({ 
                      ...prev, 
                      symbolicName: e.target.value 
                    }))}
                  />
                </div>
                
                <div>
                  <Label htmlFor="intention">Intenção do Ciclo</Label>
                  <Input
                    id="intention"
                    placeholder={currentCycle.intention}
                    value={customization.intention}
                    onChange={(e) => setCustomization(prev => ({ 
                      ...prev, 
                      intention: e.target.value 
                    }))}
                  />
                </div>

                <div className="flex gap-2">
                  <Button onClick={handleUpdateCurrent} size="sm">
                    Atualizar Ciclo
                  </Button>
                  <Button 
                    onClick={() => setEditingCurrent(false)} 
                    variant="outline" 
                    size="sm"
                  >
                    Cancelar
                  </Button>
                </div>
              </div>
            )}
          </div>
        </Card>
      )}

      {/* Create New Cycle */}
      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <h3 className="font-semibold">Criar Novo Ciclo Pessoal</h3>
          </div>

          {/* Template Selection */}
          <div className="space-y-3">
            <Label>Escolha um Arquétipo:</Label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {cycleTemplates.map((template) => (
                <Card
                  key={template.id}
                  className={`p-3 cursor-pointer transition-all ${
                    selectedTemplate?.id === template.id 
                      ? 'border-primary bg-primary/5' 
                      : 'hover:border-primary/50'
                  }`}
                  onClick={() => setSelectedTemplate(template)}
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{template.icon}</span>
                      <h4 className="font-medium text-sm">{template.name}</h4>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {template.description}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {template.dominantEmotions.slice(0, 2).map((emotion) => (
                        <Badge key={emotion} variant="outline" className="text-xs">
                          {emotion}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Customization */}
          {selectedTemplate && (
            <div className="space-y-3 border-t pt-4">
              <div>
                <Label htmlFor="new-symbolic-name">Nome Simbólico Personalizado</Label>
                <Input
                  id="new-symbolic-name"
                  placeholder={`Ex: ${selectedTemplate.symbolicNames[0]}`}
                  value={customization.symbolicName}
                  onChange={(e) => setCustomization(prev => ({ 
                    ...prev, 
                    symbolicName: e.target.value 
                  }))}
                />
              </div>
              
              <div>
                <Label htmlFor="new-intention">Intenção do Ciclo</Label>
                <Input
                  id="new-intention"
                  placeholder="Qual a intenção principal deste período?"
                  value={customization.intention}
                  onChange={(e) => setCustomization(prev => ({ 
                    ...prev, 
                    intention: e.target.value 
                  }))}
                />
              </div>

              <div>
                <Label htmlFor="duration">Duração (dias)</Label>
                <Input
                  id="duration"
                  type="number"
                  min="7"
                  max="365"
                  value={customization.duration}
                  onChange={(e) => setCustomization(prev => ({ 
                    ...prev, 
                    duration: parseInt(e.target.value) || 30 
                  }))}
                />
              </div>

              <Button onClick={handleCreateCycle} className="w-full">
                <Calendar className="w-4 h-4 mr-2" />
                Iniciar Novo Ciclo
              </Button>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};
