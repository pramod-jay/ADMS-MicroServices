# ADMS-MicroServices
This repository contains the implementation of a microservices architecture for the IN3400-Advanced Database Management System course assignment. The goal of this assignment is to design and develop three microservices that collectively demonstrate advanced database management concepts through a distributed application.

<!-- ABOUT THE PROJECT -->
## About The Project
This project was implemented to get an understanding of Microservices. ADMS-Microservices includes three microservices naming user management, order placement and inventory management. The ultimate goal is to place an order for a particular user based on the items available in the inventory. Apart from that each microservice has basic operations of CREATE, UPDATE, VIEW and DELETE.


### Build With
The project is implemented using the following frameworks and Databases
* ![Node.js 18.12](https://img.shields.io/badge/Node.js-18.12-brightgreen)
* ![Express.js 4.17](https://img.shields.io/badge/Express.js-4.17-brightgreen)
* ![MySQL 8.0](https://img.shields.io/badge/MySQL-8.0-blue)
* ![PostgreSQL 15.0](https://img.shields.io/badge/PostgreSQL-15.0-blue)
* ![MongoDB 7.0](https://img.shields.io/badge/MongoDB-7.0-green)

All three databases are hosted in Microsoft Azure. PostgreSQL (OrderDB) is hosted in "Azure Database for PostgreSQL flexible server", MySQL (UserDB) in "Azure Database for MySQL flexible server" and MongoDB (InventoryDB) in "Azure Cosmos DB for MongoDB account”. All three databases are included in the resource group named ‘Vikings’ (group name).

[![Azure](https://img.shields.io/badge/Azure-0078D4?style=for-the-badge&logo=microsoft-azure)](https://azure.com) [![Azure MySQL](https://img.shields.io/badge/Azure%20MySQL-0078D4?style=for-the-badge&logo=azure-mysql)](https://azure.microsoft.com/en-us/services/mysql/) [![Azure PostgreSQL](https://img.shields.io/badge/Azure%20PostgreSQL-0078D4?style=for-the-badge&logo=azure-postgresql)](https://azure.microsoft.com/en-us/services/postgresql/) [![Azure Cosmos DB](https://img.shields.io/badge/Azure%20Cosmos%20DB-0078D4?style=for-the-badge&logo=azure-cosmosdb)](https://azure.microsoft.com/en-us/services/cosmos-db/)




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
Completion of successful cloning will result in the ADMS-MicroServices project with the following folders and files.
<img width="330" alt="Screenshot 2023-09-13 at 19 48 17" src="https://github.com/pramod-jay/ADMS-MicroServices/assets/91390000/b950e979-3714-41d5-9cd9-203da1bbbf8c">

2. Install NPM packages for each Gateway, Inventory, Order and User folder
   ```sh
   npm install
   ```
3. Run the servers 
    ```sh
   npm start
   ```

_P.S.: Installation of node modules will be necessary at the initial stage, and it will only require ‘npm start’ command for the rest of the testing._

### Setting up Postman for testing [![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman)](https://www.postman.com/)
1. Import "ADMS Microservices.postman_collection.json" JSON file via postman app.
Successful completion of importing will result in the ‘ADMS Microservices’ folder.
<img width="279" alt="Screenshot 2023-09-13 at 19 34 14" src="https://github.com/pramod-jay/ADMS-MicroServices/assets/91390000/b857c84e-6235-4cf0-b152-c3f204513db1">

2. Ready for testing.

## Contact
##### Group Name: Vikings

#### Contributors
[![Pramod Jayathilaka](https://img.shields.io/badge/Pramod%20Jayathilaka-0077B5?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/pramod-jayathilaka-b57178137/)
[![Nathali Fernando](https://img.shields.io/badge/Nathali%20Fernando-0077B5?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/nathali-fernando-69aa74248/)
[![Shenal Goonawardena](https://img.shields.io/badge/Shenal%20Goonawardena-0077B5?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/shenalwgoonewardena/)
[![Lasantha Weerasinghe](https://img.shields.io/badge/Lasantha%20Weerasinghe-0077B5?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/lasantha-pradeep-b33939223/)
[![Buddima Dissanayake](https://img.shields.io/badge/Buddima%20Dissanayake-0077B5?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/buddima-eranga-175381266/)


[![GitHub](https://img.shields.io/badge/GitHub-Repository-blue?style=for-the-badge&logo=github)](https://github.com/pramod-jay/ADMS-MicroServices.git)
