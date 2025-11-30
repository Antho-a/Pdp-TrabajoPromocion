import { readFromFile,writeToFile } from "./utils/FileFunction";
import { Tarea } from "./models/Tarea";

    export function eliminarTarea(lista: Tarea[], tareaid: string): Tarea[] {

        return lista.map(tarea => {if(tarea.getId() === tareaid){return{...tarea,eliminada:true}}  else{return tarea}});   
        

    }

