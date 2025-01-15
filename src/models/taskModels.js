// Função para criar uma nova tarefa no banco de dados
export function createTask(db, id, tarefa, status, callback) {
    db.query(
        // Consulta SQL para inserir uma nova tarefa na tabela "lista"
        "INSERT INTO lista (id, tarefa, status) VALUES (?, ?, ?)", 
        [id, tarefa, status], // Parâmetros da consulta: id, tarefa e status
        callback // Função de callback que será chamada após a conclusão da consulta
    );
}

// Função para obter todas as tarefas do banco de dados
export function getAllTasks(db, callback) {
    db.query(
        // Consulta SQL para selecionar todas as tarefas da tabela "lista"
        "SELECT * FROM lista",
        callback // Função de callback que será chamada após a conclusão da consulta
    );
}

// Função para obter uma tarefa específica por ID
export function getTaskById(db, id, callback) {
    db.query(
        // Consulta SQL para selecionar uma tarefa da tabela "lista" com um ID específico
        "SELECT * FROM lista WHERE id = ?", 
        [id], // Parâmetro da consulta: id
        callback // Função de callback que será chamada após a conclusão da consulta
    );
}

// Função para atualizar uma tarefa existente no banco de dados
export function updateTask(db, id, tarefa, status, callback) {
    db.query(
        // Consulta SQL para atualizar a tarefa e o status na tabela "lista" onde o ID corresponde
        "UPDATE lista SET tarefa = ?, status = ? WHERE id = ?", 
        [tarefa, status, id], // Parâmetros da consulta: tarefa, status e id
        callback // Função de callback que será chamada após a conclusão da consulta
    );
}

// Função para deletar uma tarefa do banco de dados
export function deleteTask(db, id, callback) {
    db.query(
        // Consulta SQL para deletar uma tarefa da tabela "lista" onde o ID corresponde
        "DELETE FROM lista WHERE id = ?", 
        [id], // Parâmetro da consulta: id
        callback // Função de callback que será chamada após a conclusão da consulta
    );
}
