
require('dotenv').config();

//servidor web
require('http').createServer((req, res) => {
    //process.env.NODE_ENV //VALOR DINAMICAMENTE DEFINIDO QUE ENVOLVE OS PROCESSOS DE PRODUÇÃO
    res.end(JSON.stringify({
        server: process.env.NODE_ENV,
        valorExportNoTerminal: process.env.VALORTERMINAL,
        GITHUB_TOKEN: process.env.GITHUB_TOKEN
    }));
}).listen(3000);
console.log("rodando");

//npm run dev
//npm run start
//npm install --save dotenv
//npm install --save cross-env
//cmd:      setx VALORTERMINAL valor
//PS:       $Env:VALORTERMINAL="teste"
//dotenv pra ter acesso a variavel de ambiente, no hweroku pu no rancher por ex, existem uma interface pra definir lá


//cross-env útil pra setar a variavel com um comando em qualquer ambiente
/*
    "scripts": {
        "start": "SET NODE_ENV=production & node index.js",
        "dev": "SET NODE_ENV=development & nodemon index.js"
    },
    "scripts": {
        "start": "cross-env NODE_ENV=production node index.js",
        "dev": "cross-env NODE_ENV=development nodemon index.js"
    },
*/

//lambida?
//dotenv safe?