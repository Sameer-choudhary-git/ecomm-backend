const Category_model = require('../models/category.model');

exports.createCategory = async (req,res)=>{
    const request_body = req.body;
    const categoryObj ={
        title:request_body.title,
        description:request_body.description
    }
    try {
        const category = await Category_model.create(categoryObj);
        return res.status(201).send(category);    
    } catch (err) {
        console.log("error while creating category: ",err);
        return res.status(500).send({
            message:"error while creating category"
        });
    }
    
}