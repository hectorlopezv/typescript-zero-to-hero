type Combinable = number | string; 
type ConversionDescription = 'as-number' | 'as-text';

function combine(n1: Combinable, 
    n2: Combinable, 
    resultConversion: ConversionDescription): (number | string) {
    //especificar los casos concetros cuando tenga un tipo especifico
    //when working wit union types
    let n;
    if(typeof n1 === 'number' && typeof n2 === 'number' || resultConversion === 'as-number'){//runtime typeCheck
        n = +n1 + +n2;
    }else if(typeof n1 === 'string' && typeof n2 === 'string'){
        n = n1 + n2;
    }
    return n;
    //force a conversion
    // if(resultConversion === 'as-number'){
    //     return +n;
    // }
    // else{ 
    //     return n.toString();
    // }
};

const combinedAges = combine(30, 26, 'as-number');
console.log(combinedAges);


const combinedStringAges = combine('30', '26', 'as-number');
console.log(combinedStringAges);


const combinesNames = combine('Max', 'Anna', 'as-text');
console.log(combinesNames);

