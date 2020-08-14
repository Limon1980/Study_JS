'use strict';

// проверка на число
let isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

// Запрос месячного дохода с проверкой на число
let money,
  start = function () {
    do {
      money = parseFloat(prompt('Ваш месячный доход?', 60000));
    } while (!isNumber(money));
  };

// Запросим ваш месячный доход
start();

// Создадим объект appData
let appData = {
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  mission: 6000000,
  period: 12,
  asking: function () {
    let addExpenses = prompt(
      'Перечислите возможные расходы за рассчитываемый период через запятую?',
      'жкх, школа, машина'
    );
    appData.addExpenses = addExpenses.toLocaleLowerCase().split(',');
    appData.deposit = confirm('Есть ли у вас депозит в банке?');

    let amount;
    let quest;

    for (let i = 0; i < 2; i++) {
      quest = prompt(
        'Введите обязательную статью расходов?',
        `Расход ${i}`
      ).toLocaleUpperCase();

      do {
        amount = parseFloat(
          prompt(`Во сколько это обойдется ${quest} ?`, 6000)
        );
      } while (!isNumber(amount));
      appData.expenses[quest] = amount;
    }
  },
  budget: money,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  getExpensesMonth: function () {
    // сумма обязательных расходов
    for (let key in appData.expenses) {
      appData.expensesMonth += appData.expenses[key];
    }
  },
  getBudget: function () {
    appData.budgetMonth = appData.budget - appData.expensesMonth; // бюджет на месяц доходы - расходы
    appData.budgetDay = appData.budgetMonth / 30; // Бюджет на день, доходы минус расходы разделить на 30
  },
  getTargetMonth: function () {
    appData.period = Math.ceil(appData.mission / appData.budgetMonth); // Период в месяцах до достижения цели mission
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
};

appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getTargetMonth();
appData.getStatusIncome();

console.log('Расходы за месяц: ', appData.expensesMonth);

if (appData.period > 0) {
  console.log('Цель будет достигнута за : ', appData.period + ' месяцев');
} else {
  console.log('Цель не будет достигнута');
}

console.log(appData.addIncome);

console.warn('Наша программа включает в себя данные:');
for (let key in appData) {
  console.log(`${key} — ${appData[key]}`);
}