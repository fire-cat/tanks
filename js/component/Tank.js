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
                    SoundManager.playSound(GameSounds.SOUND_SHOOT);//add to soundnames config
                    this.shoot();
                break;
            }
        };
        this._updateFunction = () => {};
    }

    rotateLeft() {
        this._updateDirection(-1);
        this.setDirection();
        this.state = TankState.IDLE;
    }
    rotateRight() {
        this._updateDirection(1);
        this.setDirection();
        this.state = TankState.IDLE;
    }

    moveForward() {
        if (this._stuckDirection == this._direction || this.state == TankState.STUCK) return;
        this.state = TankState.MOVE_FORWARD;
        switch (this._direction) {
            case 0:
                this.gameObject.y -= GameSettings.TANK_DISTANCE_DELTA;//add to tank move distance config
                if (this.gameObject.y < 0) {
                    this.gameObject.y = 0;
                }
            break;
            case 1:
                this.gameObject.x += GameSettings.TANK_DISTANCE_DELTA;
                if (this.gameObject.x > GameSettings.FILED_WIDTH) {
                    this.gameObject.x = GameSettings.FILED_WIDTH;
                }
            break;
            case 2:
                this.gameObject.y += GameSettings.TANK_DISTANCE_DELTA;
                if (this.gameObject.y > GameSettings.FILED_HEIGHT) {
                    this.gameObject.y = GameSettings.FILED_HEIGHT;
                }
            break;
            case 3:
                this.gameObject.x -= GameSettings.TANK_DISTANCE_DELTA;
                if (this.gameObject.x < 0) {
                    this.gameObject.x = 0;
                }
            break;
        }
        this.row = Math.trunc(this.gameObject.x / this.gameObject.width);
        this.col = Math.trunc(this.gameObject.y / this.gameObject.height);
        //console.log(this.col, this.row);
    }
    idle() {
        this.state = TankState.IDLE;
    }

    shoot() {
        let spriteName = this.type == GameObjectTypes.TANK ? GameTexures.BULLET_SPRITE : GameTexures.ENEMY_BULLET_SPRITE;
        let bulletSprite = PIXI.Sprite.from(AssetsManager.getTexture(spriteName));
        let bulletType = this.type == GameObjectTypes.TANK ? GameObjectTypes.BULLET : GameObjectTypes.ENEMY_BULLET;
        let bullet = new Bullet(bulletSprite, bulletType,  this.col, this.row, this._direction);

        GameObjectManager.instance.bullets.push(bullet);

        this._scene.addChild(bulletSprite);
        bulletSprite.anchor.x = GameSettings.SPRITE_ANCHOR_X;
        bulletSprite.anchor.y = GameSettings.SPRITE_ANCHOR_Y;
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
        if (this._life > GameSettings.DAMAGE_DELTA) {
            this._life -= GameSettings.DAMAGE_DELTA;
        }
        this.gameObject.alpha = this._life;
    }
    get killed() {
        return this._life <= GameSettings.DAMAGE_DELTA;// a bit strange that having 0.2 lifes left the target is not killed, also why not to use integer instead of float?
    }
    destroy(callback) {
        if (this.state != TankState.DESTOYING) {
            SoundManager.playSound(GameSounds.SOUND_EXPLODE);//add sound name to config
            this.animationManager.addAnimation(GameAnimations.EXPLODE_ANIMATION, this.x, this.y, this._scene, this._destroyed.bind(this, callback));//add animation name to config
            this.state = TankState.DESTOYING;
        }
        this.keyboardHandler = null;
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
/*        let x = this.gameObject.x;
        let y = this.gameObject.y;*/
        if (value < 0) {
            this._setPrevDirection(value);
        } else {
            this._setNextDirection(value);
        }
/*        this.gameObject.rotation += value;
        if (this.gameObject.rotation < 0) {
            this.gameObject.rotation += 2*Math.PI ;
        }
        this.setDirection();
        this.gameObject.x = x;
        this.gameObject.y = y;*/
        this.resetStuckDirection();
    }
    _setPrevDirection(value) {
        this._direction -= value;
        if (this._direction < 0) {
            this._direction += GameSettings.NUMBER_OF_DIRECTIONS;
        }
        this._direction %= GameSettings.NUMBER_OF_DIRECTIONS;
        this.gameObject.rotation = GameSettings.ROTATIONS[this._direction];
    }

    _setNextDirection(value) {
        this._direction += value;
        this._direction %= GameSettings.NUMBER_OF_DIRECTIONS;
        this.gameObject.rotation = GameSettings.ROTATIONS[this._direction];
    }

    setDirection () {
        this._direction = Math.trunc(Math.abs(this.gameObject.rotation/(Math.PI/2) % GameSettings.NUMBER_OF_DIRECTIONS));//add 4 to class property
    }
    _reverse() {
        this._updateDirection(-2);
    }

    get state() {
        return this._state;
    }
    set state(value) {
        switch (value) {
            case TankState.STUCK:
                this._stuckDirection = this._direction;
                //this._state = value;
                break;
            case TankState.IDLE:
                this.resetStuckDirection();
                this._state = value;
                break;
            default:
                this._state = value;
                break;
        }
        //this._state = value;
    }

    resetStuckDirection() {
        this._stuckDirection = -1;
    }

}
