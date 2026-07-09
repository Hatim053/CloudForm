import User from "../User/model.js";

const seedAdmin = async(req , res) => {
 const email = process.env.ADMIN_EMAIL_ID;
 const username = process.env.ADMIN_USERNAME;
 const role = process.env.ADMIN_ROLE;

const adminExist = await User.findOne({email : email});
if(adminExist) {
    return console.log("Admin Already Exist");
}
const admin = await User.create({
    email : email,
    username : username,
    role : role
});
if(!admin) {
    return console.log("could not create Admin something went wrong");
}
console.log('Admin created successfully');

};

export default seedAdmin;