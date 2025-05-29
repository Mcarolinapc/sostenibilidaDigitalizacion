import express from "express";
import fs from "fs";
import {PORT, SECRET_JWT_KEY} from './config.js'
import { UserRepository } from './user-repository.js';
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser';
import infoRoutes from './Routes/infoRoutes.js';

const app = express();//paso1 prepara el servidor
//app.use(bodyParser.json());//transforma de forma binaria a format json (serializacion)
app.use(express.json());
app.use(express.static("public"));//carpeta publica pel css
app.set('view engine','ejs');//Fem servir el motor ejs
app.set('views', './views'); //carpeta on desem els arxius .ejs
app.use(cookieParser()) //permite leer cookies


// este valida en cualquier peticion que le llegue , valida el token y lo guarda en la sesion de usuario.
app.use((req,res,next)=>{
    const token =req.cookies.access_token
    req.session={user: null}
    console.log('token' + token)
    try{
        const data=jwt.verify(token,SECRET_JWT_KEY)//Que devuelve esto.
        req.session.user=data
        console.log(req.session)
    }catch(error){
        req.session.user=null
    }
    next() // seguir a la siguiente ruta o middleware.
});

// Middleware para proteger rutas (requiere autenticación)
function requireAuth(req, res, next) {
    if (!req.session.user) {
        return res.redirect('/');
    }
    next();
}

const genericFooter = '© 2025 Grupo 7 | ODS 7 - Energía Asequible y No Contaminante';

// Página principal (login/registro) - pública
app.get('/', (req, res) => {
    const { user } = req.session;
    res.render('index', user);
});

app.post('/register', async (req,res)=>{
    //aqui el body es el cuerpo de la petición
    const {username,password}=req.body
    console.log(req.body)
    try{
        const id= await UserRepository.create({username,password});
        res.send({id})
    }catch(error){
        //No es buena idea mandar el error del repositorio
        res.status(400).send(error.message)
    }
});

app.post('/login',async(req,res)=>{
    try{
        const {username,password}=req.body 
        const user = await UserRepository.login({username, password})
        console.log ("llego aqui 1")
        const token = jwt.sign(
            {
                id: user._id, username: user.username
            },
                SECRET_JWT_KEY,
                {
                    expiresIn:'1h'
                }
        )
        console.log("llego aqui al expire")

        res
        .cookie('access_token',token,{
            httpOnly: true,
            secure:process.env.NODE_ENV === 'production',
            sameSite:'strict',
            maxAge:1000*60*60

        })
        .send({user,token});

    }catch(error){
        //401 = no autorizado 
        res.status(401).send(error.message)

    }

});


//log out

app.post('/logout', (req, res) => {
    res.clearCookie('access_token'); // nombre de la cookie
    res.status(200).json({ message: 'Sesión cerrada' });
  });



//Esto es mi pagina 

app.get("/home", requireAuth, (req, res) => {
    const { user } = req.session;
    res.render("home", { ...user, footerText: genericFooter });
});

// Pasar genericFooter a infoRoutes en cada request
app.use('/', requireAuth, (req, res, next) => {
    req.genericFooter = genericFooter;
    next();
}, infoRoutes);


app.listen(3005, () => {
    console.log("Servidor en http://localhost:3005");
});
//app.use(express.static("public"));

// internamente es nuestra url localhost los que sea , y le digo de normal me sirves home , y  luego si viner/usuario / te vas al fichero que esta 
//inndicado aqui './Routes/usuarios.js'