const checkCategory = async (req, res, next)=>{
    try{
        //Check for the title
        
        if(!req.body.title){
            return res.status(400).send({
                message : "Failed ! Title was not provied in request body"
            })
        }
        //Check for the description
        if(!req.body.description){
            return res.status(400).send({
                message : "Failed ! Description was not provied in request body"
            })
        }
        next()

    }catch(err){
        console.log("Error while validating the request object", err)
        res.status(500).send({
            message :"Error while validating the request body"
        })
    }
}

