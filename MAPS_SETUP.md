# Google Maps Setup Guide

## Setting up Google Maps for the Contact Page

### 1. Get a Google Maps API Key

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the following APIs:
   - Maps JavaScript API
   - Places API (optional, for enhanced features)
4. Go to "Credentials" and create an API key
5. Restrict the API key to your domain for security

### 2. Configure Environment Variables

Create a `.env.local` file in the root of your project and add:

```env
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_actual_api_key_here
```

### 3. Features Included

The interactive map includes:
- ✅ Real-time Google Maps integration
- ✅ Office location marker
- ✅ Interactive controls (zoom, pan, map type)
- ✅ Directions button (opens Google Maps)
- ✅ Street View button
- ✅ Responsive design
- ✅ Loading state with spinner
- ✅ Custom styling and branding

### 4. Office Location

The map is centered on:
- **Address**: Jaisalmer House, 26 Man Singh Road, New Delhi - 110011
- **Coordinates**: 28.6139°N, 77.2090°E

### 5. Customization

You can customize the map by modifying the `InteractiveMap.tsx` component:
- Change the center coordinates
- Adjust zoom level
- Modify map styling
- Add multiple markers
- Customize the overlay information

### 6. Security Notes

- Always restrict your API key to specific domains
- Monitor API usage in Google Cloud Console
- Consider implementing rate limiting for production use

### 7. Troubleshooting

If the map doesn't load:
1. Check if the API key is correctly set in `.env.local`
2. Verify the API key has the necessary permissions
3. Check browser console for any error messages
4. Ensure the Maps JavaScript API is enabled in Google Cloud Console
