class AnimationManager {
    anination = [];

    constructor() {
        if(! AnimationManager.instance){
            AnimationManager.instance = this;
        }
        return AnimationManager.instance;

    }
    destroy() {
        this.anination.forEach((item) => {
            item.stop();
            item.destroy();
        });
        this.anination = [];
    }
    addAnimation(id, x, y, scene, callback) {
        let animX = x;
        let animY = y;
        const explosion = new PIXI.AnimatedSprite(AssetsManager.instance[`${id}` + GameTexures.ANIMATION_FRAME_SUFFIX]);//Frames to config
        explosion.x =   animX;
        explosion.y =   animY;
        explosion.anchor.set(GameSettings.SPRITE_ANCHOR_X);
        scene.addChild(explosion);
        explosion.animationSpeed = GameSettings.ANIMATION_SPEED;
        explosion.gotoAndPlay(GameSettings.ANIMATION_START_FRAME);
        explosion.loop = false;
        explosion.zIndex = GameSettings.EXPLOSION_ZINDEX;
        explosion.onComplete = function () {
            this.stop();
            this.onComplete = null;
            this.destroy();
            if (callback) {
                callback();
            }
        };
    }

}
