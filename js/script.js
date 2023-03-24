// табы
import tabs from './modules/tabs';

// таймер обратного отсчета
import timer from './modules/timer';

// модальное окно
import modal from './modules/modal';

// используем классы для карточек
// КАРТОЧКИ
import cards from './modules/cards';

// ФОРМА
import forms from './modules/forms';

// SLIDER
import slider from './modules/slider';

// КАЛЬКУЛЯТОР
import calc from './modules/calc';

import { openModal } from './modules/modal';

window.addEventListener('DOMContentLoaded', () => {
    const modalTimerId = setTimeout(() => openModal('.modal', modalTimerId), 50000); // показать модалку через 50сек
    tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    timer('.timer', '2023-06-30');
    modal('[data-modal]', '.modal', modalTimerId);
    cards();
    forms('form', modalTimerId);
    slider({
        container: '.offer__slide',
        slide: '.offer__slide',
        nextArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev',
        totalCounter: '#total',
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner',
    });
    calc();
});