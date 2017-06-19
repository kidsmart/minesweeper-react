const Table = require("./Table");
class Game {
    constructor(n) {
        this.table = new Table(n);
        this.alive = true;
    }
    open(obj) {
        this.table.open(obj);
        if (!this.table.isEmpty(obj)) {
            this.alive = false;
            this.table.openAll();
        } else if (this.table.getTileState(obj) === 0) {
            this.openNeighbors(obj);
        }
    }
    toggleSelect(obj){
        this.table.toggleSelect(obj);
        if (this.hasEnded()) this.table.openAll();
    }
    hasWon() {
        return this.table.hasWon();
    }
    hasEnded() {
        return this.hasWon() || !this.isAlive();
    }
    openNeighbors(obj) {
        for (let i = 0; i < this.table.offsets.length; i++) {
            let newPos = {
                x: obj.x + this.table.offsets[i].x,
                y: obj.y + this.table.offsets[i].y
            }

            if (this.table.checkBoundaries(newPos) &&
                    !this.table.isOpened(newPos) &&
                    this.table.isEmpty(newPos)) {

                this.table.open(newPos);
                if (this.table.numberOfBombNeighbors(newPos)==0) {
                    this.openNeighbors(newPos);
                }

            }
        }
    }
    isAlive() {
        return this.alive;
    }
    getState() {
        return this.table.getTilesState();
    }

}
module.exports = Game;
