import type { Config } from 'tailwindcss';
export default {
  darkMode: 'class',
  content: ['./src/**/*.{ts,tsx}'],
  theme: { extend: {
    colors: { bg: 'var(--bg)', surface: 'var(--surface)', sand: 'var(--sand)', ink: 'var(--ink)', muted: 'var(--muted)', line: 'var(--line)', navy: '#0F294A', gold: 'var(--gold)' },
    fontFamily: { display: ['"Reem Kufi"', 'serif'], sans: ['"IBM Plex Sans Arabic"', 'system-ui', 'sans-serif'] },
  } },
} satisfies Config;
