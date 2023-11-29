//Define the API URL with a template string that includes an API key and the base currency (USD)
let api = `https://v6.exchangerate-api.com/v6/${"964692fdce88b3e7ab3284c2"}/latest/USD`;

//Get references to the "from" and "to" currency dropdowns in the HTML
const fromDropDown = document.getElementById("from-currency");
const toDropDown = document.getElementById("to-currency");

//Create dropdown options for each currency and add them to the "from" dropdown
currencies.forEach((currency) => {
  const option = document.createElement("option");
  option.value = currency;
  option.text = currency;
  fromDropDown.add(option);
});

//Repeat the process to create dropdown options for the "to" dropdown
currencies.forEach((currency) => {
  const option = document.createElement("option");
  option.value = currency;
  option.text = currency;
  toDropDown.add(option);
});

//Set default values for the "from" and "to" dropdowns
fromDropDown.value = "USD";
toDropDown.value = "INR";

//Define a function to convert currency
let convertCurrency = () => {
  // Step 7: Get the amount, "from" currency, and "to" currency from the user input
  const amount = document.getElementById("amount").value;
  const fromCurrency = fromDropDown.value;
  const toCurrency = toDropDown.value;

  //Check if the input amount is not empty
  if (amount.length != 0) {
    // Step 9: Fetch exchange rates from the API
    fetch(api)
      .then((response) => response.json())
      .then((data) => {
        //Extract exchange rates for the "from" and "to" currencies
        let fromExchangeRate = data.conversion_rates[fromCurrency];
        let toExchangeRate = data.conversion_rates[toCurrency];

        //Calculate the converted amount
        const convertedAmount = (amount / fromExchangeRate) * toExchangeRate;

        // Step 12: Display the result in the HTML
        result.innerHTML = `${amount} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency}`;
      });
  } else {
    //If the input amount is empty, show an alert and return
    alert("Enter the amount to convert");
    return;
  }
};

//Add an event listener to the button to trigger the currency conversion function
document.querySelector("#btn").addEventListener("click", convertCurrency);

//Call the convertCurrency function once to display the initial conversion
convertCurrency();
