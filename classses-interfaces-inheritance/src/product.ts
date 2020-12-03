export class Product {
    constructor(public title: string){}

    getInformation(){
        return [this.title];
    }
}