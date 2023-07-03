
var cnt = 0;
function fetch() {
    console.log('hello', ''+cnt++);
}

function debounce (fn, delay) {
    let timer;
    return function () {
        clearTimeout(timer);
        timer = setTimeout(() => fn.apply(this, null), delay);
    } 
}
const makeDebouncedCall = debounce(fetch, 300);

function throttle (fn, delay) {
    let goAhead = true;
    
    return function () {        
        if (goAhead) {
            fn.apply(this, null);
            goAhead = false;
            setTimeout(() => {
                goAhead = true;
            }, delay);
        }
    } 
}

const makeThrottledCall = throttle(fetch, 1000);
