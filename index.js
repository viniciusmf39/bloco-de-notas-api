const express = require('express');

const server = express();

server.use(express.json());

const blocos = [] ;
let id = [];

function verifyData(req,res,next) {
    const {titulo, conteudo, data , hora} = req.body ;

    if(!titulo){
        return res.json ({
            error: ' titulo é obrigatório'
        });
    }else if(!conteudo){
        return res.json ({
            error : 'conteúdo é obrigatório' ,
        });
    }else if (!data){
        return res.json({
            error:'data é obrigatório' ,
        }) ;
    } else if (!hora){
        retutn res.json({
            error:'hora é obrigatório' 
        }) ;
    }
    next();
}

server.get('/' , (req,res)=> {
    return res.json({
        result:'Crie uma nota'
    }) ;
}) ;

server.get('/blocos' , (req,res)=>{
    return res.json({blocos})
});

server.get('/blocos/:id' ,(req,res) =>{
    const {id} = req.params ;

    return res.json({
        result: 'bloco encontrado ',
        bloco : blocos[id]
    });
});

server.put('/blocos',(req,res)=>{
    const {titulo, conteudo, data, hora} = req.body ;
    const {id} = req.params;

    const bloco = {
        id,
        titulo,
        conteudo,
        data,
        hora
    }
    id ++

    blocos[id] = bloco ;
    return res.json({
        result: 'Bloco atualizado',
    });
});

server.post('/blocos',verifyData,(req,res)=>{
    const {titulo, conteudo, data, hora} = req.body ;

    const bloco = {titulo, conteudo, data, hora};

    blocos.push(bloco);

    return res.json(bloco);
});

server.delete('/blocos/:id',(req,res)=>{
    const {id} = req.params ;

    blocos.splice(id,1);

    return res.json({
        result:'bloco apagado'
    });
});

server.listen(process.env.PORT) ;