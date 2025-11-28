function menu (): String{

return "1. Ver Mis Tareas\n2. Buscar Tarea\n3. Agegar Tarea\n. Salir";}

function VerMisTareas():String{
    return "Qué tarea desea ver?\n1. Todas\n2. Pendientes\n3. En curso\n4. Terminadas\n5. Canceladas\n6. Volver al menú principal";
};

function OrdenTareasASC():String{
    return "Cómo desea ordenar las tareas?\n1. Titilo ascendente \n2. Por fecha de vencimiento ascendete \n3. Por fecha de creación ascendente\n4. Dificultad (de baja a alta) \n5. Volver al menú principal";
}

function Estadisiticas():String{
    return "Qué estadística desea ver?\n1. Total de tareas\n2. Porcentaje de tareas por estado\n3. Porcentaje de tareas por dificultad\n4. Volver al menú principal"
};

function Consultas():String{
    return "Elija la forma del listado de consultas\n1. Tareas de alta prioridad\n2. Tareas relacionadas\n3. Listado de las tareas vencidas\n4. Volver al menú principal"
};

function PreguntaEditar():String {
    return "Qué campo desea editar?\n1. Título\n2. Descripción\n3. Estado\n4. Dificultad\n5. Fecha de vencimiento\n6. Volver al menú principal"
}
