import type { NextApiRequest, NextApiResponse } from "next";

import { MongoClient } from "mongodb";

export type MessageType = {
  name: string;
  email: string;
  message: string;
  id?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { name, message, email } = req.body;
    if (
      name.length < 4 ||
      message.length < 10 ||
      message.length > 300 ||
      !email.includes("@")
    ) {
      res.status(422).json({ message: "Invalid credentials!" });
      return;
    }

    const newMessage: MessageType = {
      name,
      email,
      message,
    };

    let client;
    try {
      client = await MongoClient.connect(
        "mongodb+srv://mikh:wrihnJumnhRf5d0u@cluster0.ybqit5w.mongodb.net/my-site?retryWrites=true&w=majority&appName=Cluster0"
      );
    } catch (error) {
      res.status(500).json({ message: "Could not connect to database." });
      return;
    }

    const db = client.db("my-site");
    let result;
    try {
      result = await db.collection("messages").insertOne(newMessage);
      newMessage.id = result.insertedId.toString();
    } catch {
      res.status(500).json({ message: "Could not send data to database." });
      client.close();
      return;
    }
    client.close();
    res
      .status(200)
      .json({ message: "Sending data successfully!", data: newMessage });
  }
}
