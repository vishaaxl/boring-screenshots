// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/firebase.config";

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method == "POST") {
    const { user, ...data } = req.body;

    // check the number of presets saved by user till now
    const presetRef = collection(db, "presets");
    const q = query(presetRef, where("user", "==", user));

    // get current presets
    const querySnapshot = await getDocs(q);

    // if user has already saved 20 presets show error message
    if (querySnapshot.docs.length > 20) {
      return res.status(200).json({ message: "You can only saved 20 presets" });
    }

    await addDoc(collection(db, "presets"), { user, ...data })
      .then(() => {
        return res.status(200).json({ message: "Saved preset successfully" });
      })
      .catch(() => {
        return res
          .status(500)
          .json({ message: "Can't save data at the moment" });
      });

    return;
  } else {
    return res.status(405).send({ message: "Only POST requests allowed" });
  }
}
