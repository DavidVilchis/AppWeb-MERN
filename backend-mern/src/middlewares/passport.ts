import { User } from "../models/user";
import { Strategy, ExtractJwt, StrategyOptions } from "passport-jwt";
import connection from "../database";
import config from "../config/config";

const options:StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwtSecret
};

export default new Strategy(options, async (payload, done) =>{
    try{
        const collection = (await connection).collection("users");
        const user = await collection.findOne({email: payload.email});
        if(user === null){
            return done(null, false);
        }
        return done(null, user);
    }
    catch (error){
        console.log(error);
    }
});