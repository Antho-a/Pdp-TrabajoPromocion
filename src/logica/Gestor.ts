import { readFromFile,writeToFile } from "../utils/FileFunction";
import { Tarea } from "../models/Tarea";



export class gestor  {


    name: string;
    items: Tarea[]=[]


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
    public actItem(id:string, editTarea: Tarea):void{
        const index = this.items.findIndex(tarea => tarea.getId() === id);
        if(index !== -1){
            this.items[index] = { ...this.items[index], ...editTarea };
            this.save();
        }
    }
}