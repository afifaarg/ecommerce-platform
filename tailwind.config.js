/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1A2C5A',   // Royal Blue (Main color)
          light: '#D9DEE8',     // Lighter shade of Royal Blue for hover or focus states
          dark: '#3658B5',      // Darker shade of Royal Blue
        },
        secondary: {
          DEFAULT: '#F5F5DC',   // Beige (Secondary color)
          light: '#FFFBEA',     // Lighter beige for subtle elements
          dark: '#E5E5C9',      // Darker beige for contrast
        },
        background: {
          light: '#FFFFFF',     // White (Background for light sections)
          dark: '#F8F9FA',      // Light grey background for darker sections
        },
        text: {
          primary: '#333333',   // Dark grey/black for primary text
          secondary: '#666666', // Light grey for secondary text
          light: '#F8F8F8',     // White for text on dark backgrounds
        },
        border: {
          light: '#D3D3D3',     // Light grey for borders
        },
      },
    },
  },
  plugins: [],
};