import * as express from 'express';
// import * as mongoose from 'mongoose';
import mongoose = require('mongoose');
import { userModel } from './User/user.model';
import { config } from './config';

export default class App {
  public app;

  constructor() {
    this.app = express();
    this.mountRoutes();

    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://' + config.database.host +
                     ':' + config.database.port + '/' + config.database.db, 
                     { useMongoClient: true });

    // const dir = process.cwd();

    // this.app.use('/assets', express.static(dir + 'public'));
    // this.app.set('view engine', 'ejs');

    this.app.listen(config.server.port, () =>
      console.log('Server running on!' + config.server.port));

  }

  private mountRoutes(): void {
    const router = express.Router();
    router.get('/', (req, res) => {
      res.json({
        message: 'Hello World gal!',
      });
    });
    this.app.use('/', router);
  }
}

// export default new App().app
// export default App;
