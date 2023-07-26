// 五分钟时间控制
module GreedySnakePlay.background{
    export class TimeController extends egret.DisplayObjectContainer{
    // 时间标签
    public timeLabel: egret.TextField;
    public timerover: boolean = false;
    private timerCount: egret.Timer;
    private timerSeconds: number = 300;
    

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    // 初始函数
    private onAddToStage(event: egret.Event) {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.createTimeLabel();
        this.startTimer();
    }

    // 创建时间标签
    private createTimeLabel() {
        let timeLabel = new egret.TextField();
        this.timeLabel = timeLabel;
        timeLabel.textColor = 0x80ff80; // 文字颜色为绿色
        timeLabel.size = 70; // 文字大小为24
        timeLabel.text = this.getCurrentTime(this.timerSeconds); // 设置初始时间
        timeLabel.x = (this.stage.stageWidth - this.timeLabel.width) / 2; // 居中显示
        timeLabel.y = 100;
        this.addChild(this.timeLabel);
    }

    private startTimer() {

        this.timerCount = new egret.Timer(1000, this.timerSeconds); // 创建一个1秒间隔的计时器，总次数为倒计时秒数
        this.timerCount.addEventListener(egret.TimerEvent.TIMER, this.updateTime, this);
        this.timerCount.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.completeCountdown, this);
        this.timerCount.start();
    }

    private updateTime() {
        let timerSeconds = this.timerSeconds;
        timerSeconds--;
        this.timerSeconds = timerSeconds;
        this.timeLabel.text = this.getCurrentTime(timerSeconds); // 更新时间

    }

    private getCurrentTime(timer: number): string {
        let minutes = this.formatTime(Math.floor(timer / 60));
        let seconds = this.formatTime(timer % 60);
        if(timer < 30) {this.timeLabel.textColor = 0xff4d4d;}
        return minutes + ":" + seconds;
    }

    public completeCountdown() {
        let timeLabel = this.timeLabel;
        timeLabel.text = "游戏结束！";
        this.timeLabel.x = (this.stage.stageWidth - this.timeLabel.width) / 2; 
        this.timerCount.stop();
        this.timerover = true;

        // 发送结果信息
    }

    private formatTime(value: number): string {
        return value < 10 ? "0" + value : value.toString();
    }
}
}
