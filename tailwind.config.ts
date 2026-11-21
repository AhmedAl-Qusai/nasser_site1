import type { Config } from 'tailwindcss';
export default {
  darkMode: 'class',
  content: ['./src/**/*.{ts,tsx}'],
  theme: { extend: {
    colors: { bg: 'var(--bg)', surface: 'var(--surface)', sand: 'var(--sand)', ink: 'var(--ink)', muted: 'var(--muted)', line: 'var(--line)', gold: 'var(--gold)', pine: '#12302B', pine2: '#1B4540', brass: '#DDB06A', brass2: '#EBC384' },
    fontFamily: { display: ['"El Messiri"', 'serif'], sans: ['"Readex Pro"', 'system-ui', 'sans-serif'] },
  } },
} satisfies Config;
