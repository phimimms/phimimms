import cheerio from 'cheerio';
import fs from 'fs';

fs.readFile('src/index.html', 'utf8', (err, markup) => {
    if (err) {
        return console.log(err);
    }

    const $ = cheerio.load(markup);

    $('head').prepend('<link rel="stylesheet" href="styles.css">');

    fs.writeFile('dist/index.html', $.html(), 'utf8', (e) => {
        if (e) {
            return console.log(e);
        }
        console.log('index.html generated in /dist');
    });
});
