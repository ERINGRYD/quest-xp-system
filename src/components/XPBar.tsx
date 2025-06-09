
import { cn } from '@/lib/utils';

interface XPBarProps {
  currentXP: number;
  nextLevelXP: number;
  level: number;
  attribute: string;
  color: string;
  className?: string;
  showLevel?: boolean;
}

export const XPBar = ({ 
  currentXP, 
  nextLevelXP, 
  level, 
  attribute, 
  color,
  className,
  showLevel = true 
}: XPBarProps) => {
  const percentage = Math.min((currentXP / nextLevelXP) * 100, 100);
  
  return (
    <div className={cn("space-y-2", className)}>
      {showLevel && (
        <div className="flex justify-between items-center text-sm">
          <span className="font-medium">{attribute}</span>
          <span className="text-muted-foreground">Nível {level}</span>
        </div>
      )}
      
      <div className="xp-bar h-3 relative">
        <div 
          className="xp-fill h-full transition-all duration-1000 ease-out"
          style={{ 
            width: `${percentage}%`,
            background: `linear-gradient(90deg, ${color} 0%, ${color}88 100%)`
          }}
        />
        
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs font-medium text-white drop-shadow-sm">
            {currentXP} / {nextLevelXP} XP
          </span>
        </div>
      </div>
    </div>
  );
};
