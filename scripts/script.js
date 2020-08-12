'use strict';
// проверка на число
let isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

// Присвоим переменным значения для урока 2
let money;
let income = 'фриланс';
let addExpenses = 'жкх, интернет, машина';
let deposit = true;
let mission = 6e6;
let period = 12;
let budgetDay;
let budgetMonth;

// Запрос месячного дохода с проверкой на число
let start = function () {
  do {
    money = parseFloat(prompt('Ваш месячный доход?', 60000));
  } while (!isNumber(money));
};
// Функция определения типа данных
function showTypeOf(data) {
  console.log(typeof data);
}

// money = +prompt('Ваш месячный доход?', 60000);
// Запросим ваш месячный доход
start();

addExpenses = prompt(
  'Перечислите возможные расходы за рассчитываемый период через запятую?',
  'жкх, школа, машина'
);
deposit = confirm('Есть ли у вас депозит в банке?');

let expenses = [];

// Сумма обязательных расходов
let getExpensesMonth = function () {
  let sum = 0;

  for (let i = 0; i < 2; i++) {
    expenses[i] = prompt(
      'Введите обязательную статью расходов?',
      'Расход' + i
    ).toLocaleUpperCase();

    let amount;
    do {
      amount = parseFloat(
        prompt('Во сколько это обойдется ' + expenses[i] + ' ?', 6000)
      );
    } while (!isNumber(amount));
    sum += amount;
    expenses[i] += ' => ' + amount;
  }
  return sum;
};

// Функция возвращает Накопления за месяц (Доходы минус расходы)
function getAccumulatedMonth(money, callback) {
  return money - callback;
}
// вызов функци сумма обязательных расходов и значение в переменную
let expensesAmount = getExpensesMonth();

// Подсчитывает за какой период будет достигнута цель
function getTargetMonth(accumulatedMonth, mission) {
  return Math.ceil(mission / accumulatedMonth);
}

// Накопления за месяц, вызов
let accumulatedMonth = getAccumulatedMonth(money, expensesAmount);

period = getTargetMonth(accumulatedMonth, mission);
budgetDay = Math.floor(accumulatedMonth / 30);

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

console.log('расходы за месяц: ', expensesAmount);
console.log('Обязательные расходы:', expenses);
console.log('Возможные расходы:', addExpenses.toLocaleUpperCase().split(','));
if (period <= 0) {
  console.log('Цель не будет достигнута');
} else {
  console.log(
    'Период достижения цели в ' + mission + ' руб равен ' + period + ' месяцев'
  );
}
console.log('Бюжет на месяц ' + accumulatedMonth);
console.log('budgetDay: ', budgetDay);

// Уровень дохода в зависимости от бюджета на день
let getStatusIncome = function () {
  if (budgetDay <= 0) {
    console.log('Что то пошло не так!');
  } else if (budgetDay <= 600) {
    console.log('К сожалению у вас уровень дохода ниже среднего!');
  } else if (budgetDay < 1200) {
    console.log('У вас средний уровень дохода!');
  } else if (budgetDay >= 1200) {
    console.log('У вас высокий уровень дохода!');
  } else {
    console.log('Упсс... Что то пошло не так!');
  }
};

getStatusIncome();
