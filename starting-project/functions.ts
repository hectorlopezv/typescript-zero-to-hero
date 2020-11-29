function add(n1:number, n2:number) {
    return n1 + n2;
};

function PrintResult(num: number): void{//returns void means nothing
    console.log('Result: ' + num);
};

//void means that we expect to do nothing with return value
function addHandler(n1: number, n2: number, cb: (num: number)=> void){
    const result = n1 + n2;
    cb(result);
};



PrintResult(add(5, 12));

// function as TYPES
let combinesValues: (n1: number, n2: number) => number;

combinesValues = add;
//combinesValues = 5;


console.log(combinesValues(8, 8));


addHandler(10, 20, (result)=>{
    console.log(result);
});
