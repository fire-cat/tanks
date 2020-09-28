class GameScene extends Scene {
    static cellSize = 36;
    tank;
    gameObjects;
    animationManager;
    enemyManager;
    constructor() {
        super();

        this.enemyManager = new EnemyTanksManager(this);
        this.gameObjects = new GameObjectManager();
        this.sortableChildren = true;
    }

    show() {
        let level = AssetsManager.getLevel();

        let blockY = 0;
        for (let i = 0; i < level.length; i++) {
            let blockX = 0;
            for (let j = 0; j < level[i].length; j++) {
                let block;
                let objType;
                switch (level[i][j]) {
                    case "et":
                        this.enemyManager.createEnemy(i, j, blockX, blockY);
                    break;
                    case "w1":
                        block = new PIXI.Graphics();
                        block.beginTextureFill(AssetsManager.getTexture("small_wall_1"));//texture names Config
                        block.drawRect(-GameScene.cellSize/2, -GameScene.cellSize/2, GameScene.cellSize, GameScene.cellSize);
                        block.endFill();
                        objType = GameObjectTypes.DESTROYABLE_WALL;
                    break;

                    case "wt":
                        block = PIXI.Sprite.from(AssetsManager.getTexture("water"));
                        objType = GameObjectTypes.WATER;
                        break;

                    case "w":
                        block = PIXI.Sprite.from(AssetsManager.getTexture("wall"));
                        objType = GameObjectTypes.WALL;
                        break;

                    case "l":
                        block = PIXI.Sprite.from(AssetsManager.getTexture("leaves"));
                        objType = GameObjectTypes.LEAVES;
                        break;

                    case "e":
                        block = PIXI.Sprite.from(AssetsManager.getTexture("eagle"));
                        objType = GameObjectTypes.EAGLE;
                        break;

                    case "t":
                        block = PIXI.Sprite.from(AssetsManager.getTexture("tank"));
                        block.rotation = Math.PI/2;
                        this.tank = new Tank(block, GameObjectTypes.TANK, i, j, this);
                        objType = GameObjectTypes.TANK;
                        block.zIndex = 1000;
                    break;
                }
                if (block) {
                    this.addChild(block);
                    this.gameObjects.addObject(block, objType, i, j, this);
                   if (block.anchor) {
                        block.anchor.x = 0.5;
                        block.anchor.y = 0.5;
                    }
                    block.x = blockX + GameScene.cellSize/2;
                    block.y = blockY + GameScene.cellSize/2;
                }
                blockX += GameScene.cellSize;
          }
            blockY += GameScene.cellSize;
        }
        this.state = SceneStates.INIT;
    }

    _init() {
        this.interactive = true;
        this.state = SceneStates.READY;
        this.animationManager = new AnimationManager();
    }

    _checkTankObjectCollision() {
        let checkPosition = this.tank.getCollisionPosition();
        let collisionObject = this.gameObjects.getObject(checkPosition.x, checkPosition.y);
        if (collisionObject && this._checkCollision(this.tank, collisionObject )) {
            console.log(collisionObject.type);
            switch (collisionObject.type) {
                case GameObjectTypes.WALL:
                case GameObjectTypes.DESTROYABLE_WALL:
                    this.tank.state = TankState.STUCK;
                break;
            }
        }
    }

    _destroyTank() {
        this.tank.destroy(this.gameOver.bind(this));
        this.state = SceneStates.GAME_LOSE;
    }

    _checkTankDamage() {
        let checkPosition = this.tank.getPosition();
        let collisionObject = this.gameObjects.getObject(checkPosition.x, checkPosition.y);

        if (collisionObject) {
            switch (collisionObject.type) {
                case GameObjectTypes.WATER:
                    this._destroyTank();
                break;
            }
        }
    }

    gameOver() {
        this.state = SceneStates.GAME_OVER;
        while (this.children.length > 0) {
            let child = this.getChildAt(0);
            this.removeChild(child);
        }
        GameObjectManager.instance.destroy();
        this.animationManager.destroy();
        this.enemyManager.destroy();
        ScenesManager.goToScene("gameOver");//scene names config

    }

    _checkCollision(object1, object2) {
        try {
            const bounds1 = object1.getBounds();
            const bounds2 = object2.getBounds();

            return bounds1.x < bounds2.x + bounds2.width
                && bounds1.x + bounds1.width > bounds2.x
                && bounds1.y < bounds2.y + bounds2.height
                && bounds1.y + bounds1.height > bounds2.y;
        } catch {
            return false;
        }
    }
    _handleBullets() {
        let bulletsCollision = [];
        this.gameObjects.bullets.forEach((item, i) => {
            let checkPosition = item.getPosition();
            let collisionObject = GameObjectManager.instance.getObject(checkPosition.x, checkPosition.y);
            function destroyBullet() {
                GameObjectManager.instance.bullets.splice(i, 1);
                item.destroy();
            }
            if (collisionObject) {

                switch (collisionObject.type) {
                    case GameObjectTypes.EAGLE:
                        SoundManager.playSound("explode");
                        this.animationManager.addAnimation("explode", item.x, item.y, this, this.gameOver.bind(this));
                        destroyBullet();
                        this.state = SceneStates.GAME_WON;
                    break;
                    case   GameObjectTypes.DESTROYABLE_WALL:
                        bulletsCollision.push(collisionObject);
                        destroyBullet();
                        break;
                    case GameObjectTypes.WALL:
                        destroyBullet();
                    break;

                    case GameObjectTypes.ENEMY_TANK:
                        if (item.type == GameObjectTypes.BULLET) {
                            destroyBullet();
                            let enemyTank = this.enemyManager.applyDamage(collisionObject.col, collisionObject.row);
                        }
                    break;
                    case GameObjectTypes.TANK:
                        if (item.type == GameObjectTypes.ENEMY_BULLET) {
                            destroyBullet();
                            this.tank.applyDamage();

                            if (this.tank.killed)  {
                                this._destroyTank();
                            }
                        }

                    break;
                }

            }
        });

        if (bulletsCollision.length >= 1) {
            bulletsCollision.forEach(function (item) {
                AnimationManager.instance.addAnimation("smallExplode", item.x, item.y, item.scene, GameObjectManager.instance.removeItem.bind(GameObjectManager.instance, item));
            })
        }
    }

     update() {

         switch (this.state) {
             case SceneStates.NONE:
                 this.state = SceneStates.PRE_INIT;
                 this.show();
             break;

             case SceneStates.INIT:
                 this._init();
                 this.state = SceneStates.IDLE;
             break;

             case SceneStates.IDLE:
                 this._checkTankObjectCollision();
                 this._checkTankDamage();
                 this.tank.update();
             break;
             case SceneStates.GAME_OVER:
                 return;
             break;
             case SceneStates.GAME_LOSE:
                 SoundManager.playSound("lose", () => {
                     this.state = SceneStates.GAME_OVER;
                 });
             break;
             case SceneStates.GAME_WON:
                 SoundManager.playSound("win", () => {
                     this.state = SceneStates.GAME_OVER;
                 });
             break;
         }
         this._handleBullets();
         this.enemyManager.update();
        super.update();
    }
    resume() {
        this.state = SceneStates.NONE;
    }
}