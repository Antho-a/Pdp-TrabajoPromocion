import { readFromFile,writeToFile } from "../utils/FileFunction";
import { Tarea } from "../models/Tarea";



export class gestor {


    private name: string;
    private items: Tarea[]= [];

    constructor(name: string){
        this.name = name;
        this.load();
    }

    // esto cambio ya que las tareas se cargan pero de manera obj que es totalmente diferente a la clase tarea 
    // expliacion https://chatgpt.com/share/692aafab-d70c-8001-ba3b-c56c86831afc esta a final 

    private load():void{
        //cargar las tareas desde el archivo JSON
        const data = readFromFile(this.name);
        this.items = data.map((obj: any) => Tarea.fromJSON(obj));
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
        this.items[index].setElimado();
        this.save();
        return true;
    }

    public getIndexById(tareaid: string): number { // funcion pura 
        return this.items.findIndex(tarea => tarea.getId() === tareaid);
    }


    public getItems(): Tarea[] {
        return this.items;
    }   





}