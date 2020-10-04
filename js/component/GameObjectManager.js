class GameObjectManager {
    objectsStorage;
    dynamicObjects;
    bullets;
    constructor() {
        if(! GameObjectManager.instance){
            this.objectsStorage = {};
            this.dynamicObjects = [];
            this.bullets = [];
            GameObjectManager.instance = this;
        }
        return GameObjectManager.instance;
    }
    addStaticObject(sprite, type, col, row, scene) {
        let gameObject = new GameObject(sprite, type, col, row, scene);
        this.objectsStorage[col + ', ' + row] = gameObject;
    };

    addDynamicObject(gameObj) {
        this.dynamicObjects.push(gameObj);
    }
    getObject(col, row) {
        let obj = this.objectsStorage[col + ', ' + row];
        return  obj ? obj : this._getDymanicObject(col, row);
    }

    _getDymanicObject (col, row) {
        for (let i = 0; i < this.dynamicObjects.length; i++) {
            if (this.dynamicObjects[i].col == col && this.dynamicObjects[i].row == row) {
                return this.dynamicObjects[i];
            }
        }
        return null;
    }
    removeItem(item) {
        if (this.objectsStorage[item.col + ', ' + item.row]) {
            item.destroy();
            delete this.objectsStorage[item.col + ', ' + item.row];
        } else {
            let pos = this.dynamicObjects.indexOf(item);
            this.dynamicObjects.splice(pos, 1);
            item.destroy();
        }
    }

    destroy() {
        for(var key in this.objectsStorage) {
            delete this.objectsStorage[key];
        }
        this.bullets.forEach((item) => {
           item.destroy();
        });
        this.bullets = [];
    }

}