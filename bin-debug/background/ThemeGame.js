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
/**
 * 地图左下角创建一个摇杆，根据摇杆来控制蛇移动的方向
 * 地图右下角创建一个按钮图片，点击可以让蛇移动的速度变快，再次点击可以让蛇恢复原来的速度。只控制其中一条蛇即可。
 */
var GreedySnakePlay;
(function (GreedySnakePlay) {
    var background;
    (function (background) {
        var ThemeGame = (function (_super) {
            __extends(ThemeGame, _super);
            // 构造
            function ThemeGame(gameSocket) {
                var _this = _super.call(this) || this;
                _this.speed = 100; // 移动速度
                _this.snakeController = 0; // 摇杆数据
                _this.gameSocket = null;
                _this.gameSocket = gameSocket;
                _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddedToStage, _this);
                return _this;
            }
            ThemeGame.prototype.onAddedToStage = function (event) {
                this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddedToStage, this);
                // 地图的添加
                this.gameBackground = new background.Gamebackground();
                this.addChild(this.gameBackground);
                // 食物的添加
                var foods = new GreedySnakePlay.gameobject.FoodsController();
                this.foods = foods;
                this.addChild(foods);
                // 摇杆
                var snakeController = this.snakeController;
                // 蛇的建立
                var snakePlayer = new GreedySnakePlay.gameobject.Snake(Math.floor(this.stage.stageWidth / 2), Math.floor(this.stage.stageWidth / 2), "用户蛇");
                this.snakePlayer = snakePlayer;
                this.snakePlayers = new Array();
                this.snakePlayers.push(snakePlayer);
                var snakePlayer01 = new GreedySnakePlay.gameobject.Snake(300, 600, "AI蛇1");
                this.snakePlayers.push(snakePlayer01);
                var snakePlayer02 = new GreedySnakePlay.gameobject.Snake(200, 800, "AI蛇2");
                this.snakePlayers.push(snakePlayer02);
                for (var i = 0; i < this.snakePlayers.length; i++) {
                    this.addChild(this.snakePlayers[i]);
                }
                // 倒计时的加入
                this.timeController = new background.TimeController();
                this.addChild(this.timeController);
                // 对表进行初始化
                for (var num = 0; num < this.snakePlayers.length; num++) {
                    var snakePlay = this.snakePlayers[num];
                    this.eatfood(snakePlay);
                }
                this.startGame();
            };
            // 开始游戏，通过时间控制蛇的强制移动
            ThemeGame.prototype.startGame = function () {
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
                for (var num = 0; num < this.snakePlayers.length; num++) {
                    var snakePlay = this.snakePlayers[num];
                    this.timeBegin(snakePlay);
                }
                var rank = this.rank(this.snakePlayers);
                this.gameRank(rank);
                this.gamerank = rank;
            };
            // 返回排名
            ThemeGame.prototype.rank = function (snakePlayers) {
                var res = new Array();
                var grades = new Array();
                for (var num = 0; num < snakePlayers.length; num++) {
                    var snakePlay = snakePlayers[num];
                    grades.push(snakePlay.grade);
                }
                for (var num = 0; num < snakePlayers.length; num++) {
                    res[num] = num;
                    for (var j = num + 1; j < snakePlayers.length; j++) {
                        if (grades[num] < grades[j]) {
                            var temp = grades[num];
                            grades[num] = grades[j];
                            grades[j] = temp;
                            res[num] = j;
                        }
                    }
                }
                return res;
            };
            // 改变方向，之后可以改成回调
            ThemeGame.prototype.changeDirection = function () {
                this.snakePlayer.direction = this.snakeController;
            };
            // 判断所有蛇的吃食物
            ThemeGame.prototype.hitFood = function () {
                var _loop_1 = function (num) {
                    var snakePlay = this_1.snakePlayers[num];
                    // 判断是否存在，可以修改成删除蛇
                    if (snakePlay.snakeList.length == 0) {
                        return "continue";
                    }
                    var foods = this_1.foods;
                    var movePoint = new egret.Point();
                    for (var i = 0; i < foods.foods.length; i++) {
                        // 范围碰撞与数组的移除
                        movePoint.x = snakePlay.snakeList[0].x - foods.foods[i].x;
                        movePoint.y = snakePlay.snakeList[0].y - foods.foods[i].y;
                        if (Math.sqrt(movePoint.x * movePoint.x + movePoint.y * movePoint.y) <= 40) {
                            snakePlay.grow();
                            // 吃食物的
                            this_1.foods.eatFood(foods.foods[i], snakePlay.snakeList[0].x, snakePlay.snakeList[0].y);
                            foods.foods.splice(i, 1);
                            i--; // 也可以从后往前
                            // 发送数据
                            this_1.eatfood(snakePlay);
                            var rank = this_1.rank(this_1.snakePlayers);
                            var send = 0;
                            for (var i_1 = 0; i_1 < rank.length; i_1++) {
                                if (rank[i_1] != this_1.rank[i_1]) {
                                    send = 1;
                                    break;
                                }
                            }
                            if (send == 1) {
                                this_1.gameRank(rank);
                            }
                        }
                    }
                    // 判断撞墙 只是把长度记为0，并没有从用户里面删除
                    if (snakePlay.snakeList[0].x < 0 || snakePlay.snakeList[0].x >= this_1.stage.stageWidth || snakePlay.snakeList[0].y < 0 || snakePlay.snakeList[0].y >= this_1.stage.stageHeight) {
                        foods.trantofood(snakePlay);
                        snakePlay.delete();
                        egret.setTimeout(function (call) {
                            snakePlay.rebuild();
                        }, this_1, 2000);
                        return { value: void 0 };
                    }
                    if (this_1.snakePlayer != snakePlay) {
                        if (snakePlay.snakeList[0].x < 20 || snakePlay.snakeList[0].x >= this_1.stage.stageWidth - 20 || snakePlay.snakeList[0].y < 20 || snakePlay.snakeList[0].y >= this_1.stage.stageHeight - 20) {
                            var temp_x = this_1.stage.stageWidth / 2 - snakePlay.snakeList[0].x;
                            var temp_y = this_1.stage.stageHeight / 2 - snakePlay.snakeList[0].y;
                            snakePlay.direction = Math.atan2(temp_y, temp_x);
                        }
                    }
                    // 判断撞蛇，但是只是把长度记为0，并没有从用户里面删除
                    for (var j = 0; j < this_1.snakePlayers.length; j++) {
                        if (j === num)
                            continue;
                        if (this_1.snakePlayers[j].snakeList.length != 0 && this_1.snakePlayers[j].hitSnake(snakePlay.snakeList[0], snakePlay.snakeList.length)) {
                            foods.trantofood(snakePlay);
                            snakePlay.delete();
                            egret.setTimeout(function (call) {
                                snakePlay.rebuild();
                            }, this_1, 2000);
                            return { value: void 0 };
                        }
                    }
                    if (this_1.timeController.timerover) {
                        this_1.gameOver();
                        return { value: void 0 };
                    }
                };
                var this_1 = this;
                for (var num = 0; num < this.snakePlayers.length; num++) {
                    var state_1 = _loop_1(num);
                    if (typeof state_1 === "object")
                        return state_1.value;
                }
            };
            // 游戏结束
            ThemeGame.prototype.gameOver = function () {
                this.timer.stop();
                this.foods.timeover();
                for (var num = 0; num < this.snakePlayers.length; num++) {
                    var snakePlay = this.snakePlayers[num];
                    this.timeEnd(snakePlay);
                }
                return;
            };
            // 获得贪吃蛇的信息，并发送给服务器端
            ThemeGame.prototype.eatfood = function (snakePlayer) {
                // console.log("发送成绩信息" + snakePlayer.snakeName);
                var sendXml = GreedySnakePlay.socketdata.SendXmlHelper.buildUserGradeXml(snakePlayer.snakeName, snakePlayer.grade); //构造活跃信息xml
                this.sendXmlToServer(sendXml); //发送xml文档到服务器
            };
            // 发送开始时间
            ThemeGame.prototype.timeBegin = function (snakePlayer) {
                var sendXml = GreedySnakePlay.socketdata.SendXmlHelper.buildGameStaticXml(1, snakePlayer.snakeName); //构造活跃信息xml
                this.sendXmlToServer(sendXml); //发送xml文档到服务器
            };
            ThemeGame.prototype.timeEnd = function (snakePlayer) {
                var sendXml = GreedySnakePlay.socketdata.SendXmlHelper.buildGameStaticXml(0, snakePlayer.snakeName); //构造活跃信息xml
                this.sendXmlToServer(sendXml); //发送xml文档到服务器
            };
            // 发送排行
            ThemeGame.prototype.gameRank = function (rank) {
                var sendXml = GreedySnakePlay.socketdata.SendXmlHelper.buildGameRankXml(rank); //构造活跃信息xml
                this.sendXmlToServer(sendXml); //发送xml文档到服务器
            };
            //发送数据到服务器端
            ThemeGame.prototype.sendXmlToServer = function (xmlStr) {
                //websocket
                var gameSocket = this.gameSocket;
                if (gameSocket != null && gameSocket.connected == true) {
                    // this.gameSocket.writeUTFBytes(xmlStr + "\n");
                    gameSocket.writeUTF(xmlStr + "\n");
                    gameSocket.flush(); //对套接字输出缓冲区中积累的所有数据进行刷新
                    console.log("成功发送");
                }
            };
            return ThemeGame;
        }(egret.DisplayObjectContainer));
        background.ThemeGame = ThemeGame;
        __reflect(ThemeGame.prototype, "GreedySnakePlay.background.ThemeGame");
    })(background = GreedySnakePlay.background || (GreedySnakePlay.background = {}));
})(GreedySnakePlay || (GreedySnakePlay = {}));
//# sourceMappingURL=ThemeGame.js.map