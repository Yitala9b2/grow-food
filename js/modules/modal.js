function openModal(modalSelector, modalTimerId) {
    // можно использовать toggle
    const modal = document.querySelector(modalSelector);
    modal.classList.remove('hide');
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
    if (modalTimerId) {
        clearInterval(modalTimerId); // не показывать модалку если пользователь уже ее открыл
    }
}



function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
        window.scrollTo(0, scrollY - 2);
        console.log('hi');
    }
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

function modal(triggerSelector, modalSelector, modalTimerId) {
    const modalTrigger = document.querySelectorAll(triggerSelector);
    const modal = document.querySelector(modalSelector);

    modalTrigger.forEach((btn) => {
        btn.addEventListener('click', () => { openModal(modalSelector, modalTimerId); });
    });






    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal(modalSelector);
        }
    });
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            closeModal(modalSelector);
        }
    });



    function showModalByScroll() {
        if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
            // прокрученная часть + видимая клиентом часть >= всей высоты документа -1 (для некоторых браузеров) | (то есть конец страницы)
            openModal(modalSelector, modalTimerId);
            window.removeEventListener('scroll', showModalByScroll); // убрать слушатель когда один раз пользователь долистае до конца
        }
    }

    window.addEventListener('scroll', showModalByScroll);
}

export default modal;
export { closeModal };
export { openModal };