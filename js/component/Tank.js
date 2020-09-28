class Tank extends GameObject{
    _life;
    _stuckDirection;
    keyboardHandler;
    _updateFunction;
    _bullets;
    _scene;
    _direction = 1; // ["up", "right", "down", "left"]
    animationManager;
    constructor(tnk, type, col, row, scene) {
        super(tnk, type, col, row);
        this._life = 1;
        this._scene = scene;
        this.gameObject = tnk;
        this.animationManager = new AnimationManager();
        //this._bullets = [];
        this.state = TankState.IDLE;
        this.keyboardHandler = new KeyboardActions();
        this.keyboardHandler.keyHandler = (state) => {
            switch (state) {
                case  KeyState.LEFT_PRESSED:
                    this.rotateLeft();
                break;
                case KeyState.RIGHT_PRESSED:
                    this.rotateRight();
                break;
                case  KeyState.DOWN_PRESSED:
                    this._reverse();
                    this.moveForward();
                    break;
                case KeyState.UP_PRESSED:
                    this.moveForward();
                    break;
                case KeyState.KEY_UP:
                    this.state = TankState.IDLE;
                break;
                case KeyState.SPACE_PRESSED:
                    SoundManager.playSound("shoot");//add to soundnames config
                    this.shoot();
                break;
            }
        };
        this._updateFunction = () => {};
    }

    rotateLeft() {
        this._updateDirection(-Math.PI/2);
        this.state = TankState.IDLE;
    }
    rotateRight() {
        this._updateDirection(Math.PI/2);
        this.state = TankState.IDLE;
    }

    moveForward() {
        if (this._stuckDirection == this._direction || this.state == TankState.STUCK) return;
        this.state = TankState.MOVE_FORWARD;
        switch (this._direction) {
            case 0:
                this.gameObject.y -= 4;//add to tank move distance config
            break;
            case 1:
                this.gameObject.x += 4;
            break;
            case 2:
                this.gameObject.y += 4;
            break;
            case 3:
                this.gameObject.x -= 4;
            break;
        }
        this.row = Math.trunc(this.gameObject.x / this.gameObject.width);
        this.col = Math.trunc(this.gameObject.y / this.gameObject.height);
        console.log(this.col, this.row);
    }
    idle() {
        this.state = TankState.IDLE;
    }

    shoot() {
        let bulletSprite = PIXI.Sprite.from(AssetsManager.getTexture(this.type == GameObjectTypes.TANK ? "bullet" : "enemy_bullet"));
        let bullet = new Bullet(bulletSprite, this.type == GameObjectTypes.TANK ? GameObjectTypes.BULLET : GameObjectTypes.ENEMY_BULLET, this.col, this.row, this._direction);
        GameObjectManager.instance.bullets.push(bullet);
        //this._bullets.push(bullet);
        this._scene.addChild(bulletSprite);
        bulletSprite.anchor.x = 0.5;
        bulletSprite.anchor.y = 0.5;
        bullet.x = this.x;
        bullet.y = this.y;
        this.state = TankState.SHOOTING;
    }

    getCollisionPosition() {
        let col = this.col;
        let row = this.row;
        switch (this._direction) {
            case 0:
                col --;
            break;

            case 1:
                row ++;
            break;

            case 2:
                col ++;
            break;

            case 3:
                row --;
            break;
        }
        return {x: col, y : row};
    }

    applyDamage() {
        if (this._life > 0.2) {
            this._life -= 0.2;
        }
        this.gameObject.alpha = this._life;
    }
    get killed() {
        return this._life <= 0.2;// a bit strange that having 0.2 lifes left the target is not killed, also why not to use integer instead of float?
    }
    destroy(callback) {
        if (this.state != TankState.DESTOYING) {
            SoundManager.playSound("explode");//add sound name to config
            this.animationManager.addAnimation("explode", this.x, this.y, this._scene, this._destroyed.bind(this, callback));//add animation name to config
            this.state = TankState.DESTOYING;
        }
    }

    _destroyed(callback) {
        if (callback) {
            callback();
        }
        this.gameObject.destroy();
        this.state = TankState.GAME_OVER;
    }

    update() {
        GameObjectManager.instance.bullets.forEach(function (item) {
            item.update();
        });
        switch (this.state) {
            case TankState.MOVE_FORWARD:
                this.moveForward();
            break;

        }
    }

    _updateDirection(value) {
        this.gameObject.rotation += value;
        this._direction = Math.trunc(Math.abs(this.gameObject.rotation/(Math.PI/2) % 4));//add 4 to class property
        this._stuckDirection = -1;
    }
    _reverse() {
        this._updateDirection(Math.PI);
    }

    get state() {
        return this._state;
    }
    set state(value) {
        switch (value) {
            case TankState.STUCK:
                this._stuckDirection = this._direction;
            break;
        }
        this._state = value;
    }

}