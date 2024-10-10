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
          DEFAULT: '#F5E4B8',   // Slightly richer beige for better contrast
          light: '#FFFAE0',     // Softer, lighter beige with more warmth
          dark: '#E5D1A3',      // Darker beige for more pronounced contrast
        },
        background: {
          light: '#FFFFFF',     // White (Background for light sections)
          dark: '#F2F2F2',      // Slightly darker grey for better separation of sections
        },
        text: {
          primary: '#2C2C2C',   // Slightly darker grey for better readability
          secondary: '#4D4D4D', // Deeper grey for clearer contrast with the background
          light: '#FAFAFA',     // Slightly brighter white for better visibility on dark backgrounds
        },
        border: {
          light: '#C0C0C0',     // A bit darker grey for clearer border definition
        },
      },
    },
  },
  plugins: [],
};
