import { Tarea } from "../models/Tarea";
import { ESTADOS_TAREA ,  DIFICULTADES_TAREA} from "../models/Tarea"; 

function filtrarTodas(tareas : Tarea[]): Tarea[] {
    return tareas.filter(tarea => tarea.getEliminado() === false);
}

function filter(tareas : Tarea[], estado:string) : Tarea[]{
    return tareas.filter(tarea => tarea.getEliminado() === false && tarea.getEstado() === estado);
}
export{ filter , filtrarTodas}