const { User } = require('../model')
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const CustomError = require('../lib/error');

exports.create = async({data})=> {
    const {name, email, password, role} = data;
    if(!(name && email && password)) throw new CustomError("User credentials not found", 422);
    const user = await User.findOne({email});
    if(user) throw new CustomError("email already exists", 409);
    // check if the admin makes the new admin
    const hash = await bcrypt.hash(password, saltRounds);
    if(!hash) throw new CustomError("hash not created", 500);
    const response = await User.create({ name, email, password : hash});
    if(!response) throw new CustomError("internal server error", 500)
    return response;
}

exports.login = async function({data}) {
    const {email, role} = data;
    const pwd = data.password;
    console.log(data);
    if(!(email && pwd && role)) throw new CustomError("User credentials not found", 422);
    const userFetched = await User.findOne({email : email});
    if(!userFetched) throw new CustomError("User doesn't exist", 404);
    const match = await bcrypt.compare(pwd, userFetched.password);
    if(!( match)) throw new CustomError("User password is wrong", 401);
    if(userFetched.role !== role) throw new CustomError("User doesn't exist for this role", 404); 
    const token = jwt.sign({id : userFetched._id}, 'Zenmonk', {
        expiresIn: '4h'
    })
    if(!token) throw new CustomError("Token not generating", 500);
    const {_id, password, ...user} = userFetched._doc;
    return {token, user};
}
