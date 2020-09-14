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
        const explosion = new PIXI.AnimatedSprite(AssetsManager.instance[`${id}Frames`]);
        explosion.x =   animX;
        explosion.y =   animY;
        explosion.anchor.set(0.5);
        scene.addChild(explosion);
        explosion.animationSpeed = 0.5;
        explosion.gotoAndPlay(1);
        explosion.loop = false;
        explosion.zIndex = 100000;
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