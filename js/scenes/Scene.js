class Scene extends PIXI.Sprite {
    _this;
    state = SceneStates.NONE;
    updateCB = function () { };

    constructor(background) {
        super(background);
        this._this = this;
        this.state = SceneStates.NONE;

    }
    onUpdate(updateCB ) {
        this.updateCB = updateCB;
    }

     update() {
        this.updateCB();
    }
    pause() {
        this.state = SceneStates.PAUSED;
    }
    resume() {
        this.state = SceneStates.NONE;
    }
    isPaused() {
        return this.state === SceneStates.PAUSED;
    }

}