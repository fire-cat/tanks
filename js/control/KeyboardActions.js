class KeyboardActions {
    left ;
    up;
    right;
    down;
    space;
    state;
    keyHandler;
    constructor(props) {

        this.left = this.keyboard(GameControls.KEY_LEFT);
        this.up = this.keyboard(GameControls.KEY_UP);
        this.right = this.keyboard(GameControls.KEY_RIGHT);
        this.down = this.keyboard(GameControls.KEY_DOWN);
        this.space = this.keyboard(GameControls.KEY_SPACE);

        this.left.press = () => {
            this.keyHandler(KeyState.LEFT_PRESSED);
        };

        this.up.press = () => {
            this.keyHandler(KeyState.UP_PRESSED);
        };

        this.up.release = () => {
            this.keyHandler(KeyState.KEY_UP);
        };

        this.right.press = () => {
            this.keyHandler(KeyState.RIGHT_PRESSED);
        };

        this.down.press = () => {
            this.keyHandler(KeyState.DOWN_PRESSED);
        };
        this.down.release = () => {
            this.keyHandler(KeyState.KEY_UP);
        };

        this.space.press = () => {
            this.keyHandler(KeyState.SPACE_PRESSED);
        };

        this.space.release = () => {
            //console.log("this.space.release");
        };
    };

    keyboard(keyCode) {
        var key = {};
        key.code = keyCode;
        key.isDown = false;
        key.isUp = true;
        key.press = undefined;
        key.release = undefined;
        key.downHandler = event => {
            if (event.which === key.code) {
                if (key.isUp && key.press) key.press();
                key.isDown = true;
                key.isUp = false;
                this.currentKey = key;
            }
            event.preventDefault();
        };

        key.upHandler = event => {
            if (event.which === key.code) {
                if (key.isDown && key.release) key.release();
                key.isDown = false;
                key.isUp = true;
                this.currentKey = null;
            }
            event.preventDefault();
        };

        window.addEventListener(
            GameEvents.KEYDOWN, key.downHandler.bind(key), false//it would be nice to have "keydown" in key names config
        );
        window.addEventListener(
            GameEvents.KEYUP, key.upHandler.bind(key), false
        );
        return key;
    }
}
