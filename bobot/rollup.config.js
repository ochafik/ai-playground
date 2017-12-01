import typescript from 'rollup-plugin-typescript';

export default {
  entry: './src/main.ts',
  output: {
    file: 'build/index.js',
    format: 'iife'
  },
  plugins: [
    typescript({
      typescript: require('typescript')
    })
  ]
}