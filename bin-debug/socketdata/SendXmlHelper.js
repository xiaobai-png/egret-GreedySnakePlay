var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 发送构造器
 */
var GreedySnakePlay;
(function (GreedySnakePlay) {
    var socketdata;
    (function (socketdata) {
        var SendXmlHelper = (function () {
            function SendXmlHelper() {
            }
            //构造 分数 
            SendXmlHelper.buildUserGradeXml = function (userName, grade) {
                var res = "<UserGrade><root>"
                    + "<userName><![CDATA[" + userName + "]]></userName>"
                    + "<userGrade><![CDATA[" + grade + "]]></userGrade>"
                    + "</root></UserGrade></over>";
                return res;
            };
            // 开始与结束
            SendXmlHelper.buildGameStaticXml = function (time, userName) {
                var res = "<GameTime><root>"
                    + "<gameStatic><![CDATA[" + time + "]]></gameStatic>"
                    + "<userName><![CDATA[" + userName + "]]></userName>"
                    + "</root></GameTime></over>";
                return res;
            };
            // 排名 在后端 前端此处不进行实现
            SendXmlHelper.buildGameRankXml = function (player) {
                var res = "<UserRank><root>";
                // + "<gameEnd><![CDATA[" + userName + "]]></gameEnd>"
                // + "</root></UserGrade></over>";
                for (var i = 0; i < player.length; i++) {
                    res = res + ("\"<rank" + i + "><![CDATA[" + player[i] + "]]></rank" + i + ">\"");
                }
                res = res + "</root></UserRank></over>";
                return res;
            };
            return SendXmlHelper;
        }());
        socketdata.SendXmlHelper = SendXmlHelper;
        __reflect(SendXmlHelper.prototype, "GreedySnakePlay.socketdata.SendXmlHelper");
    })(socketdata = GreedySnakePlay.socketdata || (GreedySnakePlay.socketdata = {}));
})(GreedySnakePlay || (GreedySnakePlay = {}));
//# sourceMappingURL=SendXmlHelper.js.map