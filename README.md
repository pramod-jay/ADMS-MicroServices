# ADMS-MicroServices
This repository contains the implementation of a microservices architecture for the IN3400-Advanced Database Management System course assignment. The goal of this assignment is to design and develop three microservices that collectively demonstrate advanced database management concepts through a distributed application.

<!-- ABOUT THE PROJECT -->
## About The Project
This project was implemented to get an understanding of Microservices. ADMS-Microservices includes three microservices naming user management, order placement and inventory management. The ultimate goal is to place an order for a particular user based on the items available in the inventory. Apart from that each microservice has basic operations of CREATE, UPDATE, VIEW and DELETE.

### Build With
The project is implemented using the following frameworks and Databases
* [<img src="https://www.flaticon.com/free-icon/nodejs_919825?term=nodejs&page=1&position=2&origin=search&related_id=919825" align="left" alt="nodeJS"/>]Node
* MySQL
* PostgreSQL
* MongoDB

All three databases are hosted in Microsoft Azure. PostgreSQL (OrderDB) is hosted in "Azure Database for PostgreSQL flexible server", MySQL (UserDB) in "Azure Database for MySQL flexible server" and MongoDB (InventoryDB) in "Azure Cosmos DB for MongoDB account”. All three databases are included in the resource group named ‘Vikings’ (group name).

## Getting Started

### Prerequisites
* Suitable IDE
* MySQL Workbench for MySQL, pgAdmin for PostgreSQL and MongoDB Compass for MongoDB or any other relevant app to view Databases

### Installation
Steps to implement and set up the project:
1. Clone the repo
   ```sh
   git clone https://github.com/pramod-jay/ADMS-MicroServices.git
   ```
2. Install NPM packages for each Gateway, Inventory, Order and User folder
   ```sh
   npm install
   ```
3. Run the servers 
    ```sh
   npm start
   ```
_P.S.: Installation of node modules will be necessary at the initial stage, and it will only require ‘npm start’ command for the rest of the testing._

## Contact
Group Name: Vikings

Project Link: [https://github.com/pramod-jay/ADMS-MicroServices.git]
