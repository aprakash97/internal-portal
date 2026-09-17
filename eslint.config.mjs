import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import prettier from 'eslint-config-prettier/flat';
import eslintPluginTailwindcss from 'eslint-plugin-tailwindcss';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  prettier,
  eslintPluginTailwindcss.configs['recommended'] ||
    eslintPluginTailwindcss.configs['flat/recommended'],
  {
    settings: {
      // Define the tailwindcss settings with the MANDATORY `cssConfigPath`
      tailwindcss: {
        cssConfigPath: '/app/glo',
      },
    },
    // Optional: Customize the rules to your needs
    rules: {
      'tailwindcss/classnames-order': 'warn',
      'tailwindcss/no-arbitrary-value': 'warn',
      'tailwindcss/no-custom-classname': [
        'warn',
        { whitelist: ['custom\\-*'] },
      ],
      'tailwindcss/no-contradicting-classname': 'warn',
    },
  },

  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
  ]),
]);

export default eslintConfig;
