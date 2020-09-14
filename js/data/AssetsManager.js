class AssetsManager {
    progress = 0;
    counter = 0;
    loadedCallback;
    loader;
    levels;
    explodeFrames;
    smallExplodeFrames;
    constructor(){
        if(! AssetsManager.instance){
            AssetsManager.instance = this;
        }
        return AssetsManager.instance;
    }

    loadAssets(callback)
    {
        this.loadedCallback = callback;
        this.loader = new PIXI.Loader();
        this.loader.add('button','assets/button.png')
            .add('scores','assets/scores.png')
            .add('appear', 'assets/animation/appear.png')
            //.add('explode', 'assets/animation/explode.png')
            //.add('explode_small', 'assets/animation/explode_small.png')
            .add('explode_small_json', 'assets/animation/explode_small.json')
            .add('eagle','assets/board/eagle.png')
            .add('leaves','assets/board/leaves.png')
            .add('small_wall_1','assets/board/small_wall_1.png')
            .add('small_wall_2','assets/board/small_wall_2.png')
            .add('small_wall_3','assets/board/small_wall_3.png')
            .add('small_wall_4','assets/board/small_wall_4.png')
            .add('wall','assets/board/wall.png')
            .add('water','assets/board/water.png')
            .add('bonus_immortal','assets/bonus/bonus_immortal.png')
            .add('bonus_live','','assets/bonus/bonus_live.png')
            .add('bonus_slow','assets/bonus/bonus_slow.png')
            .add('bonus_speed','assets/bonus/bonus_speed.png')
            .add('bullet','assets/bullet/bullet.png')
            .add('enemy_bullet','assets/bullet/enemy_bullet.png')
            .add('enemy_0','assets/tanks/enemy_0.png')
            .add('enemy_1','assets/tanks/enemy_1.png')
            .add('enemy_2','assets/tanks/enemy_2.png')
            .add('tank','assets/tanks/tank.png')
            .add('levels', 'assets/levels.json')
            .add('explode', 'assets/animation/explode.json')
            .add('shoot_sound', 'assets/sounds/shot.wav')
            .add('lose_sound', 'assets/sounds/lose.wav')
            .add('win_sound', 'assets/sounds/win.wav')
            .add('explode_sound', 'assets/sounds/explode.wav')
            .add('hit_sound', 'assets/sounds/hit.wav')

            .load(this._handleLoadComplete.bind(this))
            .on("progress", this._handleLoadProgress.bind(this, this.loader));
    }

    static getSound(id) {
        return AssetsManager.instance.loader.resources[id];
    }
    static getLevel() {
        let idx = Math.round(Math.random()* AssetsManager.instance.levels.levels.length);
        return AssetsManager.instance.levels.levels[idx % AssetsManager.instance.levels.levels.length];
    }

    static getTexture(id) {
        return AssetsManager.instance.loader.resources[id].texture;
    }

    _handleLoadComplete(loader) {
        AssetsManager.instance.levels = loader.resources.levels.data;
        this.explodeFrames = this._createFrames(16, "explode");
        this.smallExplodeFrames = this._createFrames(8, "");
/*        for (let i = 0; i < 16; i++) {
            this.explodeFrames.push(PIXI.Texture.from(`explode${i+1}.png`));
        }*/

        this.loadedCallback();
    }

    _createFrames(totalFrames, nameTemplate) {
        let frames = [];
        for (let i = 0; i < totalFrames; i++) {
            frames.push(PIXI.Texture.from(nameTemplate + `${i+1}.png`));
        }
        return frames;
    }
    _handleLoadProgress(loader, resource) {
        this.progress = loader.progress /100;
    }

}

const instance = new AssetsManager();
