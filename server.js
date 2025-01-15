// Importa os módulos necessários
import fastify from "fastify";
import fastifyMysql from "@fastify/mysql";

// Cria uma instância do Fastify
const app = fastify();

// Registra o plugin do MySQL com a string de conexão
app.register(fastifyMysql, {
    connectionString: "mysql://root:root@localhost:3306/ListaTarefas" // String de conexão com o banco de dados MySQL
});

// Define a rota POST para criar uma nova tarefa
app.post("/Task", (req, res) => {
    // Desestrutura os dados do corpo da requisição
    const { id, tarefa, status } = req.body;
    
    // Executa a consulta para inserir a nova tarefa no banco de dados
    app.mysql.query(
        "INSERT INTO lista (id, tarefa, status) VALUES (?, ?, ?)", [id, tarefa, status],
        
        // Função de callback que lida com o resultado da consulta
        function OnResult(error, result) {
            if (error) {
                // Envia uma resposta de erro se a consulta falhar
                res.status(501).send({ Error: "Ocorreu um erro ao adicionar a tarefa", details: error });
            };
            
            if (result) {
                // Envia uma resposta de sucesso se a consulta for bem-sucedida
                res.status(201).send("Tarefa adicionada com sucesso");
            };
        }
    );
});

// Define a rota GET para listar todas as tarefas
app.get("/Task", (req, res) => {
    // Executa a consulta para selecionar todas as tarefas do banco de dados
    app.mysql.query(
        "SELECT * FROM lista",
        
        // Função de callback que lida com o resultado da consulta
        function OnResult(error, result) {
            if (error) {
                // Envia uma resposta de erro se a consulta falhar
                res.status(500).send("Erro ao exibir as tarefas");
            };
            
            if (result) {
                // Envia a lista de tarefas como resposta se a consulta for bem-sucedida
                res.send(result);
            };
        }
    );
});

// Define a rota GET para obter uma tarefa por ID
app.get("/Task/:id", (req, res) => {
    // Desestrutura o ID dos parâmetros da requisição
    const { id } = req.params;
    
    // Executa a consulta para selecionar uma tarefa específica pelo ID
    app.mysql.query(
        "SELECT * FROM lista WHERE id = ?", [id],
        
        // Função de callback que lida com o resultado da consulta
        function OnResult(error, result) {
            if (error) {
                // Envia uma resposta de erro se a consulta falhar
                res.status(500).send({ Error: "Ocorreu um erro ao listar a tarefa", details: error });
            };
            
            if (result) {
                // Envia a tarefa como resposta se a consulta for bem-sucedida
                res.status(200).send(result);
            };
        }
    );
});

// Define a rota PUT para atualizar uma tarefa por ID
app.put("/Task/:id", (req, res) => {
    // Desestrutura o ID dos parâmetros da requisição
    const { id } = req.params;
    
    // Desestrutura os dados do corpo da requisição
    const { tarefa, status } = req.body;
    
    // Executa a consulta para atualizar a tarefa no banco de dados
    app.mysql.query(
        "UPDATE lista SET tarefa = ?, status = ? WHERE id = ?", [tarefa, status, id],
        
        // Função de callback que lida com o resultado da consulta
        function OnResult(error, result) {
            if (error) {
                // Envia uma resposta de erro se a consulta falhar
                return res.status(500).send({ Error: "Ocorreu um erro ao atualizar a tarefa", details: error });
            };
            
            if (result) {
                // Envia uma resposta de sucesso se a consulta for bem-sucedida
                res.status(200).send("Tarefa atualizada com sucesso");
            };
        }
    );
});

// Define a rota DELETE para excluir uma tarefa por ID
app.delete("/Task/:id", (req, res) => {
    // Desestrutura o ID dos parâmetros da requisição
    const { id } = req.params;
    
    // Executa a consulta para deletar a tarefa no banco de dados
    app.mysql.query(
        "DELETE FROM lista WHERE id = ?", [id],
        
        // Função de callback que lida com o resultado da consulta
        function OnResult(error, result) {
            if (error) {
                // Envia uma resposta de erro se a consulta falhar
                res.status(500).send({ Error: "Ocorreu um erro ao deletar a tarefa", details: error });
            };
            
            if (result) {
                // Envia uma resposta de sucesso se a consulta for bem-sucedida
                res.status(200).send("Tarefa deletada com sucesso");
            };
        }
    );
});

// Inicia o servidor na porta 3000 e exibe uma mensagem no console
app.listen({ port: 3000 }).then(() => {
    console.log("Servidor rodando na porta 3000");
});
