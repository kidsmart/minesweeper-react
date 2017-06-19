class Tile {
    constructor(){
        this.empty = true;
        this.opened = false;
        this.selected = false;
    }
    isEmpty() {
        return this.empty;
    }
    fill() {
        this.empty = false;
    }
    empty() {
        this.empty = true;
    }
    open() {
        this.opened = true;
    }
    isOpen() {
        return this.opened;
    }
    isSelected() {
        return this.selected;
    }
    select() {
        this.selected = true;
    }
    deselect(){
        this.selected = false;
    }
    toggleSelect() {
        this.selected = !this.selected;
    }
}
module.exports = Tile;
