
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Plus } from 'lucide-react';
import { Task, Attribute } from '@/types/quest';

interface AddTaskDialogProps {
  attributes: Attribute[];
  onAddTask: (task: Omit<Task, 'id' | 'completed'>) => void;
}

export const AddTaskDialog = ({ attributes, onAddTask }: AddTaskDialogProps) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [symbolicName, setSymbolicName] = useState('');
  const [instruction, setInstruction] = useState('');
  const [attributeId, setAttributeId] = useState('');
  const [xpValue, setXpValue] = useState(10);
  const [estimatedTime, setEstimatedTime] = useState(15);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !attributeId) return;

    onAddTask({
      name,
      symbolicName: symbolicName || name,
      instruction,
      attributeId,
      xpValue,
      estimatedTime,
      consecutiveIgnores: 0
    });

    // Reset form
    setName('');
    setSymbolicName('');
    setInstruction('');
    setAttributeId('');
    setXpValue(10);
    setEstimatedTime(15);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Nova Tarefa
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Adicionar Nova Tarefa</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="task-name">Nome da Tarefa</Label>
            <Input
              id="task-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Meditar por 10 minutos"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="symbolic-name">Nome Simbólico (Opcional)</Label>
            <Input
              id="symbolic-name"
              value={symbolicName}
              onChange={(e) => setSymbolicName(e.target.value)}
              placeholder="Ex: Ritual do Silêncio Interior"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="instruction">Instrução</Label>
            <Textarea
              id="instruction"
              value={instruction}
              onChange={(e) => setInstruction(e.target.value)}
              placeholder="Descreva como executar esta tarefa..."
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="attribute">Atributo</Label>
            <Select value={attributeId} onValueChange={setAttributeId} required>
              <SelectTrigger>
                <SelectValue placeholder="Selecione um atributo" />
              </SelectTrigger>
              <SelectContent>
                {attributes.map((attr) => (
                  <SelectItem key={attr.id} value={attr.id}>
                    {attr.icon} {attr.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="xp-value">XP</Label>
              <Input
                id="xp-value"
                type="number"
                value={xpValue}
                onChange={(e) => setXpValue(Number(e.target.value))}
                min={1}
                max={100}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Tempo (min)</Label>
              <Input
                id="time"
                type="number"
                value={estimatedTime}
                onChange={(e) => setEstimatedTime(Number(e.target.value))}
                min={1}
                max={120}
              />
            </div>
          </div>

          <Button type="submit" className="w-full">
            Criar Tarefa
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
