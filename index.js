const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()
const string_connection = require('./BaseDatos/db');

app.use(cors())
mongoose.connect(string_connection.DB_URL,{ useNewUrlParser:true });
const db = mongoose.connection

const Post = require('./Models/postModel');
const postRouter = require('./Route/postRoute');

db.on('error',error=>{
   console.error("ERROR: ",error);
})
app.use(express.json())

app.use('/',postRouter);

app.post('/posts',(request,response)=>{
  
    const {
    title,
    date,
    content,
    image
    } = request.body
    
    const post = new Post({
        title,
        date,
        content,
        image
    })
    
    post.save()

    response.json({
        success:true,
        message: 'Modelo creado exitosamente',
        payload:{
            post 
        }
    })
})

app.get('/posts', async (request,response)=>{
    
    const posts = await Post.find({}).exec()
    
    response.json({
        success:true,
        message:'Aqui estan los posts',
        payload:{
            posts
        }
    })
})

app.put('/update/:id', async (request,response)=> {
 
    const {id} = request.params

    const updatePost = await Post.findOne({ _id:id }).exec();
    updatePost.title = request.body.title;
    updatePost.content = request.body.content;
    updatePost.date = request.body.date;
    updatePost.image = request.body.image;

    updatePost.save();
    console.log(updatePost);

    response.json({
        success:true,
        message:'Modelo actualizado exitosamente..',
        payload:{
            updatePost
        }
    })
   
})

app.delete('/posts/:id',async (request,response)=>{  
    try {
        const {id} = request.params
        console.log('id: ',id);    
        const deletedPost = await Post.findOneAndDelete({ _id:id }).exec()
        
        if(!deletedPost) throw new Error(`No existe el id <${id}>`)
        
        response.json({
            success:true,
            message: 'id',
            payload:{
               deletedPost
            }
        }) 
    } catch (error) {
      response.json({
          success:false,
          error:error.message
      })   
    }
})

db.once('open', ()=> {   
    console.log('DB connected');
    app.listen(8080,function(){
        console.log('Nigga');
    });
})

