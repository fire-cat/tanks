class IntroScene extends Scene {
     bgPreloader;
     bgPreloaderBar;
     ready = false;
     textureStorage;

     constructor() {
        super();
        this.textureStorage = new AssetsManager();
    }


    show()  {
        let loader = new PIXI.Loader();
        loader.add(GameAssets.PRELOADER,GameAssets.PRELOADER_PATH).add(GameAssets.LOADER_BAR, GameAssets.LOADER_BAR_PATH);
        loader.once('complete', this.onPreloaderLoaded.bind(this, loader.resources));
        loader.load();
    }

    onPreloaderLoaded(res, loader) {
        this.bgPreloader = new PIXI.Sprite(res.preloaderBg.texture);
        this.bgPreloaderBar = new PIXI.Sprite(res.loaderBar.texture);
        this._initPreloader(this.bgPreloader, {ax:GameSettings.SPRITE_ANCHOR_X, ay: GameSettings.SPRITE_ANCHOR_Y,
            x: ScenesManager.defaultWidth / 2, y : ScenesManager.defaultHeight /2});
        this._initPreloader(this.bgPreloaderBar, {ax:0, ay:GameSettings.SPRITE_ANCHOR_Y,
            x: (ScenesManager.defaultWidth - this.bgPreloaderBar.width)/ 2,
            y : ScenesManager.defaultHeight /2});
        this.bgPreloaderBar.scale.x = 0.3;
        this.state = SceneStates.INIT;
    }

    _initPreloader(sprite, settings) {
         this.addChild(sprite);
         sprite.anchor.x = settings.ax;
         sprite.anchor.y = settings.ay;
         sprite.position.x = settings.x;
         sprite.position.y = settings.y;
    }

    loadingCompleted() {
        this.state = SceneStates.READY;
    }
    update() {
        switch (this.state) {
            case SceneStates.NONE:
                this.state = SceneStates.PRE_INIT;
                this.show();
            break;
            case SceneStates.INIT:
               this.textureStorage.loadAssets(this.loadingCompleted.bind(this));
               this.state = SceneStates.LOADING;
            break;

            case SceneStates.LOADING:
                super.update();
                this.bgPreloaderBar.scale.x = this.textureStorage.progress;
            break;
            case SceneStates.READY:
                this.state = SceneStates.PAUSED;
                ScenesManager.goToScene(GameScenes.MENU_SCENE);
            break;
        }
    }
}