// Code goes here!
import axios from 'axios';

const form = document.querySelector('form')!;
const addressInput = document.querySelector('#address')! as HTMLInputElement;

function searchHandler(event: Event){
    event.preventDefault();
    const enteredAddress =  addressInput.value;

    console.log(enteredAddress);
    const key = 'AIzaSyBgw0RDleDUk6ghm5DaS9JgNeFt9iD0WSc';
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(enteredAddress)}&key=${key}`)
    .then(response => console.log(response))
    .catch(err => console.log(err));

    //Send this to google API
}

form.addEventListener('submit', searchHandler);