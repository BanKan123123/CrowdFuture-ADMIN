import type { Config } from 'tailwindcss';

const config: Config = {
     content: [
          './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
          './src/components/**/*.{js,ts,jsx,tsx,mdx}',
          './src/app/**/*.{js,ts,jsx,tsx,mdx}',
     ],
     theme: {
          extend: {
               colors: {
                    background: 'var(--background)',
                    foreground: 'var(--foreground)',
               },
               backgroundImage: {
                    'abstract-bg': `
                      radial-gradient(circle at 20% 20%, rgba(0, 209, 255, 0.1), transparent 40%),
                      radial-gradient(circle at 80% 80%, rgba(255, 0, 153, 0.1), transparent 40%),
                      radial-gradient(circle at 50% 50%, rgba(112, 0, 255, 0.1), transparent 60%)
                    `,
                    'grid-pattern': `
                      linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
                    `,
               },
               backgroundSize: {
                    'grid-size': '30px 30px',
               },
          },
     },
     plugins: [],
};
export default config;
