import { Schema, model, models } from "mongoose";

const EchoSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  echo: {
    type: String,
    required: [true, "Echo is required."],
  },
  tag: {
    type: String,
    required: [true, "Tag is required."],
  },
});

const Echo = models.Echo || model("Echo", EchoSchema);

export default Echo;
