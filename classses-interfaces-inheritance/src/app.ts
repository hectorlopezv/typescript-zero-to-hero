//Generics types
//arrays are generics
//certain type connected to another type
//we want to know with type if that another type is for better ts support 

//Example 1
const names: Array<string> = ['MAX', 'Manuel'];
names[0].split(' ');

//Example 2
//Promise Type contains another type
//Telling it will yiled an string to get better ts support
const promise:Promise<string> = new Promise((resolve, _) =>{
    setTimeout(() =>{
        resolve('this is done!');
    }, 2000);
});

promise.then((response) =>{
    response.split(' ');
});

//Creating a Generic Function
//Tells to intersection Types of parameters T & U
//telling that it can be of diferrent types
function merge<T, U>(objA:T, objB:U){//we dont know exactly what the type shold be
    //usefull in objects, T, U  types are set dinamically 
    return Object.assign(objA, objB);//return new object
};
const mergeObj2 = merge({name: 'Max', hobbies: ['Sports']}, {age: 30});
//tell what type FOR T,U for that function call... on the generic Function
//const mergeObj = merge<string, number>({name: 'Max'}, {age: 20});
//types infers the value for T, U... BUT WE CAN DOIT MANUALLY
const mergeObj = merge<{name:string}, {age: number}>({name: 'Max'}, {age: 20});
console.log(mergeObj.age);
console.log(mergeObj2);












 

