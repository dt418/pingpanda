import path from "node:path";
import { fileURLToPath } from "node:url";

import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import tailwindcssPlugin from 'eslint-plugin-tailwindcss';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

const config = [...compat.extends("next/core-web-vitals"), {
    plugins: {
        "simple-import-sort": simpleImportSort,
        "tailwindcss": tailwindcssPlugin
    },
    rules: {
        'simple-import-sort/imports': [
            'error',
            {
                groups: [
                    // 1. Node.js built-in modules
                    ['^node:', '^fs', '^path', '^os', '^http', '^https', '^url', '^stream'],
            
                    // 2. React and Next.js specific imports
                    ['^react', '^next', '^@next'],
                                
                    // 3. Third-party modules and side effect imports
                    ['^@?\\w'],
            
                    // 4. Side effect imports (CSS, global styles)
                    ['^\\u0000'],
            
                    // 5. Aliased imports (if using path aliases)
                    ['^@/'],
            
                    // 6. Internal components and utilities
                    ['^components/', '^utils/', '^hooks/', "^lib/"],
            
                    // 7. Relative imports
                    ['^\\.'],
                  ],
            },
        ],
        'simple-import-sort/exports': 'error',
        'tailwindcss/classnames-order': 'warn', // Enforce order of classnames for Tailwind CSS
        'tailwindcss/no-custom-classname': 'warn', // Warns on custom class names not defined in Tailwind
    },
    ignores: ["**/node_modules/**", "**/dist/**"],
}];

export default config;
