class EnemyTanksManager {
    _scene;
    _tanks;
    _state;
    constructor(scene) {
        this._scene = scene;
        this._tanks = [];
        this._state = SceneStates.NONE;
    }

    destroy() {
        this._tanks.forEach((item) => {
            item.destroy();
        });
        this._tanks = [];
        this._state = SceneStates.NONE;
    }
    createEnemy(i, j, blockX, blockY, block) {
        //let color = Math.round(Math.random()*2);
        //let block = PIXI.Sprite.from(AssetsManager.getTexture(GameTexures.ENEMY_PREFIX + `${color}`));//this._texturePrefix = 'enemy_';add to class property
        //block.anchor.x = GameSettings.SPRITE_ANCHOR_X;
        //block.anchor.y = GameSettings.SPRITE_ANCHOR_Y;
       // block.rotation = color * Math.PI/2;
        //block.zIndex = GameSettings.TANK_ZINDEX;

        let enemy = new EnemyTank(block, GameObjectTypes.ENEMY_TANK, i, j, this._scene);

/*        this._scene.addChild(block);
        block.x = blockX + GameScene.cellSize/2;
        block.y = blockY + GameScene.cellSize/2;*/

        GameObjectManager.instance.addDynamicObject(enemy);
        this._tanks.push(enemy);
        this._state = SceneStates.READY;

    }
    applyDamage(gameObject) {
        let enemy;
        let i = 0;
        for (i = 0; i < this._tanks.length; i++) {
            if (this._tanks[i].gameObject == gameObject.gameObject) {
                enemy = this._tanks[i];
                break;
            }
        }
        if (enemy) {
            enemy.applyDamage();
            if (enemy.killed) {
                enemy.destroy();
                this._tanks.slice(i-1, 1);
            }
        }

    }

/*    _checkTankDamage(tank) {
        let checkPosition = tank.getPosition();
        let collisionObject = this.gameObjects.getObject(checkPosition.x, checkPosition.y);

        if (collisionObject) {
            switch (collisionObject.type) {
                case GameObjectTypes.WATER:
                    tank.destroy();
                    break;
            }
        }
    }*/
    update() {
        switch (this._state) {
            case SceneStates.READY:
                for (let i = 0; i < this._tanks.length; i++) {
                    this._tanks[i].update();
                }
            break;
        }



    }
}
