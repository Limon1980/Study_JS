'use strict';
// Присвоим переменным значения для урока 2
let money = 99000;
let income = 'фриланс';
let addExpenses = 'жкх, интернет, машина';
let deposit = true;
let mission = 6e6;
let period = 12;
let budgetDay;
let budgetMonth;

// Функция определения типа данных
function showTypeOf(data) {
  console.log(typeof data);
}

money = +prompt('Ваш месячный доход?', 60000);
addExpenses = prompt(
  'Перечислите возможные расходы за рассчитываемый период через запятую?',
  'жкх, школа, машина'
);
deposit = confirm('Есть ли у вас депозит в банке?');

let expenses1 = prompt('Введите обязательную статью расходов?', 'жкх');
let amount1 = +prompt('Во сколько это обойдется?', 6000);
let expenses2 = prompt('Введите обязательную статью расходов?', 'машина');
let amount2 = +prompt('Во сколько это обойдется?', 4000);

// Сумма обязательных расходов
function getExpensesMonth(amount1, amount2) {
  return amount1 + amount2;
}

// Функция возвращает Накопления за месяц (Доходы минус расходы)
function getAccumulatedMonth(money, callback) {
  return money - callback;
}

// Подсчитывает за какой период будет достигнута цель
function getTargetMonth(accumulatedMonth, mission) {
  return Math.ceil(mission / accumulatedMonth);
}

// Накопления за месяц, вызов
let accumulatedMonth = getAccumulatedMonth(
  money,
  getExpensesMonth(amount1, amount2)
);

period = getTargetMonth(accumulatedMonth, mission);
budgetDay = Math.floor(accumulatedMonth / 30);

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

console.log('расходы за месяц: ', getExpensesMonth(amount1, amount2));
console.log(addExpenses.toLocaleUpperCase().split(','));
console.log(
  'Период достижения цели в ' + mission + ' руб равен ' + period + ' месяцев'
);
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
