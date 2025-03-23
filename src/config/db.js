// db.js - Archivo de conexión a PostgreSQL
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
const { Pool } = require('pg');

// Crear el pool de conexión usando variables de entorno
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || 5432,
});

// Función para probar la conexión
const testConnection = async () => {
  let client;
  try {
    client = await pool.connect();
    console.log('✅ Conexión exitosa a PostgreSQL');
    
    // Consulta básica para verificar conexión
    const result = await client.query('SELECT NOW()');
    console.log('Hora del servidor PostgreSQL:', result.rows[0].now);
    
    return true;
  } catch (error) {
    
    console.error('❌ Error al conectar con PostgreSQL:', error);
    return false;
  } finally {
    // Siempre liberar el cliente cuando hayas terminado
    if (client) client.release();
  }
};

// Exportar el pool y la función de prueba
module.exports = {
  pool,
  testConnection,
  query: (text, params) => pool.query(text, params)
};