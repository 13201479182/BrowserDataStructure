const esbuild = require('esbuild');
const { resolve } = require('path');

const eslint = require('esbuild-plugin-eslint');
const progress = require('esbuild-plugin-progress');

const { name } = require('./package.json');

esbuild
    .build({
        entryPoints: [resolve(__dirname, './src/index.ts')],
        outfile: resolve(__dirname, `./dist/${name}.js`),

        format: 'iife',
        bundle: true,
        treeShaking: true,
        sourcemap: true,
        // minify: true,

        plugins: [
            progress(),
            eslint({
                filter: /\.ts$/,
                fix: true,
            }),
        ],
    })
    .catch(() => process.exit(1));
