import { NextApiRequest, NextApiResponse } from "next";
import { buffer } from "micro";
import * as admin from "firebase-admin";

// secure connection to firebase
const serviceAccount = require("../../permissions.json");

const app = !admin.apps.length
  ? admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    })
  : admin.app();

// stripe setups
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const requestBuffer = await buffer(req);

    // create a signature from buffer stream
    const payload = requestBuffer.toString();
    const signature = req.headers["stripe-signature"];

    let event;

    // verify the event is from stripe
    try {
      event = stripe.webhooks.constructEvent(
        payload,
        signature,
        process.env.WEBHOOK_SECRET
      );
    } catch (error: any) {
      return res.status(400).send(`webhook error: ${error.message}`);
    }

    // handle the chechout session completion methods

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      await app
        .firestore()
        .collection("users")
        .doc(session.metadata.uid)
        .collection("subscriptions")
        .doc(session.invoice)
        .set(
          {
            amount: session.amount_total / 100,
            session_id: session.id,
            subscribed_at: admin.firestore.FieldValue.serverTimestamp(),
          },
          { merge: true }
        )
        .then(() => {
          return res.status(200).send("SUCCESS: Order has been added to db");
        })
        .catch((err) => {
          return res.status(400).send(`WEBHOOK ERROR: ${err.message}`);
        });
    } else {
      return res.status(401).send("Canceled: Order has been cancelled");
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method not allowed");
  }
};

export const config = {
  api: {
    bodyParser: false,
    externalResources: false,
  },
};

export default handler;
