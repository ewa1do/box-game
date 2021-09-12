'use strict';

// colors:               white        red        blue       green    yellow     orange
const boxesColorList = ['#ecf0f1', '#d63031', '#3867d6', '#16a085', '#f1c40f', '#e67e22'];
const activeColorsList = []; // To store the colors shown at the begining

const boxContainer = document.querySelector('.box-container');
const startButton = document.querySelector('.start');
const submitButton = document.querySelector('.submit');
let countColorIndex = 0;
let countLevel = 1;

class UI {
    static displayLvlOne () {
        const output = `
        <div class="box"></div>
        <div class="box"></div>
        <div class="box"></div>
        `;

        boxContainer.insertAdjacentHTML('beforeend', output);
    }

    static displayLvlTwo () {
        boxContainer.classList.add('level-2');
        const output = `
        <div class="box"></div>
        <div class="box"></div>
        <div class="box"></div>
        <div class="box"></div>
        `;

        boxContainer.insertAdjacentHTML('beforeend', output);
    }

    static displayLvlThree () {
        boxContainer.classList.add('level-3');
        const output = `
        <div class="box"></div>
        <div class="box"></div>
        <div class="box"></div>
        <div class="box"></div>
        <div class="box"></div>
        `;

        boxContainer.insertAdjacentHTML('beforeend', output);
    }

    static displayLvlFour () {
        boxContainer.classList.add('level-4');
        const output = `
        <div class="box"></div>
        <div class="box"></div>
        <div class="box"></div>
        <div class="box"></div>
        <div class="box"></div>
        <div class="box"></div>
        `;

        boxContainer.insertAdjacentHTML('beforeend', output);
    }

    static displayLvlFive () {
        boxContainer.classList.add('level-5');
        const output = `
        <div class="box"></div>
        <div class="box"></div>
        <div class="box"></div>
        <div class="box"></div>
        <div class="box"></div>
        <div class="box"></div>
        <div class="box"></div>
        `;

        boxContainer.insertAdjacentHTML('beforeend', output);
    }

    static clearLevel () {
        Array.from(boxContainer.children).forEach(box => {
            box.remove();
        });
    }

    static setBoxesColor () {
        activeColorsList.length = 0;
        Array.from(boxContainer.children).forEach((box) => {
            
            let hex = Box.getRandomColor();
            if (hex === undefined) hex = '#ecf0f1';

            box.style.backgroundColor = hex;
            
            activeColorsList.push(hex);
        });

        setTimeout(() => this.removeBoxesColor(), 5000);
    }

    static changeBoxColorAfterClick (event) {
        if (event.target.className === 'box') {
            event.target.style.backgroundColor = boxesColorList
                .find((_, i) => i === countColorIndex);
        }
        
        countColorIndex++;
        if (countColorIndex > 5) countColorIndex = 0;
    }

    static removeBoxesColor () {
        Array.from(boxContainer.children).forEach(box => {
            box.style.backgroundColor = '#777';
        });
    }
}

class Box {
    static setRandomIndex () {
        return Math.trunc(Math.random() * boxesColorList.length)
    }

    static getRandomColor () {
        return boxesColorList.find((_, i) => i === Box.setRandomIndex())
    }

    static getBoxesColor() {
        const submittedColors = [];
        Array.from(boxContainer.children).forEach(box => {
            submittedColors.push(box.style.backgroundColor);
        });

        const submittedHexColors = submittedColors.map(rgb => {
            const [r, g, b] = Box.sliceRGBComponents(rgb)
            
            return Box.convertRGBToHex(r, g, b);
        });

        console.log(submittedHexColors);

        const success = submittedHexColors
            .every((hex, i) => hex === activeColorsList[i]);

        if (success) alert('Victory!!');
        else alert('Game Over');
    }

    static sliceRGBComponents (rgb) {
        const r = rgb.slice(rgb.indexOf('(',) + 1, rgb.indexOf(',')).trim();
        const g = rgb.slice(rgb.indexOf(' ') + 1, rgb.lastIndexOf(',')).trim();
        const b = rgb.slice(rgb.lastIndexOf(' '), rgb.indexOf(')')).trim();

        return [r, g, b];
    }

    static RGBcompToHex (rgb) {
        const hex = Number(rgb).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    }

    static convertRGBToHex (r, g, b) {
        return '#' + Box.RGBcompToHex(r) + Box.RGBcompToHex(g) + Box.RGBcompToHex(b);
    }
}

const levelList = [UI.displayLvlOne, UI.displayLvlTwo, UI.displayLvlThree];

// Event Handlers
startButton.addEventListener('click', UI.setBoxesColor.bind(UI));
document.addEventListener('DOMContentLoaded', UI.displayLvlFive);

boxContainer.addEventListener('click', UI.changeBoxColorAfterClick);

submitButton.addEventListener('click', Box.getBoxesColor);