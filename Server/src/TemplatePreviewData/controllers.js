import TemplatePreviewData from "./model.js";

const createPreviewData = async(req , res) => {
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

const fetchPreviewData = async(req , res) => {

    const templateId = req?.params?.templateId;
    console.log("template id at backend" , templateId);
    if(!templateId) {
        return res
               .status(404)
               .json({
                status : 404,
                message : "template id not found"
               });
    }

 const templatePreviewData = await TemplatePreviewData.findOne({ id : templateId });

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

const updatePreviewData = async(req , res) => {

    const templateId = req?.params?.templateId;
    const updatedPreviewData = req?.body?.previewData;
     if(!templateId) {
        return res
               .status(404)
               .json({
                status : 404,
                message : "template id not found"
               });
    }

    const result = await TemplatePreviewData.replaceOne(
        { id : templateId },
        updatePreviewData
    );

    if(result.matchedCount === 0) {
        return res
               .status(404)
               .json({
                status : 404,
                message : "document not found"
               })
    } else if(result.modifiedCount === 0) {
              return res
                     .status(405)
                     .json({
                        status : 405,
                        message : "document not updated"
                     })
    } else {
        return res
               .status(201)
               .json({
                status : 201,
                messaage : "Document updated successfully"
               })
    } 

};

export {
    createPreviewData,
    fetchPreviewData,
    updatePreviewData
}