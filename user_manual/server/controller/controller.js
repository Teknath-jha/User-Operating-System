var Userdb=require('../model/model');

//create and save new user 
exports.create = (req,res)=>{
    //validate request
    if(!req.body){
        res.status(400).send({message: "Content cannot be empty"});
        return ;
    }

    //new user 
    const user = new Userdb({
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        status: req.body.status
    });

    //save user in database 
    user.save()
    .then(data=>{
        // res.send(data);
        res.redirect('/add-user');
    })
    .catch(err=>{
        
        res.status(500).send({message:err.message || "Error occured during create operation "});
    });
}

//retrive and return all users / retrive and return a single user 
exports.find = (req,res)=>{

    if(req.query.id){          // for single user 
        const id = req.query.id;

        Userdb.findById(id)
        .then(data=>{
            if(!data){
                res.status(404).send({message: "User not found with id "+id})
            }else{
                res.send(data)
            }
        })
        .catch(err=>{
            res.status(500).send({message:"Error retrieving user with id "+id})
        })

    }else{                        // for all user 
    Userdb.find()
    .then(user=>{
        res.send(user)
    })
    .catch(err=>{
        res.status(500).send({message:err.meaasge || "Error Occured while retriving user information"})
    })}

}

//update a new identified user by user id 
exports.update = (req,res)=>{

    if(!req.body){
        return res
        .status(400)
        .send({message: "data to update cannot empty"})
    }

    const id = req.params.id;
    Userdb.findByIdAndUpdate(id,req.body,{useFindAndModify:false})
    .then(data=>{
         if(!data){
            res
            .status(404)
            .send({message: `Cannot update user with ${id}.Maybe user not found!`})
         }else{
             res.send(data)
         }
    })
    .catch(err=>{
        res
        .status(500)
        .send({message: "Error update user information!"})
    })


}

//Delete a user with specified user id in the request 
exports.delete = (req,res)=>{
    const id = req.params.id;

    Userdb.findByIdAndDelete(id)
    .then(data=>{
        if(!data){
        res.status(400).send({message: `Cannot Delete with id ${id}. Maybe id is wrong`});
        }else{
            res.send({message: "User was deleted successfully!"})
        }
    })
    .catch(err=>{
        res.status(500).send({message: "Could not delete User with id="+id});
    });

}