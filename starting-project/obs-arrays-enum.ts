//Object in typescript
// const person: {
//     name: string;
//     age: number;
// const person: {
//     name: string;
//     age: number;
//     hobbies: string[];
//     role: [number, string];//tuple of size 2, and number and string element
// } = {//the types are infered(inside the object) ..Object TYPE(dto)
//ROLE WILL ACCEPPT NOT DESIRED NUMBERS 4 , 5 , 6
// const ADMIN = 0;
// const READ_ONLY = 1;
// const AUTHOR = 2;


enum Role {
    ADMIN = 'ADMIN', READ_ONLY = 100, AUTHOR = 'AUTHOR'//assign labels to numbers!
    //0 == ADMIN, READ_ONLY == 1, AUTHOR === 2
};

const person = {
    name: 'maximiliam',
    age: 30,
    hobbies: ['Sports', 'Cooking'],
    role: Role.ADMIN, 
};

//tuple
//allows in tuple.. the push error is not managed..
//person.role.push('admin');
//person.role[1] = 10
//person.role = [0, 'admin', 'user'];

let favoritesActivities : string[];
favoritesActivities = ['Sports'];

console.log(person.name);

for(const hobby of person.hobbies){
    console.log(hobby);
};



