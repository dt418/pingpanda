import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import tailwindcssPlugin from 'eslint-plugin-tailwindcss';
import path from "node:path";
import { fileURLToPath } from "node:url";

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
        'simple-import-sort/imports': 'error',
        'simple-import-sort/exports': 'error',
        'tailwindcss/classnames-order': 'warn', // Enforce order of classnames for Tailwind CSS
        'tailwindcss/no-custom-classname': 'warn', // Warns on custom class names not defined in Tailwind
    },
    ignores: ["**/node_modules/**", "**/dist/**"],
}];

export default config;
