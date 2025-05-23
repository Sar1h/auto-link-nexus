
import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  MousePointer, 
  Move, 
  Pencil, 
  Square, 
  Circle, 
  Minus, 
  Trash2, 
  Undo, 
  Redo, 
  Save,
  Settings,
  Layers,
  Ruler
} from 'lucide-react';

interface Tool {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  category: 'selection' | 'drawing' | 'editing' | 'measurement';
}

const tools: Tool[] = [
  { id: 'select', name: 'Select', icon: MousePointer, category: 'selection' },
  { id: 'pan', name: 'Pan', icon: Move, category: 'selection' },
  { id: 'draw', name: 'Draw', icon: Pencil, category: 'drawing' },
  { id: 'rectangle', name: 'Rectangle', icon: Square, category: 'drawing' },
  { id: 'circle', name: 'Circle', icon: Circle, category: 'drawing' },
  { id: 'line', name: 'Line', icon: Minus, category: 'drawing' },
  { id: 'measure', name: 'Measure', icon: Ruler, category: 'measurement' },
  { id: 'delete', name: 'Delete', icon: Trash2, category: 'editing' },
];

export const MapEditor: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [activeTool, setActiveTool] = useState('select');
  const [isLayersPanelOpen, setIsLayersPanelOpen] = useState(false);

  useEffect(() => {
    // Initialize full-screen map editor (mock implementation)
    if (mapRef.current) {
      console.log('Initializing map editor...');
    }
  }, []);

  const toolCategories = {
    selection: tools.filter(t => t.category === 'selection'),
    drawing: tools.filter(t => t.category === 'drawing'),
    editing: tools.filter(t => t.category === 'editing'),
    measurement: tools.filter(t => t.category === 'measurement'),
  };

  const ToolButton: React.FC<{ tool: Tool }> = ({ tool }) => {
    const IconComponent = tool.icon;
    return (
      <Button
        variant={activeTool === tool.id ? 'default' : 'ghost'}
        size="sm"
        className={`w-10 h-10 p-0 ${activeTool === tool.id ? 'bg-orange-500 hover:bg-orange-600' : ''}`}
        onClick={() => setActiveTool(tool.id)}
        title={tool.name}
      >
        <IconComponent className="w-4 h-4" />
      </Button>
    );
  };

  return (
    <div className="h-screen w-full relative bg-gray-100">
      {/* Top Toolbar */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-white shadow-sm border-b p-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">AL</span>
              </div>
              <span className="font-semibold">AutoLink Editor</span>
            </div>

            <Separator orientation="vertical" className="h-6" />

            {/* Selection Tools */}
            <div className="flex space-x-1">
              {toolCategories.selection.map(tool => (
                <ToolButton key={tool.id} tool={tool} />
              ))}
            </div>

            <Separator orientation="vertical" className="h-6" />

            {/* Drawing Tools */}
            <div className="flex space-x-1">
              {toolCategories.drawing.map(tool => (
                <ToolButton key={tool.id} tool={tool} />
              ))}
            </div>

            <Separator orientation="vertical" className="h-6" />

            {/* Editing Tools */}
            <div className="flex space-x-1">
              {toolCategories.editing.map(tool => (
                <ToolButton key={tool.id} tool={tool} />
              ))}
              {toolCategories.measurement.map(tool => (
                <ToolButton key={tool.id} tool={tool} />
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
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setIsLayersPanelOpen(!isLayersPanelOpen)}
            >
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

      {/* Map Canvas */}
      <div 
        ref={mapRef}
        className="absolute inset-0 pt-16"
        style={{ background: 'linear-gradient(45deg, #f0f0f0 25%, transparent 25%), linear-gradient(-45deg, #f0f0f0 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #f0f0f0 75%), linear-gradient(-45deg, transparent 75%, #f0f0f0 75%)', backgroundSize: '20px 20px', backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px' }}
      >
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-center">
            <div className="w-24 h-24 bg-gradient-to-r from-orange-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Pencil className="w-12 h-12 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Map Editor Canvas</h3>
            <p className="text-gray-500 max-w-md">
              Full-screen map editing environment with Leaflet.js and HERE Maps integration.
              Use the toolbar above to select editing tools.
            </p>
          </div>
        </div>
      </div>

      {/* Layers Panel */}
      {isLayersPanelOpen && (
        <div className="absolute right-4 top-20 z-20">
          <Card className="w-64">
            <CardHeader>
              <CardTitle className="text-sm">Layers</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                <span className="text-sm">Base Map</span>
                <input type="checkbox" defaultChecked />
              </div>
              <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                <span className="text-sm">Roads</span>
                <input type="checkbox" defaultChecked />
              </div>
              <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                <span className="text-sm">Changes</span>
                <input type="checkbox" defaultChecked />
              </div>
              <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                <span className="text-sm">Annotations</span>
                <input type="checkbox" />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Status Bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-white border-t p-2 text-sm text-gray-600">
        <div className="flex justify-between items-center">
          <span>Tool: {tools.find(t => t.id === activeTool)?.name}</span>
          <span>Zoom: 100% | Coordinates: 8.683, 50.111</span>
        </div>
      </div>
    </div>
  );
};
