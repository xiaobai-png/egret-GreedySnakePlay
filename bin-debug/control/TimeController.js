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
// 五分钟时间控制
var GreedySnakePlay;
(function (GreedySnakePlay) {
    var background;
    (function (background) {
        var TimeController = (function (_super) {
            __extends(TimeController, _super);
            function TimeController() {
                var _this = _super.call(this) || this;
                _this.timerover = false;
                _this.timerSeconds = 300;
                _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
                return _this;
            }
            // 初始函数
            TimeController.prototype.onAddToStage = function (event) {
                this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
                this.createTimeLabel();
                this.startTimer();
            };
            // 创建时间标签
            TimeController.prototype.createTimeLabel = function () {
                var timeLabel = new egret.TextField();
                this.timeLabel = timeLabel;
                timeLabel.textColor = 0x80ff80; // 文字颜色为绿色
                timeLabel.size = 70; // 文字大小为24
                timeLabel.text = this.getCurrentTime(this.timerSeconds); // 设置初始时间
                timeLabel.x = (this.stage.stageWidth - this.timeLabel.width) / 2; // 居中显示
                timeLabel.y = 100;
                this.addChild(this.timeLabel);
            };
            TimeController.prototype.startTimer = function () {
                this.timerCount = new egret.Timer(1000, this.timerSeconds); // 创建一个1秒间隔的计时器，总次数为倒计时秒数
                this.timerCount.addEventListener(egret.TimerEvent.TIMER, this.updateTime, this);
                this.timerCount.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.completeCountdown, this);
                this.timerCount.start();
            };
            TimeController.prototype.updateTime = function () {
                var timerSeconds = this.timerSeconds;
                timerSeconds--;
                this.timerSeconds = timerSeconds;
                this.timeLabel.text = this.getCurrentTime(timerSeconds); // 更新时间
            };
            TimeController.prototype.getCurrentTime = function (timer) {
                var minutes = this.formatTime(Math.floor(timer / 60));
                var seconds = this.formatTime(timer % 60);
                if (timer < 30) {
                    this.timeLabel.textColor = 0xff4d4d;
                }
                return minutes + ":" + seconds;
            };
            TimeController.prototype.completeCountdown = function () {
                var timeLabel = this.timeLabel;
                timeLabel.text = "游戏结束！";
                this.timeLabel.x = (this.stage.stageWidth - this.timeLabel.width) / 2;
                this.timerCount.stop();
                this.timerover = true;
                // 发送结果信息
            };
            TimeController.prototype.formatTime = function (value) {
                return value < 10 ? "0" + value : value.toString();
            };
            return TimeController;
        }(egret.DisplayObjectContainer));
        background.TimeController = TimeController;
        __reflect(TimeController.prototype, "GreedySnakePlay.background.TimeController");
    })(background = GreedySnakePlay.background || (GreedySnakePlay.background = {}));
})(GreedySnakePlay || (GreedySnakePlay = {}));
//# sourceMappingURL=TimeController.js.map