export function initFiltering(elements) {
    const updateIndexes = (elements, indexes) => {
        Object.keys(indexes).forEach((elementName) => {
            elements[elementName].append(
                ...Object.values(indexes[elementName]).map((name) => {
                    const option = document.createElement('option');
                    option.value = name;
                    option.textContent = name;
                    return option;
                })
            );
        });
    };

    const applyFiltering = (query, state, action) => {
        // @todo: #4.2 — обработка очистки поля
        if (action && action.name === 'clear') {
            const fieldName = action.dataset.field;
            const input = elements[fieldName];

            if (input) {
                input.value = '';
            }
        }

        // @todo: #4.5 — query вместо фильтротрования компаратором
        const filter = {};

        Object.keys(elements).forEach((key) => {
            if (elements[key]) {
                if (
                    ['INPUT', 'SELECT'].includes(elements[key].tagName) &&
                    elements[key].value
                ) {
                    filter[`filter[${elements[key].name}]`] = elements[key].value;
                }
            }
        });

        return Object.keys(filter).length
            ? Object.assign({}, query, filter)
            : query;
    };

    return {
        updateIndexes,
        applyFiltering
    };
}