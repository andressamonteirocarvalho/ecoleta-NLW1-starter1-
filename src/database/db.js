//importar a depêndencia do sqlite3
const sqlite3 = require("sqlite3").verbose()// essa parte do require me retonar um objeto para colocar na const, funçao quando reside dentro de um objeto é chamado de método

//criar o objeto que irá fazer operações no banco de dados
const db = new sqlite3.Database("./src/database/database.db")

module.exports = db

//usar o objeto de banco de dados, para nossas operações 
//Esta função(ou seja método por que está atrelada a um objeto) serialize  ele só quer dizer que será rodado uma sequencia de código
//db.serialize(() => {

    //Com comandos SQL eu vou:

    // 1- Criar uma tabela 
 //   db.run(`
 //       CREATE TABLE IF NOT EXISTS places (
 //           id INTEGER PRIMARY KEY AUTOINCREMENT,
 //           image TEXT,
 //           name TEXT,
//            address TEXT,
//            address2 TEXT,
//            state TEXT,
//            city TEXT,
//            items TEXT
//        );
//    `)

//     2- inserir dados na tabela 
//    const query = `
//        INSERT INTO places (
//            image,
//            name,
//            address,
//            address2,
//            state,
//            city,
//            items
//        ) VALUES (?,?,?,?,?,?,?);
//`
//    const values = [
//        "https://images.unsplash.com/photo-1567393528677-d6adae7d4a0a?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=750&q=80",
//        "Papersider",
//        "Guilherme Gemballa, Jardim América",
//        "Número 260",
//        "Santa Catarina",
//        "Rio do Sul",
//        "Resíduos Eletrônicos, Lâmpadas"
//    ]

//    function afterInsertData(err){
//        if(err){
//            return console.log(err)
//        }

//        console.log("Cadastrado com sucesso")
//        console.log(this)
//    }

//    db.run(query, values, afterInsertData )

      // 3- consultar dados na tabela 
    //db.all(`SELECT name FROM places`, function(err, rows){
    //   if(err){
    //      return console.log(err)
     //   }

       // console.log("Aqui estão seus registros:")
        //console.log(rows)
   // })


    // 4- deletar dados na tabela
    //db.run(`DELETE FROM places WHERE id = ?`, [3], function(err){
    //    if(err){
    //      return console.log(err)
    //    }

    //   console.log("Registro deletado com sucesso!")
    //})

  

//})