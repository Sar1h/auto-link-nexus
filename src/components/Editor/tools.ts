
import { 
  MousePointer, 
  Move, 
  Pencil, 
  Square, 
  Circle, 
  Minus, 
  Trash2,
  Ruler
} from 'lucide-react';

export interface Tool {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  category: 'selection' | 'drawing' | 'editing' | 'measurement';
}

export const tools: Tool[] = [
  { id: 'select', name: 'Select', icon: MousePointer, category: 'selection' },
  { id: 'pan', name: 'Pan', icon: Move, category: 'selection' },
  { id: 'draw', name: 'Draw', icon: Pencil, category: 'drawing' },
  { id: 'rectangle', name: 'Rectangle', icon: Square, category: 'drawing' },
  { id: 'circle', name: 'Circle', icon: Circle, category: 'drawing' },
  { id: 'line', name: 'Line', icon: Minus, category: 'drawing' },
  { id: 'measure', name: 'Measure', icon: Ruler, category: 'measurement' },
  { id: 'delete', name: 'Delete', icon: Trash2, category: 'editing' },
];

export const categorizeTools = (toolsList: Tool[]) => {
  return {
    selection: toolsList.filter(t => t.category === 'selection'),
    drawing: toolsList.filter(t => t.category === 'drawing'),
    editing: toolsList.filter(t => t.category === 'editing'),
    measurement: toolsList.filter(t => t.category === 'measurement'),
  };
};
