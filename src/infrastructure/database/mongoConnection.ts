import mongoose from 'mongoose';

export const connectToMongoDB = async () => {
  try {
    await mongoose.connect('mongodb://admin:admin@localhost:27017', {
      authSource: 'admin',
    });
    console.log('[MongoDB] Conectado com sucesso');
  } catch (error) {
    console.error('[MongoDB] Erro ao conectar:', error);
    process.exit(1); // Encerra o app se não conectar
  }
};
