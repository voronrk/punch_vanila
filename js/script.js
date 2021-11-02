'use strict';

import {getBase} from './back.js';

const viewMoreToggle = document.querySelectorAll('.field-view-more');
const form = document.querySelector('#filter');
const allInputs = form.querySelectorAll('input');
const modal = document.querySelector('#modal');
const allCards = document.querySelectorAll('.box');
const cardsWrapper = document.querySelector('#cards-wrapper');

const arData = getBase();

let arForm = [];
let arFilter = {};
cardsWrapper.innerHTML = '';

form.reset();
renderCards(arData, arFilter);

function renderCards(arData, arFilter) {
    cardsWrapper.innerHTML = '';
    arData.forEach((data) => {
        if (data.filter(arFilter)) {
            cardsWrapper.appendChild(renderCard(data, arFilter));
        };        
    });
};

function renderCard(data, arFilter) {
    if (data.filter(arFilter)) {
        const view = document.createElement('div');
        view.classList.add('box');
        view.innerHTML = `
            <article class="media">
                <figure class="media-left">
                    <div class="image is-128x128">
                        <img class="card-image" src="${data.pic}">
                    </div>
                </figure>
                <div class="media-content">
                    <div class="content">
                        <p>
                        <strong>${data.name}</strong>
                        <br> Заказ № ${data.orderNum}/${data.year}
                        <br> ${data.sizeWidth}х${data.sizeLength}х${data.sizeHeight} мм
                        <br> Материал - ${data.materials}
                        <br> Машина - ${data.machine}
                        </p>
                    </div>
                </div>
            </article>
            `;
        view.addEventListener('click', (event) => {
            if (event.target.nodeName=='IMG') {
                modal.querySelector('#modal-img').src = event.target.src;
                modal.classList.add('is-active');
            }
        });
    return view;
    };
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
    if (element.type=='text') {
        element.addEventListener('input', () => {
            arFilter[element.id] = [element.value];
            console.log(arFilter);
            renderCards(arData, arFilter);
        });
    };
    
});

modal.addEventListener('click', (event) => {
    console.log(event.target.className);
    if ((event.target.classList.contains('modal-close')) || (event.target.classList.contains('modal-background'))) {
        modal.classList.remove('is-active');
    }
});
