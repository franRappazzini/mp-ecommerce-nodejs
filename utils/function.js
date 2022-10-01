require("dotenv").config();
const { ACCESS_TOKEN } = process.env;
const mercadopago = require("mercadopago");
mercadopago.configure({
  access_token: ACCESS_TOKEN,
  integrator_id: "dev_24c65fb163bf11ea96500242ac130004",
});

const createPayment = async (product) => {
  const preference = {
    items: [
      {
        ...product,
        id: 1234,
        description: "Dispositivo móvil de Tienda e-commerce",
        picture_url:
          "https://franrappazzini-mp-ecommerce-nodejs.onrender.com/" + product.picture_url,
      },
    ],
    payer: {
      name: "Lalo",
      surname: "Landa",
      email: "test_user_63274575@testuser.com",
      phone: {
        area_code: "11",
        number: 2494209281,
      },
      address: {
        street_name: "Falsa",
        street_number: 123,
        zip_code: "7000",
      },
    },
    back_urls: {
      failure: "https://franrappazzini-mp-ecommerce-nodejs.onrender.com/failure",
      pending: "https://franrappazzini-mp-ecommerce-nodejs.onrender.com/pending",
      success: "https://franrappazzini-mp-ecommerce-nodejs.onrender.com/success",
    },
    auto_return: "approved",
    payment_methods: {
      excluded_payment_methods: [
        {
          id: "visa",
        },
      ],
      installments: 6,
    },
    external_reference: "fran_rappa@outlook.com",
    notification_url: "https://franrappazzini-mp-ecommerce-nodejs.onrender.com/notifications",
  };

  try {
    const { response } = await mercadopago.preferences.create(preference);
    return response;
  } catch (err) {
    console.log("ERROR:", err);
  }
};

module.exports = createPayment;
