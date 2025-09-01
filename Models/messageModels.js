const mongoose =require( "mongoose");

const messageSchema = new mongoose.Schema(
  {
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    text: { type: String, required: true },
    time: { type: String, required: true }, // store formatted time
  },
  { timestamps: true }
);

modeule.exports =  mongoose.model("Message", messageSchema);
