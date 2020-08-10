"use strict";
// Присвоим переменным значения для урока 2
let money = 99000;
let income = "фриланс";
let addExpenses = "жкх, интернет, машина";
let deposit = true;
let mission = 6e6;
let period = 12;
let budgetDay;
let budgetMonth;

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);

money = +prompt("Ваш месячный доход?");
addExpenses = prompt(
  "Перечислите возможные расходы за рассчитываемый период через запятую?"
);
deposit = confirm("Есть ли у вас депозит в банке?");

let expenses1 = prompt("Введите обязательную статью расходов?");
let amount1 = +prompt("Во сколько это обойдется?");
let expenses2 = prompt("Введите обязательную статью расходов?");
let amount2 = +prompt("Во сколько это обойдется?");

budgetMonth = money - amount1 - amount2;

period = Math.ceil(mission / budgetMonth);
budgetDay = Math.floor(budgetMonth / 30);

console.log("deposit: ", deposit);
console.log("addExpenses: ", addExpenses);
console.log("Период равен " + period + " месяцев");
console.log("Цель заработать " + mission + " рублей");
console.log(addExpenses.toLocaleUpperCase().split(","));
console.log("budgetDay: ", budgetDay);
console.log("Бюжет на месяц " + budgetMonth);

if (budgetDay >= 1200) {
  console.log("У вас высокий уровень дохода!");
} else if (budgetDay >= 600 && budgetDay < 1200) {
  console.log("У вас средний уровень дохода!");
} else if (budgetDay < 600 && budgetDay > 0) {
  console.log("К сожалению у вас уровень дохода ниже среднего!");
} else if (budgetDay <= 0) {
  console.log("Что то пошло не так!");
} else {
  console.log("Что то пошло не так!");
}
