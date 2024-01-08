var jwt = require('jsonwebtoken');

exports.checktokrn = async (req,res,next) => {
    jwt.verify(req.headers.authorization, 'cdmi', next)
}