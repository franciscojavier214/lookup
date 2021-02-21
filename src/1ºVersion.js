// En esta colección cada socio puede adquirir varios libros y cada libro puede ser solicitado por varios socios, es una colección on una estructura N:M.


db.socios.drop()
db.socios.insertMany([
    {dni: "74355392A", nombre: "RAUL", apellido: "HARO ARROYO", telefono:"684834565", libroAdquirido:"9788425223280"},
    {dni: "15778094W", nombre: "ANGEL", apellido: "RUBIO TENDERO", telefono:"6137750893", libroAdquirido:"1291239123394"},
    {dni: "00569294K", nombre: "JAIME ", apellido: "RUIZ MATE", telefono:"6527274275", libroAdquirido:"4576793495545"},
    {dni: "15668724C", nombre: "JOSE", apellido: "FABRA MONTAÑEZ", telefono:"6646572731", libroAdquirido:"4576793495545"},
    {dni: "91303302H", nombre: "MARTIN", apellido: "VEIGA REGUEIRA", telefono:"696100199", libroAdquirido:"8386412323212"},
    {dni: "44450251Z", nombre: "HUGO", apellido: "ORGAZ CAVERO", telefono:"6426130729", libroAdquirido:"2522342523426"},
    {dni: "15778094W", nombre: "ANGEL", apellido: "RUBIO TENDERO", telefono:"6137750893", libroAdquirido:"4576793495545"},
    {dni: "44450251Z", nombre: "HUGO", apellido: "ORGAZ CAVERO", telefono:"6426130729", libroAdquirido:"8386412323212"},
    {dni: "15668724C", nombre: "JOSE", apellido: "FABRA MONTAÑEZ", telefono:"6646572731", libroAdquirido:"7654345512343"}
])

db.libros.drop()
db.libros.insertMany([
    {isbn: "9788425223280", titulo: "Las Guerreras Maxwell", editorial: "Alamut"},
    {isbn: "4576793495545", titulo: "Llevame a casa", editorial: "Aquitania"},
    {isbn: "1291239123394", titulo: "El huerto de Emerson", editorial: "Panini"},
    {isbn: "8386412323212", titulo: "Delparaiso", editorial: "Malpasoycia"},
    {isbn: "7654345512343", titulo: "El infinito en un junco", editorial: "Blackie Books"},
    {isbn: "2522342523426", titulo: "Los privilegios del angel", editorial: "la Galera"}
])

// En esta consulta con el operador $lookup mostraremos los registros de socios que han tomado prestado un libro.
db.socios.aggregate(
    [{
         $lookup: {
            from: "libros",
            localField: "libroAdquirido",
            foreignField: "isbn",
            as: "detallesLibroAdquirido"
            }
        },
        {
         $project: {
             _id: 0,
            nombre: 1,
            apellido: 1,
            "detallesLibroAdquirido.titulo": 1,
            "detallesLibroAdquirido.editorial": 1,
            }
        }]
).pretty()


