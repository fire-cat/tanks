class GameObjectManager {
    objectsStorage;
    bullets;
    constructor() {
        if(! GameObjectManager.instance){
            this.objectsStorage = {};
            this.bullets = [];
            GameObjectManager.instance = this;
        }
        return GameObjectManager.instance;
    }
    addObject(sprite, type, col, row, scene) {
        let gameObject = new GameObject(sprite, type, col, row, scene);
        this.objectsStorage[col + ', ' + row] = gameObject;
    };

    getObject(col, row) {
        return this.objectsStorage[col + ', ' + row];
    }

    removeItem(item) {
        item.destroy();
        delete this.objectsStorage[item.col + ', ' + item.row];

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