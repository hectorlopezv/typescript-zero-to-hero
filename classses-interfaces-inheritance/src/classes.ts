abstract class Department {
    // private readonly name:string;
    static fiscalYear = 2020;
    protected employees: string[] = [];

    constructor(protected readonly id: string, public name: string) {
        this.name = name;
    }

    abstract describe(this: Department):void; //teling this to refer to Department
        // console.log('Department: ' + this.name + this.id);
    

    static createEmployee (name: string){
        return {name:name};
    }


    hell = () => {
        console.log(this.name);
    }

    addEmployee(employee: string) {
        //validation etc
        this.employees.push(employee);
    }

    printEmployeeInformation() {
        console.log(this.employees.length);
        console.log(this.employees);
    }

}

class ItDepartment extends Department {
    constructor(id: string, public admins: string[]) {//public creates this.admin= admin automatically
        super(id, 'IT');//copy attributes from parent
        //new attributes after super
    }
    describe(){
        console.log('IT Departmnet - ID; ' , this.id); 
    }
}


class AccountinDepartment extends Department {

    private lastReport: string;
    private static instance: AccountinDepartment;//store classs instace

    get mostRecentReport (){
        //some logic
        if(this.lastReport){
            return  this.lastReport;
        }
        throw new Error('No report found.');
    }

    describe(){
        console.log('Accounting department -id:' +  this.id);
    }

    set mostRecentReport(value: string){
        if(!value){ 
            throw new Error('please add a report');
        }
        this.addReport(value);
    }

    private constructor(id: string, private reports: string[]) {
        super(id, 'ACCOUNTING')
        this.lastReport = reports[0];
    }

    static getInstance(){
        if(this.instance){//when inside static its ok
            return this.instance;
        }
        //wil only run once
        this.instance = new AccountinDepartment('d2', []);
        return this.instance;
    }

    addEmployee(name: string) {
        if (name === 'Max') {
            return;
        }
        this.employees.push(name);
    }

    addReport(text: string) {
        this.reports.push(text);
        this.lastReport = text;
    }

    printReports() {
        console.log(this.reports);
    }
}

const it = new ItDepartment('D2', ['MaXITO']);

// console.log(it);
// it.hell();
// const accountingCpy = {name: 'DUMMY', describe: it.describe, hell: it.hell};
// accountingCpy.describe();//el contexto del this cambi
// //a a it a este objecto
// accountingCpy.hell();

it.addEmployee('Hector');
it.addEmployee('Manu');
//it.employees[2] = 'Anna'; 


it.describe();
it.name = 'NEW NAME';
it.printEmployeeInformation();
console.log(it);

const accounting_object = AccountinDepartment.getInstance();
console.log(AccountinDepartment.getInstance() == AccountinDepartment.getInstance());
accounting_object.mostRecentReport = 'hello'
accounting_object.addReport('Something went wrong...');
console.log(accounting_object.mostRecentReport);
accounting_object.addEmployee('MANU');
accounting_object.printReports();
accounting_object.printEmployeeInformation();


//Static Method
const x = Department.createEmployee('BEBESITO');
console.log(x);
console.log(Department.fiscalYear);


//Abstract Classes
accounting_object.describe();
