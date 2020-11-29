function combine(n1, n2, resultConversion) {
    //especificar los casos concetros cuando tenga un tipo especifico
    //when working wit union types
    var n;
    if (typeof n1 === 'number' && typeof n2 === 'number' || resultConversion === 'as-number') { //runtime typeCheck
        n = +n1 + +n2;
    }
    else if (typeof n1 === 'string' && typeof n2 === 'string') {
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
}
;
var combinedAges = combine(30, 26, 'as-number');
console.log(combinedAges);
var combinedStringAges = combine('30', '26', 'as-number');
console.log(combinedStringAges);
var combinesNames = combine('Max', 'Anna', 'as-text');
console.log(combinesNames);
