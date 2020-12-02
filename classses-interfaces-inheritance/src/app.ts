//Drag and Drop from list A to List B
//template is html code that we decice to render with js

class ProjectInput {//get access to Dom AND RENDER IT

    templateElement: HTMLTemplateElement;
    hostElement: HTMLDivElement;
    element: Element;
    constructor(){
        this.templateElement = <HTMLTemplateElement>document.getElementById('project-input')!;//reference to the template
        this.hostElement =  <HTMLDivElement>document.getElementById('app')!; //where i want to render
        
        console.log(this.templateElement);
        console.log(this.hostElement);
        //selection
        const importedNode =  document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild! as HTMLFormElement;//coje el primer hijo del template
        
        this.attach();
    }

    private attach(){
        //rendering
        console.log(this.element)
        this.hostElement.insertAdjacentElement('afterbegin', this.element);
    }
}


const project = new ProjectInput();