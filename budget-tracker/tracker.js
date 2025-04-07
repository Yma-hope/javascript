// Get DOM elements
const form = document.getElementById('transaction-form');
const description = document.getElementById('description');
const amount = document.getElementById('amount');
const list = document.getElementById('transaction-list');
const incomeDisplay = document.getElementById('total-income');
const expenseDisplay = document.getElementById('total-expense');
const balanceDisplay = document.getElementById('balance');
const filterButtons = document.querySelectorAll('[data-filter]');

// Store transactions in an array
let transactions = [];

// Add new transaction
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const desc = description.value.trim();
  const amt = parseFloat(amount.value);

  if (!desc || isNaN(amt)) return;

  const newTransaction = {
    id: Date.now(),
    description: desc,
    amount: amt
  };

  transactions.push(newTransaction);
  updateDisplay();
  form.reset();
});

// Update the transaction list and totals
function updateDisplay(filter = 'all') {
  list.innerHTML = '';
  let income = 0;
  let expense = 0;

  const filtered = transactions.filter((t) => {
    if (filter === 'income') return t.amount > 0;
    if (filter === 'expense') return t.amount < 0;
    return true;
  });

  filtered.forEach((t) => {
    const li = document.createElement('li');
    li.classList.add(t.amount >= 0 ? 'income' : 'expense');
    li.textContent = `${t.description}: ${t.amount}`;
    list.appendChild(li);

    if (t.amount >= 0) income += t.amount;
    else expense += t.amount;
  });

  incomeDisplay.textContent = income.toFixed(2);
  expenseDisplay.textContent = Math.abs(expense).toFixed(2);
  balanceDisplay.textContent = (income + expense).toFixed(2);
}

// Handle filter buttons
filterButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    updateDisplay(btn.dataset.filter);
  });
});