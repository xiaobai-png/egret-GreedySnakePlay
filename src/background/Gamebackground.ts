module GreedySnakePlay.background{
    export class Gamebackground extends egret.DisplayObjectContainer {

    // 进行构造
    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.init, this);
    }

    // 地图的初始化
    private init(event: egret.Event): void {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.init, this);
        let background = new egret.Bitmap(RES.getRes("background_png"));
        let H = this.stage.stageHeight;
        background.x = -400;
        background.y = -400;
        background.width = H * 1.5;
        background.height = H * 1.5;
      
        this.addChild(background);

    }
    }

}