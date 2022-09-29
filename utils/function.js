require("dotenv").config();
const { ACCESS_TOKEN } = process.env;
const mercadopago = require("mercadopago");
mercadopago.configure({ access_token: ACCESS_TOKEN });

const createPayment = async (product) => {
  const preference = {
    items: [
      //   {
      //     title: "Dummy Title",
      //     description: "Dummy description",
      //     picture_url: "http://www.myapp.com/myimage.jpg",
      //     category_id: "category123",
      //     quantity: 1,
      //     unit_price: 10,
      //   },
      { ...product },
    ],
    payer: {
      name: "Lalo",
      surname: "Landa",
      email: "test_user_75092479@testuser.com",
      phone: {
        area_code: "11",
        number: 2494209281,
      },
      //   identification: {
      //     type: "DNI",
      //     number: "12345678",
      //   },
      address: {
        street_name: "Falsa",
        street_number: 123,
        zip_code: "7000",
      },
    },
    back_urls: {
      failure: "http://localhost:3000/failure",
      pending: "http://localhost:3000/pending",
      success: "http://localhost:3000/success",
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
  };

  try {
    const { response } = await mercadopago.preferences.create(preference);
    return response;
  } catch (err) {
    console.log("ERROR:", err);
  }
};

module.exports = createPayment;