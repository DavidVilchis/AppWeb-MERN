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
const passport_jwt_1 = require("passport-jwt");
const database_1 = __importDefault(require("../database"));
const config_1 = __importDefault(require("../config/config"));
const options = {
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config_1.default.jwtSecret
};
exports.default = new passport_jwt_1.Strategy(options, (payload, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const collection = (yield database_1.default).collection("users");
        const user = yield collection.findOne({ email: payload.email });
        if (user === null) {
            return done(null, false);
        }
        return done(null, user);
    }
    catch (error) {
        console.log(error);
    }
}));
