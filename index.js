// STATE MACHINE
const machine = {
    state: "SOBER",
    transitions: {
        SOBER: {
            drink: function (beverage, second) {
                console.log("Current state", this.state);
                console.log("\t drinking", beverage.type);
                if (beverage.type == "alcohol") {
                    console.log("\tAdios inhibitions!");
                    this.changeState("DRUNK");
                } else {
                    console.log("\tThat quenched my thirst!");
                }
            }
        },
        DRUNK: {
            drink: function (beverage) {
                console.log("current state", this.state);
                console.log("\tdrinking", beverage.type);
                if (beverage.type == "alcohol") {
                    console.log("\tAdios pants!");
                    this.changeState("REALLY_DRUNK");
                } else {
                    console.log("\tI said what?");
                    this.changeState("SOBER");
                }
            }
        },
        REALLY_DRUNK: {
            drink: function (beverage) {
                console.log("current state", this.state);
                console.log("\tdrinking ", beverage.type);
                if (beverage.type == "alcohol") {
                    let dice = Math.floor(Math.random() * 2); // 0 or 1
                    if (dice) {
                        this.dispatch("throwup", {});
                    } else {
                        this.dispatch("passout", {});
                    }
                } else {
                    this.changeState("DRUNK");
                }
            },
            passout: function () {
                console.log('Passing out. Zzzzzzzzzzzzzzzz');
                this.changeState("ASLEEP");
            },
            throwup: function () {
                console.log("Blaaaaaah...");
                this.dispatch("passout", {});
            }
        },
        ASLEEP: {
            wake: function () {
                console.log("Current state:", this.state);
                console.log("Waking up...");
                this.changeState("HUNGOVER");
            }
        },
        HANGOVER: {
            openeyes: function () {
                console.log("Current state:", this.state);
                console.log("Turn off the sun please ... ");
            },
            drink: function (beverage) {
                console.log("Current state", this.state);
                console.log("\t drinking", beverage.type);
                if (beverage.type === "alcohol") {
                    console.log("\t Is it never again yet?");
                    this.changeState("DRUNK");
                } else {
                    console.log("\t Never again");
                    this.changeState("SOBER");
                }
            }
        }
    },
    dispatch(actionName, ...payload) {
        const actions = this.transitions[this.state];
        const action = actions[actionName];

        if (action) {
            action.apply(machine, ...payload);
        } else {
            console.log('Not valid action');
        }
    },
    changeState(newState) {
        this.state = newState;
    }
};

let machineInstance = Object.create(machine, {
    name: {
        writable: false,
        enumerable: true,
        value: "Jeff"
    }
});

// console.log('Hello world');

machineInstance.dispatch("drink", [{ type: "alcohol" }, "Jeff"]);
machineInstance.dispatch("drink", [{ type: "alcohol" }, "Jeff"]);
machineInstance.dispatch("drink", [{ type: "alcohol" }, "Jeff"]);
machineInstance.dispatch("wake");

console.log('Machine instance: ', machineInstance);   // prikazuje samo  instancu koja je kreirana sa name-om
console.log('Current state: ', machineInstance.state); // trenutno stanje
console.log('Transitions: ', machineInstance.transitions); // sve tranzicije