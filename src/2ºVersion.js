//En esta colección cada cliente puede tener varios telefonos moviles pero cada telefono tiene un numero unico y no lo puede tener mas de un cliente, es una estructura 1:N.

db.clientes.drop()
db.clientes.insertMany([
    {dni: "74355392A", nombre: "RAUL", apellido: "HARO ARROYO", numTelefono:"684834565"},
    {dni: "15778094W", nombre: "ANGEL", apellido: "RUBIO TENDERO", numTelefono:"6137750893"},
    {dni: "00569294K", nombre: "JAIME ", apellido: "RUIZ MATE", numTelefono:"6527274275"},
    {dni: "15668724C", nombre: "JOSE", apellido: "FABRA MONTAÑEZ", numTelefono:"6646572731"},
    {dni: "91303302H", nombre: "MARTIN", apellido: "VEIGA REGUEIRA", numTelefono:"696100199"},
    {dni: "00569294K", nombre: "JAIME ", apellido: "RUIZ MATE", numTelefono:"6426130729"},
])

db.telefonos.drop()
db.telefonos.insertMany([
    {telefono: "684834565", modelo: "redmi note 8 pro", marca: "Xiaomi"},
    {telefono: "6137750893", modelo: "redimi 9 pro", marca: "Xiaomi"},
    {telefono: "6527274275", modelo: "6", marca: "Realme"},
    {telefono: "6646572731", modelo: "S21 ultra", marca: "samsung"},
    {telefono: "696100199", modelo: "X50", marca: "Realme"},
    {telefono: "6426130729", modelo: "Mi 10", marca: "Xiaomi"}

])

//En esta consulta mostraremos las adquisiciónes de telefonos de los clientes juntos con los detalles de estos.
db.clientes.aggregate(
    [{
         $lookup: {
            from: "telefonos",
            localField: "numTelefono",
            foreignField: "telefono",
            as: "detallesTelefono"
            }
        },
        {
            $project: {
                _id: 0,
               nombre: 1,
               apellido: 1,
               numTelefono: 1,
               "detallesTelefono.modelo": 1,
               "detallesTelefono.marca": 1,
               }
           }
      ]
).pretty()
