window.addEventListener('DOMContentLoaded', () => {
  // табы
  const tabs = document.querySelectorAll('.tabheader__item');
  const tabsContent = document.querySelectorAll('.tabcontent');
  const tabsParent = document.querySelector('.tabheader__items');

  function hideTabContent() {
    tabsContent.forEach(item => {
      item.classList.add('hide');
      item.classList.remove('show', 'fade');
    });
    tabs.forEach(item => {
      item.classList.remove('tabheader__item_active');
    });
  }

  function showTabContent(i = 0) {
    // 0 по умолчанию
    tabsContent[i].classList.remove('hide');
    tabsContent[i].classList.add('show', 'fade');
    tabs[i].classList.add('tabheader__item_active');
  }

  hideTabContent();
  showTabContent();
  tabsParent.addEventListener('click', event => {
    if (event.target && event.target.classList.contains('tabheader__item')) {
      tabs.forEach((item, i) => {
        if (item == event.target) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  }); // таймер обратного отсчета

  const deadLine = '2023-05-11';

  function getTimeRemaining(endtime) {
    let days, hours, minutes, seconds; // для того чтобы вставить 0 если отрицательная t

    const t = Date.parse(endtime) - Date.parse(new Date()); // кол-во миллисекунд от разницы конечной даты и сегодняшней

    if (t <= 0) {
      days = 0;
      hours = 0;
      minutes = 0;
      seconds = 0;
    } else {
      days = Math.floor(t / (1000 * 60 * 60 * 24)); // миллисекунд в дне 

      hours = Math.floor(t / (1000 * 60 * 60) % 24); // делит и возвращает остаток (часы)

      minutes = Math.floor(t / 1000 / 60 % 60); // делит и возращает остаток (минуты)

      seconds = Math.floor(t / 1000 % 60); // делит и возращает остаток (секунды)
    }

    return {
      'total': t,
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
    };
  }

  function getZero(num) {
    // добавляем 0 если число меньше 10
    if (num >= 0 && num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  }

  function setClock(selector, endtime) {
    const timer = document.querySelector(selector);
    const days = timer.querySelector('#days');
    const hours = timer.querySelector('#hours');
    const minutes = timer.querySelector('#minutes');
    const seconds = timer.querySelector('#seconds');
    const timeInterval = setInterval(updateClock, 1000);
    updateClock();

    function updateClock() {
      const t = getTimeRemaining(endtime);
      days.innerHTML = getZero(t.days);
      hours.innerHTML = getZero(t.hours);
      minutes.innerHTML = getZero(t.minutes);
      seconds.innerHTML = getZero(t.seconds);

      if (t.total <= 0) {
        clearInterval(timeInterval);
      }
    }
  }

  setClock('.timer', deadLine); // модальное окно

  const modalTrigger = document.querySelectorAll('[data-modal]');
  const modal = document.querySelector('.modal');

  function openModal() {
    //можно использовать toggle
    modal.classList.remove('hide');
    modal.classList.add('show');
    document.body.style.overflow = 'hidden'; 
    clearInterval(modalTimerId) // не показывать модалку если пользователь уже ее открыл
  }

  modalTrigger.forEach(btn => {
    btn.addEventListener('click', openModal);
  });

  function closeModal() {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
        
      window.scrollTo(0, scrollY - 2);
      console.log('hi');
    }
  

    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
  }


  modal.addEventListener('click', e => {
    if (e.target === modal || e.target.getAttribute('data-close') == '') {
      closeModal();
    }
  });
  document.addEventListener('keydown', e => {
    if (e.code === 'Escape' && modal.classList.contains('show')) {
      closeModal();
    }
  }); 
  
 const modalTimerId = setTimeout(openModal, 50000) // показать модалку через 50сек

  function showModalByScroll() {
    if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
      // прокрученная часть + видимая клиентом часть >= всей высоты документа -1 (для некоторых браузеров) | (то есть конец страницы) 
      openModal();
      window.removeEventListener('scroll', showModalByScroll); // убрать слушатель когда один раз пользователь долистае до конца
    }
  }

  window.addEventListener('scroll', showModalByScroll); // используем классы для карточек

  class MenuCart {
    constructor(src, alt, title, descr, price, parentSelector, ...classes) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.price = price;
      this.transfer = 50;
      this.classes = classes;
      this.parent = document.querySelector(parentSelector);
      this.changeToRu();
    }

    changeToRu() {
      this.price *= this.transfer;
    }

    render() {
      const element = document.createElement('div');

      if (this.classes.length === 0) {
        // если класса "menu__item" не существует
        this.element = 'menu__item';
        element.classList.add(this.element);
      } else {
        this.classes.forEach(className => element.classList.add(className));
      }

      element.innerHTML = `<img src=${this.src} alt=${this.alt}>
            <h3 class="menu__item-subtitle">${this.title}</h3>
            <div class="menu__item-descr">${this.descr}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
            </div>`;
      this.parent.append(element);
    }

  } 

/*
    // берем информацию для карточек из db.json
    const getResources = async (url) => { // async означает что будет асинхронный код
        const res = await fetch(url)

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`) // ВЫКИДЫВАЕМ НОВУЮ ОШИБКУ
        }
        //при возвращении будет ошибка так как метод fetch асинхронный и переменная res еще пустая
        return await res.json(); // получаем и трансформируем в json
    };
        getResources('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({img, altimg, title, descr, price}) => {
                new MenuCart(img, altimg, title, descr, price, ".menu .container").render();
            });
        });*/





    
    
    // С ПОМОЩЬЮ БИБЛИОТЕКИ AXIOS
    axios.get('http://localhost:3000/menu')
    .then(data => {
            data.data.forEach(({img, altimg, title, descr, price}) => {
                new MenuCart(img, altimg, title, descr, price, ".menu .container").render();
            });
        }).catch( () => { // ЕСЛИ НЕТ СОЕДИНЕНИЯ И Т.Д

    // ООП

    new MenuCart(
    "img/tabs/vegy.jpg",
    "vegy",
    "Меню 'Фитнес'",
    "Меню 'Фитнес' - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!",
    30,
    ".menu .container"
    ).render();

    new MenuCart(
    "img/tabs/elite.jpg",
    "elite",
    "Меню 'Премиум'",
    "В меню 'Премиум' мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!",
    40,
    ".menu .container",
    "menu__item",
    "big"
    ).render();

    new MenuCart("img/tabs/post.jpg",
    "post",
    "Меню 'Постное'",
    "Меню 'Постное' - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.",
    40,
    ".menu .container",
    "menu__item"
    ).render();
})


    // ФОРМА
    const forms = document.querySelectorAll('form');
    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо, мы скоро с вами свяжемся',
        failure: 'Что-то пошло не так ...',
    }
    forms.forEach(item => bindPostData(item))

    // ОТПРАВКА ФОРМЫ С ПОМОЩЬЮ FETCH

    const postData = async (url, data) => { // async означает что будет асинхронный код
        const res = await fetch(url, { // отправить на сервер. await всегда идет с async и показывает
            // какие операции надо дождаться, в нашем случае работу промиса которые получается от fetch
            // js ждет конца await
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: data
        });
        //при возвращении будет ошибка так как метод fetch асинхронный и переменная res еще пустая
        return await res.json(); // получаем и трансформируем в json
    };

    function bindPostData(form) {
    form.addEventListener('submit', (e) => { // на отправку
        e.preventDefault(); // отменяем стандартное поведение

        const statusMessage = document.createElement('img');
        statusMessage.src = message.loading;
        statusMessage.textContent = message.loading;
        statusMessage.style.cssText = `
        display: block;
        margin: 0 auto;
        `;
        form.insertAdjacentElement('afterend', statusMessage)

        // ОТПРАВКА ФОРМЫ С ПОМОЩЬЮ XHR

        // const request = new XMLHttpRequest(); // с помощью XMLHttpRequest
        // request.open('POST', 'server.php'); 

        //объект
        //request.setRequestHeader('Content-type', 'multipart/form-data') // заголовки в header не нужен, дублируется из-за xmlhttprequest + formData если не json

        // json
        //request.setRequestHeader('Content-type', 'application/json') // кодировку можно не писать

        const formData = new FormData(form) // создаем таким образом объект с данными, чтобы не находить все данными и создавать объект
        const object = {} // formData мы не можем превратить в json, поэтому создаем новый объект и передаем в него formData
        formData.forEach(function(value, key) {
            object[key] = value;
        })

        

        //fetch('server.php', { 
        //    method: 'POST',
        //    headers: {
        //        'Content-type': 'application/json'
        //    },
        //    body: JSON.stringify(object)
        //})
        const json = JSON.stringify(Object.fromEntries(formData.entries()))

        postData('http://localhost:3000/requests', json)
        .then(data => {
            console.log(data);
            showThanksModal(message.success);
            form.reset() // очистка формы
            statusMessage.remove()
        }).catch(() =>{
            showThanksModal(message.failure);
        }).finally(() =>{
            form.reset() // очистка формы
        }) 



        //request.addEventListener('load', () => { // отслеживаем конечную загрузку запроса
        //    if (request.status === 200) {
        //        console.log(request.response);
                
        //        showThanksModal(message.success);
        //        form.reset() // очистка формы
                
        //        statusMessage.remove()
                
        //    } else {
        //        showThanksModal(message.failure);
        //    }
        //})
    })
  }

  function showThanksModal(message) {
    const prevModalDialog = document.querySelector('.modal__dialog');

    prevModalDialog.classList.add('hide');
    openModal();

    const thanksModal = document.createElement('div');
    thanksModal.classList.add('modal__dialog')
    thanksModal.innerHTML = `
    <div class="modal__content">
        <div class="modal__close" data-close>×</div>
        <div class="modal__title">${message}</div>
    </div>
    `;
    document.querySelector('.modal').append(thanksModal);
    setTimeout(() => {
        thanksModal.remove(); // удаляем оповещение
        prevModalDialog.classList.add('show'); // вставляем старую разметку
        prevModalDialog.classList.remove('hide');
        closeModal();
    }, 4000);
  }

  // API - набор готовых решений
  // DOM API - ВСТРОЕННЫЕ В БРАУЗЕР ВОЗМОЖНОСТИ

//  fetch('https://jsonplaceholder.typicode.com/posts', {
//    method: 'POST',
//    body: JSON.stringify({name:'Alex'}),
//    headers: {
//        'Content-type': 'application/json'requests
//    }
//  }) // get запрос из jsonplaceholder встроена в браузер
//      .then(response => response.json()) // метод превратит данные из json формата в объект возвращая promise
//      .then(json => console.log(json))

//fetch('http://localhost:3000/menu') // с помощью json server открыли menu в 
//// котором у нас база меню. Инициализация json servera : npx json-server db.json
//.then(data => data.json())
//.then(res => console.log(res))

const headerLinks = document.getElementsByClassName('header__link');
for ( let link of headerLinks) {
    link.addEventListener('click', (e) => {
        if ( e.currentTarget && e.currentTarget === link) {
            e.currentTarget.textContent = 'паша'
        }
    })
}
// SLIDER
const slides = document.querySelectorAll('.offer__slide');
const prev = document.querySelector('.offer__slider-prev');
const next = document.querySelector('.offer__slider-next');
const total = document.querySelector('#total');
const current = document.querySelector('#current');


    /*ПЕРВЫЙ ВАРИАНТ (ПРОСТОЙ)

    showSlides(slideIndex);

    if (slides.length < 10) {
        total.textContent= `0${slides.length}`;
    } else {
        total.textContent= slides.length;
    }

    function showSlides(n) {
        if (n > slides.length) {
            slideIndex = 1
        }
        if (n < 1) {
            slideIndex = slides.length
        }

        slides.forEach((item) => {
            item.classList.add('hide')
            item.classList.remove('show')
        })
        slides[slideIndex-1].classList.add('show')
        slides[slideIndex-1].classList.remove('hide')

        if (slides.length < 10) {
            urrent.textContent= `0${slideIndex}`;
        } else {
    current.textContent= slideIndex;
        }
    }


    function plusSlides(n) {
        showSlides(slideIndex += n);
    }
    prev.addEventListener('click', () =>{
            plusSlides(-1)
        })
        next.addEventListener('click', () =>{
            plusSlides(1)
         }) */


    /**ВТОРОЙ ВАРИАНТ (ПРОДВИНУТЫЙ)**/

    // переменные для продвинутого слайдера
const slidesWrapper =document.querySelector('.offer__slider-wrapper');
const slidesField = document.querySelector('.offer__slider-inner');
const width = window.getComputedStyle(slidesWrapper).width; // узнаем ширину видимой части слайдера
const slider = document.querySelector('.offer__slider');
let slideIndex = 1; // индекс слайда
let offset = 0;




if (slides.length < 10) {
    total.textContent= `0${slides.length}`;
    current.textContent = `0${slideIndex}`
} else {
    total.textContent= slides.length;
    current.textContent = slideIndex
}

    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden';

    slides.forEach((slide) => {
        slide.style.width = width;
    })

    slidesWrapper.style.position = 'relative';
    const indicators = document.createElement('ol');
    const dots = []
    indicators.classList.add('carousel-indicators');
    indicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `;

    slider.append(indicators)
    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `;
        if (i === 0) {
            dot.style.opacity = 1;
        }
        indicators.append(dot);
        dots.push(dot);
    }

    function deleteNotDigits(str) {
        return +str.replace(/\D/g, '');
    }

    next.addEventListener('click', () =>{
        if (offset === deleteNotDigits(width) * (slides.length - 1)) { // удаляем px с помощью регулярных
            offset = 0;
        } else {
            offset += deleteNotDigits(width)
        }
        slidesField.style.transform = `translateX(-${offset}px)`

        if (slideIndex == slides.length) {
            slideIndex = 1
        } else {
            slideIndex++
        }

        if (slides.length < 10) {
            current.textContent =`0${slideIndex}`
        } else {
            current.textContent =slideIndex

        }

        dots.forEach(dot => dot.style.opacity = '0.5');
        dots[slideIndex - 1].style.opacity = '1';
    })
    prev.addEventListener('click', () =>{
        if (offset === 0) {
            offset = deleteNotDigits(width) * (slides.length - 1);
        } else {
            offset -= deleteNotDigits(width);
        }
        slidesField.style.transform = `translateX(-${offset}px)`;
        
        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        if (slides.length < 10) {
            current.textContent =`0${slideIndex}`;
        } else {
            current.textContent =slideIndex;
        }

        dots.forEach(dot => dot.style.opacity = '0.5');
        dots[slideIndex - 1].style.opacity = '1';
    })
    
    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to')
            slideIndex = slideTo
            offset = deleteNotDigits(width) * (slideTo - 1);

            slidesField.style.transform = `translateX(-${offset}px)`;

            if (slides.length < 10) {
                current.textContent =`0${slideIndex}`;
            } else {
                current.textContent =slideIndex;
            }

            dots.forEach(dot => dot.style.opacity = '0.5');
            dots[slideIndex - 1].style.opacity = '1';
        })
    })

    // КАЛЬКУЛЯТОР
    const result = document.querySelector('.calculating__result span');
    let sex, height, weight, age, ratio;


    if (localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex');
    }else{
        sex = 'female'
        localStorage.setItem('sex', 'female');
    }

    if (localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio');
    }else{
        ratio = 1.375
        localStorage.setItem('ratio', 1.375);
    }


    //function sexNRatio(atr, value, item) {
    //    if (localStorage.getItem(atr)) {
    //        item = localStorage.getItem(value);
    //    }else{
    //        item = value
    //        localStorage.setItem(atr, value);
    //    }
    //};
    //sexNRatio('sex', 'female', sex);
    //sexNRatio('ratio', 1.375, ratio);
    
    function initLocalSettings(selector, activeClass) {
        const elements = document.querySelectorAll(selector);
        elements.forEach((elem) => {
            elem.classList.remove(activeClass);
            if (elem.getAttribute('id') === localStorage.getItem('sex')) {
                elem.classList.add(activeClass);
            }
            if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                elem.classList.add(activeClass);
            }
        })
    }
    initLocalSettings('#gender div', 'calculating__choose-item_active');
    initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');
    
    function calcTotal() {
        if (!sex || !height || !weight || !age || !ratio) {
            result.textContent = '____';
            return;
        }
        if (sex === 'female') {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    }

    calcTotal()

    const getStaticInformation = (selector, activeClass) => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((elem) => (
            elem.addEventListener('click', (e) => {
                if (e.target.getAttribute('data-ratio') ) {
                    ratio = +e.target.getAttribute('data-ratio')
                    localStorage.setItem('ratio', ratio)
                } else {
                    sex = e.target.getAttribute('id')
                    localStorage.setItem('sex', sex)
                }
                elements.forEach((element) => {
                    element.classList.remove(activeClass);
                });
                e.target.classList.add(activeClass);
                calcTotal()
            })
        ))
    }

    getStaticInformation('#gender div', 'calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');

    function getDynamicInformation(selector) {
        const input = document.querySelector(selector);
        input.addEventListener('input', () => {
            if (input.value.match(/\D/g)) {
                input.style.border = '1px solid red'
            }else{
                input.style.border = 'none'
            }

            switch (input.getAttribute('id')) {
                case 'height':
                    height = +input.value;
                    break;
                case 'weight':
                    weight = +input.value;
                    break;
                case 'age':
                    age = +input.value;
                    break;
            }
            calcTotal()
        })
        
    };
    getDynamicInformation('#height');
    getDynamicInformation('#weight');
    getDynamicInformation('#age');
});