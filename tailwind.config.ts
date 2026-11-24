import type { Config } from 'tailwindcss';
export default {
  darkMode: 'class',
  content: ['./src/**/*.{ts,tsx}'],
  theme: { extend: {
    colors: { bg: 'var(--bg)', surface: 'var(--surface)', sand: 'var(--sand)', ink: 'var(--ink)', muted: 'var(--muted)', line: 'var(--line)', gold: 'var(--gold)', sage: 'var(--sage)', pine: '#2A1F1A', pine2: '#4A372D', brass: '#E4A877', brass2: '#EDBA90', copper: '#A55524', copper2: '#8C4619' },
    fontFamily: { display: ['"Noto Kufi Arabic"', 'sans-serif'], sans: ['"IBM Plex Sans Arabic"', 'system-ui', 'sans-serif'] },
  } },
} satisfies Config;
