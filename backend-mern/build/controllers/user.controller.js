"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signIn = exports.signUp = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const database_1 = __importDefault(require("../database"));
const config_1 = __importDefault(require("../config/config"));
const createToken = (user) => {
    return jsonwebtoken_1.default.sign({ email: user.email }, config_1.default.jwtSecret, { expiresIn: 86400 });
};
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.email || !req.body.password || !req.body.name || !req.body.lastname) {
        return res.status(400).json({ msj: "El registro no se logro realizar, verifique que los datos sean correctos." });
    }
    if (req.body.password.length < 9) {
        return res.status(400).json({ msj: "La contraseña debe ser mínimo de 10 caracteres" });
    }
    const collection = (yield database_1.default).collection("users");
    let user = yield collection.findOne({ email: req.body.email });
    if (user !== null) {
        return res.status(400).json({ msj: `El usuario ${user.email}, que se intenta crear, ya existe` });
    }
    const salt = yield bcrypt_1.default.genSalt(10);
    let newDocument = {
        name: req.body.name,
        lastname: req.body.lastname,
        email: req.body.email,
        password: yield bcrypt_1.default.hash(req.body.password, salt)
    };
    collection.insertOne(newDocument);
    return res.status(200).json(newDocument);
});
exports.signUp = signUp;
const signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({ msj: "Ingresa el correo electrónico y la contraseña." });
    }
    const collection = (yield database_1.default).collection("users");
    let user = yield collection.findOne({ email: req.body.email });
    if (user === null) {
        return res.status(400).json({ msj: "El correo electrónico o la contraseña no son validos." });
    }
    let isMatch = yield bcrypt_1.default.compare(req.body.password, user.password);
    if (!isMatch) {
        return res.status(400).json({ msj: "El correo electrónico o la contraseña no son validos." });
    }
    return res.status(200).json({ msj: `¡Bienvenido ${user.name}!`, token: createToken(user) });
});
exports.signIn = signIn;
