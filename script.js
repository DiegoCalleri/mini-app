import { getUserData, showPreloader, waitForTelegramReady, setPreloaderText, waitForTelegram, hidePreloader } from './telegram.js'
import { getQuantityInputHTML, initializeBuyButtons } from './buy-button/buy-button.js'
import {render} from './utils/render.js'

const container = document.querySelector('.card-list')

container.innerHTML = ''

const productTemplate = async(product) => {
    const user = await getUserData()
    const userData = localStorage.getItem(user.id)
    let buttonHTML = `<button class="buy-button">Добавить</button>`

    if (userData) {
        try {
            const productList = JSON.parse(userData);

            const p = productList.find(p => p.id === product.id)
            if (p && p.count > 0) {
                buttonHTML = getQuantityInputHTML(product.id, p.count)
            } 
        } catch (error) {
            console.error('Ошибка парсинга данных пользователя:', error)
        }
    }

    return `
        <div class="card">
            <a href="./product/product.html?id=${product.id}">
                <img class="card-img" src="${product.image_url}" alt="картинка">
            </a>
            <div class="card-content">
                <div class="card-content-description">
                    <h2 class="card-price">${product.price}</h2>
                    <p class="card-title">${product.name}</p>
                </div>
                <div class="product-buy-button" btn_product_id=${product.id}>
                    ${buttonHTML}
                </div>
            </div>
        </div>
    `; 
}

const response = await fetch('./goods.json')

if (!response.ok) throw new Error('Ошибка загрузки товаров')

const goods = await response.json()

const loadProducts = async () => {
    await render({
        source: goods,
        container,
        template: async (product) => await productTemplate(product),
    })
    initializeBuyButtons();
    console.log('Products loaded successfully');
}


showPreloader()

setPreloaderText('Загрузка товаров...', 'Пожалуйста, подождите')

waitForTelegram(async() => {
    try {
        await waitForTelegramReady()

        document.querySelector('.title').innerHTML = 'Товары нашего магазина';

        await loadProducts()

        hidePreloader()

        console.log('Products loaded successfully');
    }
    catch (error) {
        hidePreloader()
        console.error('Error loading products:', error)
    }
})