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
    var background;
    (function (background_1) {
        var Gamebackground = (function (_super) {
            __extends(Gamebackground, _super);
            // 进行构造
            function Gamebackground() {
                var _this = _super.call(this) || this;
                _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.init, _this);
                return _this;
            }
            // 地图的初始化
            Gamebackground.prototype.init = function (event) {
                this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.init, this);
                var background = new egret.Bitmap(RES.getRes("background_png"));
                var H = this.stage.stageHeight;
                background.x = -400;
                background.y = -400;
                background.width = H * 1.5;
                background.height = H * 1.5;
                this.addChild(background);
            };
            return Gamebackground;
        }(egret.DisplayObjectContainer));
        background_1.Gamebackground = Gamebackground;
        __reflect(Gamebackground.prototype, "GreedySnakePlay.background.Gamebackground");
    })(background = GreedySnakePlay.background || (GreedySnakePlay.background = {}));
})(GreedySnakePlay || (GreedySnakePlay = {}));
//# sourceMappingURL=Gamebackground.js.map