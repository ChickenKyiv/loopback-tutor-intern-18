'use sctric'

module.exports = function(server) {
    var router = server.loopback.Router();

    router.post('/customers', function(req, res, next) {
        console.log(req);
    })

    server.use(router);
}