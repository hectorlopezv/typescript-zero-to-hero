//DECORATORS

function Looger(constructor: Function){//clases are syntactil sugar over function constructors
    console.log('Logging...');
    console.log(constructor);
}


function loogerFactory(logString: string){//Decorator factory
    //let us pass arugments to Decorators
    console.log('Factory Looger')
    return function(constructor: Function){//executes as loogger(values)
        console.log('Logging...' + logString);
        console.log(constructor);
    }
}


function WithTemplate(template: string, hookId: string){
    // a template and a place where it should be rendered
    console.log('WithTemplate'); 
    return function(constructor: any){//decorators for classes, ARGUMENTS IT GET DEPENDS ON WHERE WE USED IT
        //extra logic
        console.log('Rendering template');
        const hookEl = document.getElementById(hookId);
        const p = new constructor();//use class basically
        if(hookEl){
            hookEl.innerHTML = template;
            hookEl.querySelector('h1')!.textContent = p.name;
        }
        
    }
}

//@loogerFactory('LOGGIGN - PERSON')//execute before and gets the constructor definition
//Multiple Decorators
@loogerFactory('Loggin-in-Here')//execute 2
@WithTemplate('<h1>my super Baby</h1>', 'app')//execute 1
class Person {
    name = 'Max'
    constructor(){
        console.log('Creating person object....');
    }
}

const person = new Person();

console.log(person);

//Decorator Factories....let us return a Decorator





//Property Decorators
function Log(target: any, propertyName: string | Symbol){//target can be anything dependens on where is added
    //Property decorator
    console.log('target' ,target);
    console.log('propertyName' ,propertyName);
}

function Log2(target:any, name:string, descriptor: PropertyDescriptor){
    //Accesor decorator
    console.log('Accesor Decorator!');
    console.log('target LOG2', target);
    console.log('name LOG2', name);
    console.log('descriptor LOG2', descriptor);
}

function Log3(target: any, name:string|Symbol, descriptor: PropertyDescriptor){
//Methods decorator
console.log('Methods Decorator!');
console.log('target LOG3', target);
console.log('name LOG3', name);
console.log('descriptor LOG3', descriptor);
}

function Log4(target: any, name:string | Symbol, position: number){
    //Argument - PARAMETER DECORATOR
    //name-> refers name of function we use this parameter
    //position->poisition of the argument in the function
    console.log('PARAMETER Decorator!');
    console.log('target LOG4', target);
    console.log('name LOG4', name);
    console.log('position LOG4', position);

    
}

class Product {

    @Log
    title: string;
    constructor(t_: string, private price_: number){
        this.title = t_;
        this.price_
    }

    @Log2 //DECORATORS CON ACCESOSRS (PROPERTY DESCRIPTORS)
    set price(val:number){
        if(val > 0){
            this.price_ = val;
        }else{
            throw new Error ('only positive number');
        }
    }

    @Log3
    getPriceWithTax(@Log4 tax: number){
        return this.price_ * tax;
    }
}