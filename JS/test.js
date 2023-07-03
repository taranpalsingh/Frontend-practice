// function sum (a) {
//     return function (b) {
//         if (b)
//             return sum(a+b);
//         return a;
//     }
// }

// const aoo = sum(1)(2)(3)(4)(5);
// console.log(sum(1)(2)(3)(4)(5)())
// console.log(aoo());


const user = {
    name: "Taran",
    address: {
        city: "Delhi",
        area: "New Delhi"
    },
    office: {
        city:  {
            name: "Gurugram",
            pin: "100011"
        },
        area: "UP"
    }
}

const newObj = {};
function flattenObject (obj, parent) {
    for (const key in obj) {
        if (obj[key] instanceof Object) {
            flattenObject(obj[key], parent+'_'+key);  
        } else {
            newObj[parent+'_'+key] = obj[key];
        }
    }
    return newObj;
    // console.log(obj); 
}

flattenObject(user, 'user')
console.log(newObj);