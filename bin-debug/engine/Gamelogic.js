/**
 * 登录与socket的连接，使用tcp通信
 */
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
    var engine;
    (function (engine) {
        var Gamelogic = (function (_super) {
            __extends(Gamelogic, _super);
            // 开始页面的加载
            function Gamelogic() {
                var _this = _super.call(this) || this;
                _this.gameSocket = null;
                _this.stringBuffer = ""; //数据缓冲区
                _this.gameplay = null; // 同一个模块里面
                _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.init, _this);
                return _this;
            }
            Gamelogic.prototype.init = function () {
                // 进行连接与加场景
                this.connect();
            };
            // 点击登录，连接方法
            Gamelogic.prototype.connect = function () {
                var url = "192.168.1.45";
                var port = 8205;
                // websocket
                var gameSocket = this.gameSocket;
                if (gameSocket != null) {
                    this.disposeGameSocket();
                }
                gameSocket = new egret.WebSocket(); //构造socket
                this.gameSocket = gameSocket;
                gameSocket.addEventListener(egret.Event.CLOSE, this.closeHandler, this); //socket关闭
                gameSocket.addEventListener(egret.Event.CONNECT, this.connectHandler, this); //socket连接
                gameSocket.addEventListener(egret.IOErrorEvent.IO_ERROR, this.ioErrorHandler, this); //socket ioError
                gameSocket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.webSocketDataHandler, this); //接收数据
                gameSocket.connect(url, port); //链接socket 
            };
            /**
             * 释放Socket连接
             */
            Gamelogic.prototype.disposeGameSocket = function () {
                // 测试：websocket
                var gameSocket = this.gameSocket;
                if (gameSocket != null) {
                    if (gameSocket.hasEventListener(egret.Event.CLOSE)) {
                        gameSocket.removeEventListener(egret.Event.CLOSE, this.closeHandler, this);
                    }
                    if (gameSocket.hasEventListener(egret.Event.CONNECT)) {
                        gameSocket.removeEventListener(egret.Event.CONNECT, this.connectHandler, this);
                    }
                    if (gameSocket.hasEventListener(egret.IOErrorEvent.IO_ERROR)) {
                        gameSocket.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.ioErrorHandler, this);
                    }
                    if (gameSocket.hasEventListener(egret.ProgressEvent.SOCKET_DATA)) {
                        gameSocket.removeEventListener(egret.ProgressEvent.SOCKET_DATA, this.webSocketDataHandler, this);
                    }
                    gameSocket.close(); //关闭连接
                    this.gameSocket = null;
                }
            };
            // 服务器发送过来的数据
            Gamelogic.prototype.webSocketDataHandler = function (event) {
                console.log("接收信息");
                this.socketDataHandler(this.gameSocket.readUTF());
            };
            // 服务器发送过来的数据
            Gamelogic.prototype.socketDataHandler = function (str) {
                str = GreedySnakePlay.util.ChatUtil.trim(str);
                if (str != "") {
                    var stringBuffer = this.stringBuffer;
                    stringBuffer += str;
                    var index = stringBuffer.indexOf("</over>"); //查找结束符号
                    // 多个操作语句
                    while (index != -1) {
                        var distr = stringBuffer.substring(0, index);
                        stringBuffer = stringBuffer.substring(index + 7, stringBuffer.length);
                        this.gameDataHelper(distr); //把数据转交个游戏数据分析方法处理
                        index = stringBuffer.indexOf("</over>"); //查找结束符号
                    }
                    this.stringBuffer = stringBuffer;
                }
            };
            /* 游戏数据分析方法
           * 游戏数据处理类,该类中发现如果回来的数据为本类处理的数据
           * 则处理数据,如果是GameLogicEngine类处理的数据,就把数据传送给GameLogicEngine类的gameDataHelper方法
           */
            Gamelogic.prototype.gameDataHelper = function (xmlStr) {
                // egret.log(xmlStr);
                var tempList = GreedySnakePlay.socketdata.XmlDataHelper.dateHelper(xmlStr); //解析数据,返回数据组数,如果该数组为null,表示不能解析成功
                if (tempList != null) {
                    if (tempList[0] == "Direction") {
                        this.checkDirection(tempList[1]);
                    }
                    else if (tempList[0] == "Speed") {
                        this.checkSpeed();
                    }
                }
                else {
                    console.log("解析失败");
                }
            };
            /**
            * 检查登陆的信息
            */
            Gamelogic.prototype.checkDirection = function (direct) {
                this.gameplay.snakeController = parseInt(direct);
            };
            // 速度
            Gamelogic.prototype.checkSpeed = function () {
                this.gameplay.snakePlayer.moveSize = this.gameplay.snakePlayer.moveSize == 5 ? 15 : 5;
                console.log(this.gameplay.snakePlayer.moveSize);
            };
            //连接关闭
            Gamelogic.prototype.closeHandler = function (event) {
                console.log("连接关闭");
            };
            //socket连接成功
            Gamelogic.prototype.connectHandler = function (event) {
                console.log("连接成功");
                var gameplay = this.gameplay;
                if (gameplay == null) {
                    gameplay = new GreedySnakePlay.background.ThemeGame(this.gameSocket);
                    this.addChild(gameplay);
                    this.gameplay = gameplay;
                }
            };
            //连接失败
            Gamelogic.prototype.ioErrorHandler = function (event) {
                console.log("连接失败");
            };
            return Gamelogic;
        }(egret.DisplayObjectContainer));
        engine.Gamelogic = Gamelogic;
        __reflect(Gamelogic.prototype, "GreedySnakePlay.engine.Gamelogic");
    })(engine = GreedySnakePlay.engine || (GreedySnakePlay.engine = {}));
})(GreedySnakePlay || (GreedySnakePlay = {}));
//# sourceMappingURL=Gamelogic.js.map