'use strict';

import {getBase} from './back.js';
import Punch from './punch.js';

const viewMoreToggle = document.querySelectorAll('.field-view-more');
const form = document.querySelector('#filter');
const allInputs = form.querySelectorAll('input');
const modal = document.querySelector('#modal');
const cardsWrapper = document.querySelector('#cards-wrapper');

// let arForm = [];
let arFilter = {};
let arData = [];
cardsWrapper.innerHTML = '';

getBase()
.then(data => {
    data.forEach(item => {
        arData.push(new Punch(item));
    });
    console.log(arData);
    form.reset();
    renderCards(arData, arFilter);
});

function renderCards(arData, arFilter) {
    cardsWrapper.innerHTML = '';
    arData.forEach((data) => {
        if (data.filter(arFilter)) {
            cardsWrapper.appendChild(data.card(arFilter));
        };        
    });
};

viewMoreToggle.forEach(element => {
    element.addEventListener('click', () => {
        element.parentNode.children[1].classList.toggle('field-wrapper-small');
        element.parentNode.children[1].classList.toggle('field-wrapper-full');
        element.innerHTML=='Показать еще' ? element.innerHTML='Скрыть' : element.innerHTML='Показать еще';
    });
});

allInputs.forEach(element => {
    if (element.type=='checkbox') {
        element.addEventListener('change', () => {
            if (element.checked) {
                if (arFilter[element.parentNode.parentNode.parentNode.id]) {
                    arFilter[element.parentNode.parentNode.parentNode.id].push(element.id);
                } else {
                    arFilter[element.parentNode.parentNode.parentNode.id] = [element.id];
                };
            } else {
                arFilter[element.parentNode.parentNode.parentNode.id].splice(arFilter[element.parentNode.parentNode.parentNode.id].indexOf(element.id),1);
                if (arFilter[element.parentNode.parentNode.parentNode.id].length==0) {
                    delete arFilter[element.parentNode.parentNode.parentNode.id];
                };
            };
            console.log(arFilter);
            renderCards(arData, arFilter);
        });
    };
    if ((element.type=='text') || (element.type=='number')) {
        element.addEventListener('input', () => {
            if ((element.value=='') || (element.value==0)) {
                delete arFilter[element.id];
            } else {
                if (element.type=='text') {
                    arFilter[element.id] = [element.value];
                } else {
                    arFilter[element.id] = [+element.value];
                };
            };
            console.log(arFilter);
            renderCards(arData, arFilter);
        });
    };
});

modal.addEventListener('click', (event) => {
    console.log(event.target.className);
    if ((event.target.classList.contains('modal-close')) || (event.target.classList.contains('modal-background'))) {
        modal.classList.remove('is-active');
    };
});
