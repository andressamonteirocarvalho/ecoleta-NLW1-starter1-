const express = require("express")
const server = express() // server é um objeto de servidor para que eu possa usar várias coisas

//pegar banco de dados
 const db = require("./database/db")

//Configurar pasta pública, sempre que eu usar a função use, eu estou fazendo uma configuração do meu servidor
server.use(express.static("public"))

//Habilitar o uso do req.body na nossa aplicação
server.use(express.urlencoded({extended: true}))

//Utilizando o template engine
const nunjucks = require("nunjucks") // Estou pendindo do meu node modules o nunjucks, ou seja eu estou pedindo, um modulo ou uma dependencia, que eu ja instalei
nunjucks.configure("src/views", {
    express: server,
    noCache: true //cache significa que ele está salvando algumas coisas na memória para devolcer-me de forma mais rápida, quando vc esta usando o nunjucks ele guarda algumas coisas em memória para te respinder mais rápido
}) 

//configurar caminhos da minha aplicação
//pagina inicial
server.get("/", (req, res) =>{
    return res.render("index.html", { title: "Um título"}) //A função send tem toda a capacidade de enviar de volta esta resposta p/ nossa pagina. O dirname significa qual o diretorio e o nome do diretório em que estou
})

server.get("/create-point", (req, res) =>{

    //req.query: Query Strings da nossa url
    //console.log(req.query)

    return res.render("create-point.html") //A função send tem toda a capacidade de enviar de volta esta resposta p/ nossa pagina. O dirname significa qual o diretorio e o nome do diretório em que estou
})

server.post("/savepoint", (req,res) => {

    //req.body: O corpo do nosso formulário
    //console.log(req.body)

    //Inserir dados no banco de dados
        const query = `
            INSERT INTO places (
                image,
                name,
                address,
                address2,
                state,
                city,
                items
            ) VALUES (?,?,?,?,?,?,?);
    `
        const values = [
            req.body.image,
            req.body.name,
            req.body.address,
            req.body.address2,
            req.body.state,
            req.body.city,
            req.body.items,
        ]
    
        function afterInsertData(err){
            if(err){
                console.log(err)
                return res.send("Erro no cadastro")
            }
    
            console.log("Cadastrado com sucesso")
            console.log(this)

            return res.render("create-point.html", {saved: true})
        }
    
        db.run(query, values, afterInsertData )
    
})

server.get("/search", (req, res) =>{

    const search = req.query.search
    if(search == ""){
        //Pesquisa Vazia
        return res.render("search-results.html", { total: 0})
    }

    //pegar os dados do banco de dados
     db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows){
       if(err){
          return console.log(err)
        }

        console.log("Aqui estão seus registros:")
        console.log(rows)

        const total = rows.length //Ela conta o total de elemntos dentro do array

        //Mostrar a página html com os dados do banco de dados
        return res.render("search-results.html", { places: rows, total: total}) 
     })

})
// Ligar o servidor
server.listen(3000)