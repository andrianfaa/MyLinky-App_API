import { createHmac, randomBytes } from "crypto";
import { readFileSync } from "fs";
import { Schema } from "mongoose";
import { resolve } from "path";

import { DayJS } from "../../utils";
import { SchemaNormalizer } from "../plugins";

const userSchema = new Schema<User.Schema>({
  username: {
    type: String,
    required: false,
    default: () => `user${randomBytes(8).toString("hex")}`
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: String,
    default: () => DayJS(Date.now()).tz("Asia/Jakarta").toISOString()
  },
  updatedAt: {
    type: String,
    default: () => DayJS(Date.now()).tz("Asia/Jakarta").toISOString()
  }
});

userSchema.pre("save", function (next) {
  if (!this.isNew) {
    this.updatedAt = DayJS(Date.now()).tz("Asia/Jakarta").toISOString();

    next();
    return;
  }

  const password = this.password;
  const key = readFileSync(
    resolve(process.cwd(), "src", "keys", "password.key"),
    {
      encoding: "utf-8"
    }
  );
  const hashPassword = createHmac("SHA512", key).update(password).digest("hex");

  this.password = hashPassword;

  next();
});

// Plugins
userSchema.plugin(SchemaNormalizer);

export default userSchema;
