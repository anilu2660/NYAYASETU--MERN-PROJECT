"use client";
import { useMemo, useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

interface InteractiveMapProps {
  center?: { lat: number; lng: number };
  zoom?: number;
  height?: string;
}

const InteractiveMap = ({ 
  center = { lat: 28.6139, lng: 77.2090 }, // New Delhi coordinates
  zoom = 15,
  height = "400px"
}: InteractiveMapProps) => {
  const [mapError, setMapError] = useState(false);
  
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || 'YOUR_API_KEY_HERE'
  });

  const mapCenter = useMemo(() => center, [center]);

  const officeLocation = {
    position: { lat: 28.6139, lng: 77.2090 },
    title: "Department of Justice - NyayaSetu Portal",
    address: "Jaisalmer House, 26 Man Singh Road, New Delhi - 110011"
  };

  // Handle loading state
  if (!isLoaded && !loadError) {
    return (
      <div 
        className="flex items-center justify-center bg-gradient-to-br from-secondary/50 to-background/50 rounded-2xl"
        style={{ height }}
      >
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-muted-foreground font-medium">Loading map...</p>
        </div>
      </div>
    );
  }

  // Handle API key error or missing API key
  if (loadError || mapError || !process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY === 'YOUR_API_KEY_HERE') {
    return (
      <div className="relative rounded-2xl overflow-hidden shadow-xl">
        <div 
          className="bg-gradient-to-br from-secondary/50 to-background/50 rounded-2xl flex items-center justify-center"
          style={{ height }}
        >
          <div className="text-center p-8">
            <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl">🗺️</span>
            </div>
            <h4 className="text-lg font-semibold text-foreground mb-2">Interactive Map</h4>
            <p className="text-muted-foreground text-sm mb-6 max-w-md">
              {!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY === 'YOUR_API_KEY_HERE' 
                ? "Google Maps API key not configured. Please add your API key to enable the interactive map."
                : "Unable to load Google Maps. Please check your API key configuration."
              }
            </p>
            
            {/* Office Info Card */}
            <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/20 max-w-sm mx-auto">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-primary to-primary-light rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-lg">🏢</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground text-sm mb-1">
                    {officeLocation.title}
                  </h4>
                  <p className="text-muted-foreground text-xs leading-relaxed mb-3">
                    {officeLocation.address}
                  </p>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => window.open(`https://maps.google.com/?q=${officeLocation.position.lat},${officeLocation.position.lng}`, '_blank')}
                      className="inline-flex items-center px-3 py-1.5 bg-primary text-primary-foreground text-xs font-medium rounded-lg hover:bg-primary-light transition-colors"
                    >
                      🧭 Directions
                    </button>
                    <button 
                      onClick={() => window.open(`https://maps.google.com/?q=${officeLocation.position.lat},${officeLocation.position.lng}&t=m`, '_blank')}
                      className="inline-flex items-center px-3 py-1.5 bg-secondary text-secondary-foreground text-xs font-medium rounded-lg hover:bg-secondary/80 transition-colors"
                    >
                      🗺️ Street View
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Setup Instructions */}
            {(!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY === 'YOUR_API_KEY_HERE') && (
              <div className="mt-6 p-4 bg-primary/10 rounded-lg border border-primary/20">
                <h5 className="font-semibold text-primary text-sm mb-2">To enable interactive map:</h5>
                <ol className="text-xs text-muted-foreground space-y-1 text-left max-w-sm mx-auto">
                  <li>1. Get API key from <a href="https://console.cloud.google.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google Cloud Console</a></li>
                  <li>2. Create <code className="bg-secondary px-1 rounded">.env.local</code> file</li>
                  <li>3. Add: <code className="bg-secondary px-1 rounded">NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_key_here</code></li>
                  <li>4. Restart development server</li>
                </ol>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative rounded-2xl overflow-hidden shadow-xl">
      <GoogleMap
        mapContainerStyle={{ 
          width: '100%', 
          height,
          borderRadius: '16px'
        }}
        center={mapCenter}
        zoom={zoom}
        options={{
          zoomControl: true,
          streetViewControl: false,
          mapTypeControl: true,
          fullscreenControl: true,
          styles: [
            {
              featureType: "poi",
              elementType: "labels",
              stylers: [{ visibility: "off" }]
            }
          ]
        }}
      >
        <Marker
          position={officeLocation.position}
          title={officeLocation.title}
          icon={{
            url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%230ea5e9'%3E%3Cpath d='M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z'/%3E%3C/svg%3E",
            scaledSize: new window.google.maps.Size(40, 40),
            anchor: new window.google.maps.Point(20, 40)
          }}
        />
      </GoogleMap>
      
      {/* Map Overlay with Office Info */}
      <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/20">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-primary to-primary-light rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-white text-lg">🏢</span>
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-foreground text-sm mb-1">
              {officeLocation.title}
            </h4>
            <p className="text-muted-foreground text-xs leading-relaxed">
              {officeLocation.address}
            </p>
            <div className="flex gap-2 mt-2">
              <button 
                onClick={() => window.open(`https://maps.google.com/?q=${officeLocation.position.lat},${officeLocation.position.lng}`, '_blank')}
                className="inline-flex items-center px-3 py-1.5 bg-primary text-primary-foreground text-xs font-medium rounded-lg hover:bg-primary-light transition-colors"
              >
                🧭 Directions
              </button>
              <button 
                onClick={() => window.open(`https://maps.google.com/?q=${officeLocation.position.lat},${officeLocation.position.lng}&t=m`, '_blank')}
                className="inline-flex items-center px-3 py-1.5 bg-secondary text-secondary-foreground text-xs font-medium rounded-lg hover:bg-secondary/80 transition-colors"
              >
                🗺️ Street View
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveMap;
