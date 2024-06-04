export const userSchema = {
  bsonType: "object",
  required: ["name", "age", "email"],
  properties: {
    name: { bsonType: "string" },
    age: { bsonType: "int" },
    email: { bsonType: "string", pattern: "^\\S+@\\S+$" },
  },
};
