import PromptSync from "prompt-sync";
const prompt = PromptSync();
import { gestor } from "./logica/Gestor";
import { menu } from "./Interfaz/Consola"; 
import { vertarea } from "./Funcionalidades/VerMisTareas";
import { CrearTarea } from "./Funcionalidades/CrearTarea";

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
                
                vertarea(gestorTareas);
                // gestorTareas.mostrarTareas(); 
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
                // Lógica de eliminar
                pausar();
                break;

            case 5:
                console.log("\nCerrando aplicación... ¡Hasta luego!\n");
                break;
        }

    } while (opcionesMenu !== 5);
}

main();