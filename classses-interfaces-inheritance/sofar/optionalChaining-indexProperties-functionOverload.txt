//Intersection Types
type Admin = {
    name: string;
    privileges: string[];
};

type Employee = {
    name: string;
    startDate: Date;
};

//Interface Way
//interface ElevatedEmployee extends Employee, Admin {}

type ElevatedEmployee =  Admin & Employee;

const e1: ElevatedEmployee = {
    name: 'Hector',
    privileges: ['create-server'],
    startDate: new Date()
};

type Combinable = string | number;
type Numeric = number | boolean;
//adition of two types and only get intersection...
type Universal = Combinable & Numeric;

const num1: Universal = 10;


//Function Overload
//USED AS TYPED GUARDS... to know type whe are getting at runtime 
function add_(a:number, b:number):number
function add_(a: Combinable, b: Combinable){
    if(typeof a === 'string' && typeof b === 'string'){
        return a + b;
    }//checking at runtime the type on runtime...
   return (a as number) + (b as number);
}

const result_ = add_(2, 3);


type unKnowEmployee = Employee | Admin;

function printEmployeeInformation(emp: unKnowEmployee){
    console.log('Name: ' + emp.name);
    //type Guard come to the rescue usual typeguard does not work in objects
    if('privileges' in emp){//check if property exists
        console.log('Privilages: ' + emp.privileges);//this not alw ayas exist on args
    }

    if('startDate' in emp){
        console.log('Start Date: ' + emp.startDate)
    }
}

printEmployeeInformation(e1);//e1 Employee & Admin

//Type in classses
class Car{
    drive(){
        console.log('Driving...');
    }
}

class Truck {
    drive(){
        console.log('Driving a truck...');
    }

    loadCargo(amount: number){
        console.log('loading cargo ...' + amount);
    }
}

type Vehicle = Car | Truck;

const v1 =  new Car();

const v2 = new Truck();

function useVehicle(vehicle: Vehicle){

    vehicle.drive();
    //check if method exists in methods
    //method 1
    //if('loadCargo' in vehicle){
     //   vehicle.loadCargo(2000);
    //}
    //method 2
    if(vehicle instanceof Truck){//check if instance and execute code only if
        vehicle.loadCargo(2000);
    }
    
}


//Discriminates uinions

interface Bird{
    type: 'bird';//Literal type asigment Creating descraminating union
    flyingSpeed: number;
}


interface Horse {
    type: 'horse';
    runningSpeed: number;
}

type Animal = Bird | Horse;



//when objects that are related but have different properties and methods
function moveAnimal(animal: Animal){
    let speed;
    switch(animal.type){
        case 'bird':
            speed = animal.flyingSpeed;
            break;
        case 'horse':
            speed = animal.runningSpeed;
            break;
    }
    console.log('Moving at speed: ' +  speed);
}
moveAnimal({type:'bird', flyingSpeed: 10 });

//Type Casting
//WAY 1
//const userInputElement = <HTMLInputElement>document.getElementById('user-input');
//Way 2
// const userInputElement = document.getElementById('user-input')! as HTMLInputElement;
// userInputElement.value = 'hi there';


//Index Properties
interface ErrorContainer { //{email: 'not a valid email', username: 'not a valid'}
    //only hold dynamic properties.
    id:string;//add with the same type
    [prop: string]: string;//get any property string with string value
}

const errorBad: ErrorContainer = {
    id: 'hector',
    email: 'not a valid email',
    username: 'Must start with a capital character'
};


//Optional Chaining
const fetchedUserData = {
    //we dont know if job will be available
    id: 'u1',
    name: 'max',
    job: {title: 'CEO', description: 'My own Company'}// we dont know if its definey
};

//Javascript to Avoid Runtime Errors
//console.log(fetchedUserData.job && fetchedUserData.job.title);
//typescript way... Chaining operatro
console.log(fetchedUserData?.job?.title);


