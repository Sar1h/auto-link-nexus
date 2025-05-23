
import React, { useState, useEffect } from 'react';
import { useMap } from 'react-leaflet';

export const CoordinatesDisplay: React.FC = () => {
  const [coords, setCoords] = useState<[number, number]>([0, 0]);
  const map = useMap();
  
  useEffect(() => {
    const handleMouseMove = (e: any) => {
      setCoords([e.latlng.lat, e.latlng.lng]);
    };
    
    map.on('mousemove', handleMouseMove);
    
    return () => {
      map.off('mousemove', handleMouseMove);
    };
  }, [map]);
  
  return (
    <div className="coordinates-display absolute bottom-10 left-2 bg-white bg-opacity-80 px-2 py-1 rounded shadow text-sm">
      Coordinates: {coords[0].toFixed(6)}, {coords[1].toFixed(6)}
    </div>
  );
};
