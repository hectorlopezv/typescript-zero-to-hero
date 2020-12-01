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
//If WE WANT TO LIMIT THE ACCEPTED DYNAMIC TYPES! FOR THE GENERCI TYPES
function merge<T extends object, U extends object>(objA: T, objB: U){//we dont know exactly what the type shold be
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


interface Lengthy {//telling every element we use must have LENGHT Property
    length: number;
};

//be more flexible and say any type that has the LENGHT property
function countAndDescibe<T extends Lengthy>(element: T): [T, string]{
    let descriptionText = 'Got not value.';
    if(element.length > 0){
        descriptionText = 'Got 1 Element. ';
    }
    else if (element.length > 1){
        descriptionText = 'Got' + element.length + 'elements. ';
    }
    return [element, descriptionText];//returning Tuple
};

//the property is added on the fly and must have that length property
console.log(countAndDescibe('Hi there!'));
console.log(countAndDescibe(['sports', 'Cooking']));

//TYPE OF CONSTRAINS GENERICS
function extractAndConvert<T extends object, U extends keyof T>(obj: T, key: U){
    return 'Value: ' + obj[key];//we dont know if that object will have that key 
};
console.log(extractAndConvert({name: 'hector'}, 'name'));

//GENERIC CLASESS 

class DataStorage<T extends string | number | boolean> {
    private data: T[]  = [];

    addItem/*<U>*/(item: T){
        this.data.push(item);
    }

    removeItem(item: T){
        
        this.data.splice(this.data.indexOf(item), 1);
    }

    getItems(){
        return [...this.data];
    }
}

const textStorage = new DataStorage<string>();
textStorage.addItem('Hector');
textStorage.addItem('Manu');
textStorage.addItem('Max');
console.log(textStorage.getItems());


const numberStorage = new DataStorage<number | string>();
numberStorage.addItem('Hector');

// const objStorage = new DataStorage<Object>();
// objStorage.addItem({name:'Max'});
// objStorage.addItem({name:'Manu'});

// objStorage.removeItem({name:'Max'});

// console.log(objStorage.getItems());




 
//GENERIC UTILITY TYPES

//Partial

interface CourseGoal{
    title: string;
    description: string;
    completeUntil: Date;
}

function createCourseGoal(title: string, description:string, date:Date):CourseGoal{
    //Partials
    let courseGoal: Partial<CourseGoal> = {};//make all properties optional

    courseGoal.title = title;
    courseGoal.description = description;
    courseGoal.completeUntil = date;

    return courseGoal as CourseGoal;

}

//Readonly Generic Types ... make type readonly
const nombres: Readonly<string[]> = ['Max', 'Anna'];
//nombres.push('Manu');
// nombres.pop();

 //union types when you want to have multiple options in every function call
 // generic types WHEN you want to block a certain type on a function or Class

