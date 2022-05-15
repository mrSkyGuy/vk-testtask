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
const account = document.querySelector(".account")
const accountInfo = account.querySelector(".account__info")
const balanceCount = account.querySelector(".balance__count")
const accountBasket = account.querySelector(".account__basket")
const basketBooksCount = accountBasket.querySelector(".basket__books-count")
const basketTotalSum = accountBasket.querySelector(".basket__total-sum")
const errorMessage = document.querySelector(".error-message")

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

        // На всякий случай меняем значение свойства top, чтобы если высота личного 
        // кабинета изменилась, то и сообщение об ошибке сдвинулось
        errorMessage.style.top = `calc(
            ${getComputedStyle(account).getPropertyValue("top")}
            + ${getComputedStyle(account).getPropertyValue("height")} 
            + 8px
        )`
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
            ${ book.amount > 0 ? '<button class="book__buy">Купить</but>' : "" }
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

        if ((book.price > balance) || (book.amount <= 0)) {
            // Если сообщение уже появилось ранее
            if (errorMessage.style.display === "block") return

            errorMessage.textContent = 
                (book.price > balance) ? "Недостаточно средств" :
                (book.amount <= 0) ? "Книги закончились" : 
                "Ошибка"

            errorMessage.style.display = "block"
            setTimeout(() => {  
                // Timeout с задержкой в 1ms нужен для того, чтобы блок сообщения 
                // сначала появился и только потом выдвинулся справа
                // Иначе все произойдет синхронно, и анимации не будет видно
                errorMessage.style.transform = "translateX(0%)"
            }, 1)

            setTimeout(() => {
                errorMessage.style.transform = "translateX(100%)"
                
                // Ждем, пока закончится анимация, и пропадаем
                setTimeout(() => {
                    errorMessage.style.display = "none"
                }, 400)  // 400ms - длительность анимации  
            }, 3000)

            return
        }

        data.id = bookId
        data.name = book.name
        data.price = book.price

        basket.push(data) // Добавили в корзину книгу
        balance -= book.price  // Вычли необходимую сумму из баланса

        // Уменьшили количество книг на складе
        book.amount-- 
        catalogBook.querySelector(".book__amount > span").textContent = book.amount

        // Спрячем кнопку "Купить", если книг не осталось на складе
        if (book.amount <= 0) bookBuyButton.style.display = "none" 

        updateAccount()
    })
})
