class GameObject {
    type;
    _state;
    gameObject;
    col;
    row;

    constructor(item, type, col, row, scene) {
        this._scene = scene;
        this.gameObject = item;
        this.type = type;
        this.col = col;
        this.row = row;
    }
    getBounds() {
        return this.gameObject.getBounds();
    }

    get x() {
        return this.gameObject.x;
    }
    get y() {
        return this.gameObject.y;
    }

    set x(value) {
        this.gameObject.x = value;
    }

    set y(value) {
        this.gameObject.y = value;
    }

    get scene() {
        return this._scene;
    }
    getPosition() {
        return {x: this.col, y : this.row};
    }

    destroy() {
        this.gameObject.destroy();
    }
    update() {

    }

}