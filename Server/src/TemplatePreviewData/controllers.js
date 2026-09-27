import TemplatePreviewData from "./model.js";

const createPreviewData = async() => {
const { id , previewData } = req.body;
if(!id || !previewData) {
    return res
           .status(404)
           .json({
            status : 404,
            message : "id and previewData are required"
           });
}

const templatePreviewData = await TemplatePreviewData.create({
id,
previewData
});

if(!templatePreviewData) {
return res
       status(505)
       .json({
        status : 505,
        message : "couldn't create preview data try again"
       });
}

return res
       .status(201)
       .json({
        status : 201,
        message : "template preview data created successfully"
       });

};

const fetchPreviewData = async() => {
 const templatePreviewData = await TemplatePreviewData.find().sort({createdAt : 1})

 if(!templatePreviewData) {
    return res
          .status(505)
          .json({
              status : 505,
              message : "couldn't fetch preview data"
          });
 }

   return res
          .status(300)
          .json({
              status : 300,
              templatePreviewData,
              message : "preview data fetched successfully"
          })

};

export {
    createPreviewData,
    fetchPreviewData
}