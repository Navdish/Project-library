const {authService} = require('../service');

exports.createUser = async (req, res)=>{
    try {
      const user = await authService.create({data : req?.body})
      res.status(201).json({message : "user added successfully"})
    }
    catch (error) {
      res.status(error?.code).json({message : error?.message});
    }
}

exports.loginUser = async (req, res)=>{
    try {
      console.log("user login")
      const user = await authService.login({data : req?.body});
      console.log(user);
      res.status(200).json({user, message: "user loggedin successfully"});
    }
    catch(error) {
      res.status(error?.code).json({message : error?.message});
    }
}