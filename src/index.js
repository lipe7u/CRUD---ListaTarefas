// Importa o módulo Fastify
import Fastify from "fastify";

// Importa a função de configuração do banco de dados
import registerDb from "../config/DbConfig.js";

// Importa as rotas relacionadas às tarefas
import taskRoutes from "./routes/taskRoutes.js";

// Cria uma instância do Fastify
const app = Fastify();

// Registra a configuração do banco de dados na instância do Fastify
registerDb(app);

// Registra as rotas relacionadas às tarefas na instância do Fastify
taskRoutes(app);

// Inicia o servidor na porta 3000 e exibe uma mensagem no console
app.listen({ port: 3000 }).then(() => {
    console.log("Servidor rodando na porta 3000");
});
