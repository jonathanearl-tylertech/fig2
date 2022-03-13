import mongoose from 'mongoose';

class MongooseContext {
  async connect(options: {connectionString: string, username: string, password: string}) {
    try {
      await mongoose.connect(
        options.connectionString ?? 'mongodb://localhost:27017/fig',
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          authSource: "admin",
          auth: {
            user: options.username ?? 'admin',
            password: options.password ?? 'admin'
          }
        }
      );
    } catch(err) {
      console.error('could not connect to db:', options.connectionString, err);
    }
  }
}

export const MongooseClient = new MongooseContext();