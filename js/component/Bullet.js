class Bullet  extends GameObject{
    _direction;
    constructor(tnk, type, col, row, direction) {
        super(tnk, type, col, row);
        this._direction = direction;
    }

    update() {
        if (!this.gameObject)
            return;

        switch (this._direction) {
            case 0:
                this.gameObject.y -= GameSettings.BULLET_VELOCITY_DELTA;//add number  to config
            break;

            case 1:
                this.gameObject.x += GameSettings.BULLET_VELOCITY_DELTA;
            break;

            case 2:
                this.gameObject.y += GameSettings.BULLET_VELOCITY_DELTA;
            break;

            case 3:
                this.gameObject.x -= GameSettings.BULLET_VELOCITY_DELTA;
            break;
        }
        this.row = Math.trunc(this.gameObject.x / GameScene.cellSize);
        this.col = Math.trunc(this.gameObject.y / GameScene.cellSize);
    }

    destroy() {
        super.destroy();

    }
}
