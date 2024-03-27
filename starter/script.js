'use strict';

const Person = function(firstName, birthYear) {
    // Propriétés d'instance du constructeur
    this.firstName = firstName;
    this.birthYear = birthYear;

    // Ne jamais créer de méthode dans un constructeur pour ne pas rappeler cette fonction à chaque instanciation de l'objet
        // this.calcAge = function() {
        //     console.log(2037 - this.birthYear);
        // }
}

// Explication des étapes d'exécution de la fonction: 
// https://fr.javascript.info/constructor-new 

const jonas = new Person('Jonas', 1991);
console.log(jonas);

// Prototypes
Person.prototype.calcAge = function() {
    console.log(2037 - this.birthYear);
}

jonas.calcAge();

// Coding challenge #1
const Car = function(make, speed) {
    this.make = make;
    this.speed = speed;
}

Car.prototype.accelerate = function() {
    this.speed += 10;
    console.log(this.speed);
}

Car.prototype.brake = function() {
    this.speed -= 5;
    console.log(this.speed);
}

const BMW = new Car('BMW', 120);
const Mercedes = new Car('Mercedes', 95);

BMW.accelerate();
BMW.accelerate();
BMW.accelerate();