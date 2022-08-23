# eCommerce-spring-angular
_The application is an example of a full stack single page e-commerce application. It includes such features as displaying the seller's items, accepting and processing orders, providing customer tracking numbers and receipts, payment systems and more._ <br>

### What's inside
* Maven
* Spring Core
* Spring Data (Hibernate & MySQL)
* Spring MVC (Tomcat)

## Installation
The project is created with Maven, so you just need to import it to your IDE and build the project to resolve the dependencies.
<div />
<div />

## Database configuration 

Create a MySQL database with the name employee_list and add the credentials to /resources/application.properties.
The default ones are :
<div />
<img src="jdbc.png"> 
<div />

## Project structure

<img src="projectStructure.png"  >
<div />


## ER Diagram
<div />
<img src="db.png" >

## Usage 

Run the project through the IDE or run: **mvn spring-boot:run** command in the command line and head out to Postman to check the REST endpoints.


* Create
<div /> 
<img src="createEmployee.png" >

#

* Read 
<div /> 
<img src="getAllEmployees.png" >

#

* Update
<div />  
<img src="update.png" >

#

* Delete
<div />  
<img src="delete.png">
