const {response, request} = require("express");

const usuariosGet = (req=request,res=response,next)=>{
    const {q,nombre="sin nombre",apikey,page=1,limit} = req.query;
    res.json({
        msg: "get API - controlador",
        q,
        nombre,
        apikey,
        page,
        limit
    });
}

const usuariosPut = (req,res=response,next)=>{
    const {id} = req.params;
    res.json({
        msg: "put API - controlador",
        id
    });
}

const usuariosPost = (req,res=response,next)=>{
    //const body = req.body;
    const {nombre,edad} = req.body;
    res.json({
        msg: "post API - controlador",
        nombre,
        edad
    });
}

const usuariosDelete = (req,res=response,next)=>{
    res.json({
        msg: "delete API - controlador"
    });
}

const usuariosPatch = (req,res=response,next)=>{
    res.json({
        msg: "patch API - controlador"
    });
}
module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch
}