namespace App {

    //Listener Structure
type Listener<T> = (items: T[]) => void;
abstract class State<T> {//Clase Generica o base para cual tipo de estado
    protected listeners: Listener<T>[] = [];


    addListener(listenerFn: Listener<T>) {
        this.listeners.push(listenerFn);
    }
    
}

export class ProjectState extends State<Project> {
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


export const projectState_ = ProjectState.getInstance();
}