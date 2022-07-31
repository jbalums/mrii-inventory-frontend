const getStorage = async key => {
    if (window.localStorage.getItem(key))
        return JSON.parse(window.localStorage.getItem(key))

    return null
}

const setStorage = async (key, value) => {
    return window.localStorage.setItem(key, JSON.stringify(value))
}

const clear = async () => {
    window.localStorage.clear();
}

const remove = async (key) => {
    window.localStorage.removeItem(key)
}

export {getStorage, setStorage, remove, clear}
