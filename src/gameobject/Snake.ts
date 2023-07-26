/**
 * 每条蛇的蛇身体都是由一个龙骨骼动画和一个一个的圆圈图片构成的
 * 蛇头是一个龙骨骼动画，其他部位是圆圈图片
 * 每条蛇身体初始有8节长度，也就是一个蛇头和7个圆圈组成。
 * 蛇的每节身体也要记录到数组里，蛇移动和碰撞检测都会用到
 * 地图左下角创建一个摇杆，根据摇杆来控制蛇移动的方向
 * 地图右下角创建一个按钮图片，点击可以让蛇移动的速度变快，再次点击可以让蛇恢复原来的速度。只控制其中一条蛇即可。
 */
module GreedySnakePlay.gameobject{
    export class Snake extends egret.DisplayObjectContainer {
    /**
     * @language zh_CN
     * 解析贪吃蛇
     * @param snake 贪吃蛇本体
     * @param direction 行动的方向
     * @param gridSize 一块大小
     * @param gridCount 位置
     * @param tweenspeed 动画的速度
     */
    public snakeHead: dragonBones.EgretArmatureDisplay; // 蛇头龙骨骼动画
    public snakeList; // 蛇身列表
    public direction: number; // 移动方向
    private gridSize: number = 15; // 蛇身的大小
    public moveSize: number = 5; // 移动距离
    private gridCountX: number; // 位置
    private gridCountY: number;
    private touchX: number = 0; // 触摸点的X坐标
    private touchY: number = 0; // 触摸点的Y坐标
    private touchStatus: boolean = false; // 触摸状态，true表示已触摸，false表示未触摸
    public snakeName: string;
    private snakeNameLabel;
    public grade: number = 0;
    

    // 进行构造初始加载
    public constructor(gridCountX: number, gridCountY: number, snakeName: string) {
        super();
        this.gridCountX = gridCountX;
        this.gridCountY = gridCountY;
        this.snakeName = snakeName;
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.init, this);
    }

    // 初始设置蛇的位置和大小
    private init(event: egret.Event): void {
        // this.gridCountX = Math.floor(this.stage.stageWidth / this.gridSize);
        // this.gridCountY = Math.floor(this.stage.stageHeight / this.gridSize);
        this.direction = 0;
        this.createSnake();
        
    }

    //  通过方块线框实现蛇身的初始化
   private createSnake(): void {
        
        let snakeList = [];
        this.snakeList = snakeList;
        // 蛇头圆形
        // let snake: egret.Shape = new egret.Shape();
        let gridSize = this.gridSize;

        // 龙骨动画的蛇头
        let head = new SnakeHead();
        head.x = this.gridCountX;
        head.y = this.gridCountY;
        head.scaleX= 0.4;
        head.scaleY = 0.4;
        
        snakeList.push(head);
        this.addChild(this.snakeList[0]);
        this.setChildIndex(this.snakeList[0], 0);

        let snakeName = new eui.Label(this.snakeName);
        snakeName.text = this.snakeName;
        snakeName.width = 60;
        snakeName.size = 20;
        snakeName.textAlign = egret.HorizontalAlign.CENTER;
        snakeName.x = head.x - snakeName.width / 2;
        snakeName.y = head.y - snakeName.height;
        snakeName.alpha = 0.8;
        snakeName.background = true;
        snakeName.backgroundColor = 0x77777;
        this.snakeNameLabel = snakeName;
        this.addChild(snakeName);
        
        // 生长蛇身
        this.createSnakeList(gridSize);
        
  }
  
  // 蛇头的移动(此时是暂时设置为蛇身元素)
  public moveSnake(snake: egret.Shape, direction: number): void {
      // 360 的话需要按照比例移动 ， 原来使用tween会有抖动更新太快
      let moveSize = this.moveSize;
      
      let go_x = moveSize * Math.cos(direction);
      let go_y = moveSize * Math.sin(direction);
    // 把整个轨迹记录下来
      egret.Tween.get(snake).to({ x: snake.x + go_x, y: snake.y + go_y }, 60);
      egret.Tween.get(this.snakeNameLabel).to({x: this.snakeNameLabel.x + go_x, y: this.snakeNameLabel.y + go_y}, 60);
  }

    // 蛇身的移动
    public moveSnakeBody(){
        if(this.snakeList.length == 0){
            return;
        }
        // 如果上一个蛇身距离小于蛇身不移动，大于等于之后在移动，去上一个蛇身的位置
        let snakeList = this.snakeList;
        let gridSize = this.gridSize;
        for (let i = 1; i < this.snakeList.length; i++) {
            egret.Tween.get(this.snakeList[i]).to({x : this.snakeList[i - 1].x, y: this.snakeList[i - 1].y}, 60);
        }
        let head = this.snakeList[0];
    
        this.moveSnake(head, this.direction);
    }

    // 初始的6节蛇身
    private createSnakeList(gridSize: number){
        for(let i = 1; i < 6; i++){
            let node: egret.Shape= new egret.Shape();
  
            node.graphics.beginFill(Math.random() * 0xffffff, 0.5);
            node.graphics.drawCircle(0, 0, gridSize);
            node.graphics.endFill();

            let moveSize = this.moveSize;
            
            node.x = this.snakeList[this.snakeList.length - 1].x - Math.floor(gridSize);
            node.y = this.snakeList[this.snakeList.length - 1].y - Math.floor(gridSize);

            this.snakeList.push(node);
            this.addChild(this.snakeList[this.snakeList.length - 1]);
           
            this.setChildIndex(this.snakeList[this.snakeList.length - 1], 0);
        }
        
    }

    // 吃到食物之后的生长
    public grow(){
        this.grade++;

        let node: egret.Shape= new egret.Shape();
  
        node.graphics.beginFill(0xffffff * Math.random(), 0.5);
        node.graphics.drawCircle(0, 0, this.gridSize);
        node.graphics.endFill();

        node.x = this.snakeList[this.snakeList.length - 1].x;
        node.y = this.snakeList[this.snakeList.length - 1].y;

        this.snakeList.push(node);
        this.addChild(this.snakeList[this.snakeList.length - 1]);
        this.snakeList[0].dragonBonesMC.animation.play("1",1);
        this.setChildIndex(this.snakeList[this.snakeList.length - 1], 0);
  }

  // 蛇的消失
  public delete(): void{
      let snakeList = this.snakeList;
      this.removeChild(this.snakeNameLabel);
        for(let i = 0 ; i < snakeList.length; i++){
            this.removeChild(snakeList[i]);
            snakeList.splice(i, 1);
            i--;
        }
  }

  // 蛇的重生
  public rebuild(){
      this.createSnake();
  }

  // 蛇的触碰
  public hitSnake(head:SnakeHead, length: number):boolean{
      let body = this.snakeList;
      let dis ;
      for(let i = 1; i < body.length; i++){
          dis = Math.sqrt((head.x-body[i].x)*(head.x-body[i].x) + (head.y-body[i].y)*(head.y-body[i].y));
          if( dis < (head.width + this.gridSize) / 2){
              return true;
          }
      }

      // 蛇头的碰撞
      dis = Math.sqrt((head.x-body[0].x)*(head.x-body[0].x) + (head.y-body[0].y)*(head.y-body[0].y));
      if(dis < (head.width +  this.gridSize) / 2 && body.length > length){
            return true;
    }

      return false;
  }




}
}
