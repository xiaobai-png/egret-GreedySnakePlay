/**
 * 地图左下角创建一个摇杆，根据摇杆来控制蛇移动的方向
 * 地图右下角创建一个按钮图片，点击可以让蛇移动的速度变快，再次点击可以让蛇恢复原来的速度。只控制其中一条蛇即可。
 */
module GreedySnakePlay.background{
    export class ThemeGame extends egret.DisplayObjectContainer {
    private gameBackground: Gamebackground; // 地图
    // 所有蛇设置一个蛇类，方便后面的吃食物
    public snakePlayer: GreedySnakePlay.gameobject.Snake; // 玩家
    public snakePlayers: GreedySnakePlay.gameobject.Snake[]; // 所有蛇
    private foods: GreedySnakePlay.gameobject.FoodsController;
    private timer: egret.Timer; // 计时器
    private speed: number = 100; // 移动速度
    public snakeController:  number = 0 ; // 摇杆数据
    private timeController: TimeController;
    public gameSocket: egret.WebSocket = null;
    public gamerank: number[];

    // 构造
    public constructor(gameSocket: egret.WebSocket) {
        super();
        this.gameSocket = gameSocket;
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddedToStage, this);
    }

    private onAddedToStage(event: egret.Event): void {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddedToStage, this);

        // 地图的添加
        this.gameBackground = new Gamebackground();
        this.addChild(this.gameBackground);

        // 食物的添加
        let foods = new GreedySnakePlay.gameobject.FoodsController();
        this.foods = foods;
        this.addChild(foods);

        // 摇杆
        let snakeController = this.snakeController;

        // 蛇的建立
        let snakePlayer = new GreedySnakePlay.gameobject.Snake(Math.floor(this.stage.stageWidth / 2), Math.floor(this.stage.stageWidth / 2), "用户蛇");
        this.snakePlayer = snakePlayer;

        this.snakePlayers = new Array<GreedySnakePlay.gameobject.Snake>();
        this.snakePlayers.push(snakePlayer);
        let snakePlayer01 = new GreedySnakePlay.gameobject.Snake(300, 600, "AI蛇1");
        this.snakePlayers.push(snakePlayer01);
        let snakePlayer02 = new GreedySnakePlay.gameobject.Snake(200, 800, "AI蛇2");
     

        this.snakePlayers.push(snakePlayer02);
        for(let i = 0; i < this.snakePlayers.length; i++){
            this.addChild(this.snakePlayers[i]);
        }
        

        // 倒计时的加入
        this.timeController = new TimeController();
        this.addChild(this.timeController);

         // 对表进行初始化
         for(let num = 0; num < this.snakePlayers.length; num++){
             let snakePlay = this.snakePlayers[num];
             this.eatfood(snakePlay);
         }

        this.startGame();
        
    }

    // 开始游戏，通过时间控制蛇的强制移动
    private startGame(): void {
        // // 对表进行初始化
        //  for(let num = 0; num < this.snakePlayers.length; num++){
        //      let snakePlay = this.snakePlayers[num];
        //      this.eatfood(snakePlay);
        //  }

        this.timer = new egret.Timer(this.speed);
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.changeDirection, this);
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.snakePlayer.moveSnakeBody, this.snakePlayer);
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.snakePlayers[1].moveSnakeBody, this.snakePlayers[1]); // AI蛇
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.hitFood, this);
        this.timer.start();

        for(let num = 0; num < this.snakePlayers.length; num++){
             let snakePlay = this.snakePlayers[num];
             this.timeBegin(snakePlay);
         }

         let rank = this.rank(this.snakePlayers);
         this.gameRank(rank);
         this.gamerank = rank;
    }

    // 返回排名
    private rank(snakePlayers: GreedySnakePlay.gameobject.Snake[]):number[] {
        let res = new Array<number>();
        let grades = new Array<number>();
        for(let num = 0; num < snakePlayers.length; num++){
             let snakePlay = snakePlayers[num];
             grades.push(snakePlay.grade);
         }
        for(let num = 0; num < snakePlayers.length; num++){
            res[num] = num;
            for(let j = num + 1; j < snakePlayers.length;j++){
                if(grades[num] < grades[j]){
                    let temp = grades[num];
                    grades[num] = grades[j];
                    grades[j] = temp;
                    res[num] = j;
                }
            }
        }
        return res;
    }

    // 改变方向，之后可以改成回调
    private changeDirection(): void{
        this.snakePlayer.direction = this.snakeController;
    }

    // 判断所有蛇的吃食物
    private hitFood(): void {

        for(let num = 0; num < this.snakePlayers.length; num++){
             
                let snakePlay = this.snakePlayers[num];
                // 判断是否存在，可以修改成删除蛇
                if(snakePlay.snakeList.length == 0){continue;}

                let foods = this.foods;
                let movePoint:egret.Point = new egret.Point();
                for(let i = 0; i < foods.foods.length; i++){
                    // 范围碰撞与数组的移除
                    movePoint.x = snakePlay.snakeList[0].x - foods.foods[i].x;
                    movePoint.y = snakePlay.snakeList[0].y - foods.foods[i].y;
                    if (Math.sqrt(movePoint.x * movePoint.x + movePoint.y * movePoint.y) <= 40) {
                        snakePlay.grow();
                        // 吃食物的
                        this.foods.eatFood(foods.foods[i], snakePlay.snakeList[0].x, snakePlay.snakeList[0].y);
                        foods.foods.splice(i, 1);
                        i--; // 也可以从后往前

                        // 发送数据
                        this.eatfood(snakePlay);
                        let rank = this.rank(this.snakePlayers);
                        let send = 0;
                        for(let i = 0; i < rank.length;i++){
                            if(rank[i] != this.rank[i]){
                                send = 1;
                                break;
                            }
                        }
                        if(send == 1){
                            this.gameRank(rank);
                        }
                    }
                }

            // 判断撞墙 只是把长度记为0，并没有从用户里面删除
            if (snakePlay.snakeList[0].x < 0 || snakePlay.snakeList[0].x  >= this.stage.stageWidth || snakePlay.snakeList[0].y < 0 || snakePlay.snakeList[0].y >= this.stage.stageHeight) {
                        foods.trantofood(snakePlay);
                        snakePlay.delete();
                    
                        
                        egret.setTimeout(call=>{
                             snakePlay.rebuild();
                        }, this, 2000);

                        return;
            }

            if(this.snakePlayer != snakePlay){
                if(snakePlay.snakeList[0].x < 20 || snakePlay.snakeList[0].x  >= this.stage.stageWidth - 20 || snakePlay.snakeList[0].y < 20 || snakePlay.snakeList[0].y >= this.stage.stageHeight - 20) {
                    let temp_x = this.stage.stageWidth / 2 -  snakePlay.snakeList[0].x ;
                    let temp_y = this.stage.stageHeight /2 - snakePlay.snakeList[0].y;
                    snakePlay.direction = Math.atan2(temp_y, temp_x);
                }
            }


            // 判断撞蛇，但是只是把长度记为0，并没有从用户里面删除
            for(let j = 0; j < this.snakePlayers.length; j++){
                if(j === num) continue;
                
                if(this.snakePlayers[j].snakeList.length !=0 && this.snakePlayers[j].hitSnake(snakePlay.snakeList[0], snakePlay.snakeList.length)){
                        foods.trantofood(snakePlay);
                        snakePlay.delete();

                         egret.setTimeout(call=>{
                             snakePlay.rebuild();
                        }, this, 2000);

                        return;
                }
            }


            if(this.timeController.timerover){this.gameOver(); return;}
        }
        

        
    }


        // 游戏结束
  public gameOver(): void {
    this.timer.stop();
    this.foods.timeover();
    for(let num = 0; num < this.snakePlayers.length; num++){
             let snakePlay = this.snakePlayers[num];
             this.timeEnd(snakePlay);
         }
    
    return;
  }

  // 获得贪吃蛇的信息，并发送给服务器端
  public eatfood(snakePlayer: GreedySnakePlay.gameobject.Snake): void {
        // console.log("发送成绩信息" + snakePlayer.snakeName);
            let sendXml: string = socketdata.SendXmlHelper.buildUserGradeXml(snakePlayer.snakeName, snakePlayer.grade);//构造活跃信息xml
            this.sendXmlToServer(sendXml);//发送xml文档到服务器
    }

// 发送开始时间
    public timeBegin(snakePlayer: GreedySnakePlay.gameobject.Snake): void {
            let sendXml: string = socketdata.SendXmlHelper.buildGameStaticXml(1, snakePlayer.snakeName);//构造活跃信息xml
            this.sendXmlToServer(sendXml);//发送xml文档到服务器
    }
    public timeEnd(snakePlayer: GreedySnakePlay.gameobject.Snake): void {
            let sendXml: string = socketdata.SendXmlHelper.buildGameStaticXml(0, snakePlayer.snakeName);//构造活跃信息xml
            this.sendXmlToServer(sendXml);//发送xml文档到服务器
    }

    // 发送排行
    public gameRank(rank: number[]){
        let sendXml: string = socketdata.SendXmlHelper.buildGameRankXml(rank);//构造活跃信息xml
        this.sendXmlToServer(sendXml);//发送xml文档到服务器
    }

    //发送数据到服务器端
    public sendXmlToServer(xmlStr: string): void {
            //websocket
            let gameSocket = this.gameSocket;
            if (gameSocket != null && gameSocket.connected == true) {
                
                // this.gameSocket.writeUTFBytes(xmlStr + "\n");
                gameSocket.writeUTF(xmlStr + "\n");
                gameSocket.flush();//对套接字输出缓冲区中积累的所有数据进行刷新
                console.log("成功发送");
            }
    }

}
}
