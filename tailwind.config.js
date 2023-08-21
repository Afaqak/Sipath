/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'blue-event': '#3B82F6',
        'green-event': '#10B981',
        'yellow-event': '#F59E0B',
        'purple-event': '#8B5CF6',
        'pink-event': '#EC4899',
        'red-event': '#EF4444',
      },
      ringColor: {
        'blue-event-ring': '#2563EB', // Slightly darker shade of blue
        'green-event-ring': '#047857', // Slightly darker shade of green
        'yellow-event-ring': '#D97706', // Slightly darker shade of yellow
        'purple-event-ring': '#5B21B6', // Slightly darker shade of purple
        'pink-event-ring': '#D94691', // Slightly darker shade of pink
        'red-event-ring': '#DC2626', // Slightly darker shade of red
      },
    },
  },
  plugins: [],
};
