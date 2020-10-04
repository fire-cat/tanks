class SoundManager {
    constructor() {
        if(! SoundManager.instance){
            SoundManager.instance = this;
        }
        return SoundManager.instance;
    }

    static playSound(id, callback) {
        let sound = PIXI.sound.Sound.from(AssetsManager.getSound(`${id}` + GameSounds.SOUND_SUFFIX));//_sound add to class property or config
        sound.onComplete = ()=> {
            if (callback) {
                callback()
            }
        };
        sound.play();
    }
}
