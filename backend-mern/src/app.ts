import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import passport from 'passport';
import passportMiddleware from './middlewares/passport';

import authRouter from './routes/auth.routes';
import taskRouter from './routes/tasks.routes';

const App = express();

//Configuraciones
App.set('port', process.env.PORT || 3000);

//Middlewares
App.use(morgan('dev'));
App.use(cors());
App.use(express.urlencoded({extended: false}));
App.use(express.json());
App.use(passport.initialize());
passport.use(passportMiddleware);

//Routes
App.get('/', (req, res) => {
    res.send(`Success, Port Server: ${App.get('port')}`);
});
App.use(authRouter);
App.use(taskRouter);

export default App;