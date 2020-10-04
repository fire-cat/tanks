class MenuScene extends Scene {

    button;
    textureButton;
    textureButtonDown;
    textureButtonOver;
    constructor() {
        super();
    }

    _registerEvents() {
        var _this = this;
        this.button.mousedown = this.button.touchstart = function (data) {
            if (_this.isPaused()) return;

            this.isdown = true;
            this.scale.x = this.scale.y = GameButtonEffects.NORMAL_EFFECT;
        };

        this.button.mouseup = this.button.touchend = function (data) {
            if (_this.isPaused()) return;

            this.isdown = false;

           if (this.isOver) {
               this.scale.x = this.scale.y = GameButtonEffects.OVER_EFFECT;
            }
            else {
               this.scale.x = this.scale.y = GameButtonEffects.NORMAL_EFFECT;
            }
        };

        this.button.mouseover = function (data) {
            if (_this.isPaused()) return;

            this.isOver = true;

            if (this.isdown) return;

            this.scale.x = this.scale.y = GameButtonEffects.OVER_EFFECT;
        };

        this.button.mouseout = function (data) {
            if (_this.isPaused()) return;

            this.isOver = false;
            if (this.isdown) return;
            this.scale.x = this.scale.y = GameButtonEffects.NORMAL_EFFECT;
        };

        this.button.click = this.button.tap = function (data) {
            if (_this.isPaused()) return;
            _this.state = SceneStates.PAUSED;
            ScenesManager.goToScene(GameScenes.GAME_SCENE);
        }
    }


    show() {
        this.button = new PIXI.Sprite(AssetsManager.getTexture(GameTexures.BUTTON));
        this.button.anchor.x = GameSettings.SPRITE_ANCHOR_X;
        this.button.anchor.y = GameSettings.SPRITE_ANCHOR_Y;

        this.button.position.x = ScenesManager.defaultWidth * GameSettings.BUTTON_LEFT_MULTIPLIER;
        this.button.position.y = ScenesManager.defaultHeight * GameSettings.BUTTON_TOP_MULTIPLIER;

        this.button.interactive = true;
        this.button.buttonMode = true;

        this._registerEvents();

        this.addChild(this.button);

        this.interactive = true;

        this._addTitle(GameSettings.GAME_TITLE);
    }

    _addTitle(title) {
        let style = new PIXI.TextStyle(GameStyles.TITLE_STYLE);

        let basicText = new PIXI.Text(title, style);
        basicText.anchor.x = GameSettings.SPRITE_ANCHOR_X;
        basicText.anchor.y = GameSettings.SPRITE_ANCHOR_Y;
        basicText.x = ScenesManager.defaultWidth * GameStyles.TITLE_LEFT_MULTIPLIER;
        basicText.y = ScenesManager.defaultHeight * GameStyles.TITLE_TOP_MULTIPLIER;

       this.addChild(basicText);
       this.state = SceneStates.READY;
    }
    resume() {
        switch (this.state) {
            case SceneStates.PAUSED:
                this.state = SceneStates.ACTIVE;
            break;
            default:
                this.state = SceneStates.NONE;
            break;
        }
    }

    update() {
        switch (this.state) {
            case SceneStates.NONE:
                this.state = SceneStates.PRE_INIT;
                this.show();
                break;
        }
    }
}
