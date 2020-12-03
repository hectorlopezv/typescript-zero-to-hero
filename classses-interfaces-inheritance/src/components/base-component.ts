

export abstract class Component<T extends HTMLElement, U extends HTMLElement> {
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
