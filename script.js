const currency_one_ele = document.getElementById('currency-one');
const currency_two_ele = document.getElementById('currency-two');
const amount_one_ele = document.getElementById('amount-one');
const amount_two_ele = document.getElementById('amount-two');
const rateEle = document.getElementById('rate');
const swap = document.getElementById('swap');

// fetch data from api
async function calculate() {
  const currency_one = currency_one_ele.value;
  const currency_two = currency_two_ele.value;
  
  let response = await fetch(`https://api.exchangerate-api.com/v4/latest/${currency_one}`);
  let exchangeRates = await response.json();
  let rate = exchangeRates.rates[currency_two];

  rateEle.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;
  amount_two_ele.value = (amount_one_ele.value * rate).toFixed(2);
}

// event listners
currency_one_ele.addEventListener('change', calculate);
currency_two_ele.addEventListener('change', calculate);
amount_one_ele.addEventListener('input', calculate);
amount_two_ele.addEventListener('input', calculate);

swap.addEventListener('click', () => {
  let temp = currency_one_ele.value;
  currency_one_ele.value = currency_two_ele.value;
  currency_two_ele.value = temp;

  calculate();
});


calculate();