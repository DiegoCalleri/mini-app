import { loadCSSFromFile, loadHTMLFromFile } from '../utils/load.js'

const cssPaths = ["./preloader/preloader.css", "../preloader/preloader.css"];
const htmlPaths = ["./preloader/preloader.html", "../preloader/preloader.html"];


/** Функция для показа прелоадера */
export const showPreloader = () => {
    const preloader = document.getElementById('preloader')
    if (preloader) {
        preloader.style.display = 'flex'
        preloader.classList.remove('hidden')
    }
}

/** Функция для скрытия прелоадера */
export const hidePreloader = () => {
    const preloader = document.getElementById('preloader')
    if (preloader) {
        preloader.classList.add('hidden')
        
        // Ждем окончания анимации и полностью скрываем элемент
        setTimeout(() => {
            if (preloader.classList.contains('hidden')) {
                preloader.style.display = 'none'
            }
        }, 500) // 500ms = время анимации
    }
}

/** Функция для изменения текста прелоадера */
export const setPreloaderText = (text, subtext = 'Пожалуйста, подождите') => {
    const preloader = document.getElementById('preloader')
    if (preloader) {
        const textElement = preloader.querySelector('.preloader-text')
        const subtextElement = preloader.querySelector('.preloader-subtext')
        
        if (textElement) textElement.textContent = text
        if (subtextElement) subtextElement.textContent = subtext
    }
}

/** Функция для инициализации прелоадера */
export const initializePreloader = async () => {
    loadCSSFromFile(cssPaths);
    await loadHTMLFromFile(htmlPaths);
} 