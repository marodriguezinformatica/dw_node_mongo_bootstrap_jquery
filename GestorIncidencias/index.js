const mongoose = require("mongoose");
const app = require("./app") //
const port = process.env.PORT || 3600; //
const urlMongoDb = "mongodb+srv://root:pass@nodedb.utda2.mongodb.net/myDB"

mongoose.connect(urlMongoDb,(err,res)=>{
    try {
        if(err){
            throw err
        }
        else{
            console.log("La conexión a la base de datos es correcta");

            app.listen(port, () =>{ //
                console.log("Server running at http://localhost:"+port)//
            });//
        }
    } catch (error) {
        console.log(error);
    }
});