const Emitter = require('tiny-emitter');
const emitter = new Emitter();

function getWindow() {
    return window || { localStorage: { 
        getItem: () => { console.log('getItem') },
        setItem: () => { console.log('setItem') },
    } }
}

function getAll() {
    return JSON.parse(getWindow().localStorage.getItem('shoppingCart')) || [];
}

function getAllClean() {
    const cart = getAll();
    const updatedCart = cart.filter(item => item.amount > 0);
    getWindow().localStorage.setItem('shoppingCart', JSON.stringify(updatedCart));
    return updatedCart;
}

function updateItems(itemIds) {
    const cart = getAll();
    const filteredCart = cart.filter(item => itemIds.includes(item.id) );
    getWindow().localStorage.setItem('shoppingCart', JSON.stringify(filteredCart));
    return filteredCart;
}

function updateStorage(shoppingCart = null) {
    const cart = shoppingCart || getAll();
    const filteredCart = cart.filter(item => item.amount > 0);
    getWindow().localStorage.setItem('shoppingCart', JSON.stringify(filteredCart));
    emitter.emit('storageUpdated', filteredCart);
}

function updateItemAmount(id, amount) {
    const cart = getAll();
    const item = cart.find(item => item.id === id);
    item.amount = amount;
    getWindow().localStorage.setItem('shoppingCart', JSON.stringify(cart));
    emitter.emit('storageUpdated', cart);
}

function addItemAmount(id, amount) {
    const cart = getAll();
    const item = cart.find(item => item.id === id);
    if (item) {
        item.amount += amount;
    } else {
        cart.push({ id, amount });
    }
    updateStorage(cart);
}

function removeItemAmount(id, amount) {
    const cart = getAll();
    const item = cart.find(item => item.id === id);
    if (item) {
        item.amount -= amount;
    }
    updateStorage(cart);
}

function removeItem(id) {
    const cart = getAll();
    const index = cart.findIndex(item => item.id === id);
    cart.splice(index, 1);

    updateStorage(cart);
}

function clearCart() {
    getWindow().localStorage.setItem('shoppingCart', JSON.stringify([]));
}

export default { getAll, updateStorage, addItemAmount, removeItemAmount, removeItem, clearCart, updateItems, emitter, updateItemAmount, getAllClean };