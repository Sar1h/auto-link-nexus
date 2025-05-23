
import React from 'react';

interface StatusBarProps {
  activeTool: string;
  zoomLevel: number;
  toolName: string;
}

export const StatusBar: React.FC<StatusBarProps> = ({ activeTool, zoomLevel, toolName }) => {
  return (
    <div className="absolute bottom-0 left-0 right-0 bg-white border-t p-2 text-sm text-gray-600">
      <div className="flex justify-between items-center">
        <span>Tool: {toolName}</span>
        <span>Zoom: {zoomLevel}x | OSM-based map</span>
      </div>
    </div>
  );
};
