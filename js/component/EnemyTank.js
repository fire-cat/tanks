class EnemyTank extends Tank{
    _timer;
    _waitingTime;
    _actions = ["TURN_LEFT", "TURN_RIGHT", "MOVE_FORWARD", "SHOOT", "TURN_RIGHT",
                "MOVE_FORWARD", "MOVE_FORWARD", "TURN_LEFT", "MOVE_FORWARD", "SHOOT",
                "TURN_LEFT", "TURN_RIGHT", "MOVE_FORWARD", "SHOOT", "TURN_LEFT", "TURN_RIGHT",
                "MOVE_FORWARD", "SHOOT", "TURN_LEFT", "TURN_RIGHT", "MOVE_FORWARD", "SHOOT"];
    constructor(tnk, type, col, row, scene) {
        super(tnk, type, col, row, scene);
        //this.keyboardHandler = null;
        this.keyboardHandler.keyHandler = ()=> {};
        this.setDirection();
        this._timer = performance.now();
        this._waitingTime = Math.round(Math.random() * GameSettings.MAX_IDLE_TIME + GameSettings.MIN_IDLE_TIME);
    }

    update() {
        switch (this.state) {
            case TankState.WAIT:
                    requestAnimationFrame(this._wait.bind(this));
                break;
            case TankState.IDLE:
                requestAnimationFrame(this._doAction.bind(this));//don't use Timeouts prefer TweenMax lib or requestAnimationFrame
                this.state = TankState.WAIT;
            break;
            case TankState.MOVE_FORWARD:
                if (this._checkCollision()) {
                    this.state = TankState.STUCK;
                }
                super.update();
            break;
        }
    }
    _wait () {
        let currentTime = performance.now();
         if (currentTime - this._timer >= this._waitingTime) {
             this._timer = currentTime;
             this._waitingTime = Math.round(Math.random() * GameSettings.MAX_IDLE_TIME + GameSettings.MIN_IDLE_TIME);
             this.state = TankState.IDLE;
         }
    }
    _checkCollision() {
        let checkPosition = this.getCollisionPosition();
        let collisionObject = GameObjectManager.instance.getObject(checkPosition.x, checkPosition.y);
        if (collisionObject &&  Utils.checkCollision(this, collisionObject ) ) {
            switch (collisionObject.type) {
                case GameObjectTypes.WALL:
                case GameObjectTypes.DESTROYABLE_WALL:
                    this.state = TankState.IDLE;
                    this._stuckDirection = this._direction;
                    break;
                case GameObjectTypes.WATER:
                    this.destroy();
                    break;
            }
        }
    }

    _doAction() {
        //clearTimeout(this._timer);
        if (this.state == TankState.DESTOYING )
            return;
        let action = this._actions[Math.round(Math.random()*this._actions.length)];
        switch (action) {
            case GameSettings.ENEMY_TURN_LEFT://it would be better to have this actions "TURN_LEFT" somethere in config
                this.rotateLeft();
                this.state = TankState.IDLE;
            break;
            case GameSettings.ENEMY_TURN_RIGHT:
                this.rotateRight();
                this.state = TankState.IDLE;
            break;
            case  GameSettings.ENEMY_MOVE_FORWARD:
                //console.log("direction : " + this._direction);
                this.moveForward();
            break;
            case GameSettings.ENEMY_SHOOT:
                this.shoot();
                this.state = TankState.IDLE;
            break;
        }
    }
    get state() {
        return this._state;
    }
    set state(value) {
        if (this.state == TankState.DESTOYING )
            return;
        switch (value) {
            case TankState.MOVE_FORWARD:
                if (this._checkCollision()) {
                    this.state = TankState.STUCK;
                } else {
                    super.state = value;
                }
                break;
            default:
                super.state = value;
                break;
        }

    }
}
