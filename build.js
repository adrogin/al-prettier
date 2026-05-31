#!/usr/bin/env node
/**
 * Build script for AL Prettier VS Code Extension
 * Uses esbuild to bundle the extension
 *
 * Usage:
 *   node build.js              - Development build
 *   node build.js --watch      - Watch mode
 *   node build.js --production - Production build (minified)
 */

const esbuild = require('esbuild');

const isWatch = process.argv.includes('--watch');
const isProduction = process.argv.includes('--production');

const buildOptions = {
    entryPoints: ['./vscode_ext/src/extension.js'],
    bundle: true,
    outfile: './vscode_ext/dist/extension.js',
    external: ['vscode'],
    format: 'cjs',
    platform: 'node',
    target: 'node16',
    sourcemap: isProduction ? false : 'external',
    minify: isProduction,
    // Prettier v3 uses createRequire(import.meta.url) to dynamically load Node built-ins.
    // esbuild replaces import.meta with {} in CJS output, making .url undefined.
    // We inject a proper URL so createRequire gets a valid base path.
    banner: {
        js: 'const __importMetaUrl = require("url").pathToFileURL(__filename).href;',
    },
    define: {
        'import.meta.url': '__importMetaUrl',
    },
};

async function build() {
    const mode = isProduction ? 'Production' : 'Development';
    if (isWatch) {
        console.log('Building in watch mode...');
        const ctx = await esbuild.context(buildOptions);
        await ctx.watch();
        console.log('Watching for changes...');
    } else {
        console.log(`Building AL Prettier extension (${mode})...`);
        await esbuild.build(buildOptions);
        console.log(`${mode} build complete!`);
    }
}

build().catch((err) => {
    console.error('Build failed:', err);
    process.exit(1);
});
