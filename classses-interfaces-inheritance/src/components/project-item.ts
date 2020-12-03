
import {Project} from '../models/project-model';
import {AutoBind} from '../decorators/autobind-decorator';
import {Component} from './base-component';
import {Draggable} from '../models/drag-drop';

//ProjectItem Class
export class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> implements  Draggable{//THink like React
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
