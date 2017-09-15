(function () {
    //added this from MDN documentation for use later
    function getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    /*
    * Classes
    */
    //The traveler class that implements the ITraveler interface
    //This is currently in violation of its contract with the interface. 
    //Create the code required to satisfy the contract with the interface
    var Traveler = /** @class */ (function () {
        function Traveler(food, name, isHealthy) {
            this.food = food;
            this.name = name;
            this.isHealthy = isHealthy;
        }
        Traveler.prototype.hunt = function () {
            //50% change for a successful hunt
            //if successful add 100 to the food
            if (Math.random() > .5) {
                this.food += 100;
            }
            //return the travelers food
            return this.food;
        };
        Traveler.prototype.eat = function () {
            //If we have 20 food, let's eat!
            if (this.food <= 20) {
                this.food -= 20; //this is the same thing as this.food = this.food - 20
            }
            else {
                //not enough good, you're dying
                this.isHealthy = false;
            }
            //return how healthy I am
            return this.isHealthy; //need to use "this" becuase it's referring to the class we're in.
        };
        ;
        return Traveler;
    }());
    //The wagon class that implements the IWagon interface
    //This is currently in violation of its contract with the interface.
    //Create the code required to satisfy the contract with the interface 
    var Wagon = /** @class */ (function () {
        function Wagon(capacity) {
            this.passengerArray = [];
            this.capacity = capacity;
        }
        Wagon.prototype.addPassenger = function (traveler) {
            if (this.passengerArray.length < this.capacity) {
                this.passengerArray.push(traveler); //add another passenger to the array
                return "added";
            }
            return "sorry";
        };
        Wagon.prototype.isQuarantined = function () {
            for (var i = 0; i < this.passengerArray.length; i++) {
                if (this.passengerArray[i].isHealthy == false) {
                    return true;
                }
            }
            return false; //if we made it here we are all good - the wagon can go.
        };
        Wagon.prototype.getFood = function () {
            var totalFood = 0; //start at zero so that you can start adding up all the food from each passenger
            for (var i = 0; i < this.passengerArray.length; i++) {
                totalFood = totalFood + this.passengerArray[i].food;
            }
            return totalFood;
        };
        return Wagon;
    }());
    // *Play the game
    // * Create 5 healthy travelers object with a random amount of food between 0 and 100 (inclusive)
    //use the getRandonIntInclusive function that we defined at the beginning of this file.
    //could also go above in the constructor and set your boolean = true as default, then remove from the variables below. Leaving it as-is for clarity.
    var traveler1 = new Traveler(getRandomIntInclusive(0, 100), "Leonard", true);
    var traveler2 = new Traveler(getRandomIntInclusive(0, 100), "Evelyn", true);
    var traveler3 = new Traveler(getRandomIntInclusive(0, 100), "Susan", true);
    var traveler4 = new Traveler(getRandomIntInclusive(0, 100), "George", true);
    var traveler5 = new Traveler(getRandomIntInclusive(0, 100), "Alice", true);
    // * Create wagon with an empty passenger list and a capacity of 4.
    var wagon = new Wagon(4);
    // * Make 3 of 5 the travelers eat by calling their eat methods
    console.log(traveler1.eat());
    console.log(traveler3.eat());
    console.log(traveler4.eat());
    // * Make the remaining 2 travelers hunt
    console.log(traveler2.hunt());
    console.log(traveler5.hunt());
    // * Create an array of your travelers, loop over the array of travelers and give each traveler a 50% chance
    // * of attempting to be being added to the wagon using the wagons addPassenger method.
    var travelers = [traveler1, traveler2, traveler3, traveler4, traveler5];
    travelers.forEach(function (traveler) {
        if (Math.random() < .5) {
            console.log(wagon.addPassenger(traveler));
        }
    });
    // * Run the isQuarantined method for the wagon
    console.log(wagon.isQuarantined());
    // * Run the getFood method for the wagon
    console.log(wagon.getFood());
    // *
    // * the return values of all the methods should be displayed in the console using console.log()
    // * the console.log statements should not live inside any methods on the objects 
    // *
})();
