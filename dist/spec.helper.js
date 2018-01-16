"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const config_1 = require("./config");
const mochaAsync = (fn) => {
    return (done) => __awaiter(this, void 0, void 0, function* () {
        try {
            yield fn();
            done();
        }
        catch (err) {
            done(err);
        }
    });
};
before(() => __awaiter(this, void 0, void 0, function* () {
    mongoose.Promise = global.Promise;
    mongoose.connect(`mongodb://${config_1.config.database.host}/${config_1.config.database.db}`, { useMongoClient: true });
    /*mongoose.connection.dropDatabase(console.error);
  
    const removeCollectionPromises = [];
  
    for (const i in mongoose.connection.collections) {
      removeCollectionPromises.push(mongoose.connection.collections[i].remove({}));
    }
  
    await Promise.all(removeCollectionPromises); */
}));
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
//# sourceMappingURL=spec.helper.js.map