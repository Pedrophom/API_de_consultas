API REST para Agendamento de Consultas em Clínica de Saúde
1. Introdução
Este projeto consiste no desenvolvimento de uma API REST para o gerenciamento de agendamentos de consultas em uma clínica de saúde. A aplicação foi desenvolvida utilizando o framework AdonisJS, com o objetivo de permitir que pacientes realizem agendamentos com profissionais da saúde, respeitando horários de disponibilidade e evitando conflitos de agenda.
O sistema contempla autenticação de usuários, validações de dados, aplicação de regras de negócio e organização do código conforme boas práticas de desenvolvimento back-end.
Projeto desenvolvido como atividade acadêmica do
 Instituto Federal de Educação, Ciência e Tecnologia do Maranhão (IFMA)
 Curso: Tecnologia em Sistemas para Internet
 Disciplina: Desenvolvimento Backend

2. Objetivo
Desenvolver uma API REST completa utilizando o framework AdonisJS, responsável pelo gerenciamento de um sistema de agendamento de consultas entre profissionais da saúde e pacientes, aplicando autenticação JWT, validações, regras de negócio e arquitetura MVC.

3. Tecnologias Utilizadas
Node.js
AdonisJS 6
Lucid ORM
VineJS para validação de dados
JSON Web Token (JWT) para autenticação
Banco de dados relacional (SQLite, MySQL ou PostgreSQL)

4. Arquitetura do Sistema
O sistema foi desenvolvido seguindo o padrão arquitetural MVC (Model–View–Controller), promovendo separação de responsabilidades, organização do código e facilidade de manutenção.
As validações são realizadas na camada de entrada por meio do VineJS, enquanto as regras de negócio são implementadas nos controllers. A persistência dos dados é realizada através do Lucid ORM.

5. Instalação e Execução
5.1 Clonagem do Repositório
  git clone https://github.com/seu-usuario/api-consultas

5.2 Acesso ao Diretório do Projeto
  cd api-consultas

5.3 Instalação das Dependências
  npm install

5.4 Configuração do Ambiente
Criar o arquivo .env com base no arquivo .env.example, configurando as credenciais do banco de dados escolhido.
5.5 Execução das Migrations
  node ace migration:run

5.6 Inicialização do Servidor
  npm run dev

O servidor será iniciado no endereço:
http://localhost:3333

6. Autenticação
A autenticação do sistema é realizada por meio de JWT (JSON Web Token).
6.1 Cadastro de Usuário
POST /auth/register
Exemplo de requisição:
{
  "name": "João Silva",
  "email": "joao@email.com",
  "password": "123456",
  "tipo": "paciente"
}

Os tipos de usuário permitidos são:
paciente


profissional



6.2 Login
POST /auth/login
{
  "email": "joao@email.com",
  "password": "123456"
}

A resposta contém o token JWT, que deve ser enviado nas requisições protegidas no cabeçalho HTTP:
Authorization: Bearer TOKEN


7. Profissionais da Saúde
7.1 Listagem de Profissionais
GET /profissionais
7.2 Cadastro de Profissional
POST /profissionais
 Rota protegida por autenticação. Permitida apenas para usuários do tipo profissional.
{
  "especialidade": "Cardiologia"
}


8. Disponibilidade de Atendimento
8.1 Cadastro de Disponibilidade
POST /disponibilidades
 Acesso restrito a profissionais autenticados.
{
  "dia_da_semana": 1,
  "hora_inicio": "08:00",
  "hora_fim": "12:00"
}

O campo dia_da_semana segue a convenção:
0: Domingo


1: Segunda-feira


6: Sábado



8.2 Listagem de Disponibilidades por Profissional
GET /disponibilidades/:profissional_id

9. Consultas
9.1 Agendamento de Consulta
POST /consultas
 Acesso restrito a pacientes autenticados.
{
  "profissional_id": 1,
  "data": "2026-01-20",
  "hora": "09:00"
}


9.2 Atualização de Consulta
PUT /consultas/:id
 Permitida apenas para consultas que não estejam canceladas.

9.3 Cancelamento de Consulta
DELETE /consultas/:id
 Permitido apenas ao paciente responsável pela consulta.

9.4 Listagem de Consultas do Paciente
GET /consultas

10. Regras de Negócio
Não é permitido agendar consultas fora dos horários de disponibilidade do profissional.


Não é permitido mais de uma consulta no mesmo horário para o mesmo profissional.


Apenas o paciente autenticado pode cancelar suas próprias consultas.


Consultas canceladas não podem ser atualizadas.


A unicidade do e-mail do usuário é garantida pelo banco de dados.



11. Critérios Atendidos
Modelagem adequada do banco de dados


Implementação correta das rotas REST


Autenticação com JWT


Aplicação das regras de negócio


Validações e tratamento de erros


Organização do projeto e boas práticas de desenvolvimento



12. Autores
Projeto acadêmico desenvolvido por [João Victor da Conceição Sousa e Pedro Henrique Oliveira de Moura]
 Curso: Tecnologia em Sistemas para Internet
 Instituto Federal de Educação, Ciência e Tecnologia do Maranhão – IFMA


