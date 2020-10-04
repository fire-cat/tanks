function start() {
    let scenesManager = ScenesManager;
    scenesManager.create(GameSettings.FILED_WIDTH, GameSettings.FILED_HEIGHT);//game config width and height

    scenesManager.createScene(GameScenes.GAME_SCENE);
    scenesManager.createScene(GameScenes.INTRO_SCENE);
    scenesManager.createScene(GameScenes.MENU_SCENE);
    scenesManager.createScene(GameScenes.RESULT_SCENE);

    scenesManager.goToScene(GameScenes.INTRO_SCENE);
}
