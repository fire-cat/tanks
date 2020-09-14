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
    createEnemy(i, j, blockX, blockY) {
        let color = Math.round(Math.random()*2);
        let block = PIXI.Sprite.from(AssetsManager.getTexture(`enemy_${color}`));
        block.anchor.x = 0.5;
        block.anchor.y = 0.5;
        block.rotation = color * Math.PI/2;
        block.zIndex = 1000;

        this._scene.addChild(block);
        block.x = blockX + GameScene.cellSize/2;
        block.y = blockY + GameScene.cellSize/2;
        let enemy = new EnemyTank(block, GameObjectTypes.ENEMY_TANK, i, j, this._scene);
        GameObjectManager.instance.addObject(block, GameObjectTypes.ENEMY_TANK, i, j, this._scene);
        this._tanks.push(enemy);
        this._state = SceneStates.READY;

    }
    applyDamage(col, row) {
        let enemy;
        let i = 0;
        while (!enemy && i < this._tanks.length) {
            if (this._tanks[i]&& this._tanks[i].col == col && this._tanks[i].row == row) {
                enemy = this._tanks[i];
            }
            i++;
        }
        if (enemy) {
            enemy.applyDamage();
            if (enemy.killed) {
                enemy.destroy();
                this._tanks.slice(i-1, 1);
            }
        }

    }
    update() {
        switch (this._state) {
            case SceneStates.READY:
                //this._tanks[0].update();
                for (let i = 0; i < this._tanks.length; i++) {
                    this._tanks[i].update();
                }
            break;
        }

    }
}