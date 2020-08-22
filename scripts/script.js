'use strict';

let start = document.getElementById('start'),
  incomePlus = document.getElementsByTagName('button')[0],
  expensesPlus = document.getElementsByTagName('button')[1],
  depositCheck = document.querySelector('#deposit-check'),
  additionalIncomeItems = document.querySelectorAll('.additional_income-item'),

  budgetDayValue = document.querySelector('.budget_day-value'),
  budgetMonthValue = document.querySelector('.budget_month-value'),
  expensesMonthValue = document.querySelector('.expenses_month-value'),
  additionalIncomeValue = document.querySelector('.additional_income-value'),
  additionalExpensesValue = document.querySelector('.additional_expenses-value'),
  additionalExpensesItem = document.querySelector('.additional_expenses-item'),
  incomePeriodValue = document.querySelector('.income_period-value'),
  targetMonthValue = document.querySelector('.target_month-value'),

  salaryAmount = document.querySelector('.salary-amount'),
  incomeTitle = document.querySelectorAll('.income-title')[1],
  incomeAmount = document.querySelector('.income-amount'),
  incomeItems = document.querySelectorAll('.income-items'),
  expensesTitle = document.querySelectorAll('.expenses-title')[1],
  expensesAmount = document.querySelector('.expenses-amount'),
  expensesItems = document.querySelectorAll('.expenses-items'),
  targetAmount = document.querySelector('.target-amount'),
  periodSelect = document.querySelector('.period-select'),
  periodAmount = document.querySelector('.period-amount');

// проверка на число
let isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

// Создадим объект appData
let appData = {
  income: {},
  incomeMonth: 0,
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  percentDeposit: 0,
  moneyDeposit: 0,
  budget: 0,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  start: function () {

    appData.budget = +salaryAmount.value;

    appData.getExpenses();
    appData.getIncome();
    appData.getExpensesMonth();
    appData.getAddExpenses();
    appData.getAddIncome();
    appData.getBudget();

    appData.showResult();
  },
  showResult: function () {
    budgetMonthValue.value = appData.budgetMonth;
    budgetDayValue.value = appData.budgetDay;
    expensesMonthValue.value = appData.expensesMonth;
    additionalExpensesValue.value = appData.addExpenses.join(', ');
    additionalIncomeValue.value = appData.addIncome.join(', ');
    targetMonthValue.value = appData.getTargetMonth();
    incomePeriodValue.value = appData.calcPeriod();
    periodSelect.addEventListener('input', function () {
      incomePeriodValue.value = appData.calcPeriod();
    });

  },
  addExpensesBlock: function () {

    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    // очищаем инпут при добавлении
    cloneExpensesItem.querySelector('.expenses-title').value = '';
    cloneExpensesItem.querySelector('.expenses-amount').value = '';

    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
    expensesItems = document.querySelectorAll('.expenses-items');
    if (expensesItems.length === 3) {
      expensesPlus.style.display = 'none';
    }
  },
  addIncomeBlock: function () {
    let cloneIncomeItem = incomeItems[0].cloneNode(true);
    // очищаем input
    cloneIncomeItem.querySelector('.income-title').value = '';
    cloneIncomeItem.querySelector('.income-amount').value = '';

    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
    incomeItems = document.querySelectorAll('.income-items');
    if (incomeItems.length === 3) {
      incomePlus.style.display = 'none';
    }

  },
  getExpenses: function () {
    expensesItems.forEach(function (item) {
      let itemExpenses = item.querySelector('.expenses-title').value;
      let cashExpenses = item.querySelector('.expenses-amount').value;
      if (itemExpenses !== '' && cashExpenses !== '') {
        appData.expenses[itemExpenses] = cashExpenses;
      }
    });
  },
  getIncome: function () {
    incomeItems.forEach(function (item) {
      let itemIncome = item.querySelector('.income-title').value;
      let cashIncome = item.querySelector('.income-amount').value;

      if (itemIncome !== '' && cashIncome !== '') {
        appData.income[itemIncome] = cashIncome;
      }
    });

    for (let key in appData.income) {
      appData.incomeMonth += +appData.income[key];
    }
  },
  getAddExpenses: function () {
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach(function (item) {
      item = item.trim();
      if (item !== '') {
        appData.addExpenses.push(item);
      }
    });
  },
  getAddIncome: function () {
    additionalIncomeItems.forEach(function (item) {
      let itemValue = item.value.trim();
      if (itemValue !== '') {
        appData.addIncome.push(itemValue);
      }
    });

  },
  getExpensesMonth: function () {
    // сумма обязательных расходов
    for (let key in appData.expenses) {
      appData.expensesMonth += parseFloat(appData.expenses[key]);
    }
  },
  getBudget: function () {
    // бюджет на месяц доходы -расходы
    appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
    appData.budgetDay = Math.floor(appData.budgetMonth / 30); // Бюджет на день, доходы минус расходы разделить на 30
  },
  getTargetMonth: function () {
    return Math.ceil(targetAmount.value / appData.budgetMonth); // Период в месяцах до достижения цели mission
  },
  getStatusIncome: function () {
    // Уровень дохода в зависимости от бюджета на день
    if (appData.budgetDay <= 0) {
      appData.addIncome.push('Что то пошло не так!');
    } else if (appData.budgetDay <= 600) {
      appData.addIncome.push('К сожалению у вас уровень дохода ниже среднего!');
    } else if (appData.budgetDay < 1200) {
      appData.addIncome.push('У вас средний уровень дохода!');
    } else if (appData.budgetDay >= 1200) {
      appData.addIncome.push('У вас высокий уровень дохода!');
    } else {
      appData.addIncome.push('Упсс... Что то пошло не так!');
    }
  },
  getInfoDeposit: function () {
    if (appData.deposit) {
      do {
        appData.percentDeposit = prompt('Какой годовой процент', 10);
        appData.moneyDeposit = prompt('Какая сумма заложена?', 10000);
      } while (!isNumber(appData.percentDeposit) && !isNumber(appData.moneyDeposit));
    }
  },
  calcPeriod: function () {
    return appData.budgetMonth * periodSelect.value;
  },
};

salaryAmount.addEventListener('input', () => {
  salaryAmount.value === '' ? start.disabled = true : start.disabled = false;
});

start.addEventListener('click', appData.start);

incomePlus.addEventListener('click', appData.addIncomeBlock);
expensesPlus.addEventListener('click', appData.addExpensesBlock);
periodSelect.addEventListener('input', function () {
  periodAmount.textContent = periodSelect.value;
});

incomeTitle.addEventListener('input', () => {
  incomeTitle.value = incomeTitle.value.replace(/[^а-я\s,.!?]/, '');
});
incomeAmount.addEventListener('input', () => {
  incomeAmount.value = incomeAmount.value.replace(/[^0-9]/, '');
});
salaryAmount.addEventListener('input', () => {
  salaryAmount.value = salaryAmount.value.replace(/[^0-9]/, '');
});
expensesTitle.addEventListener('input', () => {
  expensesTitle.value = expensesTitle.value.replace(/[^а-я\s,.!?]/, '');
});
expensesAmount.addEventListener('input', () => {
  expensesAmount.value = expensesAmount.value.replace(/[^0-9]/, '');
});
additionalIncomeItems.forEach((item, index) => {
  additionalIncomeItems[index].addEventListener('input', () => {
    additionalIncomeItems[index].value = additionalIncomeItems[index].value.replace(/[^а-я\s,.!?]/, '');
  });
});

// console.warn('Наша программа включает в себя данные:');
// for (let key in appData) {
//   console.log(`${key} — ${appData[key]}`);
// }