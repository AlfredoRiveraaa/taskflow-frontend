import { useState } from "react";
import { DragDropContext, Droppable, Draggable, type DropResult } from "@hello-pangea/dnd";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, MoreVertical, Calendar } from "lucide-react";

// Tipos
type Priority = "low" | "medium" | "high";
interface Task {
  id: string;
  content: string;
  priority: Priority;
}
interface ColumnData {
  name: string;
  items: Task[];
}
type Columns = Record<string, ColumnData>;

// Datos de prueba iniciales
const initialColumns: Columns = {
  todo: {
    name: "To Do",
    items: [
      { id: "task-1", content: "Diseñar la base de datos", priority: "high" },
      { id: "task-2", content: "Configurar API Gateway", priority: "medium" },
    ],
  },
  inProgress: {
    name: "In Progress",
    items: [
      { id: "task-3", content: "Implementar autenticación JWT", priority: "high" },
    ],
  },
  review: {
    name: "Review",
    items: [
      { id: "task-4", content: "Revisar PR del frontend", priority: "low" },
    ],
  },
  done: {
    name: "Done",
    items: [
      { id: "task-5", content: "Configurar repositorio Git", priority: "medium" },
    ],
  },
};

const getPriorityColor = (priority: Priority) => {
  switch (priority) {
    case "high": return "bg-red-100 text-red-700";
    case "medium": return "bg-yellow-100 text-yellow-700";
    case "low": return "bg-green-100 text-green-700";
    default: return "bg-zinc-100 text-zinc-700";
  }
};

export default function KanbanBoardPage() {
  const [columns, setColumns] = useState<Columns>(initialColumns);

  // Lógica principal cuando se suelta una tarea
  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      // Movimiento entre columnas diferentes
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);

      setColumns({
        ...columns,
        [source.droppableId]: { ...sourceColumn, items: sourceItems },
        [destination.droppableId]: { ...destColumn, items: destItems },
      });
    } else {
      // Reordenamiento en la misma columna
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);

      setColumns({
        ...columns,
        [source.droppableId]: { ...column, items: copiedItems },
      });
    }
  };

  return (
    <div className="h-full flex flex-col space-y-4">
      {/* Header del Proyecto */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900">Desarrollo TaskFlow</h1>
          <p className="text-sm text-zinc-500">Tablero principal del sprint actual</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Calendar className="w-4 h-4" /> 12 Sep - 26 Sep
          </Button>
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700 gap-2">
            <Plus className="w-4 h-4" /> Crear Tarea
          </Button>
        </div>
      </div>

      {/* Tablero Kanban */}
      <div className="flex-1 overflow-x-auto pb-4">
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="flex gap-4 h-full min-h-[500px]">
            {Object.entries(columns).map(([columnId, column]) => (
              <div key={columnId} className="flex flex-col w-80 shrink-0 bg-zinc-100 rounded-xl p-3">
                
                {/* Cabecera de la columna */}
                <div className="flex items-center justify-between mb-3 px-1">
                  <h3 className="font-semibold text-zinc-700 text-sm">{column.name}</h3>
                  <span className="bg-zinc-200 text-zinc-600 text-xs font-medium px-2 py-0.5 rounded-full">
                    {column.items.length}
                  </span>
                </div>

                {/* Área para soltar tareas */}
                <Droppable droppableId={columnId}>
                  {(provided, snapshot) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className={`flex-1 transition-colors rounded-lg ${
                        snapshot.isDraggingOver ? "bg-zinc-200/50" : ""
                      }`}
                    >
                      {column.items.map((item, index) => (
                        <Draggable key={item.id} draggableId={item.id} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`mb-3 transition-shadow ${
                                snapshot.isDragging ? "drop-shadow-xl" : "drop-shadow-sm"
                              }`}
                              style={{ ...provided.draggableProps.style }}
                            >
                              <Card className="border-zinc-200 hover:border-blue-300 transition-colors cursor-grab active:cursor-grabbing">
                                <CardContent className="p-4 flex flex-col gap-3">
                                  <div className="flex justify-between items-start gap-2">
                                    <p className="text-sm font-medium text-zinc-900 leading-snug">
                                      {item.content}
                                    </p>
                                    <button className="text-zinc-400 hover:text-zinc-600">
                                      <MoreVertical className="w-4 h-4" />
                                    </button>
                                  </div>
                                  <div className="flex items-center justify-between mt-1">
                                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md ${getPriorityColor(item.priority)}`}>
                                      {item.priority}
                                    </span>
                                    <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-[10px] font-bold">
                                      AR
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
                
                {/* Botón rápido para añadir tarea */}
                <Button variant="ghost" className="w-full mt-2 text-zinc-500 hover:text-zinc-900 justify-start h-8 px-2">
                  <Plus className="w-4 h-4 mr-2" /> Añadir tarjeta
                </Button>
              </div>
            ))}
          </div>
        </DragDropContext>
      </div>
    </div>
  );
}
