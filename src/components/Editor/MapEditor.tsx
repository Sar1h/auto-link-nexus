import React, { useState } from 'react';
import { MapContainer, TileLayer, ZoomControl } from 'react-leaflet';
// Import leaflet CSS from node_modules
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import { Header } from '@/components/Layout/Header';
import { CoordinatesDisplay } from './CoordinatesDisplay';
import { LayersPanel } from './LayersPanel';
import { StatusBar } from './StatusBar';
import { EditorToolbar } from './EditorToolbar';
import { DrawingTools } from './DrawingTools';
import { tools, categorizeTools } from './tools';

export const MapEditor: React.FC = () => {
  const [activeTool, setActiveTool] = useState('select');
  const [isLayersPanelOpen, setIsLayersPanelOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(13);
  const defaultPosition: [number, number] = [50.111, 8.683]; // Frankfurt coordinates from the example

  const toolCategories = categorizeTools(tools);

  const handleSetActiveTool = (toolId: string) => {
    setActiveTool(toolId);
  };

  const toggleLayersPanel = () => {
    setIsLayersPanelOpen(!isLayersPanelOpen);
  };

  const handleZoomChange = (map: any) => {
    setZoomLevel(map.getZoom());
  };

  const getActiveToolName = () => {
    const tool = tools.find(t => t.id === activeTool);
    return tool ? tool.name : '';
  };

  return (
    <div className="h-screen w-full relative bg-gray-100">
      <Header userType="editor" />
      
      <EditorToolbar 
        toolCategories={toolCategories}
        activeTool={activeTool}
        setActiveTool={handleSetActiveTool}
        toggleLayersPanel={toggleLayersPanel}
      />

      {/* Map Canvas with OpenStreetMap */}
      <div className="absolute inset-0 pt-32">
        <MapContainer 
          center={defaultPosition} 
          zoom={zoomLevel} 
          style={{ height: '100%', width: '100%' }}
          zoomControl={false}
          whenReady={(mapEvent) => {
            console.log('Map initialized with OpenStreetMap');
            mapEvent.target.on('zoom', () => handleZoomChange(mapEvent.target));
          }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <ZoomControl position="bottomright" />
          <CoordinatesDisplay />
          <DrawingTools activeTool={activeTool} />
        </MapContainer>
      </div>

      <LayersPanel isOpen={isLayersPanelOpen} />
      
      <StatusBar 
        activeTool={activeTool}
        zoomLevel={zoomLevel}
        toolName={getActiveToolName()}
      />
    </div>
  );
};
