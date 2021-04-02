# Burger Queen - Back-end

## Índice

- [1. Prefácio](#1-prefácio)
- [2. Resumo do projeto](#2-resumo-do-projeto)
- [3. Objetivos de aprendizagem](#3-objetivos-de-aprendizagem)
- [4. Considerações gerais](#4-considerações-gerais)
- [5. Critérios de aceitação do projeto](#5-critérios-de-aceitação-do-projeto)
- [6. Entrega](#6-entrega)
- [7. Primeiros Passos](#7-primeiros-passos)
- [8. HTTP API Checklist](#8-http-api-checklist)
- [9. Hacker Edition](#9-hacker-edition)

## 1. Prefácio

  A interface front-end da aplicação Burger Queen já foi criado [BurgerBeef](https://github.com/LauraDeperon/BurgerBeef-Laboratoria), e agora criamos o back-end para manejar os dados. Neste caso, foi feito através
  de uma _API rest_ que será compatível com as requisições vindas do front a [BurgerBeefAPI](https://burger-queen-database.herokuapp.com/).

## 2. Burger Beef API

### 5.1 API

A API dispõe dos seguintes endpoints:

#### 5.1.1 `/users`

- `GET /users`
- `GET /users/:uid`
- `POST /users`
- `PUT /users/:uid`
- `DELETE /users/:uid`

#### 5.1.2 `/products`

- `GET /products`
- `GET /products/:productid`
- `POST /products`
- `PUT /products/:productid`
- `DELETE /products/:productid`

#### 5.1.3 `/orders`

- `GET /orders`
- `GET /orders/:orderId`
- `POST /orders`
- `PUT /orders/:orderId`
- `DELETE /orders/:orderId`

#### 5.1.4 `/auth`

- `POST /auth`

## 4. Tecnologias Utilizadas:

* `Node.js`
* `Express`
* `Sequelize`
* `JWT Token`
* `PostgreSQL`
* `Dbeaver (visualizar tabelas do banco de dados e suas relações)`
* `Postman (para teste de requisições)`
* `Heroku (deploy da API)`

## 7. Desenvolvimento

[Laura Deperon](https://github.com/LauraDeperon)