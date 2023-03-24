const postData = async (url, data) => { // async означает что будет асинхронный код
    const res = await fetch(url, { // отправить на сервер. await всегда идет с async и показывает
        // какие операции надо дождаться, в нашем случае работу промиса которые получается от fetch
        // js ждет конца await
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: data,
    });
    // при возвращении будет ошибка так как метод fetch асинхронный и переменная res еще пустая
    return await res.json(); // получаем и трансформируем в json
};




export default postData;