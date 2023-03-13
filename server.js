/*Importamos dependencias*/
const express = require('express');
const initDB = require('./app/config/db')
const path = require('path');
const app = express();
const model = require('./app/models/user')

/*Seteamos el puerto*/
const port = 3001;

/*Usamos Json encode y urlencode. Definir antes de rutas */
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

/*Servimos archivos estaticos desde la carpeta public */
app.use(express.static(path.join(__dirname, 'public')));


/*Setemoas las rutas que vamos a usar */
app.post('/authlogin', async(req, res) => {
    const {username} = req.body;
    try {
        const usersQuery = await model.findOne({username})
        if (!usersQuery){
            res.status(500).send("El usuario no existe")
        } else {  
            if ((req.body.password) == usersQuery.password){
                res.send("Logueado con éxito")
            } else {
                res.status(500).send("La contraseña no coincide")
            }   
            /* res.status(200).json(usersQuery)             */
        }
    } catch (error) {
        res.send("Hubo un problema con la consulta")
    }
    
    }
)

app.post('/register', async(req, res) => {
    const user = new model({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    })

    try {
        const result = await user.save()
        res.send("Registrado con éxito")
    } catch (error) {
        res.send('Algo fue mal')
    }
})


/*Ponemos en escucha el puerto */
app.listen(port, () => {
    console.log('Hola Mundo')
})




initDB();