import { readFromFile,writeToFile } from "../utils/FileFunction";
import { Tarea } from "../models/Tarea";



export class gestor {


    name: string;
    items: Tarea[]= [];


    constructor(name: string){
        this.name = name;
        this.load();
        
    }


    private load():void{
        //cargar las tareas desde el archivo JSON
        this.items= readFromFile(this.name);
    }


    private save():void{
        //guardar las tareas en el archivo JSON
        writeToFile(this.name, this.items);
    }
    public addItem(item: Tarea):void{
        this.items.push(item);
        this.save();
    }
   public actItem(id:string, editTarea: Tarea):boolean{
        const index = this.getIndexById(id);
        if(index == -1){
            return false; // Tarea no encontrada
        }
        this.items[index] = editTarea;
        this.save();
        return true;
    }
    public deleteItem(tareaid: string): boolean{

        const index = this.getIndexById(tareaid);
        if(index === -1){
            return false; // Tarea no encontrada
        }
        this.items[index].setElim();
        this.save();
        return true;
        
    }
    public getIndexById(tareaid: string): number {
        return this.items.findIndex(tarea => tarea.getId() === tareaid);
    }
}