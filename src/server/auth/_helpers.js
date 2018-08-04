/// Questo file ha la sola funzione di creare il metodo di hashing che useremo negli altri file della cartella "auth"

const bcrypt = require('bcryptjs');

function comparePass(userPassword, databasePassword) {
  return bcrypt.compareSync(userPassword, databasePassword);
}

module.exports = {
  comparePass
};