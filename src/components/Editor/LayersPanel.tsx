
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface LayersPanelProps {
  isOpen: boolean;
}

export const LayersPanel: React.FC<LayersPanelProps> = ({ isOpen }) => {
  if (!isOpen) return null;
  
  return (
    <div className="absolute right-4 top-36 z-20">
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
  );
};
