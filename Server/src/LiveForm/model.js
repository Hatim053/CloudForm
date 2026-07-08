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
    type : Array,
    required : true,
},
backgroundImage : {  // preview image
type : String
}, 
} , { timestamps : true} );


const LiveForm = mongoose.model("LiveForm" , liveFormSchema);

export default LiveForm;

selectedElement : [
location_block : {
_id : mongoose.Schema.Types.ObjectId,
appearance_order : // 1 , order at which the question will appear
logic_rule : {
block_Id : // id of the block / questions on which current block is depends
operator : // contains , less_than , greater_than , less_than_equals , greater_than_equals
value : // value against which it will be compared
},
}
]


