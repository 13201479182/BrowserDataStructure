const esbuild = require('esbuild');
const { resolve } = require('path');

const eslint = require('esbuild-plugin-eslint');
const progress = require('esbuild-plugin-progress');
const fs = require('fs');

const target = process.env.target.trim();
const outfile = target === 'cjs' ? `./dist/bundle.cjs.cjs` : `./dist/bundle.${target}.js`;

esbuild
    .build({
        entryPoints: [resolve(__dirname, './src/index.ts')],
        outfile: resolve(__dirname, outfile),

        format: target,
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
            iifeResourcePlugin(),
        ],
    })
    .catch(() => process.exit(1));

function iifeResourcePlugin() {
    return {
        name: 'iifeResourcePlugin',
        setup(build) {
            build.onLoad({ filter: /src\\index\.ts$/ }, (args) => {
                if (target === 'iife') {
                    let content = fs.readFileSync(args.path, 'utf-8');
                    content += `
                        if (typeof window) {
                            window.webfontDataStructor = dataStructor
                        }
                    `;

                    return {
                        contents: content,
                        loader: 'js',
                    };
                }
            });
        },
    };
}
