
import React from 'react';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Undo, Redo, Layers, Settings, Save } from 'lucide-react';
import { ToolButton } from './ToolButton';

interface Tool {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  category: 'selection' | 'drawing' | 'editing' | 'measurement';
}

interface EditorToolbarProps {
  toolCategories: {
    selection: Tool[];
    drawing: Tool[];
    editing: Tool[];
    measurement: Tool[];
  };
  activeTool: string;
  setActiveTool: (id: string) => void;
  toggleLayersPanel: () => void;
}

export const EditorToolbar: React.FC<EditorToolbarProps> = ({
  toolCategories,
  activeTool,
  setActiveTool,
  toggleLayersPanel,
}) => {
  return (
    <div className="absolute top-16 left-0 right-0 z-10 bg-white shadow-sm border-b p-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="font-semibold">AutoLink Editor</span>
          </div>

          <Separator orientation="vertical" className="h-6" />

          {/* Selection Tools */}
          <div className="flex space-x-1">
            {toolCategories.selection.map(tool => (
              <ToolButton key={tool.id} tool={tool} activeTool={activeTool} onClick={setActiveTool} />
            ))}
          </div>

          <Separator orientation="vertical" className="h-6" />

          {/* Drawing Tools */}
          <div className="flex space-x-1">
            {toolCategories.drawing.map(tool => (
              <ToolButton key={tool.id} tool={tool} activeTool={activeTool} onClick={setActiveTool} />
            ))}
          </div>

          <Separator orientation="vertical" className="h-6" />

          {/* Editing Tools & Measurement Tools */}
          <div className="flex space-x-1">
            {toolCategories.editing.map(tool => (
              <ToolButton key={tool.id} tool={tool} activeTool={activeTool} onClick={setActiveTool} />
            ))}
            {toolCategories.measurement.map(tool => (
              <ToolButton key={tool.id} tool={tool} activeTool={activeTool} onClick={setActiveTool} />
            ))}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm">
            <Undo className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Redo className="w-4 h-4" />
          </Button>
          <Separator orientation="vertical" className="h-6" />
          <Button variant="ghost" size="sm" onClick={toggleLayersPanel}>
            <Layers className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Settings className="w-4 h-4" />
          </Button>
          <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
            <Save className="w-4 h-4 mr-2" />
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};
