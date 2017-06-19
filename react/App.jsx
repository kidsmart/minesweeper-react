import React from "react";
import ReactDOM from "react-dom";
import Game from "./Game";
import Timer from "./Timer";
class Minesweeper extends React.Component {

    constructor() {
        super();
        this.game = new Game(7);


        this.updateSeconds = this.updateSeconds.bind(this);
        this.newGame = this.newGame.bind(this);

        this.timer = new Timer(this.updateSeconds);
        this.state = {
            gameState: this.game.getState(),
            isAlive: this.game.isAlive(),
            hasWon: this.game.hasWon(),
            hasEnded: this.game.hasEnded(),
            seconds: this.timer.getSeconds()
        }

    }
    getClass(data) {
        if (data == -1) return "closed";
        if (data == -2) return "bomb";
        if (data == -3) return "freezed";
        if (data >= 0) return "";
    }
    getInfo(data){
        if (data > 0) return data.toString();
        else return "";
    }
    updateSeconds() {
        this.setState({seconds:this.timer.getSeconds()});
    }
    updateState() {
        this.setState({
            gameState: this.game.getState(),
            isAlive: this.game.isAlive(),
            hasWon: this.game.hasWon(),
            hasEnded: this.game.hasEnded(),
            seconds: this.timer.getSeconds()
        },()=>{
            if (this.state.hasEnded)
                this.timer.pause();
        });

    }
    renderEnd() {
        return (
            <div>
                {this.state.hasWon && "You won!"}
                {!this.state.isAlive && "You lost!"}
                <button onClick={this.newGame}>Play again</button>
            </div>
        );
    }
    newGame() {
        this.game = new Game(7);
        this.timer = new Timer(this.updateSeconds);
        this.updateState();
    }
    renderRow(row, i){
        let divRow = [];

        for (let j = 0; j < row.length; j++) {
            let data = row[j];
            divRow.push(
                <div className={
                "tile "+this.getClass(row[j])}
               onClick={e=>{
                   if (this.state.hasEnded)return;
                   this.timer.run();
                   let x = i;
                   let y = j;
                   if (data == -3) {
                       return;
                   }
                   this.game.open({x,y});
                   this.updateState();
               }}
               onContextMenu={e=>{
                   e.preventDefault();
                   if (this.state.hasEnded)return;
                   this.timer.run();
                   let x = i, y = j;
                   if (data >= 0) {
                       //console.log(data);
                       //console.log("53");
                       return;
                   }
                   this.game.toggleSelect({x,y});
                   this.updateState();
               }}>
           <div>{this.getInfo(data)}</div>
           </div>)
        }
        return (
            <div className="row">
                {divRow}
            </div>
        );
    }
    render() {
        let table = [];
        this.state.gameState.forEach((row,i)=>{
            table.push(this.renderRow(row,i));
        });
        return (
            <div>
                <div>
                    <h2>Minesweeper</h2>
                    <h3>{this.state.seconds}</h3>
                </div>
                <div className="table">{table}</div>
                {this.state.hasEnded && this.renderEnd()}

            </div>
        );
    }

}

ReactDOM.render(<Minesweeper />, document.getElementById('app'))
