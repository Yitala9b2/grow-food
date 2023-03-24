
function timer(id, deadLine) {
    function getTimeRemaining(endtime) {
        let days; let hours; let minutes; let
            seconds; // для того чтобы вставить 0 если отрицательная t

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
            total: t,
            days,
            hours,
            minutes,
            seconds,
        };
    }

    function getZero(num) {
        // добавляем 0 если число меньше 10
        if (num >= 0 && num < 10) {
            return `0${num}`;
        }
        return num;
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector);
        const days = timer.querySelector('#days');
        const hours = timer.querySelector('#hours');
        const minutes = timer.querySelector('#minutes');
        const seconds = timer.querySelector('#seconds');

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
        const timeInterval = setInterval(updateClock, 1000);
        updateClock();
    }

    setClock(id, deadLine);
}

export default timer;