const jwt = require("koa-jwt");

const initJWT = jwt({secret: 'shhhhh', passthrough: true}).unless({path: ["/gettoken"]})


module.exports = initJWT
