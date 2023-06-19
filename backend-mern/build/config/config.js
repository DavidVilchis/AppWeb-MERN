"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    jwtSecret: process.env.JWT_SECRET || 'somesecrettoken',
    DB: {
        URI: process.env.MONGODB_URI || 'mongodb+srv://jdvadmin:C7PIoyrrsvMWlORb@mern.8yvbjtl.mongodb.net/?retryWrites=true&w=majority',
        USER: process.env.USER,
        PASSWORD: process.env.PASSWORD
    }
};
