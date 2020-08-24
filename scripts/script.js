'use strict';

let start = document.getElementById('start'),
  cancel = document.getElementById('cancel'),
  incomePlus = document.getElementsByTagName('button')[0],
  expensesPlus = document.getElementsByTagName('button')[1],
  depositCheck = document.querySelector('#deposit-check'),
  additionalIncomeItems = document.querySelectorAll('.additional_income-item'),
  budgetDayValue = document.querySelector('.budget_day-value'),
  budgetMonthValue = document.querySelector('.budget_month-value'),
  expensesMonthValue = document.querySelector('.expenses_month-value'),
  additionalIncomeValue = document.querySelector('.additional_income-value'),
  additionalExpensesValue = document.querySelector(
    '.additional_expenses-value'
  ),
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
  periodAmount = document.querySelector('.period-amount'),
  inputsText = document.querySelectorAll('input[type=text]');

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
    this.budget = +salaryAmount.value;

    this.getExpenses();
    this.getIncome();
    this.getExpensesMonth();
    this.getAddExpenses();
    this.getAddIncome();
    this.getBudget();

    this.showResult();


    start.disabled = true;
    start.style.display = 'none';
    cancel.style.display = 'block';

    incomePlus.style.display = 'none';
    expensesPlus.style.display = 'none';

    const blockInputs = function () {
      document.querySelectorAll('input[type=text]').forEach((item) => item.setAttribute("disabled", "true"));
    };
    blockInputs();


  },
  showResult: function () {
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = this.getTargetMonth();
    incomePeriodValue.value = this.calcPeriod();

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
    for (let key in this.expenses) {
      this.expensesMonth += parseFloat(this.expenses[key]);
    }
  },
  getBudget: function () {
    // бюджет на месяц доходы -расходы
    this.budgetMonth =
      this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = Math.floor(this.budgetMonth / 30); // Бюджет на день, доходы минус расходы разделить на 30
  },
  getTargetMonth: function () {
    return Math.ceil(targetAmount.value / this.budgetMonth); // Период в месяцах до достижения цели mission
  },
  getStatusIncome: function () {
    // Уровень дохода в зависимости от бюджета на день
    if (this.budgetDay <= 0) {
      this.addIncome.push('Что то пошло не так!');
    } else if (this.budgetDay <= 600) {
      this.addIncome.push('К сожалению у вас уровень дохода ниже среднего!');
    } else if (this.budgetDay < 1200) {
      this.addIncome.push('У вас средний уровень дохода!');
    } else if (this.budgetDay >= 1200) {
      this.addIncome.push('У вас высокий уровень дохода!');
    } else {
      this.addIncome.push('Упсс... Что то пошло не так!');
    }
  },
  getInfoDeposit: function () {
    if (this.deposit) {
      do {
        this.percentDeposit = prompt('Какой годовой процент', 10);
        this.moneyDeposit = prompt('Какая сумма заложена?', 10000);
      } while (
        !isNumber(this.percentDeposit) &&
        !isNumber(this.moneyDeposit)
      );
    }
  },
  calcPeriod: function () {
    return this.budgetMonth * periodSelect.value;
  },
  reset: function () {
    inputsText.forEach(function (item) {
      item.value = '';
    });

    if (incomeItems.length > 1) {
      for (let i = 0; i < incomeItems.length; i++) {
        if (i === 0) {
          continue;
        }
        incomeItems[i].remove();
      }
      incomeItems[0].querySelector('.income-title').value = '';
      incomeItems[0].querySelector('.income-amount').value = '';
      incomePlus.style.display = 'block';
      console.log('incomeItems: ', incomeItems.length);
      incomeItems = document.querySelectorAll('.income-items');
    }


    if (expensesItems.length > 1) {
      for (let i = 0; i < expensesItems.length; i++) {
        if (i === 0) {
          continue;
        }
        expensesItems[i].remove();
      }
      expensesItems[0].querySelector('.expenses-title').value = '';
      expensesItems[0].querySelector('.expenses-amount').value = '';
      expensesPlus.style.display = 'block';
      expensesItems = document.querySelectorAll('.expenses-items');
      console.log('expensesItems: ', expensesItems.length);
    }

    incomePlus.style.display = 'block';
    expensesPlus.style.display = 'block';

    periodSelect.value = 1;
    periodAmount.textContent = '1';

    start.style.display = 'block';
    cancel.style.display = 'none';

    const unBlockInputs = function () {
      document.querySelectorAll('.data input[type=text]').forEach((item) => item.removeAttribute('disabled'));
    };
    unBlockInputs();

    this.income = {};
    this.addIncome = [];
    this.expenses = {};
    this.addExpenses = [];
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.expensesMonth = 0;
    this.incomeMonth = 0;

    depositCheck.checked = false;
  }
};

salaryAmount.addEventListener('input', () => {
  salaryAmount.value === '' ?
    (start.disabled = true) :
    (start.disabled = false);
});

start.addEventListener('click', appData.start.bind(appData));

cancel.addEventListener('click', appData.reset.bind(appData));

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
    additionalIncomeItems[index].value = additionalIncomeItems[
      index
    ].value.replace(/[^а-я\s,.!?]/, '');
  });
});

// console.warn('Наша программа включает в себя данные:');
// for (let key in appData) {
//   console.log(`${key} — ${appData[key]}`);
// }