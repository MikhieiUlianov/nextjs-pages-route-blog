import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
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
    const newMessage = {
      name,
      email,
      message,
    };
    res
      .status(200)
      .json({ message: "Sending data successfully!", data: newMessage });
  }
}
