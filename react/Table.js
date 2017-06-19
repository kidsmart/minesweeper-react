const Tile = require("./Tile");

class Table {
    constructor(n){
        this.offsets = [
            {x:-1,y:-1},
            {x:-1,y:0},
            {x:-1,y:1},
            {x:0,y:-1},
            {x:0,y:1},
            {x:1,y:-1},
            {x:1,y:0},
            {x:1,y:1}
        ];
        this.table = [];
        this.n = n;
        for (let i = 0; i < n; i++) {
            let row = [];
            for (var j = 0; j < n; j++) {
                row.push(new Tile());
            }
            this.table.push(row);
        }
        let numberOfBombs = this.calculateNumberOfBombs();
        for (let i = 0; i < numberOfBombs; i++) {
            let x, y;
            do {
                //find empty tile
                x = this.getRandom(0, this.n - 1);
                y = this.getRandom(0, this.n - 1);
            } while (!this.table[x][y].isEmpty());

            this.table[x][y].fill();

        }
        console.log(this.getStateString());
    }

    getStateString() {
        //debug helper
        let s = "";
        for (let i = 0; i < this.n; i++) {
            for (let j = 0; j < this.n; j++) {
                s += (this.table[i][j].isEmpty()) ? "0":"1";
                s += " ";
            }
            s += "\n";
        }
        return s;
    }
    calculateNumberOfBombs() {
        // 25% of bombs
        return Math.floor(this.n * this.n * 0.15);
    }
    getRandom(min, max){
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    open(obj) {
        this.table[obj.x][obj.y].open();
    }
    openAll() {
        for (let i = 0; i < this.n; i++)
            for (let j = 0; j < this.n; j++)
                this.table[i][j].open();
    }
    isOpened(obj) {
        return this.table[obj.x][obj.y].isOpen();
    }
    isEmpty(obj) {
        return this.table[obj.x][obj.y].isEmpty();
    }
    getTilesState() {
        let table = [];
        for (let i = 0; i < this.n; i++) {
            let row = [];
            for (let j = 0; j < this.n; j++) {
                row.push(this.getTileState({x:i,y:j}));
            }
            table.push(row);
        }
        return table;
    }
    toggleSelect(obj) {
        this.table[obj.x][obj.y].toggleSelect();
    }
    getTileState(obj) {

        let tile = this.table[obj.x][obj.y];
        let tileState;


        if (!tile.isOpen()) {
            if (tile.isSelected()) {
                return -3;
            } else {
                return -1;
            }

        } else {
            if (!tile.isEmpty()) {
                return -2;
            } else {
                return this.numberOfBombNeighbors(obj);
            }
        }
    }
    hasWon() {
        let selected = 0;
        let bombs = 0;
        for (let i = 0; i < this.n; i++) {
            for (let j = 0; j < this.n; j++) {
                let tile = this.table[i][j];
                if (!tile.isSelected() && !tile.isEmpty()) {
                    return false;
                }
                if (tile.isSelected())selected++;
                if (!tile.isEmpty())bombs++;
            }
        }
        return selected == bombs;
    }
    numberOfBombNeighbors(obj) {
        let num = 0;
        this.offsets.forEach(offset=>{
            let newPos = {
                x: obj.x + offset.x,
                y: obj.y + offset.y
            }
            if (this.checkBoundaries(newPos) &&
                    !this.table[newPos.x][newPos.y].isEmpty()
                ) num++;
        });
        return num;
    }
    checkBoundaries(obj) {//XXX change name
        return obj.x >= 0 && obj.y >= 0 &&
                obj.x < this.n && obj.y < this.n;
    }

}

module.exports = Table;
