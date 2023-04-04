import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2022-11-15",
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { email, displayName, uid } = req.body;

    try {
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price: "price_1Mt74wSIAU32P2Le7cGOZ3vq",
            quantity: 1,
          },
        ],
        payment_method_types: ["card"],
        mode: "subscription",
        success_url: `${req.headers.origin}/checkout/success`,
        cancel_url: `${req.headers.origin}/checkout/payment-failed`,
        metadata: {
          email,
          displayName,
          uid,
        },
      });

      return res.status(201).json({ session });
    } catch (error: any) {
      return res
        .status(error.statusCode || 500)
        .json({ message: error.message });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method not allowed");
  }
};

export default handler;
