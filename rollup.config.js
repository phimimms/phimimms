import babel from 'rollup-plugin-babel';

export default {
  input: 'src/server/server.js',
  output: {
    file: 'src/server/server.compiled.js',
    format: 'cjs',
  },
  plugins: [
    babel({
      babelrc: false,
      exclude: 'node_modules/**',
      presets: [
        [
          'es2015',
          {
            modules: false,
          },
        ],
        'stage-2',
      ],
    }),
  ],
};
