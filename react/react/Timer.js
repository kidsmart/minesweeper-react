class Timer {
    constructor(callback) {
        this.seconds = 0;
        this.idInterval = 0;
        this.isPlaying = false;
        this.callback = callback;
        this.addSecond = this.addSecond.bind(this);
    }
    run() {
        if (this.isPlaying) return;
        this.idInterval = setInterval(this.addSecond, 1000);
        this.isPlaying = true;
    }
    addSecond() {
        this.seconds++;
        this.callback();
    }
    pause() {
        console.log(this);
        clearInterval(this.idInterval);
        this.isPlaying = false;
    }
    getSeconds() {
        return this.seconds;
    }
}
module.exports = Timer;
