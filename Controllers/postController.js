
Post = require('../Models/postModel');

exports.init = function(request,response){
    response.json({
        success:true,
        message:'HOLA DESDE NUESTRA API'
    })
}

