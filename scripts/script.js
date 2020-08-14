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
  asking: function() {
    let addExpenses = prompt(
      'Перечислите возможные расходы за рассчитываемый период через запятую?',
      'жкх, школа, машина'
    );
    appData.addExpenses = addExpenses.toLocaleLowerCase().split(',');
    appData.deposit = confirm('Есть ли у вас депозит в банке?');
  },
  budget: money,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  getExpensesMonth: function(){
    let sum = 0;
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
      sum += amount;
      appData.expenses[quest] = amount;
    }
    return sum;
  },
  getAccumulatedMonth: function(money, callback){
    return money - callback; // Функция возвращает Накопления за месяц (Доходы минус расходы)
  },
  getTargetMonth: function(accumulatedMonth, mission){
    return Math.ceil(mission / accumulatedMonth); // Подсчитывает за какой период будет достигнута цель
  },
  getStatusIncome: function(){  // Уровень дохода в зависимости от бюджета на день
    if (appData.budgetDay <= 0) {
      console.log('Что то пошло не так!');
    } else if (appData.budgetDay <= 600) {
      console.log('К сожалению у вас уровень дохода ниже среднего!');
    } else if (appData.budgetDay < 1200) {
      console.log('У вас средний уровень дохода!');
    } else if (appData.budgetDay >= 1200) {
      console.log('У вас высокий уровень дохода!');
    } else {
      console.log('Упсс... Что то пошло не так!');
    }
  },
  
  

};

appData.asking();

// вызов функци сумма обязательных расходов и значение в переменную
let expensesMount = appData.getExpensesMonth();

// Накопления за месяц, вызов
let accumulatedMonth = appData.getAccumulatedMonth(money, expensesMount);
// Период в месяцах до достижения цели mission
appData.period = appData.getTargetMonth(accumulatedMonth, appData.mission);
// Бюджет на день, доходы минус расходы разделить на 30
appData.budgetDay = Math.floor(accumulatedMonth / 30);


console.log('расходы за месяц: ', expensesMount);
console.log('Обязательные расходы:', appData.expenses);
console.log('Возможные расходы:', appData.addExpenses);
if (appData.period <= 0) {
  console.log('Цель не будет достигнута');
} else {
  console.log(
    'Период достижения цели в ' + appData.mission + ' руб равен ' + appData.period + ' месяцев'
  );
}
console.log('Бюжет на месяц ' + accumulatedMonth);
console.log('budgetDay: ', appData.budgetDay);



appData.getStatusIncome();
