//Drag and Drop from list A to List B
//template is html code that we decice to render with js
//singleton as a store or global state managment!
//Project State Managment
class ProjectState{
    private projects:any = [];
    private static instance: ProjectState;
    private listeners:any[] = [];
    //subcription patter... list of function that should be call when we have new data
    
    private constructor(){

    }

    addListener(listenerFn: Function){
        this.listeners.push(listenerFn);
    }

    
    
    static getInstance(){
        if(this.instance){
            return this.instance;
        }
        this.instance = new ProjectState();
        return this.instance;
    }


     addProject(title:string, description:string, numOfPeople: number) {
        const newProject = {
            id: Math.random().toString(),
            title: title,
            description: description,
            people: numOfPeople
        };
        this.projects.push(newProject);
        //for the notice new Changes
        //idea is to call al listener and execute them basically\
        for(const listenerFn of this.listeners){
            listenerFn(this.projects.slice());//execute new state
        }
    }
}


const projectState_ = ProjectState.getInstance();
console.log(projectState_);
class ProjectList{//add LI dinamically
    templateElement: HTMLTemplateElement;
    hostElement: HTMLDivElement;
    element: HTMLElement;
    assignedProjects: any[];
    constructor(private type: 'active' | 'finished'){
    this.templateElement = <HTMLTemplateElement>document.getElementById('project-list')!;//reference to the template
    this.hostElement =  <HTMLDivElement>document.getElementById('app')!; //where i want to render
    this.assignedProjects = [];

    console.log(this.templateElement);
    console.log(this.hostElement);
    //selection
    const importedNode =  document.importNode(this.templateElement.content, true);
    this.element = importedNode.firstElementChild! as HTMLElement;//coje el primer hijo del template
    this.element.id = `${this.type}-projects`;
    projectState_.addListener((projects: any[]) => {
        this.assignedProjects = projects; //gett assign projecst
        this.renderProjects();
    });

    this.attach();
    this.renderContent();
    }

    private renderProjects(){
        const listEl = document.getElementById(`${this.type}-projects-list`)! as HTMLUListElement;
        for(const Item of this.assignedProjects){
            const listItem = document.createElement('li');
            listItem.textContent = Item.title;

            listEl.appendChild(listItem);
        }
    }


    private renderContent(){
        const listId = `${this.type}-projects-list`;
        this.element.querySelector('ul')!.id = listId;
        this.element.querySelector('h2')!.textContent = this.type.toUpperCase() + 'PROJECTS';

    }
    
    private attach(){
        this.hostElement.insertAdjacentElement('beforeend', this.element);
    }
};




class ProjectInput {//get access to Dom AND RENDER IT

    templateElement: HTMLTemplateElement;
    hostElement: HTMLDivElement;
    element: Element;
    titleInputElement: HTMLInputElement;
    descriptionInputElement: HTMLInputElement;
    peopleInputElement: HTMLInputElement;
    
    constructor(){
        this.templateElement = <HTMLTemplateElement>document.getElementById('project-input')!;//reference to the template
        this.hostElement =  <HTMLDivElement>document.getElementById('app')!; //where i want to render
        
        console.log(this.templateElement);
        console.log(this.hostElement);
        //selection
        const importedNode =  document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild! as HTMLFormElement;//coje el primer hijo del template
        this.element.id = 'user-input';

        this.titleInputElement = this.element.querySelector('#title')! as HTMLInputElement;
        this.descriptionInputElement = this.element.querySelector('#description')! as HTMLInputElement;
        this.peopleInputElement = this.element.querySelector('#people')! as HTMLInputElement;

        this.configureListener();
        //rendering
        this.attach();
    }

    private gatherUserInput(): [string, string, number] | void{
        const enteredTitle = this.titleInputElement.value;
        const enteredDescription = this.descriptionInputElement.value;
        const enteredPeople = this.peopleInputElement.value;

        const titleValidatable: Validatable = {
            value: enteredTitle,
            required: true
        };
        const descriptionValidatable: Validatable = {
            value: enteredDescription,
            required: true,
            minLength: 5
        };

        const peopleValidatable: Validatable = {
            value: +enteredPeople,
            required: true,
            min: 2,
            max: 5
        };

        //validation
        if(!validate(titleValidatable) || 
            !validate(descriptionValidatable) || 
            !validate(peopleValidatable))
        {
            alert('invalid input')
            return;
        }else{
            return [enteredTitle, enteredDescription, +enteredPeople];
        }   
    }

    //Validation
    private clearInputs(){
        this.titleInputElement.value = '';
        this.descriptionInputElement.value = '';
        this.peopleInputElement.value = '';
    }

    @AutoBind
    private submitHandler(event: Event){
        event.preventDefault();
        console.log(this.titleInputElement.value);
        //console.log('Handler', event);
        const userInput = this.gatherUserInput();
        if(Array.isArray(userInput)){
            const [title, description, people] = userInput;
            console.log(title, description, people);
            //ProjectState.
            //add object to the singleton
            projectState_.addProject(title, description, people);
            
            this.clearInputs();

        }

    }

    private configureListener(){
        this.element.addEventListener('submit', this.submitHandler);
    }

    private attach(){
        //rendering
        console.log(this.element)
        this.hostElement.insertAdjacentElement('afterbegin', this.element);
    }
}



interface Validatable {
    value: string | number;
    required?: boolean;
    minLength?: number
    maxLength?: number;
    min?: number
    max?: number;       
}

function validate(validatableInput: Validatable){
    let isValid = true;
    if(validatableInput.required){//values must be required
        isValid = isValid && validatableInput.value.toString().trim().length !== 0;
    }

    if(validatableInput.minLength != null //check case 0 when ints diferrent null, undefined
        && typeof validatableInput.value === 'string'){
        isValid = isValid && validatableInput.value.length > validatableInput.minLength;
    }

    if(validatableInput.maxLength != null //check case 0 when ints diferrent null, undefined
        && typeof validatableInput.value === 'string'){
        isValid = isValid && validatableInput.value.length < validatableInput.maxLength;
    }

    if(validatableInput.min != null && typeof validatableInput.value === 'number'){
        isValid = isValid && validatableInput.value >= validatableInput.min;
    }

    if(validatableInput.max != null && typeof validatableInput.value === 'number'){
        isValid = isValid && validatableInput.value < validatableInput.max;
    }
    console.log(validatableInput.value);
    console.log(validatableInput?.min)
    console.log(isValid);
    return isValid;
}

function AutoBind(target:any, propertyName: string| Symbol, descriptor: PropertyDescriptor){
    console.log('target', target);
    console.log('propertyName', propertyName);
    console.log('descriptor', descriptor);
    const originalHandler = descriptor.value;
    const newDescriptor: PropertyDescriptor ={
        configurable: true, 
        enumerable: false, 
        get(){//executed when we try to access function
            const newHandler = originalHandler.bind(this);
            return newHandler;
        }
    };
    return newDescriptor;
}


const project = new ProjectInput();
//adding project will be reflected in list 1
const projectList1 = new ProjectList('active');
const projectList2 = new ProjectList('finished');