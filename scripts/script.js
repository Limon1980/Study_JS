'use strict';

let start = document.getElementById('start'),
  incomePlus = document.getElementsByTagName('button')[0],
  expensesPlus = document.getElementsByTagName('button')[1],
  depositCheck = document.querySelector('#deposit-check'),
  additionalIncomeItem = document.querySelectorAll('.additional_income-item'),

  budgetDayValue = document.querySelector('.budget_day-value'),
  expensesMonthValue = document.querySelector('.expenses_month-value'),
  additionalIncomeValue = document.querySelector('.additional_income-value'),
  additionalExpensesValue = document.querySelector('.additional_expenses-value'),
  incomePeriodValue = document.querySelector('.income_period-value'),
  targetMonthValue = document.querySelector('.target_month-value'),

  salaryAmount = document.querySelector('.salary-amount'),
  incomeTitle = document.querySelectorAll('.income-title')[1],
  incomeAmount = document.querySelector('.income-amount'),
  expensesTitle = document.querySelectorAll('.expenses-title')[1],
  expensesItems = document.querySelectorAll('.expenses-items'),
  additionalExpensesItem = document.querySelector('.additional_expenses-item'),
  targetAmount = document.querySelector('.target-amount'),
  periodSelect = document.querySelector('.period-select');

// проверка на число
let isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

// Создадим объект appData
let appData = {
  incom: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  percentDeposit: 0,
  moneyDeposit: 0,
  mission: 6000000,
  period: 12,
  budget: 0,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  start: function () {

    if (salaryAmount.value === '') {
      alert('Ошибка, поле Месяный доход должно быть заполнено');
      return;
    }
    appData.budget = salaryAmount.value;
    appData.getExpenses();


    appData.getExpensesMonth();
    appData.getBudget();
  },
  addExpensesBlock: function () {

    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
    expensesItems = document.querySelectorAll('.expenses-items');
    if (expensesItems.length === 3) {
      expensesPlus.style.display = 'none';
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
  asking: function () {
    if (confirm('Есть ли у вас доп. заработок?')) {
      let itemIncome;
      let cashIncome;

      do {
        itemIncome = prompt(
          'Какой у вас еть дополнительный заработок',
          'Таксую'
        );
      } while (isNumber(itemIncome) || itemIncome === null || itemIncome.trim() === '');
      do {
        cashIncome = parseFloat(prompt('Сколько в месяц зарабатываете на этом?', 10000));
        appData.income[itemIncome] = cashIncome;
      } while (!isNumber(cashIncome));
    }
    let addExpenses = prompt(
      'Перечислите возможные расходы за рассчитываемый период через запятую?',
      'жкх, школа, машина'
    );
    appData.addExpenses = addExpenses.toLocaleLowerCase().split(',');
    appData.deposit = confirm('Есть ли у вас депозит в банке?');
  },

  getExpensesMonth: function () {
    // сумма обязательных расходов
    for (let key in appData.expenses) {
      appData.expensesMonth += parseFloat(appData.expenses[key]);
    }
  },
  getBudget: function () {
    appData.budgetMonth = appData.budget - appData.expensesMonth; // бюджет на месяц доходы - расходы
    appData.budgetDay = appData.budgetMonth / 30; // Бюджет на день, доходы минус расходы разделить на 30
  },
  getTargetMonth: function () {
    return Math.ceil(appData.mission / appData.budgetMonth); // Период в месяцах до достижения цели mission
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
  calcSaveMoney: function () {
    return appData.budgetMonth * appData.period;
  },
};

start.addEventListener('click', appData.start);

expensesPlus.addEventListener('click', appData.addExpensesBlock);

// appData.getStatusIncome();

// console.log('Расходы за месяц: ', appData.expensesMonth);

// if (appData.period > 0) {
//   console.log(
//     'Цель будет достигнута за : ',
//     appData.getTargetMonth() + ' месяцев'
//   );
// } else {
//   console.log('Цель не будет достигнута');
// }

// console.log(appData.addIncome);

// console.warn('Наша программа включает в себя данные:');
// for (let key in appData) {
//   console.log(`${key} — ${appData[key]}`);
// }

// appData.getInfoDeposit();
// console.log(
//   appData.percentDeposit.toLocaleUpperCase,
//   appData.moneyDeposit,
//   appData.calcSaveMoney()
// );


// let newArr = [];
// appData.addExpenses.forEach(function (item) {
//   item = item.trim();
//   newArr.push(item[0].toLocaleUpperCase() + item.substring(1, item.length));
// });

// console.log(newArr.join(', '));