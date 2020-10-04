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
        this.tank = null;
        let level = AssetsManager.getLevel();

        let blockY = 0;
        for (let i = 0; i < level.length; i++) {
            let blockX = 0;
            for (let j = 0; j < level[i].length; j++) {
                let block;
                let objType;
                switch (level[i][j]) {
                    case GameItems.ENEMY:
                        if (this.enemyManager._tanks.length < GameSettings.NUMBER_OF_ENEMIES) {
                            let color = Math.round(Math.random()*(GameSettings.ENEMY_COLORS-1));
                            block = PIXI.Sprite.from(AssetsManager.getTexture(GameTexures.ENEMY_PREFIX + `${color}`));
                            block.rotation = color * Math.PI/2;
                            block.zIndex = GameSettings.TANK_ZINDEX;
                            this.enemyManager.createEnemy(i, j, blockX, blockY, block);
                            //objType = GameObjectTypes.ENEMY_TANK;
                        }
                    break;
                    case GameItems.DESTROYABLE_WALL:
                        block = new PIXI.Graphics();
                        block.beginTextureFill(AssetsManager.getTexture(GameTexures.SMALL_WALL_1));//texture names Config
                        block.drawRect(-GameScene.cellSize/2, -GameScene.cellSize/2, GameScene.cellSize,
                            GameScene.cellSize);
                        block.endFill();
                        objType = GameObjectTypes.DESTROYABLE_WALL;
                    break;

                    case GameItems.WATER:
                        block = PIXI.Sprite.from(AssetsManager.getTexture(GameTexures.WATER));
                        objType = GameObjectTypes.WATER;
                        break;

                    case GameItems.WALL:
                        block = PIXI.Sprite.from(AssetsManager.getTexture(GameTexures.WALL));
                        objType = GameObjectTypes.WALL;
                        break;

                    case GameItems.LEAVES:
                        block = PIXI.Sprite.from(AssetsManager.getTexture(GameTexures.LEAVES));
                        objType = GameObjectTypes.LEAVES;
                        break;

                    case GameItems.EAGLE:
                        block = PIXI.Sprite.from(AssetsManager.getTexture(GameTexures.EAGLE));
                        objType = GameObjectTypes.EAGLE;
                        break;

                    case GameItems.PLAYER_TANK:
                       // break;
                        block = PIXI.Sprite.from(AssetsManager.getTexture(GameTexures.TANK));
                        block.rotation = Math.PI/2;
                        this.tank = new Tank(block, GameObjectTypes.TANK, i, j, this);
                        this.gameObjects.addDynamicObject(this.tank);
                        //objType = GameObjectTypes.TANK;
                        block.zIndex = GameSettings.TANK_ZINDEX;
                    break;
                }
                if (block) {
                    this.addChild(block);
                    if (objType) {
                        this.gameObjects.addStaticObject(block, objType, i, j, this);
                    }
                   if (block.anchor) {
                        block.anchor.x = GameSettings.SPRITE_ANCHOR_X;
                        block.anchor.y = GameSettings.SPRITE_ANCHOR_Y;
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
        if (!this.tank) {
            return;
        }
        let checkPosition = this.tank.getCollisionPosition();
        let collisionObject = this.gameObjects.getObject(checkPosition.x, checkPosition.y);
        if (collisionObject && Utils.checkCollision(this.tank, collisionObject )) {
            //console.log("Colligin with: " + "(" + collisionObject.col + ", " + collisionObject.row + ")");
            switch (collisionObject.type) {
                case GameObjectTypes.WALL:
                case GameObjectTypes.DESTROYABLE_WALL:
                    this.tank.state = TankState.STUCK;
                break;
            }
        } else {
            this.tank.resetStuckDirection();
        }
    }

    _destroyTank() {
        this.tank.destroy(this.gameOver.bind(this));
        this.state = SceneStates.GAME_LOSE;
    }

    _checkTankDamage() {
        if (!this.tank) {
            return;
        }
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
        if (this.tank) {
            this.tank.destroy();
        }
        ScenesManager.goToScene(GameScenes.RESULT_SCENE);//scene names config

    }

    _handleBullets() {
        let bulletsCollision = [];
        this.gameObjects.bullets.forEach((item, i) => {
            let checkPosition = item.getPosition();
            let collisionObject = GameObjectManager.instance.getObject(checkPosition.x, checkPosition.y);
            function destroyBullet() {
                GameObjectManager.instance.bullets.splice(i, 1);
                //console.log("destoy in: " + "(" + item.col + ", " + item.row + ")");
                item.destroy();
            }
            if (collisionObject) {
                switch (collisionObject.type) {
                    case GameObjectTypes.EAGLE:
                        SoundManager.playSound(GameSounds.SOUND_EXPLODE);
                        this.animationManager.addAnimation(GameAnimations.EXPLODE_ANIMATION, item.x, item.y, this,
                            this.gameOver.bind(this));
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
                            //collisionObject.applyDamage();
                                //applet enemyTank =
                            this.enemyManager.applyDamage(collisionObject);
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
                item.deactivate();
                AnimationManager.instance.addAnimation(GameAnimations.SMALL_EXPLODE_ANIMATION, item.x, item.y,
                    item.scene, GameObjectManager.instance.removeItem.bind(GameObjectManager.instance, item));
            })
        }
        this._checkTankObjectCollision();
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
                 if (this.tank) {
                     this.tank.update();
                 }

             break;
             case SceneStates.GAME_OVER:
                 return;
             break;
             case SceneStates.GAME_LOSE:
                 SoundManager.playSound(GameSounds.SOUND_LOSE, () => {
                     this.state = SceneStates.GAME_OVER;
                 });
             break;
             case SceneStates.GAME_WON:
                 SoundManager.playSound(GameSounds.SOUND_WIN, () => {
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
