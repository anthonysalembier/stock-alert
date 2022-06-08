import http from 'http';
import checkingPollerService from './services/checking-poller.service.js';
import facebookGraphApiService from './services/facebook-graph-api.service.js';
import { configureLogger } from './services/logger.service.js';
import constants from './config/constants.js';

const hostname = '127.0.0.1';
const port = 8090;

configureLogger()

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Server is running...');
});

server.listen(port, hostname, async () => {
    console.log(`
---------------------------------------------------------------
/                   Welcome on Stock Alert!                   /
/                                                             /
/                                            $"   *.          /
/                d$$$$$$$P"                  $    J           /
/                    ^$.                     4r  "            /
/                    d"b                    .db               /
/                   P   $                  e" $               /
/          ..ec.. ."     *.              zP   $.zec..         /
/      .^        3*b.     *.           .P" .@"4F      "4      /
/    ."         d"  ^b.    *c        .$"  d"   $         %    /
/   /          P      $.    "c      d"   @     3r         3   /
/  4        .eE........$r===e$$$$eeP    J       *..        b  /
/  $       $$$$$       $   4$$$$$$$     F       d$$$.      4  /
/  $       $$$$$       $   4$$$$$$$     L       *$$$"      4  /
/  4         "      ""3P ===$$$$$$"     3                  P  /
/   *                 $       """        b                J   /
/    ".             .P                    %.             @    /
/      %.         z*"                      ^%.        .r"     /
/         "*==*""                             ^"*==*""        /
---------------------------------------------------------------
    `);

    console.log(`Server running at http://${hostname}:${port}/`);

    checkingPollerService.startStockChecking(constants.STOCK_IDS);

    try {
        await facebookGraphApiService.postServiceRunning();
    } catch (error) {
        console.error(error);
    }
});
