//DECORATORS

function Looger(constructor: Function){//clases are syntactil sugar over function constructors
    console.log('Logging...');
    console.log(constructor);
}


function loogerFactory(logString: string){//Decorator factory
    //let us pass arugments to Decorators
    console.log('Factory Looger', Looger)
    return function(constructor: Function){//executes as loogger(values)
        console.log('Logging...' + logString);
        console.log(constructor);
    }
}


function WithTemplate(template: string, hookId: string){
    // a template and a place where it should be rendered
    console.log('WithTemplate'); 
    return function<T extends {new(...args: any[]): {name: string}}>(originalConstructor: T){//decorators for classes, ARGUMENTS IT GET DEPENDS ON WHERE WE USED IT
        //extra logic

        //depending where its used we can return something 
        //in class we can return new constrcutor or class


        //return new value inside decorator
        //return new class
        //replacing new class
        return class extends originalConstructor{//get olds Methods
            //gogin to execute only when we instantiate the class
            //not execute  when is defined
            
            //put some logic that is gogin to execute when defined
            //changed definition BASICALLY WITH NEW LOGIC
            constructor(..._: any[]){
                super();
                console.log('Rendering template');
                const hookEl = document.getElementById(hookId);
                if(hookEl){
                    hookEl.innerHTML = template;
                    hookEl.querySelector('h1')!.textContent = this.name;
                }
            }
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

function Log2(target:any, name:string, descriptor: PropertyDescriptor):PropertyDescriptor{
    //Accesor decorator
    console.log('Accesor Decorator!');
    console.log('target LOG2', target);
    console.log('name LOG2', name);
    console.log('descriptor LOG2', descriptor);
    //we cant return a brand new PROPERRTY DESCRIPTOR
    return {};
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
console.log(Product);

//RETURN VALUES IN DECORATORS
//CLASSES --> NEW CLASS BASICALLY TO RE-DEFINE- CLASS
//METHOD -->   BRAND NEW PROPERTY DESCRIPTOR
//ACCESORS --> BRAND NEW PROPERTY DESCRIPTOR
//PROPERTIES --> IGNORE VALUE ITS RETURNED
//PARAMETERS --> IGNORE VALUE ITS IGNORED


function Autobind(target: any, methodName: string | Symbol, descriptor: PropertyDescriptor){
    console.log('Method Decorator!');
    console.log('target AutoBind', target);
    console.log('name AutoBind', methodName);
    console.log('position AutoBind', descriptor);
    //WE WANT TO ADD LOGIC TO AUTOBIND
    const originalMethod = descriptor.value;
    const adjDescriptor:PropertyDescriptor = {
        configurable: true,
        enumerable: true,
        //DEFINIMOS UN GETTER PARA EL VALOR COMO TAL(PROPERTY) 
        //COMO SI FUERA EN UNA CLASSE
        //PERO LO HICIMOS EN UN FUNCION 
        //p.showMessage ejecutara GET()
        get(){// will be bound by the object that call its
            //will be trigger by the concrete object where we defined the get()
            //extra logic before value its return in this case the function
            const boundFn = originalMethod.bind(this);
            //P.METODO ... HACE BIND AL OBJECTO QUE LO LLAMA
            return boundFn;
        }
    };
    return adjDescriptor;//overwritting new desccriptor
    
}

class Printer {
    message = 'This works!';

    @Autobind
     showMessage() {
        console.log(this.message);
    }
}
//Build decorator to AUTOMATIC Bind
// const p = new Printer();
// const button = document.querySelector('button')!;
// button.addEventListener('click', p.showMessage);


interface ValidatorConfig {

    [property: string]: {//puede que haya o no
        [validateProp: string]: string[]; //['required, 'positive]
    }
};
const registeredValidators: ValidatorConfig = {};

function Required(target: any, propName: string) {
    registeredValidators[target.constructor.name] = {
      ...registeredValidators[target.constructor.name],
      [propName]: [ 'required']
    };
  }
  
  function PositiveNumber(target: any, propName: string) {
    registeredValidators[target.constructor.name] = {
      ...registeredValidators[target.constructor.name],
      [propName]: ['positive']
    };
  }
function validate(obj: any){//call validate
    //check if passes checks going through each valiadorts
    const objValidatorConfig = registeredValidators[obj.constructor.name];
    if(!objValidatorConfig){
        return true;
    }
    let isValid = true;
    for (const prop in objValidatorConfig){//looping object
        for(const validator of objValidatorConfig[prop]){
            console.log('veces que entro')
            switch(validator){
                case 'required':
                    isValid = isValid &&  !!obj[prop];
                    break;
                case 'positive':
                    isValid = isValid && obj[prop] > 0;
                    break;
            }
        }

    }
    return isValid;
}


//Decorators as Validators ... example in runtime
class Course {
    @Required
    title: string;

    @PositiveNumber
    price: number;

    constructor(title: string, price: number){
        this.title = title;
        this.price = price;
    }
}




// const courseForm =  document.querySelector('form')!;
// courseForm.addEventListener('submit', event =>{
//     event.preventDefault();
//     //extract the tittle
//     const titleEl = document.querySelector('#title')! as HTMLInputElement;
//     const priceEl = document.querySelector('#price')! as HTMLInputElement;

//     const title = titleEl.value
//     const price = +priceEl.value;

//     const createdCourse = new Course(title, price);

//     if(!validate(createdCourse)){
//         throw new Error('not paso la validacion');
//     }
//     console.log(createdCourse);

// });


