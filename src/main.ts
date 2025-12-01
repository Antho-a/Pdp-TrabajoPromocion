import PromptSync from "prompt-sync";
const prompt = PromptSync();
import { gestor } from "./logica/Gestor";
import { menu } from "./Interfaz/Consola"; 
import { vertarea } from "./Funcionalidades/VerMisTareas";
import { CrearTarea } from "./Funcionalidades/CrearTarea";
import { buscarSegunTitulo } from "./funcionalidades-Puras/FiltroSegunEstado";

function main(): void {
    const gestorTareas = new gestor("GuardadoDeTareas");
    let opcionesMenu: number;

    // Helper simple para pausar
    const pausar = () => prompt("\n Presione Enter para continuar...");

    do {
        console.clear();
        console.log(menu()); 

        // Input simple con flecha
        let input = prompt(" > ");
        opcionesMenu = parseInt(input);

        while (isNaN(opcionesMenu) || opcionesMenu < 1 || opcionesMenu > 5) {
            console.log("\n [!] Opción inválida. Seleccione entre 1 y 5.");
            input = prompt(" > ");
            opcionesMenu = parseInt(input);
        }

        console.clear();

        switch (opcionesMenu) {
            case 1:
                if(gestorTareas.getItems().length == 0){
                    console.log(" No hay tareas disponibles.");
                } else {
                    vertarea(gestorTareas);
                    //gestorTareas.mostrarTareas(); 
                break;
                }

            case 2:
                if(gestorTareas.getItems().length == 0){
                    console.log(" No hay tareas disponibles.");
                }
                else {
                vertarea(gestorTareas);
                let tituloBuscar: string
                tituloBuscar= prompt("\n Ingrese el título de la tarea a buscar: ").trim();
                const tareaEncontrada = buscarSegunTitulo(gestorTareas.getItems(), tituloBuscar);
                if (tareaEncontrada) {
                    console.log("Tarea encontrada:");
                    console.log(tareaEncontrada);
                } else {
                    console.log("No se encontró ninguna tarea con ese título.");
                }
                pausar();
                break;
                }

            case 3:
                // CrearTarea ya maneja su propia limpieza de pantalla
                gestorTareas.addItem(CrearTarea(gestorTareas.getItems()));
                
                console.log("\n [OK] Tarea guardada en el sistema.");
                pausar();
                break;
            
            case 4:
                if(gestorTareas.getItems().length == 0){
                    console.log(" No hay tareas disponibles.");
                }
                else {
                console.log("\n=== ELIMINAR TAREA ===\n");
                // Lógica de eliminar
                vertarea(gestorTareas);
                let tituloBuscar = prompt("\n Ingrese el título de la tarea a eliminar: ").trim();
                const tareaEncontrada = buscarSegunTitulo(gestorTareas.getItems(), tituloBuscar);
                if (tareaEncontrada) {
                    gestorTareas.deleteItem(tareaEncontrada.getId());
                    console.log("\n [OK] Tarea eliminada correctamente.");
                } else {
                    console.log("No se encontró ninguna tarea con ese título.");
                }
                pausar();  
                }
                break;

            case 5:
                console.log("\nCerrando aplicación... ¡Hasta luego!\n");
                break;
        }

    } while (opcionesMenu !== 5);
}

main();