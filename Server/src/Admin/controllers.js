import User from "../User/model.js";
import LiveForms from "../LiveForms/model.js";
import TemplatesCategoryList from "../TemplatesCategoryList/model.js";
import mongoose from "mongoose";


const fetchPlatformAnalytics = async(req , res) => {
const [ 
  totalPlatformUsers,
  totalPlatformTemplates,
  totalPlatformForms,
] = await Promise.all([
  User.find()
    .select("email location")
    .lean(),

  TemplatesCategoryList.countDocuments(),

  LiveForms.aggregate([
    {
      $group: {
        _id: "$form_status",
        count: { $sum: 1 },
      },
    },
  ]),
])

if(!totalPlatformUsers || !totalPlatformForms || !totalPlatformTemplates) {
    return res
           .status(501)
           .json({
            status : 501,
            message : "something went wrong!"
           })
}

return res
       .status(300)
       .json({
        status : 300,
        data  : {
            totalPlatformUsers,
            totalPlatformForms,
            totalPlatformTemplates
        }
       });
};

export {
    fetchPlatformAnalytics
}