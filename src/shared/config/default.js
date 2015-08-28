let port = (process.env.PORT || '3000');

let config = {
    port: port,
    baseUrl: 'http://localhost:' + port,
    jsUrl: "//localhost:8081"
};

if (process.env.BROWSER){ //client side
    config.baseUrl = '//' + location.host;
}

export default config;
