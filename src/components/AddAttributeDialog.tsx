
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus } from 'lucide-react';
import { Attribute } from '@/types/quest';

interface AddAttributeDialogProps {
  onAddAttribute: (attribute: Omit<Attribute, 'id'>) => void;
}

const availableIcons = ['💪', '🧠', '❤️', '🎯', '⚡', '🔥', '💎', '🌟', '🎨', '🔬', '📚', '🎵', '🌱', '🦋', '🏆'];
const availableColors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4', '#84CC16', '#F97316', '#EC4899', '#6366F1'];

export const AddAttributeDialog = ({ onAddAttribute }: AddAttributeDialogProps) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [icon, setIcon] = useState('💪');
  const [color, setColor] = useState('#3B82F6');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;

    onAddAttribute({
      name,
      icon,
      color,
      currentXP: 0,
      nextLevelXP: 100,
      level: 1
    });

    // Reset form
    setName('');
    setIcon('💪');
    setColor('#3B82F6');
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Novo Atributo
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Adicionar Novo Atributo</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="attr-name">Nome do Atributo</Label>
            <Input
              id="attr-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Criatividade"
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Ícone</Label>
            <div className="grid grid-cols-5 gap-2">
              {availableIcons.map((availableIcon) => (
                <button
                  key={availableIcon}
                  type="button"
                  onClick={() => setIcon(availableIcon)}
                  className={`p-2 text-xl rounded border ${
                    icon === availableIcon ? 'border-primary bg-primary/10' : 'border-border'
                  }`}
                >
                  {availableIcon}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Cor</Label>
            <div className="grid grid-cols-5 gap-2">
              {availableColors.map((availableColor) => (
                <button
                  key={availableColor}
                  type="button"
                  onClick={() => setColor(availableColor)}
                  className={`w-8 h-8 rounded border-2 ${
                    color === availableColor ? 'border-foreground' : 'border-border'
                  }`}
                  style={{ backgroundColor: availableColor }}
                />
              ))}
            </div>
          </div>

          <Button type="submit" className="w-full">
            Criar Atributo
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
