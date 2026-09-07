const jwt=require('jsonwebtoken')
const multer=require('multer')
const path=require('path')

const auth = (req, res, next) => {
    try{
    const authToken = req.headers.authorization
    const token = authToken.split(" ")[1]
    const decoded = jwt.verify(token, process.env.jwt_secret);
    req.Id=decoded.id
    next()
    }
    catch(err){
        console.log(err)
    }
}

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"uploads/")
    },
    filename:(req,file,cb)=>{
         const uniqueName = Date.now() + path.extname(file.originalname);
        cb(null, uniqueName);
    }
})

const upload=multer({storage:storage})


module.exports= {auth,upload}