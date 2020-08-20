'use strict';

// Используя только файл скрипта (html руками не трогать) выполнить такие действия:




// Восстановить порядок глав во второй и пятой книге (внимательно инспектируйте индексы элементов, поможет dev tools)
// в шестой книге добавить главу “Глава 8: За пределами ES6” и поставить её в правильное место

const bookList = document.querySelectorAll('.book');
const books = document.querySelector('.books');
const adv = document.querySelector('.adv');

let arrSort = [];
// получим новый масив элементов книг по номеру
for (let i = 0; i < bookList.length; i++){
  let index = bookList[i].querySelector('h2').textContent.trim().substr(6, 1);
  arrSort[index] = bookList[i];
}

// Восстановить порядок книг.
arrSort.forEach((i) => {
  books.insertAdjacentElement('beforeend', i);
});
// Заменить картинку заднего фона на другую из папки image
document.body.style.background = 'url(image/you-dont-know-js.jpg) center no-repeat';
// Исправить заголовок в книге 3( Получится - "Книга 3. this и Прототипы Объектов")
arrSort[3].querySelector('h2 a').textContent = 'Книга 3. this и Прототипы Объектов';
// Удалить рекламу со страницы
adv.remove();

const book2Sort = arrSort[2].querySelectorAll('li');

book2Sort[3].after(book2Sort[6]);
book2Sort[6].after(book2Sort[8]);
book2Sort[9].after(book2Sort[2]);

const book5Sort = arrSort[5].querySelectorAll('li');

book5Sort[1].after(book5Sort[9]);
book5Sort[9].after(book5Sort[3]);
book5Sort[3].after(book5Sort[4]);
book5Sort[8].before(book5Sort[5]);

let book6Sort = arrSort[6].querySelectorAll('li'),
newLi6 = document.createElement('li');
newLi6.textContent = 'Глава 8: За пределами ES6';
book6Sort[8].after(newLi6);

for(let i=0; i < book6Sort.length; i++){
  console.log(i + ' ' + book6Sort[i].textContent );
}
