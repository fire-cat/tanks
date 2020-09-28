class EnemyTank extends Tank{
    _timer;
    _actions = ["TURN_LEFT", "TURN_RIGHT", "MOVE_FORWARD", "SHOOT", "TURN_RIGHT", 
                "MOVE_FORWARD", "MOVE_FORWARD", "TURN_LEFT", "MOVE_FORWARD", "SHOOT",
                "TURN_LEFT", "TURN_RIGHT", "MOVE_FORWARD", "SHOOT", "TURN_LEFT", "TURN_RIGHT", 
                "MOVE_FORWARD", "SHOOT", "TURN_LEFT", "TURN_RIGHT", "MOVE_FORWARD", "SHOOT"];
    constructor(tnk, type, col, row, scene) {
        super(tnk, type, col, row, scene);
        //this.keyboardHandler = null;
        this.keyboardHandler.keyHandler = ()=> {};
        this._updateDirection(tnk.rotation );
    }

    update() {
        switch (this.state) {
            case TankState.IDLE:
                this._timer = setTimeout(this._doAction.bind(this), Math.round(Math.random() * 1000 + 100));//don't use Timeouts prefer TweenMax lib or requestAnimationFrame
                this.state = TankState.WAIT;
            break;
            case TankState.MOVE_FORWARD:
                super.update();
                this._checkCollision();
            break;
        }
    }
    _checkCollision() {
        let checkPosition = this.getCollisionPosition();
        let collisionObject = GameObjectManager.instance.getObject(checkPosition.x, checkPosition.y);
        if (collisionObject) {
            switch (collisionObject.type) {
                case GameObjectTypes.WALL:
                case GameObjectTypes.DESTROYABLE_WALL:
                    this.state = TankState.IDLE;
                    break;
            }
        }
    }

    _doAction() {
        clearTimeout(this._timer);
        if (this.state == TankState.DESTOYING )
            return;
        let action = this._actions[Math.round(Math.random()*this._actions.length)];
        switch (action) {
            case "TURN_LEFT"://it would be better to have this actions "TURN_LEFT" somethere in config
                this.rotateLeft();
                this.state = TankState.IDLE;
            break;
            case "TURN_RIGHT":
                this.rotateRight();
                this.state = TankState.IDLE;
            break;
            case  "MOVE_FORWARD":
                this.moveForward();
            break;
            case "SHOOT":
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
        super.state = value;
    }
}