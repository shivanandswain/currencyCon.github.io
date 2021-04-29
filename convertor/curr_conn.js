/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

const from_currencyEl = document.getElementById('from_currency');
const from_amountEl = document.getElementById('from_amount');
const to_currencyEl = document.getElementById('to_currency');
const to_amountEl = document.getElementById('to_amount');
const rateEl = document.getElementById('rate');
const exchange = document.getElementById('exchange');

from_currencyEl.addEventListener('change', calculate);
from_amountEl.addEventListener('input', calculate);
to_currencyEl.addEventListener('change', calculate);
to_amountEl.addEventListener('input', calculate);

exchange.addEventListener('click', () => {
	const temp = from_currencyEl.value;
	from_currencyEl.value = to_currencyEl.value;
	to_currencyEl.value = temp;
	calculate();
});

function calculate() {
	const from_currency = from_currencyEl.value;
	const to_currency = to_currencyEl.value;
	
	fetch(`https://api.exchangerate-api.com/v4/latest/${from_currency}`)
		.then(res => res.json())
		.then(res => {
		const rate = res.rates[to_currency];
		rateEl.innerText = `1 ${from_currency} = ${rate} ${to_currency}`
		to_amountEl.value = (from_amountEl.value * rate).toFixed(2);
	})
}
calculate();