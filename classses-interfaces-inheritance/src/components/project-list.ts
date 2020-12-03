
import {Project} from '../models/project-model';
import {AutoBind} from '../decorators/autobind-decorator';
import {Component} from './base-component';
import {ProjectStatus} from '../models/project-model';
import {projectState_} from '../state/project-state';
import {ProjectItem} from './project-item';
import {DragTarget} from '../models/drag-drop';
export class ProjectList extends Component<HTMLDivElement, HTMLElement> implements DragTarget{//add LI dinamically
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
