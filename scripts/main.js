let balance = 500; // Исходный баланс
let basket = [] // Корзина 
const books = [ // Книги на складе
    {
        id: 1,
        name: 'Совершенный код. Мастер-класс',
        price: 100,
        amount: 3
    },
    {
        id: 2,
        name: 'Rapid Development, Steve McConnell',
        price: 180,
        amount: 2
    },
    {
        id: 3,
        name: 'Искусство программирования, Д.Кнут',
        price: 210,
        amount: 1
    },
]


// --------------------------Заполняем данные личного кабинета--------------------------
const balanceCount = document.querySelector(".balance__count")
const accountBasket = document.querySelector(".account__basket")
const basketBooksCount = accountBasket.querySelector(".basket__books-count")
const basketTotalSum = accountBasket.querySelector(".basket__total-sum")

updateAccount()


function updateAccount() {
    balanceCount.textContent = balance
    if (basket.length === 0) {
        accountBasket.textContent = "Корзина пуста"
    } else {
        accountBasket.innerHTML = `
            Вы купили <span class="basket__books-count">${basket.length} ${
                // Валидация слова "книга"
                [11, 12, 13, 14, 15, 16, 17, 18, 19]
                    .includes(basket.length % 100) ? "книг" :
                [2, 3, 4].includes(basket.length % 10) ? "книги" : 
                basket.length % 10 === 1 ? "книгу" : 
                "книг"
            }
            </span> на сумму <span class="basket__total-sum">${
                (  // Функция для получения суммы всех цен в корзине
                    data => {
                        let totalSum = 0
                        data.map(elem => totalSum += elem.price)
                        return totalSum
                    }
                )(basket)
            }</span>₽
        `
    }
}


// ---------------------------Заполняем список кинг со склада---------------------------
const catalogBooks = document.querySelector(".catalog__books")

updateCatalogBook()


function updateCatalogBook() {
    catalogBooks.innerHTML = ""
    books.map(book => {
        catalogBook = document.createElement("div")
        catalogBook.classList = "catalog__book"
        catalogBook.setAttribute("data-id", book.id)
        catalogBook.innerHTML = `
            <div class="book__info">
                <div class="book__name">${book.name}</div>
                <div class="book__price">Цена: <span>${book.price}</span>₽</div>
                <div class="book__amount">Осталось: <span>${book.amount}</span></div>
            </div>
            <button class="book__buy">Купить</but>
        `
        catalogBooks.append(catalogBook)
    })
}


// ------------------------Вешаем листенеры на на кнопки "Купить"-----------------------
const bookBuyButtons = document.querySelectorAll(".book__buy")

Array.from(bookBuyButtons).map(bookBuyButton => {
    bookBuyButton.addEventListener("click", () => {
        let data = {}
        const catalogBook = bookBuyButton.parentNode

        bookId = catalogBook.getAttribute("data-id")
        book = books.filter(b => b.id == bookId)[0]

        data.id = bookId
        data.name = book.name
        data.price = book.price

        basket.push(data) // Добавили в корзину книгу
        balance -= book.price  // Вычли необходимую сумму из баланса

        // Уменьшили количество книг на складе
        book.amount-- 
        catalogBook.querySelector(".book__amount > span").textContent = book.amount

        updateAccount()   
    })
})