class ScenesManager extends PIXI.Application{
    static scenes = {}; 
    static currentScene;
    static renderer;

    static ratio = 1;
    static defaultWidth;
    static defaultHeight;
    static width;
    static height;

    static create(width, height) {
        const options = {
            width: width,
            height: height,
            backgroundColor: 0x112233
        };

        if (ScenesManager.renderer) return this;
        this.defaultWidth = ScenesManager.width = width;
        this.defaultHeight = ScenesManager.height = height;

        ScenesManager.renderer = new PIXI.Renderer(options);
        document.body.appendChild(ScenesManager.renderer.view);
        this.ticker = new PIXI.Ticker();
        this.ticker.add(ScenesManager.loop);
        this.ticker.start();
        return this;
    }
    static loop() {
        if (!ScenesManager.currentScene || ScenesManager.currentScene.isPaused()) return;
        ScenesManager.currentScene.update();
        ScenesManager.renderer.render(ScenesManager.currentScene);
    }


    static createScene(id){
        if (ScenesManager.scenes[id]) return undefined;
        let scene;
        switch (id) {
            case "game":
            {
                scene = new GameScene();
            }
            break;
            case "intro":
            {
                scene = new IntroScene();
            }
            break;
            case "menu":
            {
                scene = new MenuScene();
            }
            break;

            case "gameOver":
            {
                scene = new GameOverScene();
            }
                break;
        }
        ScenesManager.scenes[id] = scene;
        return scene;
    }

    static goToScene(id) {

        if (this.scenes[id]) {
            if (this.currentScene) this.currentScene.pause();
            this.currentScene = this.scenes[id];
            this.currentScene.resume();
            return true;
        }
        return false;
    }
}