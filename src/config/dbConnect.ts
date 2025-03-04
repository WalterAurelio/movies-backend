import mongoose from "mongoose";

const DATABASE_URI = process.env.DATABASE_URI;

const connectDatabase = async () => {
  try {
    await mongoose.connect(DATABASE_URI!, {
      dbName: 'MoviesAppDB'
    });
  } catch (error: unknown) {
    if (error instanceof Error) console.log(`Error en la conexión a MongoDB. ${error.message}`);
  }
};

export default connectDatabase;