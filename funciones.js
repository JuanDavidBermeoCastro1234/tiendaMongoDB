db.productos.insertOne({_id:11,name:"Chocolatina de borojó",categoria:"Snack",precio:4000,stock:35,tags:["dulce","energia"]})

db.clientes.insertOne({_id:15,nombre:"Mario Mendoza",correo:"mario@email.com",preferencias:["energetico","natural"]})

db.productos.find({precio:{$gt:20}})

db.clientes.find({$or:[
  {compras:{$exists:false}},
  {compras:{$size:0}}]})

db.productos.updateOne({nombre:"Borojó deshidratado"},
                       {$inc:{stock:10}})


db.productos.updateOne({categoria:"Bebida"},
                       {$push:{tags:"bajo azucar"}})

db.clientes.deleteOne({email:"juan@email.com"})

db.productos.deleteMany({stock:{$lt:5}})

db.productos.find({nombre:{$regex:"^Boro"}})

db.productos.find({nombre:{$regex:"con"}})

db.clientes.find({nombre:{$regex:"z", $options:"i"}})

db.clientes.find({preferencias:{$in:["natural"]}})

db.productos.find({tags:{$all:["natural","orgánico"]}})

db.productos.aggregate([{$match:{$expr:{$gt:[{$size:"$tags"},1]}}}])

db.ventas.aggregate([{$unwind:"$productos"},
{$group:{_id:"$productos.productoId",
sumaTotal:{$sum:"$productos.cantidad"}}}])

db.clientes.aggregate([{ $unwind: "$compras" }, { $group: { _id: "$nombre", ventas: { $sum: "$compras" } } }])

db.ventas.aggregate([
  {
    $group: {
      _id: { mes: { $month: "$fecha" } },
      ventas: { $sum: "$total" }}}])

db.productos.aggregate([{$group:{_id:"$categoria", promedio:{$avg:"$precio"}}}])

db.productos.aggregate([ {$sort:{stock:-1}},
                        {$limit:3}])

db.system.js.insertOne({_id:"calcularDescuento",value: new Code ("function(precio,porcentaje){return precio/porcentaje;}")})
if (condition) {
  
}

db.system.js.insertOne({_id:"clienteActivo",value:new Code("function(a){const b = db.clientes.aggregate([{$match:{_id:a}},{$unwind:$productos},{$group:{_id:$nombre,compras:{$sum:$compras}}},{$proyect:{nombre:1,estado:{$cond:{if:{$gte:[$compras,3]},then: true, else:falso}}}}]}; return b;}")})

db.ventas.aggregate([{$unwind:"$productos"},

  db.clientes.aggregate([{ $unwind: "$compras" }, { $group: { _id: "$nombre", ventas: { $sum: "$compras" } } }])


// pruebas que no funcionaron  db.system.js.insertOne({
//   _id: "clienteActivo",
//   value: new Code(`function(a){
//     const resultado = db.clientes.aggregate([
//       { $match: { _id: a } },
//       {
//         $project: {
//           nombre: 1,
//           estado: {
//             $cond: {
//               if: { $gte: [ { $size: "$compras" }, 3 ] },
//               then: true,
//               else: false
//             }
//           }
//         }
//       }
//     ]).toArray();
//     return resultado.length > 0 ? resultado[0].estado : false;
//   }`)
// });

// db.system.js.insertOne({_id:"clienteActivo",value:new Code("function(a){const resultado=db.clientes.aggregate([{$match:{_id:a}},{$project:{nombre:1,estado:{$cond:{if:{$gte:[{$size:$compras},3]},then:true,else:false}}}]).toArray();return resultado;}")});

// db.system.js.insertOne({_id:"clienteActivo",value:new Code("function(a){const resultado=db.clientes.aggregate([{$match:{_id:a}},{$project:{nombre:1,estado:{$cond:{if:{$gte:[{$size:\"$compras\"},3]},then:true,else:false}}}]).toArray();return resultado;}")});

// db.system.js.insertOne({_id: "clienteActivo",value: new Code(`function(id) {const cliente = db.clientes.findOne({ _id: id }); if (cliente.compras.length >= 3) then:true,else:false}; return cliente;}`)});


// db.system.js.insertOne({_id: "clienteActivo",value: new Code("function(id){const cliente=db.clientes.findOne({_id:id});if(clientes.compras.length>=3){return true;}else{return false;}}")});


// // Definir una función clienteActivo(idCliente) que devuelva true si el cliente tiene más de 3 compras registradas.


// db.system.js.insertOne({_id: "clienteActivo", value: new Code("function(id){const cliente=db.clientes.findOne({_id:id});return (cliente && cliente.compras && cliente.compras.length>=3)?(print:true):false;}")});

// print(true)


// db.system.js.insertOne({_id: "clienteActivo",value: new Code("function(id){var cliente=db.clientes.findOne({_id:id});return (cliente && cliente.compras && cliente.compras.length>=3) ? (print(true), true) : false;}")});


function clienteActivo(id) {var cliente = db.clientes.findOne({ _id: id });return (cliente && cliente.compras && cliente.compras.length >= 3) ? (print("Cliente activo:", true), true) : (print("Cliente inactivo:", false), false);}


function clienteActivo(id) {var cliente = db.clientes.findOne({ _id: id });return (cliente.compras.reduce((suma,numero)=> suma+numero,0))>=3 ? (print("Cliente activo:", true), true) : (print("Cliente inactivo:", false), false);}

