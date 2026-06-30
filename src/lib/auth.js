import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { jwt } from "better-auth/plugins";

const client = new MongoClient(process.env.MONGO_DB_CONNECTION_URL);
const db = client.db("yong-man");

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    // Optional: if you don't provide a client, database transactions won't be enabled.
    client,
  }),
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "user",
        input: true, // ✅ allows client to send this field
      },
      plan:{
        type: "string",
        required: false,
        defaultValue: "free",
        input: true,
      }
    },
  },
   socialProviders: {
        google: { 
            clientId: process.env.GOOGLE_CLIENT_ID, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET, 
        }, 
    },
    session:{
      cookieCache:{
        enabled:true,
        strategy:"jwt",
        maxAge:60*24*30,
      }
    },
    plugins:[jwt()],
});
