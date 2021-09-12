'use strict';
// colors: white, red, blue, green, yellow, orange

const boxesColorList = ['#ecf0f1', '#d63031', '#3867d6', '#16a085', '#f1c40f', '#e67e22'];

const boxContainer = document.querySelector('.box-container');
const startButton = document.querySelector('.start');

class UI {

    static displayLvlOne () {
        const output = `
        <div class="box"></div>
        <div class="box"></div>
        <div class="box"></div>
        `;

        boxContainer.insertAdjacentHTML('beforeend', output);
    }
}

class Box {
    static getRandomIndex = () => Math.trunc(Math.random() * 7);

    static getRandomColor = () => boxesColorList.find((_, i) => i === Box.getRandomIndex());
}


// Event Handlers
startButton.addEventListener('click', function (e) {
    Array.from(boxContainer.children).forEach((box) => {
        const hex = Box.getRandomColor();

        if (hex === undefined) box.style.backgroundColor = '#ecf0f1';

        box.style.backgroundColor = hex;
    });
});

document.addEventListener('DOMContentLoaded', UI.displayLvlOne);
























// Timers: setTimeout and setInterval

// setTimeout
// const ingredients = ['olives', /*'spinach',*/ 'tomato'];

// const pizzaTimer = setTimeout((ing1, ing2) => 
//   console.log(`Here is your pizza with ${ing1} and ${ing2}!!`), 
//   3000, 
//   // 'olives',
//   // 'spinach'
//   ...ingredients
// );
// console.log('waiting...');

// if (ingredients.includes('spinach')) clearTimeout(pizzaTimer);



// // setInterval

// setInterval(function () {
//   const now = new Date();
//   console.log(now);
// }, 3000);