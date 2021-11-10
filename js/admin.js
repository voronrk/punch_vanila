'use strict';

import {savePunch} from './back.js';

const form = document.querySelector('#addPunch');
const btnSubmit = document.querySelector('#submit');
const btnCancel = document.querySelector('#cancel');
const fieldAdd = form.querySelectorAll('.field-add');

form.reset();

fieldAdd.forEach(element => {
    element.addEventListener('click', () => {
        let newInput = element.parentNode.children[1].cloneNode();
        element.parentNode.insertBefore(newInput,element);
        newInput.id = newInput.previousElementSibling.id.split('-')[0] + '-' + ++newInput.previousElementSibling.id.split('-')[1]
    });
});

btnCancel.addEventListener('click', () => {
    form.reset();
});

btnSubmit.addEventListener('click', () => {
    // console.log(form.elements);
    let arPunch = {};

    for (let i=0;i<form.elements.length;i++) {
        const element = form.elements[i];
        let index = element.id.split('-')[1];
        let prefix = element.id.split('-')[0];
        if (element.type=='select') {console.log(element.value)};
        if (((element.type == 'text') || (element.type=='number') || (element.type=='select-one')) && (element.value)) {
            if (arPunch[prefix]) {
                arPunch[prefix].push(element.value);
            } else {
                arPunch[prefix]=[element.value];
            };
        };
        if ((element.type == 'checkbox') && (element.checked)) {
            if (arPunch[prefix]) {
                arPunch[prefix].push(index);
            } else {
                arPunch[prefix]=[index];
            };
        };
    };
    // console.log(arPunch);

    let flag = true;
    flag = flag && ('products' in arPunch) && ('materials' in arPunch) && ('machines' in arPunch) && ('sizeLength' in arPunch) && ('sizeWidth' in arPunch) && ('knifeSizeLength' in arPunch) && ('knifeSizeWidth' in arPunch);
    // console.log(flag);
    if (flag) {
        savePunch(arPunch);
        form.reset();
    } else {
        console.log('alert!');
    };
});