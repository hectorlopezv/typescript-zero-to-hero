
export enum ProjectStatus { Active, Finished }
//Project type

export class Project {//base class of what a project should look like only info
    constructor(public id: string,
        public title: string,
        public description: string,
        public people: string,
        public status: ProjectStatus
    ) { }
}

