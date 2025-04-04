import { createServer } from 'node:http';
import { parse } from 'node:url';
import { readFile } from 'node:fs';

createServer((req, res) => {
    let parsedUrl = parse(req.url, true);
    let filename = '.' + parsedUrl.pathname + '.html';

    if (parsedUrl.pathname === '/') {
        filename = './index.html'
    }

    readFile(filename, (err, data) => {
        if (err) {
            console.log(err);

            readFile('404.html', (err404, data404) => {
                if (err404) {
                    res.writeHead(404, { 'Content-Type': 'text/plain' });
                    return res.write('404 Not Found.');
                }

                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.write(data404);
                return res.end();
            })

            return;
        }

        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        return res.end();
    })

}).listen(8080);