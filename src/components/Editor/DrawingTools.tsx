
import React, { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-draw';
import 'leaflet-draw/dist/leaflet.draw.css';

// Extend the Leaflet types to include drawHandler
declare module 'leaflet' {
  interface Map {
    drawHandler?: any;
  }
}

interface DrawingToolsProps {
  activeTool: string;
}

export const DrawingTools: React.FC<DrawingToolsProps> = ({ activeTool }) => {
  const map = useMap();
  
  useEffect(() => {
    // Create FeatureGroup to store editable layers
    const drawnItems = new L.FeatureGroup();
    map.addLayer(drawnItems);
    
    // Initialize the draw control and pass it the FeatureGroup of editable layers
    const drawControl = new L.Control.Draw({
      edit: {
        featureGroup: drawnItems,
        poly: {
          allowIntersection: false
        }
      },
      draw: {
        polygon: {
          allowIntersection: false,
          showArea: true
        },
        polyline: true,
        rectangle: true,
        circle: true,
        marker: true,
        circlemarker: false
      }
    });
    map.addControl(drawControl);
    
    // Event handler for when drawing is created
    map.on(L.Draw.Event.CREATED, (e: any) => {
      const type = e.layerType;
      const layer = e.layer;
      
      console.log(`Created a ${type} shape`);
      drawnItems.addLayer(layer);
    });
    
    // Clean up on unmount
    return () => {
      map.removeControl(drawControl);
      map.removeLayer(drawnItems);
      map.off(L.Draw.Event.CREATED);
    };
  }, [map]);
  
  // Enable specific drawing tools based on activeTool
  useEffect(() => {
    // This would trigger specific drawing modes based on the active tool
    if (activeTool === 'draw') {
      // Trigger the polyline drawing tool
      new L.Draw.Polyline(map).enable();
    } else if (activeTool === 'rectangle') {
      // Trigger the rectangle drawing tool
      new L.Draw.Rectangle(map).enable();
    } else if (activeTool === 'circle') {
      // Trigger the circle drawing tool
      new L.Draw.Circle(map).enable();
    } else if (activeTool === 'line') {
      // Trigger the polyline drawing tool (same as 'draw' but kept for clarity)
      new L.Draw.Polyline(map).enable();
    } else {
      // For other tools, disable drawing mode
      map.off('click');
    }
    
    // Clean up function
    return () => {
      // Disable any active drawing handlers when the tool changes
      if (map.drawHandler) {
        map.drawHandler.disable();
      }
    };
  }, [activeTool, map]);
  
  return null; // This component doesn't render anything, it just attaches functionality to the map
};
