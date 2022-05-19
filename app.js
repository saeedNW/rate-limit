const express = require("express");
const rateLimit = require('express-rate-limit');
const app = express();

const apiLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minutes
    max: 50, // Limit each IP to 100 requests per `window` (here, per 1 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    handler: (request, response, next, options) =>
        response.status(options.statusCode).json({
            error: {
                message: options.message,
                status: options.statusCode,
                method: request.method,
                path: request.baseUrl
            }
        }),
})

// Apply the rate limiting middleware to API calls only
app.use('/api', apiLimiter, (req, res) => {
    res.json({message: "info loaded"});
})

app.listen(8000, () => {
    console.log("server is online on port 8000");
})