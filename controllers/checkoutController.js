import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET);
import prisma from "../src/utils/prisma.js";

const checkout = async (req, res) => {
  const { id } = req.body;
  const foundImage = await prisma.image.findFirst({
    where: {
      id: id,
    },
  });
  console.log(foundImage)

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: foundImage.title,
            description: foundImage.description,
            // images: [foundImage.url]
          },
          unit_amount: foundImage.price * 100,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: "http://localhost:5173",
    cancel_url: "http://localhost:5173",
  });

  return res.json(session.url);

};

export { checkout };
