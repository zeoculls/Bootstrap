var express = require("express");
var bodyParser = require("body-parser")
var Sequelize = require('sequelize')
var path = require('path')

var app = express();
//password-hash

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname + '/_')));




app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  next();
})


var sequelize = new Sequelize('grado', 'Javier', 'aaaaaaaa', {
      dialect: "postgres", // or 'sqlite', 'postgres', 'mariadb'
      port:    5432, // or 5432 (for postgres)
    })
 
sequelize
  .authenticate()
  .complete(function(err) {
    if (!!err) {
      console.log('Unable to connect to the database:', err)
    } else {
      console.log('Connection has been established successfully.')
    }
  })


sequelize
  .sync({ force: false }) // TRUE PARA BORRAR TODO
  .complete(function(err) {
     if (!!err) {
       console.log('Error creando tablas:', err)
     } else {
       console.log('POSTGRES OK!')
     }
  })


var Usuario = sequelize.define('Usuario', {
  id_usuario: { 
      type: Sequelize.UUID, 
      defaultValue: Sequelize.UUIDV4, 
      primaryKey: true
    },
  nickname: Sequelize.STRING,
  nombre: Sequelize.STRING,
  apellidos: Sequelize.STRING,
  direccion: Sequelize.STRING,
  codigoPostal: Sequelize.INTEGER,
  fechaNacimiento: Sequelize.STRING,
  fotoAvatar: Sequelize.STRING,
  email: Sequelize.STRING,
  telefono: Sequelize.INTEGER,
  password: Sequelize.STRING
  }, 
  {
  	fechaModificacion: 'last_update',
  	fechaCreacion: 'date_of_creation'
})

var Servicio = sequelize.define('Servicio', {
  id_Servicio: { 
      type: Sequelize.UUID, 
      defaultValue: Sequelize.UUIDV4, 
      primaryKey: true
    },
  nickname: Sequelize.STRING,
  titulo: Sequelize.STRING,
  descripcion: Sequelize.TEXT,
  linkfoto: Sequelize.STRING,
  precio: Sequelize.INTEGER,
  grupo: Sequelize.STRING,
  ofertaDemanda: Sequelize.BOOLEAN,
  codigoPostal: Sequelize.INTEGER,
  usuario: Sequelize.STRING,
  posicion: Sequelize.STRING,
  fechaFin: Sequelize.DATE
  },
 {
  	fechaModificacion: 'last_update',
  	fechaCreacion: 'date_of_creation'
})

 var Usuario = Usuario.build({
  password: 'i-am-so-great',
  nickname: 'Zeoculls',
  nombre: 'Javier',
  apellidos: 'Portabales',
  direccion: 'Querol',
  codigoPostal: 28033

 })
 
 Usuario
   .save()
   .complete(function(err) {
     if (!!err) {
       console.log('ERROR INSERTANDO Usuario:', err)
     } else {
       console.log('Insertado nuevo usuario')
     }
   })

// var recado = Recado.build({
//   descripcion: 'john-doe',
//   usuario: 'i-am-so-great',
//   posicion: 'Madrid'
// })
 
// recado
//   .save()
//   .complete(function(err) {
//     if (!!err) {
//       console.log('ERROR INSERTANDO Recado:', err)
//     } else {
//       console.log('Insertado nuevo recado')
//     }
//   })


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.listen(4000,function(){

	console.log("Serviendo puerto 4000")
 
})



// app.get('/', function (req, res) {
//   console.log(req)
//   res.render('indexaaaa.php');
//   //console.log(req)
// })

app.get('/list',function(req,res) {
  //res.send('Peticion a list recibida')

  Recado.all().complete(function(err,allrecados){
    console.log('Aqui !!')
    //console.log(allrecados[0].dataValues['usuario'])
    for( i in allrecados ) {
    console.log(allrecados[i].dataValues['usuario'])
  }
    res.send(allrecados)
  })
  // sequelize
  // .query('SELECT * FROM "Recados"', Recado)
  // .recados.all().complete(function(err,listarecados) {
  //   // Mostrar cada recado en consola
  //   //console.log(recado.dataVaules.id)
  // console.log(listarecados)

  // //console.log(recado.dataVaules.usuario)

  // })
})

// accept POST request on the homepage
app.post('/recado', function (req, res) {
  res.send('Got a POST request');
//  console.log(req)


//Insertar el recado que han enviado
	var recado = Recado.build({
  descripcion: req.body.descripcion,
  usuario: req.body.usuario,
  posicion: req.body.posicion
})
 
recado
  .save()
  .complete(function(err) {
    if (!!err) {
      console.log('ERROR INSERTANDO Recado:', err)
    } else {
      console.log('Insertado nuevo recado')
      console.log(req.body.descripcion)
      console.log(req.body.usuario)
      console.log(req.body.posicion)

    }
  })
})