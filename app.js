require("dotenv").config();
const express = require("express");
const app  = express();

app.listen(process.env.PORT,()=>{
    console.log(`Server has been started at port ${process.env.PORT}`);
})

app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Add Access Control Allow Origin headers //To allow CORS from a certain endpoint 
//"*" = access from any site
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://tropicane.co");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });

app.get('/:brand/:watt',(req,res)=>{
    if(req.params.brand!='' && req.params.watt!=''){
        let brand = (req.params.brand).toLowerCase();
        let result=[];
        if(brand=='longi'){
            result[0]='Longi Solar';
            switch(req.params.watt){
                case '400': result[1]='Hi-MO 4m LR4-72HPH';break;
                case '500': result[1]='Hi-MO 5m LR5-72HPH';break;
                case '600': result[1]='Hi-MO 6 Scientist LR5-72HTH';break;
            }
        }
        if(brand=='trina'){
            result[0]='Trina Solar';
            switch(req.params.watt){
                case '400': result[1]='Trina Tallmax TSM-DE15M(II)';break;
                case '500': result[1]='Trina Vertex TSM-DE19';break;
                case '600': result[1]='Trina Vertex TSM-DEG21C.20';break;
            }
        }
        if(brand=='jasolar'){
            result[0]='JA Solar';
            switch(req.params.watt){
                case '400': result[1]='JA Solar Deep Blue 3.0 Pro JAM54D30';break;
                case '500': result[1]='JA Solar Deep Blue 3.0 Pro JAM72S30';break;
                case '600': result[1]='JA Solar Deep Blue 3.0 Pro JAM78D30';break;
            }
        }
        res.send({"brand":result[0],"model":result[1]});
    }else{
        res.sendStatus(404);
    }
})

app.post('/',(req,res)=>{
    if(req.body.brand!='' && req.body.watt!=''){
        if((req.body.brand.toLowerCase()=='grid-tied' ||req.body.brand.toLowerCase()=='off-grid' ||req.body.brand.toLowerCase()=='hybrid') && (req.body.watt>=1000 && req.body.watt<=10000)){
            console.log(req.body.brand +' ' +req.body.watt);
            res.send({'message':'Data has been posted to the server successfully.','brand':req.body.brand,'watt':req.body.watt});
        }
        else{
            res.send({'message':'Data not entered correctly. Please try again.'});
        }
    }
    else{
        res.sendStatus(404);
    }
    
})