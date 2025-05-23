
import React from 'react';
import { Button } from '@/components/ui/button';

interface Tool {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  category: 'selection' | 'drawing' | 'editing' | 'measurement';
}

interface ToolButtonProps {
  tool: Tool;
  activeTool: string;
  onClick: (toolId: string) => void;
}

export const ToolButton: React.FC<ToolButtonProps> = ({ tool, activeTool, onClick }) => {
  const IconComponent = tool.icon;
  return (
    <Button
      variant={activeTool === tool.id ? 'default' : 'ghost'}
      size="sm"
      className={`w-10 h-10 p-0 ${activeTool === tool.id ? 'bg-orange-500 hover:bg-orange-600' : ''}`}
      onClick={() => onClick(tool.id)}
      title={tool.name}
    >
      <IconComponent className="w-4 h-4" />
    </Button>
  );
};
