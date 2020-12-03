

import {AutoBind} from '../decorators/autobind-decorator.js';
import {Component} from './base-component.js';
import {Validatable, validate} from '../util/validation.js';
import {projectState_} from '../state/project-state.js';

export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement>{//get access to Dom AND RENDER IT


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

