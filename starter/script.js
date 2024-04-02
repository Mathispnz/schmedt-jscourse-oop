'use strict';

console.log('--------------- Constructor functions -------------');

// // // // OOP - Constructor | Prototype
// // // const Person = function(firstName, birthYear) {
// // //     // Propriétés d'instance du constructeur
// // //     this.firstName = firstName;
// // //     this.birthYear = birthYear;

// // //     // Ne jamais créer de méthode dans un constructeur pour ne pas rappeler cette fonction à chaque instanciation de l'objet
// // //         // this.calcAge = function() {
// // //         //     console.log(2037 - this.birthYear);
// // //         // }
// // // }

// // // // Explication des étapes d'exécution de la fonction: 
// // // // https://fr.javascript.info/constructor-new 

// // // const jonas = new Person('Jonas', 1991);
// // // console.log(jonas);

// // // // Static methods
// // // Person.hey = function() {
// // //     console.log('Hey there 😜');
// // // }
// // // Person.hey();

// // // // Prototypes
// // // Person.prototype.calcAge = function() {
// // //     console.log(2037 - this.birthYear);
// // // }

// // // jonas.calcAge();

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

// Héritage entre les classes: fonction constructeurs

const Person = function(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
};

Person.prototype.calcAge = function() {
    console.log(2037 - this.birthYear);
};

const Student = function(firstName, birthYear, course) {
    Person.call(this, firstName, birthYear);
    this.course = course;
};

// Liaison des prototypes
Student.prototype = Object.create(Person.prototype);

Student.prototype.introduce = function() {
    console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const mike = new Student('Mike', 2020, 'Computer Science');
mike.introduce();
mike.calcAge();

// -------------------------------------------
// Coding challenge #3
const EV = function(make, speed, charge) {
    Car.call(this, make, speed);
    this.charge = charge;
}

// Link
EV.prototype = Object.create(Car.prototype);
EV.prototype.chargeBattery = function(chargeTo) {
    this.charge = chargeTo;
    console.log(`Battery is at ${this.charge}%`);
}
EV.prototype.accelerate = function() {
    this.speed += 20;
    this.charge--;
    console.log(`${this.make} going at ${this.speed}km/h, with a charge of ${this.charge}%`);
};

const tesla = new EV('Tesla', 120, 23);
tesla.accelerate();
tesla.brake();
tesla.chargeBattery(50);

// ES6 Classes -------------------------------------------------
// class expression
// const PersonCl = class {} // classes are still function even if we use the word class
console.log('---------- ES6 Classes --------------');

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

class StudentCl extends PersonCl {
    constructor(firstName, birthYear, course) {
        // Appel à la super fonction doit survenir en premier parce qu'elle instancie le mot clé this dans la classe actuelle
        super(firstName, birthYear);
        this.course = course;
    }

    introduce() {
        console.log(`My name is ${this.firstName} and I study ${this.course}`);
    }

    calcAge() {
        console.log(`I'm ${2037 - this.birthYear} years old, but as a student I feel more like ${2037 - this.birthYear + 10}`);
    }
}

const martha = new StudentCl('Martha Jones', 2012, 'Computer Science');
martha.introduce();
martha.calcAge();

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

// -----------------------------------------------------
// Object.create
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

const StudentProto = Object.create(PersonProto);
StudentProto.init = function(firstName, birthYear, course) {
    PersonProto.init.call(this, firstName, birthYear);
    this.course = course;
}

StudentProto.introduce = function() {
    console.log(`My name is ${this.firstName} and I study ${this.course}`);
}

const jay = Object.create(StudentProto);
jay.init('Jay', 2010, 'Computer Science');
jay.introduce();
jay.calcAge();

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
        return this;
    }

    get speedUS() {
        return (this.speed / 1.6);
    }

    set speedUS(speed) {
        this.speed = speed * 1.6;
    }
}

// Another class (special properties and methods)
// Public fields
// Private fields
// Public methods
// Private methods
// (there is also the static version)
// MDN https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Classes/Private_properties#voir_aussi

class Account {
    // Public fields (instances)
    locale = navigator.language;
    
    // Private fields
    #movements = [];
    #pin;

    constructor(owner, currency, pin) {
        this.owner = owner;
        this.currency = currency;
        // Propriétés protégées (et non privées)
        this.#pin = pin;
        // this._movements = [];
        // this.locale = navigator.language;

        console.log(`Thanks for opening an account, ${owner} !`);
    }

    // Ceci est une 'public interface' de l'objet Account, donc une API créée
    deposit(val) {
        this.#movements.push(val);
        return this;
    }

    withdraw(val) {
        this.deposit(-val);
        return this;
    }

    requestLoan(val) {
        if(this.#approveLoan(val)) {
            this.deposit(val);
            console.log(`Loan approved`);
            return this;
        }
    }

    // Private methods
    #approveLoan(val) {
        return true;
    }
}

const acc1 = new Account('Mathis', 'EUR', 1111);
acc1.deposit(250);
acc1.withdraw(140);
console.log(acc1);

// Chaining methods
// returning 'this' make the methods chainable
acc1.deposit(300).deposit(500).withdraw(35);
console.log(acc1);

// Coding challenge #4
class EVcl extends CarCl {
    #charge;

    constructor(make, speed, charge) {
        super(make, speed);
        this.#charge = charge;
    }

    chargeBattery(chargeTo) {
        this.#charge = chargeTo;
        console.log(`Battery is at ${this.#charge}%`);
        return this;
    }

    accelerate() {
        this.speed += 20;
        this.#charge--;
        console.log(`${this.make} going at ${this.speed}km/h, with a charge of ${this.#charge}%`);
        return this;
    }
}

const Rivian = new EVcl('Rivian', 120, 23);
Rivian.accelerate().chargeBattery(50).brake();