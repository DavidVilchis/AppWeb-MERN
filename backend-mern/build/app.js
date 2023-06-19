"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const passport_1 = __importDefault(require("passport"));
const passport_2 = __importDefault(require("./middlewares/passport"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const tasks_routes_1 = __importDefault(require("./routes/tasks.routes"));
const App = (0, express_1.default)();
//Configuraciones
App.set('port', process.env.PORT || 3000);
//Middlewares
App.use((0, morgan_1.default)('dev'));
App.use((0, cors_1.default)());
App.use(express_1.default.urlencoded({ extended: false }));
App.use(express_1.default.json());
App.use(passport_1.default.initialize());
passport_1.default.use(passport_2.default);
//Routes
App.get('/', (req, res) => {
    res.send(`Success, Port Server: ${App.get('port')}`);
});
App.use(auth_routes_1.default);
App.use(tasks_routes_1.default);
exports.default = App;
