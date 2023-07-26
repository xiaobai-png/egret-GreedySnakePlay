var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var GreedySnakePlay;
(function (GreedySnakePlay) {
    var gameobject;
    (function (gameobject) {
        var FoodsController = (function (_super) {
            __extends(FoodsController, _super);
            // 开始构建
            function FoodsController() {
                var _this = _super.call(this) || this;
                _this.gridSize = 10; // 食物大小
                // 添加五个圆形食物，需要避免位置重复
                _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.addFoods, _this);
                var timer = new egret.Timer(5000);
                _this.timer = timer;
                timer.addEventListener(egret.TimerEvent.TIMER, _this.addFoods, _this);
                timer.start();
                return _this;
            }
            // 食物的绘画
            FoodsController.prototype.food = function () {
                var food = new egret.Shape();
                // 食物的绘画
                var point = this.randomFoodPosition();
                food.graphics.beginFill(Math.random() * 0xffffff);
                food.graphics.drawCircle(0, 0, this.gridSize);
                food.graphics.endFill();
                food.x = point.x;
                food.y = point.y;
                return food;
            };
            // 添加五个圆形食物
            FoodsController.prototype.addFoods = function () {
                // 切换临时变量
                if (!this.foods) {
                    this.foods = new Array();
                }
                var foods = this.foods;
                // 原长度
                var num = foods.length;
                for (var i = 0; i < 10; i++) {
                    var food01 = this.food();
                    this.positionsSame(foods, food01);
                }
                // 添加到舞台
                for (var i = num; i < foods.length; i++) {
                    this.addChild(foods[i]);
                }
            };
            // 判断位置重合
            FoodsController.prototype.positionsSame = function (Foods, Food) {
                for (var i = 0; i < Foods.length; i++) {
                    if (Food.x === Foods[i].x && Food.y === Foods[i].y) {
                        // 重合后 x 的位置
                        if (Food.x + 5 < this.stage.width) {
                            Food.x += 5;
                            Food.x += 5;
                        }
                        else {
                            Food.x -= 5;
                            Food.x -= 5;
                        }
                        // 重合后 y 的位置
                        if (Food.y + 5 < this.stage.height) {
                            Food.y += 5;
                            Food.y += 5;
                        }
                        else {
                            Food.y -= 5;
                            Food.y -= 5;
                        }
                    }
                }
                Foods.push(Food);
            };
            // 随机位置，并且位置不可改变
            FoodsController.prototype.randomFoodPosition = function () {
                var gridSize = this.gridSize;
                var gridCountX = Math.floor(this.stage.stageWidth / gridSize);
                var gridCountY = Math.floor(this.stage.stageHeight / gridSize);
                var x = Math.floor(Math.random() * gridCountX) * gridSize;
                var y = Math.floor(Math.random() * gridCountY) * gridSize;
                var point = new egret.Point();
                point.x = x;
                point.y = y;
                return point;
            };
            // 吃食物
            FoodsController.prototype.eatFood = function (Food, movex, movey) {
                var _this = this;
                egret.Tween.get(Food).to({ x: movex, y: movey }, 100);
                egret.setTimeout(function (call) { _this.removeChild(Food); }, this, 100);
            };
            // 蛇变食物
            FoodsController.prototype.trantofood = function (goal) {
                // 相应位置变食物
                for (var i = 0; i < goal.snakeList.length; i++) {
                    var food = this.food();
                    food.x = goal.snakeList[i].x;
                    food.y = goal.snakeList[i].y;
                    this.foods.push(food);
                    this.addChild(food);
                }
            };
            FoodsController.prototype.timeover = function () {
                this.timer.stop();
            };
            return FoodsController;
        }(egret.DisplayObjectContainer));
        gameobject.FoodsController = FoodsController;
        __reflect(FoodsController.prototype, "GreedySnakePlay.gameobject.FoodsController");
    })(gameobject = GreedySnakePlay.gameobject || (GreedySnakePlay.gameobject = {}));
})(GreedySnakePlay || (GreedySnakePlay = {}));
//# sourceMappingURL=FoodsController.js.map