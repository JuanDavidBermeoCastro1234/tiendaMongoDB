function verificar(productoId,cantidadDeseada){
  
  const verificar2 = db.productos.findOne({_id:productoId});
  if (cantidadDeseada<=verificar2.stock) {
    return print("suficiente")
  } else {
   return print("insuficiente")
  }
   } 



function verificar(productoId,cantidadDeseada){const verificar2 = db.productos.findOne({_id:productoId});if (cantidadDeseada<=verificar2.stock) {return print("suficiente")} else {return print("insuficiente")}} 