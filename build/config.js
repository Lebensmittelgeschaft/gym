"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = {
    environment: process.env.NODE_ENV || 'Dev',
    database: {
        host: 'localhost',
        port: '27017',
        db: 'gym' + (process.env.NODE_ENV || 'Dev'),
    },
    server: {
        host: 'localhost',
        port: 3000,
    },
};
//# sourceMappingURL=config.js.map