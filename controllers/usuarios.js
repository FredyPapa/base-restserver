const {response, request} = require("express");
const bcryptjs = require("bcryptjs");

const Usuario = require("../models/usuario");

const usuariosGet = async(req=request,res=response,next)=>{
    const {limite = 5, desde = 0} = req.query;
    const query = {estado:true};
    //
    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
   ]);
   //
    res.json({
        total,
        usuarios
    });
}

const usuariosPut = async(req,res=response,next)=>{
    const {id} = req.params;
    const {_id, password, google, correo, ...resto} = req.body;

    //TODO validar contra base de datos
    if(password){
        //Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password,salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id,resto);

    res.json(usuario);
}

const usuariosPost = async(req,res=response,next)=>{
    
    //Si es conforme obtenemos los valores a guardar
    const {nombre,correo,password,rol} = req.body;
    const usuario = new Usuario({nombre,correo,password,rol});
    
    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password,salt);
    //Guardar en BD
    await usuario.save();
    res.json({
        //msg: "post API - controlador",
        usuario
    });
}

const usuariosDelete = async(req,res=response,next)=>{
    //
    const {id} = req.params;
    //Eliminarción física
    //const usuario = await Usuario.findByIdAndDelete(id);
    
    //Eliminación lógica
    const usuario = await Usuario.findByIdAndUpdate(id,{estado:false});
    //
    res.json({
        usuario
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