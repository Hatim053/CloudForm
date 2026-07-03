import mongoose from "mongoose";


const liveFormSchema = new mongoose.Schema({
userId : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'User',
    required : true
},
liveLink : {
    type : String,
    required : true
},
domain : {
    type : String, // for now keeping it as string
},
selectedElement : {
    type : Object,
    required : true,
},
backgroundImage : {
type : String
},
analyticsData : {
    type : Object
} 
} , { timestamps : true} );


const LiveForm = mongoose.model("LiveForm" , liveFormSchema);

export default LiveForm;


