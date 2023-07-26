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
        var SnakeHead = (function (_super) {
            __extends(SnakeHead, _super);
            // private sound: egret.Sound;
            // private soundChannel:egret.SoundChannel;
            function SnakeHead() {
                var _this = _super.call(this) || this;
                _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.init, _this);
                return _this;
            }
            SnakeHead.prototype.init = function () {
                // 加载龙骨资源
                var dragonBonesData = RES.getRes("liruolingxiao_dbbin");
                var textureData = RES.getRes("liruolingxiao_json");
                var texture = RES.getRes("liruolingxiao_png");
                // 动画工厂
                var factory = new dragonBones.EgretFactory();
                // 解析并添加龙骨数据
                factory.parseDragonBonesData(dragonBonesData);
                factory.parseTextureAtlasData(textureData, texture);
                // 位置与大小
                var dragonBonesMC = factory.buildArmatureDisplay("MovieClip");
                // dragonBonesMC.x = 300;
                // dragonBonesMC.y = 500;
                // dragonBonesMC.width = 15;
                // dragonBonesMC.height= 15;
                this.dragonBonesMC = dragonBonesMC;
                this.addChild(dragonBonesMC);
                // // 添加背景音乐
                // let sound: egret.Sound = new egret.Sound();
                // sound = RES.getRes("sound_mp3");
                // this.sound = sound;
                // 开始结束运行逻辑，运行逻辑
                dragonBonesMC.animation.play("1", 1);
                // let channel = sound.play(); // 默认循环播放
                // this.soundChannel = channel;
                dragonBonesMC.addEventListener(dragonBones.MovieEvent.COMPLETE, this.onAnimationComplete, this);
                // // 按钮控制重新开始
                // let buttonagain: eui.Button = new eui.Button();
                // buttonagain.x = this.stage.height/2;
                // buttonagain.y = this.stage.width/2;
                // buttonagain.label = "播放动画";
                // buttonagain.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
                //     this.dragonBonesMC.animation.play("1", 1);
                //     // sound.play();
                // }, this);
                // this.addChild(buttonagain);
            };
            // 播放完的动画
            SnakeHead.prototype.onAnimationComplete = function (event) {
                var dragonBonesMC = this.dragonBonesMC;
                // this.soundChannel.stop();
                dragonBonesMC.animation.gotoAndStopByFrame("1", this.dragonBonesMC.animation.animations[1].frameCount);
            };
            return SnakeHead;
        }(egret.DisplayObjectContainer));
        gameobject.SnakeHead = SnakeHead;
        __reflect(SnakeHead.prototype, "GreedySnakePlay.gameobject.SnakeHead");
    })(gameobject = GreedySnakePlay.gameobject || (GreedySnakePlay.gameobject = {}));
})(GreedySnakePlay || (GreedySnakePlay = {}));
//# sourceMappingURL=SnakeHead.js.map