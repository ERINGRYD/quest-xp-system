
import { Attribute } from '@/types/quest';
import { XPBar } from './XPBar';
import { Card } from '@/components/ui/card';

interface AttributeCardProps {
  attribute: Attribute;
  onLevelUp?: () => void;
}

export const AttributeCard = ({ attribute, onLevelUp }: AttributeCardProps) => {
  return (
    <Card className="p-4 hover:shadow-lg transition-all duration-300">
      <div className="flex items-center gap-3 mb-3">
        <div className="text-2xl">{attribute.icon}</div>
        <div>
          <h3 className="font-semibold text-foreground">{attribute.name}</h3>
          <p className="text-sm text-muted-foreground">Nível {attribute.level}</p>
        </div>
      </div>
      
      <XPBar
        currentXP={attribute.currentXP}
        nextLevelXP={attribute.nextLevelXP}
        level={attribute.level}
        attribute=""
        color={attribute.color}
        showLevel={false}
      />
    </Card>
  );
};
