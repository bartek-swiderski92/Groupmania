const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTYzNDMxMjk0MywiaWF0IjoxNjM0MzEyOTQzfQ.ItNXyQddj_arej08iGQYY6uua2xua9hmNfNGk6bzxX8');
        const userId = decodedToken.id;
        if (req.body.userId && req.body.userId != userId) {
            throw 'Invalid user ID';
        } else {
            res.locals.userId = userId
            next();
        }
    } catch (error) {
        res.status(403).json({
            status: 403,
            message: 'Authorization error: ' + error
        });
    }
};