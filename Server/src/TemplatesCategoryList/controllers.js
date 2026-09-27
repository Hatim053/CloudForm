import TemplatesCategoryList from "./model.js";

const createListData = async() => {
    const { id , name , description , tag , cover , icon } = req.body;
    
    if(!id || !name || !description || !tag || !cover || !icon) {
        return res
               .status(404)
               .json({
                status : 404,
                message : "all fields are required"
               });
    }

    const templateCategory = await TemplatesCategoryList.create({
        id,
        name,
        description,
        tag,
        cover,
        icon
    });

    if(!templateCategory) {
        return res
               .status(505)
               .json({
                status : 505,
                message : "could not created template category"
               });
    } 

    return res
           .status(201)
           .json({
            status : 201,
            message : "template category created successfully"
           });


};

const fetchListData = async() => {
    const templateCategoryList = (await TemplatesCategoryList.find()).sort({ createdAt : 1 });
     
    if(!templateCategoryList) {
        return res
               .status(505)
               .json({
                status : 505,
                message : "could not fetch template category list"
               });
    }

    return res
               .status(300)
               .json({
                status : 300,
                templateCategoryList,
                message : "template category list fetched successfully"
               });
};

export {
createListData,
fetchListData
};