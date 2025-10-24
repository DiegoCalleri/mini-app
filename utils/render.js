/**
 * Универсальная функция рендера списка элементов в DOM контейнер
 * @param {Array} params.source - Массив данных для рендеринга
 * @param {HTMLElement} params.container - DOM контейнер для вставки элементов
 * @param {Function} params.template - Асинхронная функция шаблона для генерации HTML
 * @param {Object} params.options - Дополнительные опции
 * @param {boolean} params.options.clearContainer - Очищать контейнер перед рендерингом (по умолчанию true)
 * @param {Function} params.options.afterInsert - Callback функция после вставки каждого элемента
 */
export const render = async ({ source, container, template, options = {} }) => {
    const { clearContainer = true, afterInsert } = options
    if (!container) return

    let items = []
    if (Array.isArray(source)) {
        items = source
    } else return

    if (!Array.isArray(items) || items.length === 0) {
        if (clearContainer) container.innerHTML = ''
        return
    }

    if (clearContainer) container.innerHTML = ''

    for (const item of items) {
        const html = await template(item)
        if (!html) continue
        container.insertAdjacentHTML('beforeend', html)
        const inserted = container.lastElementChild
        if (afterInsert && inserted) afterInsert(inserted, item)
    }
}


