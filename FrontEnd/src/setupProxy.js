const proxy = require('http-proxy-middleware');

module.exports = function(app){
    app.use(
        '/api/',
        proxy({
            target: 'https://api.steampowered.com/ISteamApps/GetAppList/v2/?key=29E2F9718C66A7C0545E3C6882ABE0EA',
            changeOrigin: true,
        })
    );
};

// '/api/**',
//         proxy({
//             target: 'https://api.steampowered.com/ISteamApps/GetAppList/v2/',
//             changeOrigin: true,
//             "headers" : {
//                 "host": "/api.steampowered.com/ISteamApps/GetAppList/v2/"
//             },
//             "cookieDomainRewrite" : ""
//         })