class GameOverScene extends Scene {

    button;
    constructor() {
        super();
    }

    _registerEvents() {
        const _this = this;
        this.button.mousedown = this.button.touchstart = function (data) {
            if (_this.isPaused()) return;

            this.isdown = true;
            this.scale.x = this.scale.y = 1;
        };

        this.button.mouseup = this.button.touchend = function (data) {
            if (_this.isPaused()) return;

            this.isdown = false;

           if (this.isOver) {
               this.scale.x = this.scale.y = 1.2;
            }
            else {
               this.scale.x = this.scale.y = 1;
            }
        };

        this.button.mouseover = function (data) {
            if (_this.isPaused()) return;

            this.isOver = true;

            if (this.isdown) return;

            this.scale.x = this.scale.y = 1.2;
        };

        this.button.mouseout = function (data) {
            if (_this.isPaused()) return;

            this.isOver = false;
            if (this.isdown) return;
            this.scale.x = this.scale.y = 1;
        };

        this.button.click = this.button.tap = function (data) {
            if (_this.isPaused()) return;
            _this.state = SceneStates.PAUSED;
            ScenesManager.goToScene('menu');
        }
    }


    show() {
        this.button = new PIXI.Sprite(AssetsManager.getTexture("scores"));
        this.button.anchor.x = 0.5;
        this.button.anchor.y = 0.5;

        this.button.position.x = ScenesManager.defaultWidth / 2;
        this.button.position.y = ScenesManager.defaultHeight * 0.7;

        this.button.interactive = true;
        this.button.buttonMode = true;

        this._registerEvents();

        this.addChild(this.button);

        this.interactive = true;
        this.state = SceneStates.READY;
    }


    update() {
        switch (this.state) {
            case SceneStates.NONE:
                this.state = SceneStates.PRE_INIT;
                this.show();
                break;
        }
    }

    resume() {
        super.resume();
    }
}