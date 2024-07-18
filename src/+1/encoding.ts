import { Schema } from "@effect/schema";

const Author = Schema.Struct({
  name: Schema.String,
  age: Schema.NumberFromString,
});

const authorDecoded = Schema.decodeSync(Author)({ age: "26", name: "Sandro" });
const authorEncoded = Schema.encodeSync(Author)(authorDecoded);
