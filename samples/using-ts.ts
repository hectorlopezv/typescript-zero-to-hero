const button = document.querySelector("button")!;
const input1 = document.querySelector("num1")! as HTMLInputElement;
const input2 = document.querySelector("num2")! as HTMLInputElement;

function add(num1:number, num2:number):number {
    return num1 + num2;
}

button.addEventListener('click', ()=>{
    const a = input1.value;
    const b = input2.value;

    console.log(add(+a, +b));
});