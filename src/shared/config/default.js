let port = (process.env.PORT || '3000');

export default {
    port: port,
    baseUrl: 'http://localhost:' + port,
    jsUrl: "//localhost:8081"
};
