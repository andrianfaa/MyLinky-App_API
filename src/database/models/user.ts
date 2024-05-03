import { model } from "mongoose";

import { UserSchema } from "../schemas";

export default model("user", UserSchema);
