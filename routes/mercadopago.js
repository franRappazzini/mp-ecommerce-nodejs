require("dotenv").config();
const { Router } = require("express");
const mercadopago = require("mercadopago");
const { ACCESS_TOKEN } = process.env;
mercadopago.configure({ access_token: ACCESS_TOKEN });
const mp = Router();

const createPayment = async () => {
  const URL = "https://api.mercadopago.com/checkout/preferences";

  const preference = {
    payer_email: "test_user_75092479@testuser.com",
    items: [
      {
        title: "Dummy Title",
        description: "Dummy description",
        picture_url: "http://www.myapp.com/myimage.jpg",
        category_id: "category123",
        quantity: 1,
        unit_price: 10,
      },
    ],
    back_urls: {
      failure: "http://localhost:3000/failure",
      pending: "http://localhost:3000/pending",
      success: "http://localhost:3000/success",
    },
  };

  try {
    const { response } = await mercadopago.preferences.create(preference);
    return response;
  } catch (err) {
    console.log("ERROR:", err);
  }
};
// createPayment();

mp.post("/payment", async (req, res) => {
  //   const {} = req.query;

  try {
    const response = await createPayment();

    res.render("success", { url: response.init_point });
  } catch (err) {}
});

module.exports = mp;
