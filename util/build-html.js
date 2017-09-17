import cheerio from 'cheerio';
import fs from 'fs';

/* Builds the Page Source */
fs.readFile('src/client/index.html', 'utf8', (err, markup) => {
  if (err) {
    return console.log(err);
  }

  const $ = cheerio.load(markup);

  /* Adds Compiled Stylesheet */
  $('head').prepend('<link rel="stylesheet" href="styles.css">');

  /* Writes the Page Source */
  fs.writeFile('src/client/dist/index.html', $.html(), 'utf8', (e) => {
    if (e) {
      return console.log(e);
    }
    console.log('index.html generated in src/client/dist');
  });
});
