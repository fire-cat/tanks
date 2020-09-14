function start() {
    let scenesManager = ScenesManager;
    scenesManager.create(1024, 768);

   scenesManager.createScene('game');
   scenesManager.createScene('intro');
   scenesManager.createScene('menu');
   scenesManager.createScene("gameOver");

   scenesManager.goToScene('intro');
}