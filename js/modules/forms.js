import { openModal, closeModal } from './modal';

import postData from '../services/services';

function forms(formSelector, modalTimerId) {
    const forms = document.querySelectorAll(formSelector);
    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо, мы скоро с вами свяжемся',
        failure: 'Что-то пошло не так ...',
    };
    forms.forEach((item) => bindPostData(item));

    // ОТПРАВКА ФОРМЫ С ПОМОЩЬЮ FETCH



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
            form.insertAdjacentElement('afterend', statusMessage);

            // ОТПРАВКА ФОРМЫ С ПОМОЩЬЮ XHR

            // const request = new XMLHttpRequest(); // с помощью XMLHttpRequest
            // request.open('POST', 'server.php');

            // объект
            // request.setRequestHeader('Content-type', 'multipart/form-data') // заголовки в header не нужен, дублируется из-за xmlhttprequest + formData если не json

            // json
            // request.setRequestHeader('Content-type', 'application/json') // кодировку можно не писать

            const formData = new FormData(form); // создаем таким образом объект с данными, чтобы не находить все данными и создавать объект
            const object = {}; // formData мы не можем превратить в json, поэтому создаем новый объект и передаем в него formData
            formData.forEach((value, key) => {
                object[key] = value;
            });



            // fetch('server.php', {
            //    method: 'POST',
            //    headers: {
            //        'Content-type': 'application/json'
            //    },
            //    body: JSON.stringify(object)
            // })
            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData('http://localhost:3000/requests', json)
                .then((data) => {
                    console.log(data);
                    showThanksModal(message.success);
                    form.reset(); // очистка формы
                    statusMessage.remove();
                }).catch(() => {
                    showThanksModal(message.failure);
                }).finally(() => {
                    form.reset(); // очистка формы
                });



            // request.addEventListener('load', () => { // отслеживаем конечную загрузку запроса
            //    if (request.status === 200) {
            //        console.log(request.response);

            //        showThanksModal(message.success);
            //        form.reset() // очистка формы

            //        statusMessage.remove()

        //    } else {
        //        showThanksModal(message.failure);
        //    }
        // })
        });
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        openModal('.modal', modalTimerId);

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
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
            closeModal('.modal');
        }, 4000);
    }
}
export default forms;