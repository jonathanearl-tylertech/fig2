import mongoose from 'mongoose';

class MongooseContext {
  async connect(config: {
    connectionString: string;
  }) {
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      authSource: 'admin',
    };
    try {
      await mongoose.connect(config.connectionString);
    } catch (err) {
      console.error('could not connect to db:', config.connectionString, err);
      process.exit(1);
    }
  }
}

export const MongooseClient = new MongooseContext();
