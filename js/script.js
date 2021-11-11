'use strict';

import {getBase, Punch} from './back.js';

const viewMoreToggle = document.querySelectorAll('.field-view-more');
const form = document.querySelector('#filter');
const allInputs = form.querySelectorAll('input');
const modal = document.querySelector('#modal');
const allCards = document.querySelectorAll('.box');
const cardsWrapper = document.querySelector('#cards-wrapper');

let arForm = [];
let arFilter = {};
let arData = [];
cardsWrapper.innerHTML = '';

getBase()
.then(data => {
    console.log(data);
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
            cardsWrapper.appendChild(renderCard(data, arFilter));
        };        
    });
};

function renderArray(arData) {
    let outString = '';
    arData.forEach(item => {
        outString += `${item}, `;
    });
    return outString.substring(0, outString.length-2);
};

function renderCard(data, arFilter) {
    if (data.filter(arFilter)) {
        const view = document.createElement('div');
        view.classList.add('box');
        view.innerHTML = `
            <article class="media">
                <figure class="media-left">
                    <div class="image is-128x128">
                        <img class="card-image" src="pic/${data.pics[0]}">
                    </div>
                </figure>
                <div class="media-content">
                    <div class="content">
                        <div class="has-text-weight-bold is-size-5">${data.name}</div>
                        <div>${renderArray(data.products)}</div>
                        <div class="columns">
                            <div class="column">
                                <span class="has-text-weight-bold">Заказ № ${data.orderNum}/${data.year}</span>
                                <br> Материал: ${renderArray(data.materials)}
                                <br> Машина: ${renderArray(data.machines)}
                            </div>
                            <div class="column">
                                <span class="has-text-weight-bold">Размеры изделия</span>
                                <br>Длина, мм: ${data.sizeLength}
                                <br>Ширина, мм: ${data.sizeWidth}
                                <br>Высота, мм: ${data.sizeHeight}
                            </div>
                            <div class="column">
                                <span class="has-text-weight-bold">Размер по ножам</span>
                                <br>Длина, мм: ${data.knifeSizeLength}
                                <br>Ширина, мм: ${data.knifeSizeWidth}
                            </div>
                        </div>                        
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
    }
});
