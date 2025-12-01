import PromptSync from "prompt-sync";
const prompt = PromptSync();
import { gestor } from "./logica/Gestor";
import { menu,menuConsultas,menuEstad } from "./Interfaz/Consola"; 
import { vertarea } from "./Funcionalidades/VerMisTareas";
import { CrearTarea } from "./Funcionalidades/CrearTarea";
import { filtrarTodas } from "./funcionalidades-Puras/FiltroSegunEstado";
import { pedirNumero } from "./Funcionalidades/Verificadores";
import { BusquedaTitulo } from "./funcionalidades-Puras/FiltroSegunEstado";
import { mostarTitulos, mostrarTareaCompletas } from "./Interfaz/ConsolaTarea";
import { manejoEstadisticas } from "./logica/FlujodeNegocio";
function main(): void {


    const gestorTareas = new gestor("GuardadoDeTareas");
    // Helper simple para pausar
    const pausar = () => prompt("\n Presione Enter para continuar...");
    let input: number;



    do {
        console.clear();
        
        input=pedirNumero(menu(), 1 , 7 , false); 

        console.clear();

        switch (input){
            case 1:
                if(gestorTareas.getItems().length !== 0){
                   vertarea(gestorTareas);
                }else{
                    console.log("\n [!] No hay tareas para mostrar.");
                    pausar();
                } 
            break;

            case 2:
                 if(gestorTareas.getItems().length == 0){
                    console.log(" No hay tareas disponibles.");
                }
                else {
                console.log(mostarTitulos(gestorTareas.getItems() , gestorTareas.getItems().length , 0));
                let tituloBuscar: string
                tituloBuscar= prompt("\n Ingrese el título de la tarea a buscar: ").trim();
                const tareaEncontrada = BusquedaTitulo(gestorTareas.getItems(), tituloBuscar);
                if (tareaEncontrada) {
                    console.log("Tarea encontrada:");
                    console.log(mostrarTareaCompletas(tareaEncontrada));
                } else {
                    console.log("No se encontró ninguna tarea con ese título.");
                }
                pausar();
                break;
                }
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
                    console.log(tarea.toString());
                    console.log("----------------------------------------");
                });
                console.log(`${tareas.length+1}. Salir del eliminar`)

                const idEliminar = pedirNumero("Ingrese la tarea que desea eliminar: ", 1 , tareas.length+1 , false)

                if(idEliminar == (tareas.length+1)){
                    console.log("Volviendo al menu...");
                    pausar();
                }
                const exito = gestorTareas.deleteItem(tareas[idEliminar-1].getId());
                if(exito){
                    console.log("\n [OK] Tarea eliminada exitosamente.");
                }  else{
                    console.log("\n [!] Error al eliminar la tarea.");
                }
                
                pausar();

            break;
            case 5:
                input=pedirNumero(menuEstad(), 1 , 4 , false);
                manejoEstadisticas(input, gestorTareas);
                pausar();
            break;
            case 6:
                input=pedirNumero(menuConsultas(), 1 , 3 , false);

            break;
            case 7:
                console.log("\nCerrando aplicación... ¡Hasta luego!\n");
            break;
        }

    } while (input !== 7);
}

main();