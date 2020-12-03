
 export interface Draggable {//Dragable Items
    dragStartHandler(event: DragEvent):void;
    dragEndHandler(event: DragEvent): void;
 }

 export interface DragTarget {//Drag Target where we can drag Something
    DragOverHandler(event: DragEvent):void;//telling its a valid Dragging target
    dropHandler(event: DragEvent):void; //update data in UI
    dragLeaveHandler(event: DragEvent):void; //Give Usual Feedback When Draggin
 }





