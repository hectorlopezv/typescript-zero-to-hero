var button = document.querySelector("button");
var input1 = document.querySelector("num1");
var input2 = document.querySelector("num2");
function add(num1, num2) {
    return num1 + num2;
}
button.addEventListener('click', function () {
    var a = input1.value;
    var b = input2.value;
    console.log(add(+a, +b));
});
