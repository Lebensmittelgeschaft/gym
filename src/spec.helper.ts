import mongoose = require('mongoose');
import { config } from './config';

const mochaAsync = (fn) => {
  return async (done) => {
    try {
      await fn();
      done();
    } catch (err) {
      done(err);
    }
  };
};

before(async () => {
  mongoose.Promise = global.Promise;
  mongoose.connect(`mongodb://${config.database.host}/${config.database.db}`,
                   { useMongoClient: true });
  /*mongoose.connection.dropDatabase(console.error);

  const removeCollectionPromises = [];

  for (const i in mongoose.connection.collections) {
    removeCollectionPromises.push(mongoose.connection.collections[i].remove({}));
  }

  await Promise.all(removeCollectionPromises); */
});

/* beforeEach(async () => {
//  mongoose.connection.dropDatabase(console.error);
// });
  
  const removeCollectionPromises = [];

  for (const i in mongoose.connection.collections) {
    removeCollectionPromises.push(mongoose.connection.collections[i].remove({}));
  }

  await Promise.all(removeCollectionPromises);
}); */

after((done) => {
  mongoose.disconnect();

  done();
});
