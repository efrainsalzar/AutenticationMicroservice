// test-connection.js
const { testConnection } = require('./config/db');

// Probar la conexión y luego finalizar el proceso
testConnection()
  .then(success => {
    if (success) {
      console.log('La prueba de conexión a la base de datos fue exitosa');
    } else {
      console.log('La prueba de conexión a la base de datos falló');
    }
    // Salir del proceso después de la prueba
    process.exit(0);
  })
  .catch(error => {
    console.error('Error durante la prueba de conexión:', error);
    process.exit(1);
  });