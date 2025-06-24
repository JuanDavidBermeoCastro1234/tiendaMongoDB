

function clienteActivo(id) {
  const cliente = db.clientes.findOne({ _id: id });
  if (cliente && cliente.compras.length >= 3) {
    return true;
  } else {
    return false;
  }
}
