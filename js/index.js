'use strict';

// colors:               white        red        blue       green    yellow     orange
const boxesColorList = ['#ecf0f1', '#d63031', '#3867d6', '#16a085', '#f1c40f', '#e67e22'];
const activeColorsList = []; // To store the colors shown at the begining

const boxContainer = document.querySelector('.box-container');
const startButton = document.querySelector('.start');
const submitButton = document.querySelector('.submit');
const scoreLabel = document.querySelector('.score');
const scoreDiv = document.querySelector('.score-div');

let countColorIndex = 0;
let countLevel = 0;
let delay = 5000;
let gameScore = 0;

class UI {
    static displayLvlOne () {
        if (boxContainer.classList.contains('level-5')) {
            boxContainer.className = UI.removeLevelClasses();
        }
        boxContainer.classList.add('level-1');
        const output = `
        <div class="box"></div>
        <div class="box"></div>
        <div class="box"></div>
        `;

        boxContainer.insertAdjacentHTML('beforeend', output);
    }

    static displayLvlTwo () {
        boxContainer.className = this.removeLevelClasses();
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
        boxContainer.className = this.removeLevelClasses();
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
        boxContainer.className = this.removeLevelClasses();
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
        boxContainer.className = this.removeLevelClasses();
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

    static displayScoresUI () {
        const output = `
            <p>Score: <span class="score">0</span></p>
            <p>HighScore: <span class="high-score"></span></p>
        `

        scoreDiv.insertAdjacentHTML('afterbegin', output);
    }

    static removeScoresUI() {
        Array.from(scoreDiv.children).forEach(score => score.remove());
    }

    static updateScoresUI () {
        this.removeScoresUI();
        this.displayScoresUI();
    } 

    static setBoxesColor () {
        activeColorsList.length = 0;
        Array.from(boxContainer.children).forEach((box) => {
            
            let hex = Box.getRandomColor();
            if (hex === undefined) hex = '#ecf0f1';

            box.style.backgroundColor = hex;
            
            activeColorsList.push(hex);

            this.removeColorDelay(delay);
        });
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

    static removeLevelClasses () {
        return boxContainer.className.slice(0, boxContainer.className.indexOf('r') + 1);
    }

    static removeColorDelay (miliseconds) {
        setTimeout(() => this.removeBoxesColor(), miliseconds);
    }

    static showHighScore () {
        return document.querySelector('.high-score').textContent = localStorage.getItem('high');

    }
}



class Box {
    static setRandomIndex () {
        return Math.trunc(Math.random() * boxesColorList.length)
    }

    static getRandomColor () {
        return boxesColorList.find((_, i) => i === Box.setRandomIndex())
    }

    static gameFlow() {
        const submittedColors = [];
        Array.from(boxContainer.children).forEach(box => {
            submittedColors.push(box.style.backgroundColor);
        });

        const submittedHexColors = submittedColors.map(rgb => {
            const [r, g, b] = Box.sliceRGBComponents(rgb)
            return Box.convertRGBToHex(r, g, b);
        });

        const success = submittedHexColors
            .every((hex, i) => hex === activeColorsList[i]);

        if (success) {
            countLevel++;
            Box.changeCurrentLevel();
            UI.setBoxesColor();
            gameScore += 100;
        } else {
            UI.updateScoresUI();
            countLevel = 0;
            boxContainer.className = UI.removeLevelClasses();
            Box.changeCurrentLevel();
            Box.setHighScore();
            gameScore = 0;
        }
        
        document.querySelector('.score').textContent = gameScore;

    }

    static changeCurrentLevel () {
        UI.clearLevel();

        switch (countLevel) {
            case 0: UI.displayLvlOne(); break;
            case 1: UI.displayLvlTwo(); break;
            case 2: UI.displayLvlThree(); break;
            case 3: UI.displayLvlFour(); break;
            case 4: UI.displayLvlFive(); break;
        }

        if (countLevel > 4) {
            delay = 3000;
            UI.displayLvlFive();
        }
    }

    static setHighScore () {
        if (localStorage.length > 0) {
            const highScore = +localStorage.getItem('high');
            if (gameScore > highScore) {
                localStorage.clear();
                localStorage.setItem('high', gameScore);
            }
        } else {
            localStorage.setItem('high', gameScore);
        }
        UI.showHighScore();
        // document.querySelector('.high-score').textContent = localStorage.getItem('high');

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

// Event Handlers
startButton.addEventListener('click', UI.setBoxesColor.bind(UI));
document.addEventListener('DOMContentLoaded', UI.displayLvlOne);
document.addEventListener('DOMContentLoaded', UI.displayScoresUI);
document.addEventListener('DOMContentLoaded', UI.showHighScore);

boxContainer.addEventListener('click', UI.changeBoxColorAfterClick);
submitButton.addEventListener('click', Box.gameFlow);