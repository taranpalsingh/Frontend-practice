
let name = {
    first: "Taran",
    last: "Singh"
}

function print (town, country) {
    console.log(this.first + ' ' + this.last + ' ' + town + ' ' + country);
}
// using the in-built bind function
let printName = print.bind(name, 'Delhi');
printName('India');

// Creating a custom polyfil for bind functionality
Function.prototype.myBind  = function (...args) {
    let func = this, params = args.slice(1);
    return function (...args2) {
        func.apply(args[0], [...params, ...args2]);
    }
}

let printName2 = print.myBind(name, 'Delhi');
printName2('India');