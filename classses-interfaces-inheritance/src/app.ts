//DECORATORS

function Looger(constructor: Function){//clases are syntactil sugar over function constructors
    console.log('Logging...');
    console.log(constructor);
}


function loogerFactory(logString: string){//Decorator factory
    //let us pass arugments to Decorators

    return function(constructor: Function){//executes as loogger(values)
        console.log('Logging...' + logString);
        console.log(constructor);
    }
}

@loogerFactory('LOGGIGN - PERSON')//execute before and gets the constructor definition
class Person {
    name = 'Max'
    constructor(){
        console.log('Creating person object....');
    }
}

const person = new Person();

console.log(person);

//Decorator Factories....let us return a Decorator