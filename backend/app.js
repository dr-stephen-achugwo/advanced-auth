const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const globalErrorHandler = require('./controller/errorController');
const userRouter = require('./routes/userRouters');
const AppError = require('./utils/appError');

const app = express();

app.use(cookieParser());

app.use(
    cors({
        origin: [
            'https://next-auth-typescript.netlify.app', //for nextjs netlify frontend api
            'http://localhost:5173', //for react local frontend api
            'http://localhost:3000', //for nextjs local frontend api
            'https://auth-react-mu-seven.vercel.app',
            'https://eclectic-sherbet-15d12d.netlify.app',
            'https://auth-nextjs-typescript-frontend.netlify.app'
        ],
        credentials: true
    })
);

app.use(express.json({ limit: '50mb' }));

// Users api urls============
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
