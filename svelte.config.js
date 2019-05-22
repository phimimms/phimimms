/* eslint-disable @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires */
const sass = require('node-sass');

module.exports = {
  preprocess: {
    style({ attributes, content }) {
      if (attributes.type !== 'scss') {
        return Promise.resolve();
      }

      return new Promise((resolve, reject) => {
        sass.render(
          {
            data: content,
            outFile: 'x',
            sourceMap: true,
          },
          (err, { css: code, map } = {}) => {
            if (err) {
              return reject(err);
            }

            return resolve({
              code: code.toString(),
              map: map.toString(),
            });
          },
        );
      });
    },
  },
};
