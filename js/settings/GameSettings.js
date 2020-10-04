class GameSettings {
    static GAME_TITLE = "Tank Game";
    static FILED_WIDTH = 1024;
    static FILED_HEIGHT = 768;

    static BULLET_VELOCITY_DELTA = 6;
    static TANK_DISTANCE_DELTA = 2;

    static ENEMY_TURN_LEFT =  "TURN_LEFT";
    static ENEMY_TURN_RIGHT =  "TURN_RIGHT";
    static ENEMY_MOVE_FORWARD = "MOVE_FORWARD";
    static ENEMY_SHOOT = "SHOOT";

    static SPRITE_ANCHOR_X = 0.5;
    static SPRITE_ANCHOR_Y = 0.5;

    static DAMAGE_DELTA = 0.2;

    static NUMBER_OF_DIRECTIONS = 4;
    static ANIMATION_SPEED = 0.5;
    static ANIMATION_START_FRAME = 1;
    static EXPLOSION_ZINDEX = 10000;
    static TANK_ZINDEX = 1000;


    static BUTTON_LEFT_MULTIPLIER = 0.5;
    static BUTTON_TOP_MULTIPLIER = 0.7;

    static ENEMY_COLORS = 3;
    static NUMBER_OF_ENEMIES = 10;

    static MIN_IDLE_TIME = 1000;
    static MAX_IDLE_TIME = 3000;

    static ROTATIONS = [0, Math.PI/2, Math.PI, 3*Math.PI/2];
}
class GameStyles {
    static TITLE_STYLE = {
        fontFamily: 'Arial',
        fontSize: 86,
        fill: ['#ffffff'],
        strokeThickness: 5,
        dropShadow: true,
        wordWrapWidth: 440
    };
    static  TITLE_TOP_MULTIPLIER = 0.3;
    static  TITLE_LEFT_MULTIPLIER = 0.5;
}
class GameButtonEffects {
    static NORMAL_EFFECT = 1;
    static OVER_EFFECT = 1.2;

}
class GameScenes {
    static GAME_SCENE   = 'game';
    static INTRO_SCENE  = 'intro';
    static MENU_SCENE   = 'menu';
    static RESULT_SCENE = 'gameOver';
}
class GameSounds {
    static SOUND_SHOOT = "shoot";
    static SOUND_SUFFIX = "_sound";
    static SOUND_EXPLODE = "explode";
    static SOUND_LOSE = "lose";
    static SOUND_WIN = "win";
}

class GameItems {
    static ENEMY = "et";
    static DESTROYABLE_WALL = "w1";
    static WATER = "wt";
    static WALL = "w";
    static LEAVES = "l";
    static EAGLE = "e";
    static PLAYER_TANK = "t";
}
class GameAnimations {
    static EXPLODE_ANIMATION = "explode";
    static SMALL_EXPLODE_ANIMATION = "smallExplode";

}
class GameTexures {
    static BULLET_SPRITE = "bullet";
    static ENEMY_BULLET_SPRITE = "enemy_bullet";
    static ANIMATION_FRAME_SUFFIX = "Frames";
    static EXPLODE_ANIMATION = "explode";
    static SCORES_ASSET = "scores";
    static SMALL_WALL_1 = "small_wall_1";
    static WATER = "water";
    static WALL = "wall";
    static LEAVES = "leaves";
    static EAGLE = "eagle";
    static TANK = "tank";
    static BUTTON = "button";
    static ENEMY_PREFIX = "enemy_";
}

class GameControls {
    static KEY_LEFT  = 37;
    static KEY_UP    = 38;
    static KEY_RIGHT = 39;
    static KEY_DOWN  = 40;
    static KEY_SPACE = 32;
}

class GameEvents {
    static KEYDOWN = "keydown";
    static KEYUP   = "keyup";
    static PROGRESS = "progress";
}

class GameAssets {
    static ASSETS = [
        {id : 'button', path : 'assets/button.png'},
        {id: 'scores', path : 'assets/scores.png'},
        {id : 'appear'             , path : 'assets/animation/appear.png'},
        {id : 'explode_small_json' , path : 'assets/animation/explode_small.json'},
        {id : 'eagle'              , path : 'assets/board/eagle.png'},
        {id : 'leaves'             , path : 'assets/board/leaves.png'},
        {id : 'small_wall_1'       , path : 'assets/board/small_wall_1.png'},
        {id : 'small_wall_2'       , path : 'assets/board/small_wall_2.png'},
        {id : 'small_wall_3'       , path : 'assets/board/small_wall_3.png'},
        {id : 'small_wall_4'       , path : 'assets/board/small_wall_4.png'},
        {id : 'wall'               , path : 'assets/board/wall.png'},
        {id : 'water'              , path : 'assets/board/water.png'},
        {id : 'bonus_immortal'     , path : 'assets/bonus/bonus_immortal.png'},
        {id : 'bonus_live'         , path : 'assets/bonus/bonus_live.png'},
        {id : 'bonus_slow'         , path : 'assets/bonus/bonus_slow.png'},
        {id : 'bonus_speed'		   , path : 'assets/bonus/bonus_speed.png'},
        {id : 'bullet'			   , path : 'assets/bullet/bullet.png'},
        {id : 'enemy_bullet'	   , path : 'assets/bullet/enemy_bullet.png'},
        {id : 'enemy_0'			   , path : 'assets/tanks/enemy_0.png'},
        {id : 'enemy_1'			   , path : 'assets/tanks/enemy_1.png'},
        {id : 'enemy_2'			   , path : 'assets/tanks/enemy_2.png'},
        {id : 'tank'			   , path : 'assets/tanks/tank.png'},
        {id : 'levels'			   , path : 'assets/levels.json'},
        {id : 'explode'		 	   , path : 'assets/animation/explode.json'},
        {id : 'shoot_sound'		   , path : 'assets/sounds/shot.wav'},
        {id : 'lose_sound'		   , path : 'assets/sounds/lose.wav'},
        {id : 'win_sound'		   , path : 'assets/sounds/win.wav'},
        {id : 'explode_sound'	   , path : 'assets/sounds/explode.wav'},
        {id : 'hit_sound'		   , path : 'assets/sounds/hit.wav'}];

    static  ASSETS_EXT = ".png";
    static PRELOADER = 'preloaderBg';
    static PRELOADER_PATH = "assets/preloader/loader-bg.png";
    static LOADER_BAR = "loaderBar";
    static LOADER_BAR_PATH = "assets/preloader/loader-bar.png";
}