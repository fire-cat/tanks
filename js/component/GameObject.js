class GameObject {
    type;
    _state;
    gameObject;
    col;
    row;
    active;

    constructor(item, type, col, row, scene) {
        this._scene = scene;
        this.gameObject = item;
        this.type = type;
        this.col = col;
        this.row = row;
        this.active = true;
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
        if (this.gameObject)
            this.gameObject.destroy();
    }
    update() {

    }
    deactivate() {
        this.active = false;
    }

}