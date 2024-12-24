import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url); // Ruta completa del archivo actual
const __dirname = path.dirname(__filename);       // Directorio del archivo actual


const config = () => {
  return {
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: 'main.js'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          },
        },
        {
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
        },
      ],
    },
  }
}

export default config