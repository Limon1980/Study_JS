'use strickt';
// Присвоим переменным значения для урока 2
let money = 99000;
let income = 'фриланс';
let addExpenses = 'жкх, интернет, машина';
let deposit = true;
let mission = 6e6;
let period = 12;
let budgetDay = money / 30;


console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);

console.log('addExpenses: ', addExpenses.length);
console.log('Период равен ' + period + ' месяцев');
console.log('Цель заработать ' + mission + ' рублей');
console.log((addExpenses.toLocaleUpperCase()).split(','));
console.log('budgetDay: ', budgetDay);