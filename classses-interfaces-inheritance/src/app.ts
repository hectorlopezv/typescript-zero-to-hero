//Drag and Drop from list A to List B
//template is html code that we decice to render with js
//singleton as a store or global state managment!
//Project State Managment
//Drag & Drop Interfaces ---- FORCE METHODS
interface Draggable {//Dragable Items
    dragStartHandler(event: DragEvent):void;
    dragEndHandler(event: DragEvent): void;
}

interface DragTarget {//Drag Target where we can drag Something
    DragOverHandler(event: DragEvent):void;//telling its a valid Dragging target
    dropHandler(event: DragEvent):void; //update data in UI
    dragLeaveHandler(event: DragEvent):void; //Give Usual Feedback When Draggin
}



//Base Class
abstract class Component<T extends HTMLElement, U extends HTMLElement> {
    templateElement: HTMLTemplateElement;
    hostElement: T;
    element: U;
    constructor(templateId:string, hostElementId: string, insertAtStart: boolean, newElementId?: string){
        this.templateElement = <HTMLTemplateElement>document.getElementById(templateId)!;//reference to the template
        this.hostElement = <T>document.getElementById(hostElementId)!; //where i want to render
    
        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild! as U;//coje el primer hijo del template
        if(newElementId){
            this.element.id = `${newElementId}`;
        }
        this.attach(insertAtStart);
    }

    private attach(insertAtStart: boolean) {
        this.hostElement.insertAdjacentElement(insertAtStart? 'afterbegin':'beforeend', this.element);
    }

    abstract configure?():void;
    abstract renderContent(): void;
}

enum ProjectStatus { Active, Finished }
//Project type

class Project {//base class of what a project should look like only info
    constructor(public id: string,
        public title: string,
        public description: string,
        public people: string,
        public status: ProjectStatus
    ) { }
}

//Listener Structure
type Listener<T> = (items: T[]) => void;

abstract class State<T> {//Clase Generica o base para cual tipo de estado
    protected listeners: Listener<T>[] = [];


    addListener(listenerFn: Listener<T>) {
        this.listeners.push(listenerFn);
    }
    
}

class ProjectState extends State<Project> {
    private projects: Project[] = [];
    private static instance: ProjectState;

    //subcription patter... list of function that should be call when we have new data

    private constructor() {
        super();
    }

    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new ProjectState();
        return this.instance;
    }

    moveProject(projectId:string, newStatus: ProjectStatus){//move ListA to ListB

        const project = this.projects.find(project => project.id === projectId);
        if(project && project.status !== newStatus){//change Status from Active to B
            project.status = newStatus;
            this.updateListenerSubcription();
        }
        
    }


    private updateListenerSubcription(){
        for (const listenerFn of this.listeners) {
            listenerFn(this.projects.slice());//execute new state
        }
    }

    addProject(title: string, description: string, numOfPeople: number) {
        
        if(this.projects.some((el)=> el.title === title)){
            return;
        }
        const newProject = new Project(Math.random().toString(),
            title,
            description,
            numOfPeople.toString(),
            ProjectStatus.Active
        );


        this.projects.push(newProject);
        //for the notice new Changes
        //idea is to call al listener and execute them basically\
        this.updateListenerSubcription();

    }
}


const projectState_ = ProjectState.getInstance();
console.log(projectState_);

class ProjectList extends Component<HTMLDivElement, HTMLElement> implements DragTarget{//add LI dinamically
    assignedProjects: Project[];
    constructor(private type: 'active' | 'finished') {
        super('project-list', 'app', false, `${type}-projects`);

        this.assignedProjects = [];

        this.configure();
        this.renderContent();
    }


    @AutoBind
    DragOverHandler(event: DragEvent){//when enters a drageble area with the mouse
        //console.log(event);
        
        if(event.dataTransfer?.types[0] === 'text/plain'){//check format
            event.preventDefault();// default is to prevent dropping
            const listEl = this.element.querySelector('ul')!;
            listEl.classList.add('droppable');
        }

    };//telling its a valid Dragging target

    @AutoBind
    dropHandler(event: DragEvent){//when we Drop handler
        const projectId = event.dataTransfer!.getData('text/plain');
        projectState_.moveProject(projectId, 
            this.type === 'active' ? ProjectStatus.Active : ProjectStatus.Finished);
        //update UI


    }; //update data in UI
    
    @AutoBind
    dragLeaveHandler(_: DragEvent){//When Drag leaves 
        //console.log(event);
        const listEl = this.element.querySelector('ul')!;
        listEl.classList.remove('droppable');

    }; //Give Usual Feedback When Draggin


    
    private renderProjects() {
        const listEl = document.getElementById(`${this.type}-projects-list`)! as HTMLUListElement;
        while(listEl.firstChild){
            listEl.removeChild(listEl.firstChild);
        }
        for (const projectItem of this.assignedProjects) {
            new ProjectItem(this.element.querySelector('ul')!.id, projectItem);
        }
    }


    configure(){
        //listeners
        this.element.addEventListener('dragover', this.DragOverHandler);
        this.element.addEventListener('dragleave', this.dragLeaveHandler);
        this.element.addEventListener('drop', this.dropHandler);


        projectState_.addListener((projects: Project[]) => {
            //Los projects pueden ser Finished || Active
            //filter the elements from 'active' 'Finished'
            const relevantProjects = projects.filter(prj =>{
                if(this.type === 'active'){
                    return prj.status === ProjectStatus.Active;
                }
                return prj.status === ProjectStatus.Finished;
            });
            this.assignedProjects = relevantProjects; //gett assign projecst
            this.renderProjects();
        });
    }

    renderContent() {
        const listId = `${this.type}-projects-list`;
        this.element.querySelector('ul')!.id = listId;
        this.element.querySelector('h2')!.textContent = this.type.toUpperCase() + 'PROJECTS';

    }


};

//ProjectItem Class
class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> implements  Draggable{//THink like React
    //react like component -- rendering
    //store parent
    private project: Project;
    get persons(){//extra logic when accesing .persons
        if(this.project.people.length === 1){
            return '1 Person';
        }
        else{
            return `${this.project.people} persons`;
        }
    }

    constructor(hostId: string, project:Project){
        super('single-project', hostId, false, project.id);
        this.project = project;
        console.log('El Project', this.project);
        this.configure();
        this.renderContent();
    }
    
    @AutoBind
    dragStartHandler(event: DragEvent){//not all dragEvent give .dataTransfer
       //console.log('start', event);
       event.dataTransfer!.setData('text/plain', this.project.id)//pass data when drop happens
       //fetch that project from the id
       event.dataTransfer!.effectAllowed = 'move';
    }

    
    dragEndHandler(_: DragEvent){
        //console.log('DragEnd', event);
    };

    mouseDownHandler(event: MouseEvent){
        event.preventDefault();
    }

    renderContent(){
        //const listId = `${this.type}-projects-list`;
        console.log('bebesito', this.element);
        this.element.querySelector('h2')!.innerText = this.project.title;
        this.element.querySelector('h3')!.innerText = this.persons + ' assigned';
        this.element.querySelector('p')!.innerText = this.project.description;
    }

    configure(){//add evenet listeners of DragEvenet 
        //...-Drag/DragStart/Draggend/DragOver/DragEnter/DragLeave/Drop
        this.element.addEventListener('dragstart', this.dragStartHandler);
        this.element.addEventListener('dragend', this.dragEndHandler);
    }
}




class ProjectInput extends Component<HTMLDivElement, HTMLFormElement>{//get access to Dom AND RENDER IT


    titleInputElement: HTMLInputElement;
    descriptionInputElement: HTMLInputElement;
    peopleInputElement: HTMLInputElement;

    constructor() {
        super('project-input', 'app', true, 'user-input');
        this.titleInputElement = this.element.querySelector('#title')! as HTMLInputElement;
        this.descriptionInputElement = this.element.querySelector('#description')! as HTMLInputElement;
        this.peopleInputElement = this.element.querySelector('#people')! as HTMLInputElement;
        this.configure();
        //rendering
    }

    configure() {//Private Method
        this.element.addEventListener('submit', this.submitHandler);
    }

    private gatherUserInput(): [string, string, number] | void {
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
        if (!validate(titleValidatable) ||
            !validate(descriptionValidatable) ||
            !validate(peopleValidatable)) {
            alert('invalid input')
            return;
        } else {
            return [enteredTitle, enteredDescription, +enteredPeople];
        }
    }

    //Validation
    private clearInputs() {
        this.titleInputElement.value = '';
        this.descriptionInputElement.value = '';
        this.peopleInputElement.value = '';
    }

    @AutoBind
    private submitHandler(event: Event) {
        event.preventDefault();
        console.log(this.titleInputElement.value);
        //console.log('Handler', event);
        const userInput = this.gatherUserInput();
        if (Array.isArray(userInput)) {
            const [title, description, people] = userInput;
            console.log(title, description, people);
            //ProjectState.
            //add object to the singleton
            projectState_.addProject(title, description, people);
            this.clearInputs();
        }
    }

    renderContent(){}
}

interface Validatable {
    value: string | number;
    required?: boolean;
    minLength?: number
    maxLength?: number;
    min?: number
    max?: number;
}

function validate(validatableInput: Validatable) {
    let isValid = true;
    if (validatableInput.required) {//values must be required
        isValid = isValid && validatableInput.value.toString().trim().length !== 0;
    }

    if (validatableInput.minLength != null //check case 0 when ints diferrent null, undefined
        && typeof validatableInput.value === 'string') {
        isValid = isValid && validatableInput.value.length > validatableInput.minLength;
    }

    if (validatableInput.maxLength != null //check case 0 when ints diferrent null, undefined
        && typeof validatableInput.value === 'string') {
        isValid = isValid && validatableInput.value.length < validatableInput.maxLength;
    }

    if (validatableInput.min != null && typeof validatableInput.value === 'number') {
        isValid = isValid && validatableInput.value >= validatableInput.min;
    }

    if (validatableInput.max != null && typeof validatableInput.value === 'number') {
        isValid = isValid && validatableInput.value < validatableInput.max;
    }
    console.log(validatableInput.value);
    console.log(validatableInput?.min)
    console.log(isValid);
    return isValid;
}

function AutoBind(target: any, propertyName: string | Symbol, descriptor: PropertyDescriptor) {
    console.log('target', target);
    console.log('propertyName', propertyName);
    console.log('descriptor', descriptor);
    const originalHandler = descriptor.value;
    const newDescriptor: PropertyDescriptor = {
        configurable: true,
        enumerable: false,
        get() {//executed when we try to access function
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