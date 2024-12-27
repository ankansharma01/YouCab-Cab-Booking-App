const userModel = require('../Models/user_model')


module.exports.createUser = async ({firstname,lastname,email,password})=>{
    if(!firstname || !email || !password)
    {
        throw new Error('All Fields required')
    }
    const user = userModel.create(
        {
            fullname:{
                firstname,
                lastname
            },
            email,
            password
        }
    )
    return user;
}