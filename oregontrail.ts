(function () {
    //added this from MDN documentation for use later
    function getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    /*
    * Interfaces
    */

    //interface describing what attributes and methods a traveler should have


    interface ITraveler {
        food: number;
        name: string;
        isHealthy: boolean;
        //when implemented, There should be 50% chance to increase the traveler's food by 100.
        //return the travelers new food value

        hunt(): number;


        //when implemented, we should check to see if the traveler has a food supply of 20
        //If they do then we should consume 20 of the available food supply
        //If they don't have 20 food then we should change isHealthy to false
        //return the travelers health after attempting to eat
        eat(): boolean;

    }



    //interface describing attributes and methods a wagon should have
    interface IWagon {
        capacity: number;
        passengerArray: Traveler[];

        //when implemented, we should add the traveler to the wagon if the capacity permits
        //this function should return the string "added" on success and "sorry" on failure
        addPassenger(traveler: Traveler): string;

        //this should return true if there is at least one unhealthy person in the wagon
        //if everyone is healthy false should be returned
        isQuarantined(): boolean;

        //Return the total amount of food among all passengers of the wagon.
        getFood(): number;

    }

    /*
    * Classes
    */

    //The traveler class that implements the ITraveler interface
    //This is currently in violation of its contract with the interface. 
    //Create the code required to satisfy the contract with the interface
    class Traveler implements ITraveler {
        food: number;
        name: string;
        isHealthy: boolean;


        constructor(food: number, name: string, isHealthy: boolean) {
            this.food = food;
            this.name = name;
            this.isHealthy = isHealthy;
        }

        hunt(): number {
            //50% change for a successful hunt
            //if successful add 100 to the food
            if (Math.random() > .5) {
                this.food += 100
            }
            //return the travelers food
            return this.food
        }
        eat(): boolean {
            //If we have 20 food, let's eat!
            if (this.food <= 20) {
                this.food -= 20; //this is the same thing as this.food = this.food - 20
            } else {
                //not enough good, you're dying
                this.isHealthy = false;
            }
            //return how healthy I am
            return this.isHealthy //need to use "this" becuase it's referring to the class we're in.
        };

    }

    //The wagon class that implements the IWagon interface
    //This is currently in violation of its contract with the interface.
    //Create the code required to satisfy the contract with the interface 

    class Wagon implements IWagon {
        capacity: number;
        passengerArray: Traveler[] = [];

        constructor(capacity: number) {
            this.capacity = capacity;
        }


        addPassenger(traveler: Traveler): string {
            if (this.passengerArray.length < this.capacity) { //if capacity is higher than number of passengers, then there is room in the wagon for more.
                this.passengerArray.push(traveler) //add another passenger to the array
                return "added";
            }
            return "sorry";
        }

        isQuarantined(): boolean {
            for (let i = 0; i < this.passengerArray.length; i++) { //loop over each passenger
                if (this.passengerArray[i].isHealthy == false) {//if it loops and finds a passenger where isHealthy = false, they are sick and need to return true. Can also write as (!this.passengerArray[i].isHealthy)
                    return true;
                }
            }
            return false; //if we made it here we are all good - the wagon can go.
        }


        getFood(): number {
            let totalFood = 0; //start at zero so that you can start adding up all the food from each passenger
            for (let i = 0; i < this.passengerArray.length; i++) {
                totalFood = totalFood + this.passengerArray[i].food;
            }
            return totalFood;
        }
    }


    // *Play the game

    // * Create 5 healthy travelers object with a random amount of food between 0 and 100 (inclusive)
    //use the getRandonIntInclusive function that we defined at the beginning of this file.
    //could also go above in the constructor and set your boolean = true as default, then remove from the variables below. Leaving it as-is for clarity.

    let traveler1 = new Traveler(getRandomIntInclusive(0, 100), "Leonard", true);
    let traveler2 = new Traveler(getRandomIntInclusive(0, 100), "Evelyn", true);
    let traveler3 = new Traveler(getRandomIntInclusive(0, 100), "Susan", true);
    let traveler4 = new Traveler(getRandomIntInclusive(0, 100), "George", true);
    let traveler5 = new Traveler(getRandomIntInclusive(0, 100), "Alice", true);


    // * Create wagon with an empty passenger list and a capacity of 4.

    let wagon = new Wagon(4);

    // * Make 3 of 5 the travelers eat by calling their eat methods

    console.log(traveler1.eat());
    console.log(traveler3.eat());
    console.log(traveler4.eat());


    // * Make the remaining 2 travelers hunt

    console.log(traveler2.hunt());
    console.log(traveler5.hunt());

    // * Create an array of your travelers, loop over the array of travelers and give each traveler a 50% chance
    // * of attempting to be being added to the wagon using the wagons addPassenger method.

    let travelers = [traveler1, traveler2, traveler3, traveler4, traveler5]
    travelers.forEach(traveler => {  //can also be written as: travelers.forEach(function(traveler, index) {
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

