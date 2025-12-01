import { Tarea } from "../models/Tarea";
import { ESTADOS_TAREA ,  DIFICULTADES_TAREA} from "../models/Tarea"; 

function filtrarTodas(tareas : Tarea[]): Tarea[] {
    return tareas.filter(tarea => tarea.getEliminado() === false);
}

function filter(tareas : Tarea[], estado:string) : Tarea[]{
    return tareas.filter(tarea => tarea.getEliminado() === false && tarea.getEstado() === estado);
}

function buscarSegunTitulo(tareas: Tarea[], titulo: string): Tarea | undefined {
    return tareas.find(tarea => tarea.getEliminado() ===  false && titulo.toLowerCase() == tarea.getTitulo().toLowerCase()); 
}
export{ filter , filtrarTodas, buscarSegunTitulo}