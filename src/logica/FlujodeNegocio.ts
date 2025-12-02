import { gestor } from "../logica/Gestor";
import { Tarea } from "../models/Tarea";
import { contarPorDificultad,contarPorEstado } from "../funcionalidades-Puras/Estadistica";
import { asignarPrioridadLogica } from "../funcionalidades-Puras/Prioridad";
function manejoEstadisticas(opcion: number, tareas: Tarea[],estados:string[],dificultades:string[]): string | void {
    
    switch (opcion) {
        case 1:
            return(`\n Total de Tareas: ${tareas.length}`);
        case 2:
            return ("\n Porcentaje de Tareas por estado:\n" + estados.map(estado => 
                `- ${estado} = ${contarPorEstado(tareas, estado)} %`
            ).join('\n'));
        case 3:
            return ("\n Porcentaje de Tareas por dificultad:\n" + dificultades.map(dificultad => 
                `- ${dificultad} = ${contarPorDificultad(tareas, dificultad)} %`
            ).join('\n'));
 
        case 4:
            return " Volver al menú principal";

    }
}
function manejoConsultas(opcion: number, tareas:Tarea[],fecha:Date): string | void {
    switch (opcion) {
        case 1:
            return "\n Tareas de alta prioridad:\n"+tareas.filter(tarea => asignarPrioridadLogica(tarea,fecha) === "Alta").map(tarea => tarea.toString())
            .join('\n----------------------------------------\n');
        case 2:
            return buscarPorPalabrasRelacionadas(tareas).map(([tareaBase, relacionadas]) => {
                const listaRelacionada = relacionadas
                    .map(t => `  -> [ID ${t.getId()}] ${t.getTitulo()}`)
                    .join('\n');
                return `**Tarea Principal: [ID ${tareaBase.getId()}] ${tareaBase.getTitulo()}\n` +
                       `Tareas Relacionadas:\n${listaRelacionada}`;
            }).join('\n----------------------------------------------\n') || "\n No se encontraron relaciones automáticas por título entre las tareas.";
        case 3:
            let aux=tareas.filter(tarea => {
            const vencimiento = tarea.getFechaVencimiento();

            // 1. Descartamos tareas sin fecha de vencimiento (undefined/null)
            if (!vencimiento) {
                return false;
            }
            // 2. Comparamos: La tarea está vencida si su tiempo de vencimiento
            // es menor que el tiempo de referencia (es decir, ya pasó).
            return vencimiento.getTime() <= fecha.getTime();
            });
            if(aux.length === 0){
                return "\n No hay tareas vencidas.";
            }
            return "\n Tareas vencidas\n"+aux.map(tarea => tarea.toString())
            .join('\n----------------------------------------\n');
        case 4:
            return "\n Tareas de alta prioridad:\n" + tareas
            .map(tarea => {
                // 1. Calculamos la prioridad de la tarea
                const prioridad = asignarPrioridadLogica(tarea, fecha);
                
                // 2. Devolvemos una cadena formateada que incluye el TÍTULO y la PRIORIDAD
                return `${tarea.getTitulo()} (Prioridad: ${prioridad})`; 
            })
            // 3. Unimos todas las cadenas generadas con tu separador
            .join('\n----------------------------------------\n');
        case 5:
            return " Volver al menú principal";
    }
}

function manejoEliminar(gestorTareas: gestor,tarea:Tarea): string{
    const exito = gestorTareas.deleteItem(tarea.getId());
    if(exito){
        return("\n [OK] Tarea eliminada exitosamente.");
    }  else{
        return("\n [!] Error al eliminar la tarea.");
    }
}

function buscarPorPalabrasRelacionadas(tareas: Tarea[]): [Tarea, Tarea[]][] {
 const resultado: [Tarea, Tarea[]][] = [];

    for( let i = 0; i < tareas.length; i++){
    const palabraBase = tareas[i].getTitulo().toLowerCase().split(" ");
    const relacionadas: Tarea[] = [];
        for( let j = 0; j < tareas.length; j++){
            if(i !== j){
                const palabrasComparar = tareas[j].getTitulo().toLowerCase().split(" ");
                const hayRelacion = palabraBase.some(palabra => palabrasComparar.includes(palabra)&& palabra.length > 3);

                if(hayRelacion=== true){
                relacionadas.push(tareas[j]);
                }

            }

        }   
        if(relacionadas.length > 0){
        resultado.push([tareas[i], relacionadas]);
        }
    }
return resultado;
}

export { manejoEstadisticas, manejoConsultas, manejoEliminar };
