console.log('your code goes here....');

//CORE TYPES
function add(n1:number, n2:number, showResult:boolean, phrase:string):number {
    
    const n = n1 + n2;
    if (showResult) {
        console.log(phrase + n);
    } else {
         return n1 + n2;
    } 
};

//types are inferenced... types inference 
//let number: number | null;... have number or null types...
const number1 = 5;
const number2 = 2.8;
const printResult = true;
const resultPhrase = 'Result is: ';

add(number1, number2, printResult, resultPhrase);