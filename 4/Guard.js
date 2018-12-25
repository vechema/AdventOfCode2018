class Guard {
    constructor(id) {
      this.id = id;
      this.logs = []
    }
    addLog(log) {
        this.logs.push(log)
    }

    getLogs() {
        return this.logs
    }

    getId() {
        return this.id
    }
}

class Log {
    constructor(log) {
        this.log = log
    }

    guardId() {
        let id = this.log.split(" ")[3]
        id = id.substring(1, id.length)
        if (isNaN(id)) {
            return -1;
        } else {
            return parseInt(id)
        }
    }

    isSleep() {
        return this.log.includes("falls")
    }

    isWake() {
        return this.log.includes("wakes")
    }
}

const fs = require('fs') 

var input = fs.readFileSync('input.txt', 'utf8')
var inputs = input.split("\r\n");

inputs.sort()
//console.log(inputs)

let guardId = -1;
let guards = new Map();
let guard = undefined
// Creating guard objects with all their logs
for(let i = 0; i < inputs.length; i++) {
    let log = new Log(inputs[i])
    
    // New guard coming on shift
    if (log.guardId() >= 0) {
        let guardId = log.guardId()
        if (guards.get(guardId) == undefined) {
            guard = new Guard(guardId)
            guards.set(guardId, guard)
        } else {
            guard = guards.get(guardId)
        }
    }
    //console.log(log)
    guard.addLog(log)
}

// Go through each guard, see how much each slept
for (let [k, v] of guards) {
    console.log(k, v);
}