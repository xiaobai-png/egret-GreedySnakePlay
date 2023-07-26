module GreedySnakePlay.gameobject{
    export class FoodsController extends egret.DisplayObjectContainer {

     /**
     * @language zh_CN
     * 解析食物
     * @param Fonds 所有的食物
     * @param Timer 计时器
     */

    public timer: egret.Timer; // 计时器
    public foods: egret.Shape[]; // 食物列表

    private gridSize: number = 10; // 食物大小

    // 开始构建
    public constructor() {
        super();
        // 添加五个圆形食物，需要避免位置重复
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.addFoods, this);

        let timer = new egret.Timer(5000);
        this.timer = timer;
        timer.addEventListener(egret.TimerEvent.TIMER, this.addFoods, this);
        timer.start();
    }

    // 食物的绘画
    private food(): egret.Shape{
        let food = new egret.Shape();
         // 食物的绘画
        let point = this.randomFoodPosition();
        food.graphics.beginFill(Math.random() * 0xffffff);
        food.graphics.drawCircle(0, 0, this.gridSize);
        food.graphics.endFill();
        food.x = point.x;
        food.y = point.y;
        return food;
    }

    // 添加五个圆形食物
    private addFoods(): void{

        // 切换临时变量
        if(!this.foods){
            this.foods = new Array<egret.Shape>();
        }
        let foods = this.foods;
        // 原长度
        let num = foods.length;

        for(let i = 0 ; i < 10; i++){
            let food01 = this.food();
        
            this.positionsSame(foods, food01);
        }
        
        // 添加到舞台
        for(let i = num; i < foods.length; i++){
            this.addChild(foods[i]);
        
        }

    }

    // 判断位置重合
    private positionsSame(Foods: egret.Shape[], Food: egret.Shape){
        for(let i = 0; i < Foods.length; i++){
            if(Food.x === Foods[i].x && Food.y === Foods[i].y){
                // 重合后 x 的位置
                if(Food.x + 5 < this.stage.width){
                    Food.x += 5;
                    Food.x += 5;
                }else{ 
                    Food.x -= 5; 
                    Food.x -= 5;
                }

                // 重合后 y 的位置
                if(Food.y + 5 < this.stage.height){
                    Food.y += 5;
                    Food.y += 5;
                }else{ 
                    Food.y -= 5; 
                     Food.y -= 5;
                }
            }
        }

        Foods.push(Food);
    }

    // 随机位置，并且位置不可改变
    public randomFoodPosition(): egret.Point {
      let gridSize = this.gridSize;
      let gridCountX = Math.floor(this.stage.stageWidth / gridSize);
      let gridCountY = Math.floor(this.stage.stageHeight / gridSize);
      let x = Math.floor(Math.random() * gridCountX) * gridSize;
      let y = Math.floor(Math.random() * gridCountY) * gridSize;

      let point = new egret.Point();
      point.x = x;
      point.y = y;
      return point;
    }

    // 吃食物
    public eatFood(Food: egret.Shape, movex: number, movey: number):void {
       
        egret.Tween.get(Food).to({x : movex, y: movey}, 100);
        egret.setTimeout(call=>{this.removeChild(Food)}, this, 100);

    }

    // 蛇变食物
    public trantofood(goal: Snake): void{
        // 相应位置变食物
        for(let i = 0 ; i < goal.snakeList.length; i++){
            let food = this.food();
            food.x = goal.snakeList[i].x;
            food.y = goal.snakeList[i].y;
            this.foods.push(food);
            this.addChild(food);
        }


    }

    public timeover(){
        this.timer.stop();
    }

}
}
