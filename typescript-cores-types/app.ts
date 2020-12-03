//Unknow types 

let userInput: unknown;
let userName:string;

userInput = 5;
userInput = 'Max';
if(typeof userInput === 'string'){
    userName = userInput;
};

function generateError(message:string, code:number): never {
    //throw error to webpage
    //never --- does not return something not even undefined beacause it crashes code or script
    //error message, infine loops
    
    throw {message:message, errorCode:code};
    //while(true){}
};


generateError('An error Ocurred',500);