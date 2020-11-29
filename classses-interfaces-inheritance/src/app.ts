// Code goes here!

class Department {
    // private readonly name:string;
     private employees: string[] = [];
    
    constructor(private readonly id: string, public name:string) {
        this.name = name;
    }

    describe(this:Department){//teling this to refer to Department
        console.log('Department: ' + this.name  + this.id);
    }

    hell = () =>{
        console.log(this.name);
    }

    addEmployee(employee: string) {
        //validation etc
        this.employees.push(employee);
    }

    printEmployeeInformation(){
        console.log(this.employees.length);
        console.log(this.employees);
    }

}


const accounting = new Department( ' d1','IT');

// console.log(accounting);
// accounting.hell();
// const accountingCpy = {name: 'DUMMY', describe: accounting.describe, hell: accounting.hell};
// accountingCpy.describe();//el contexto del this cambi
// //a a accounting a este objecto
// accountingCpy.hell();

accounting.addEmployee('Hector');
accounting.addEmployee('Manu');
//accounting.employees[2] = 'Anna'; 

accounting.addEmployee('Hector');
accounting.describe();
accounting.printEmployeeInformation();


