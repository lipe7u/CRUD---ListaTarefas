//Importa as funções da pasta taskModels que interagem com o banco de dados.
import { createTask, getAllTasks, getTaskById, updateTask, deleteTask } from "../models/taskModels.js";

//Função que serve para adicionar uma nova tarefa
export function addTask(req, res) {
    const { id, tarefa, status } = req.body;
    createTask(req.server.mysql, id, tarefa, status, (error, result) => {
        if (error) {
            res.status(501).send({ Error: "Ocorreu um erro ao adicionar a tarefa", details: error });
        } else {
            res.status(201).send("Tarefa adicionada com sucesso");
        }
    });
}

//Função que serve para listar todas as tarefas da lista
export function listTasks(req, res) {
    getAllTasks(req.server.mysql, (error, result) => {
        if (error) {
            res.status(500).send("Erro ao exibir as tarefas");
        } else {
            res.send(result);
        }
    });
}

//Função que serve para listar uma tarefa especifica pelo seu id.
export function getTask(req, res) {
    const { id } = req.params;
    getTaskById(req.server.mysql, id, (error, result) => {
        if (error) {
            res.status(500).send({ Error: "Ocorreu um erro ao listar a tarefa", details: error });
        } else {
            res.status(200).send(result);
        }
    });
}

//Função que serve para atualizar uma tarefa
export function modifyTask(req, res) {
    const { id } = req.params;
    const { tarefa, status } = req.body;
    updateTask(req.server.mysql, id, tarefa, status, (error, result) => {
        if (error) {
            res.status(500).send({ Error: "Ocorreu um erro ao atualizar a tarefa", details: error });
        } else {
            res.status(200).send("Tarefa atualizada com sucesso");
        }
    });
}

//Função que serve para remover uma tarefa.
export function removeTask(req, res) {
    const { id } = req.params;
    deleteTask(req.server.mysql, id, (error, result) => {
        if (error) {
            res.status(500).send({ Error: "Ocorreu um erro ao deletar a tarefa", details: error });
        } else {
            res.status(200).send("Tarefa deletada com sucesso");
        }
    });
}
