const esbuild = require('esbuild')
const { nodeExternalsPlugin } = require('esbuild-node-externals')
const { resolve } = require('path')

const pkg = require('../package.json')

const mainPath = resolve(__dirname, '..', 'src', 'index.ts')

const configDefault = {
  entryPoints: [mainPath],
  bundle: true,
  minify: true,
  platform: 'node',
  target: 'node16',
  plugins: [nodeExternalsPlugin()],
}

const execute = async () => {
  try {
    await esbuild.build({ ...configDefault, outfile: pkg.main, format: 'cjs' })
    await esbuild.build({
      ...configDefault,
      outfile: pkg.module,
      format: 'esm',
    })

    console.log('⚡ Done')
  } catch (error) {
    process.exit(1)
  }
}

execute()
