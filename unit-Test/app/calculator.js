
const cal = (x, y) => {

    return x + y;
}

//>----------------------- create method callback

const delayedFilterWithCallback = (array, filter, cb) => {

    setTimeout(() => {
        cb(array.filter(filter));
    }, 1000);
}

//>----------------------- create method Promise

const delayedFilterWithPromise = (array, filter) => {

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(array.filter(filter));
        }, 1000);
    })
}

//>----------------------- create method async

const delayedFilterWithAsync = (array, filter) => {

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(array.filter(filter));
        }, 1000);
    })

}

//>---------------------- Export module

module.exports = {

    cal,
    delayedFilterWithCallback,
    delayedFilterWithPromise,
    delayedFilterWithAsync,
    
}