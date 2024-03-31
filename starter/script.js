'use strict';

// OOP - Constructor | Prototype
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

// Static methods
Person.hey = function() {
    console.log('Hey there 😜');
}
Person.hey();

// Prototypes
Person.prototype.calcAge = function() {
    console.log(2037 - this.birthYear);
}

jonas.calcAge();

// -----------------------------------------------------
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


// ES6 Classes -------------------------------------------------
// class expression
// const PersonCl = class {} // classes are still function even if we use the word class


// class declaration
class PersonCl {
    constructor(firstName, birthYear) {
        this.firstName = firstName;
        this.birthYear = birthYear;
    }

    // Instance methods
    // Methods added to the prototype property
    calcAge() {
        console.log(2037 - this.birthYear);
    }

    // Get/set
    get age() {
        return 2037 - this.birthYear;
    }

    // Static method
    static hey() {
        console.log('Hey there');
    }
}

const jessica = new PersonCl('Jessica', 1996);
console.log(jessica);
jessica.calcAge();

console.log(jessica.__proto__ === PersonCl.prototype);

PersonCl.hey();

// Getters and setters
const account = {
    owner: 'Jonas',
    movements: [200, 530, 120, 300],

    get latest() {
        return this.movements.slice(-1).pop()
    },

    set latest(mov) {
        this.movements.push(mov);
    }
}

console.log(account.latest);

account.latest = 50;
console.log(account.movements);

// Object.create
// -----------------------------
const PersonProto = {
    calcAge() {
        console.log(2037 - this.birthYear);
    },

    init(firstName, birthYear) {
        this.firstName = firstName;
        this.birthYear = birthYear;
    }
};

const steven = Object.create(PersonProto);
steven.init('Steven', 2002);
console.log(steven);

// ----------------------------------------------------
// Coding challenge #2
class CarCl {
    constructor(make, speed) {
        this.make = make,
        this.speed = speed
    }

    accelerate() {
        this.speed += 10;
        console.log(this.speed);
    }

    brake() {
        this.speed -= 5;
        console.log(this.speed);
    }

    get speedUS() {
        return (this.speed / 1.6);
    }

    set speedUS(speed) {
        
    }
}