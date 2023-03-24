function cards(params) {
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
                this.classes.forEach((className) => element.classList.add(className));
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
            }); */


    // С ПОМОЩЬЮ БИБЛИОТЕКИ AXIOS
    axios.get('http://localhost:3000/menu')
        .then((data) => {
            data.data.forEach(({
                img, altimg, title, descr, price,
            }) => {
                new MenuCart(img, altimg, title, descr, price, '.menu .container').render();
            });
        }).catch(() => { // ЕСЛИ НЕТ СОЕДИНЕНИЯ И Т.Д
            // ООП

            new MenuCart(
                'img/tabs/vegy.jpg',
                'vegy',
                "Меню 'Фитнес'",
                "Меню 'Фитнес' - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!",
                30,
                '.menu .container',
            ).render();

            new MenuCart(
                'img/tabs/elite.jpg',
                'elite',
                "Меню 'Премиум'",
                "В меню 'Премиум' мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!",
                40,
                '.menu .container',
                'menu__item',
                'big',
            ).render();

            new MenuCart(
                'img/tabs/post.jpg',
                'post',
                "Меню 'Постное'",
                "Меню 'Постное' - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.",
                40,
                '.menu .container',
                'menu__item',
            ).render();
        });
}

export default cards;