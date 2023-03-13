const mongoose = require('mongoose')

const DB_URI = `mongodb://127.0.0.1:27017/my_app_node`

module.exports = () => {

    async function connect(){
        try {
            await mongoose.connect(DB_URI)
            console.log("Conectado con éxito")
        } catch (error) {
            console.log("No se pudo conectar: " + error)
        }
    }
    connect();
}