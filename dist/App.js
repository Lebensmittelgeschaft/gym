"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
// import * as mongoose from 'mongoose';
const mongoose = require("mongoose");
const config_1 = require("./config");
class App {
    constructor() {
        this.app = express();
        this.mountRoutes();
        mongoose.Promise = global.Promise;
        mongoose.connect('mongodb://' + config_1.config.database.host +
            ':' + config_1.config.database.port + '/' + config_1.config.database.db, { useMongoClient: true });
        // const dir = process.cwd();
        // this.app.use('/assets', express.static(dir + 'public'));
        // this.app.set('view engine', 'ejs');
        this.app.listen(config_1.config.server.port, () => console.log('Server running on!' + config_1.config.server.port));
    }
    mountRoutes() {
        const router = express.Router();
        router.get('/', (req, res) => {
            res.json({
                message: 'Hello World gal!',
            });
        });
        this.app.use('/', router);
    }
}
exports.default = App;
// export default new App().app
// export default App;
//# sourceMappingURL=App.js.map