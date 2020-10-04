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
            ScenesManager.goToScene(GameScenes.MENU_SCENE);//SceneNames config
        }
    }


    show() {
        this.button = new PIXI.Sprite(AssetsManager.getTexture(GameTexures.SCORES_ASSET));//texture names config
        this.button.anchor.x = GameSettings.SPRITE_ANCHOR_X;
        this.button.anchor.y = GameSettings.SPRITE_ANCHOR_Y;

        this.button.position.x = ScenesManager.defaultWidth * GameSettings.BUTTON_LEFT_MULTIPLIER;
        this.button.position.y = ScenesManager.defaultHeight * GameSettings.BUTTON_TOP_MULTIPLIER;

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
