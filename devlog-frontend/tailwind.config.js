/* 
  Updated Tailwind Configuration for DevLogs
  File: tailwind.config.js or update colors in your CSS
  
  This uses a more professional, realistic color scheme
  instead of heavy pastels
*/

// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // ✅ NEW Professional Color Palette
        primary: {
          50: '#f8f5ff',
          100: '#f3ebff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#a855f7',  // Main purple - sophisticated
          600: '#9333ea',  // Darker purple
          700: '#7e22ce',  // Deep purple
          800: '#6b21a8',
          900: '#581c87',
        },
        
        secondary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#06b6d4',  // Cyan - accent color
          600: '#0891b2',
          700: '#0e7490',
          800: '#155e75',
          900: '#164e63',
        },
        
        accent: {
          50: '#fdf8f3',
          100: '#fceae2',
          200: '#f8d5c4',
          300: '#f4b89e',
          400: '#ed9c6e',
          500: '#e67e3c',  // Warm orange - for CTAs
          600: '#d55a1b',
          700: '#b84312',
          800: '#971b0e',
          900: '#6d0f08',
        },
        
        // Neutrals (more professional)
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
        },
        
        // ✅ Remove old pastel colors
        pastelPink: 'rgb(255, 179, 217)',
        pastelLavender: 'rgb(201, 177, 255)',
        pastelYellow: 'rgb(255, 248, 220)',
        
        // Dark mode backgrounds
        darkCard: '#1f2937',
      },
      
      backgroundImage: {
        // ✅ More sophisticated gradients
        'gradient-primary': 'linear-gradient(135deg, #a855f7 0%, #7c3aed 100%)',
        'gradient-secondary': 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
        'gradient-accent': 'linear-gradient(135deg, #e67e3c 0%, #d55a1b 100%)',
        'gradient-dark': 'linear-gradient(135deg, #1f2937 0%, #111827 100%)',
      },
    },
  },
  darkMode: 'class',
  plugins: [],
}
