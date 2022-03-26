import mongoose from 'mongoose';

class MongooseContext {
  async connect(config: {
    connectionString: string;
    username: string;
    password: string;
  }) {
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      authSource: 'admin',
      auth: {
        username: config.username,
        password: config.password,
      },
    };
    try {
      await mongoose.connect(config.connectionString, options);
    } catch (err) {
      console.error('could not connect to db:', config.connectionString, err);
      process.exit(1);
    }
  }
}

export const MongooseClient = new MongooseContext();
