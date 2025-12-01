import { gestor } from "../logica/Gestor";
import { contarPorDificultad,contarPorEstado } from "../funcionalidades-Puras/Estadistica";
import { asignarPrioridadLogica } from "../funcionalidades-Puras/Prioridad";
import { DIFICULTADES_TAREA, ESTADOS_TAREA } from "../models/Tarea";
function manejoEstadisticas(opcion: number, gestorTareas: gestor): void {
    switch (opcion) {
        case 1:
            console.log(`\n Total de Tareas: ${gestorTareas.getItems().length}`);
            break;
        case 2:
            console.log("\n Porcentaje de Tareas por estado:");
            ESTADOS_TAREA.forEach(estado => {
                console.log(`- ${estado}: ${contarPorEstado(gestorTareas.getItems(), estado)} %`);
            }
            );
            break;
        case 3:
            console.log("\n Porcentaje de Tareas por dificultad:");
            DIFICULTADES_TAREA.forEach(dificultad => {
                console.log(`- ${dificultad}: ${contarPorDificultad(gestorTareas.getItems(), dificultad)} %`);
            }
            );
            break;
        case 4:
            // Volver al menú principal
            break;
        default:
            console.log("\n [!] Opción inválida. Intente nuevamente.");
            break;
    }
}
function manejoConsultas(opcion: number, gestorTareas: gestor): void {
    switch (opcion) {
        case 1:
            console.log("\n Tareas de alta prioridad:");
            gestorTareas.getItems().forEach(tarea => {
                if (asignarPrioridadLogica(tarea) === "Alta") {
                    console.log(tarea.toString());
                    console.log("----------------------------------------");
                }
            });
            break;
        case 2:
            console.log("\n Tareas relacionadas:");
            // Lógica para mostrar tareas relacionadas
            break;
        case 3:
            console.log("\n Listado de tareas vencidas:");
            // Lógica para mostrar tareas vencidas
            break;
        case 4:
            // Volver al menú principal
            break;
        default:
            console.log("\n [!] Opción inválida. Intente nuevamente.");
            break;
    }
}
export { manejoEstadisticas, manejoConsultas};

