import PromptSync from "prompt-sync";
const prompt = PromptSync();
import { gestor } from "./logica/Gestor";
import { menu } from "./Interfaz/Consola"; 
import { vertarea } from "./Funcionalidades/VerMisTareas";
import { CrearTarea } from "./Funcionalidades/CrearTarea";
import { filtrarTodas } from "./funcionalidades-Puras/FiltroSegunEstado";

function main(): void {
    const gestorTareas = new gestor("GuardadoDeTareas");
    // Helper simple para pausar
    const pausar = () => prompt("\n Presione Enter para continuar...");
    let input: string;
    do {
        let i=0;
        console.clear();
        console.log(menu()); 

        // Input simple con flecha
        input = prompt(" > ");

        while (isNaN(parseInt(input)) || parseInt(input) < 1 || parseInt(input) > 5) {
            console.log("\n [!] Opción inválida. Seleccione entre 1 y 5.");
            input = prompt(" > ");
        }

        console.clear();

        switch (parseInt(input)) {
            case 1:
                if(gestorTareas.getItems().length !== 0){
                    vertarea(gestorTareas);
                // gestorTareas.mostrarTareas(); 
                }else{
                    console.log("\n [!] No hay tareas para mostrar.");
                }
                
            break;

            case 2:
                console.log("\n=== BUSCAR TAREA ===\n");
                console.log("Buscador...");
                pausar();
            break;

            case 3:
                // CrearTarea ya maneja su propia limpieza de pantalla
                gestorTareas.addItem(CrearTarea(gestorTareas.getItems()));
                
                console.log("\n [OK] Tarea guardada en el sistema.");
                pausar();
            break;
            
            case 4:
                console.log("\n=== ELIMINAR TAREA ===\n");
                let tareas=filtrarTodas(gestorTareas.getItems());
                tareas.forEach(tarea => {
                    console.log([i]+tarea.toString());
                    console.log("----------------------------------------");
                });
                const idEliminar = prompt("Ingrese la tarea que desea eliminar: ").trim();
                while(isNaN(parseInt(idEliminar)) || parseInt(idEliminar) < 1 || parseInt(idEliminar) > tareas.length){
                    console.log("\n [!] Opción inválida. Seleccione una tarea válida.");
                    const idEliminar = prompt("Ingrese la tarea que desea eliminar: ").trim();
                }
                const exito = gestorTareas.deleteItem(tareas[parseInt(idEliminar)-1].getId());
                if(exito){
                    console.log("\n [OK] Tarea eliminada exitosamente.");
                }  else{
                    console.log("\n [!] Error al eliminar la tarea.");
                }
                // Lógica de eliminar
                pausar();
            break;

            case 5:
                console.log("\nCerrando aplicación... ¡Hasta luego!\n");
            break;
        }

    } while (parseInt(input) !== 5);
}

main();