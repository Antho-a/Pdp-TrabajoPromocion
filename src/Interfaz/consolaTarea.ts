import { Tarea } from "../models/Tarea";


function MoastarTitulos(tareas: Tarea[] , longitud : number , contador : number): String {
    if(contador < longitud){ return tareas[contador].getTitulo() + "\n" + MoastarTitulos(tareas, longitud, contador + 1);} 
    else{ return ""; }
}

function MostrarTareaCompletas(tarea:Tarea): String {
    return "ID: " + tarea.getId() + "\n" +
           "Título: " + tarea.getTitulo() +  "\n" +
           "Descripción: " + tarea.getDescripcion() + "\n" +
           "Estado: " + tarea.getEstado() + "\n" +
           "Dificultad: " + tarea.getDificultad() + "\n" +
           "Fecha de Creación: " + tarea.getFechaCreacion() + "\n" +
           "Fecha de Vencimiento: " + (tarea.getFechaVencimiento()?tarea.getFechaVencimiento() : "No establecida") + "\n" +
           "Última Edición: " + (tarea.getUltimaEdicion() ? tarea.getUltimaEdicion() : "No editada") + "\n";    
}

