import fastifyMysql from "@fastify/mysql";

export const mysqlConfig = {
    connectionString: "mysql://root:root@localhost:3306/ListaTarefas"
};

export default function registerDb(app) {
    app.register(fastifyMysql, mysqlConfig);
}
