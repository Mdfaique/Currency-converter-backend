const express = require("express");
const axios = require("axios");

// router object

const getConversionResult = async (fromCurrency, toCurrency, amount) => {
  const codeFromCurrency = fromCurrency.split(" ")[1];
  const codeToCurrency = toCurrency.split(" ")[1];

  const response = await axios.get(
    "https://api.freecurrencyapi.com/v1/latest",
    {
      params: {
        apikey: process.env.API_KEY,
        base_currency: codeFromCurrency,
        currencies: codeToCurrency,
      },
    }
  );

  const conversionRate = response.data.data[codeToCurrency];
  const result = amount * conversionRate;

  return result;
};

const convertController = async (req, res) => {
  try {
    const { fromCurrency, toCurrency, amount } = req.body;

    const conversionResult = await getConversionResult(
      fromCurrency,
      toCurrency,
      amount
    );

    res.json({ result: conversionResult });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const router = express.Router();

// routes

// convert
router.post("/convert", convertController);

module.exports = router;
