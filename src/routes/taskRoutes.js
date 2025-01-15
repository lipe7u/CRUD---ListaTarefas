// Importa as funções do controlador que lidam com as requisições
import { addTask, listTasks, getTask, modifyTask, removeTask } from "../controllers/taskController.js";

// Função para definir as rotas relacionadas às tarefas
export default function taskRoutes(app) {
    // Rota para adicionar uma nova tarefa
    app.post("/Task", addTask);

    // Rota para listar todas as tarefas
    app.get("/Task", listTasks);

    // Rota para obter uma tarefa específica por ID
    app.get("/Task/:id", getTask);

    // Rota para atualizar uma tarefa por ID
    app.put("/Task/:id", modifyTask);

    // Rota para deletar uma tarefa por ID
    app.delete("/Task/:id", removeTask);
}
