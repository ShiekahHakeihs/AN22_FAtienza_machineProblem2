const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authenticateUser = async(req,res,next) =>{
	const token = req.headers.authorization;
	if(!token){
		return res.status(401).json({message:'Authentication Required'});
	}
	try{
		const decodedToken = jwt.verify(token, 'secret_key');
		const user = await User.findbyId(decodedToken.id);
		if(!user){
			return res.status(404).json({message:'User not Found'});
		}
		req.user = user;
		next();		
	} catch(error){
		return res.status(401).json({message:'Invalid Token.'});
	};
};

module.exports = {authenticateUser};