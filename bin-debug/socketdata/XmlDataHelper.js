var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 对接受的xml数据进行处理,属于接受构造器
 */
var GreedySnakePlay;
(function (GreedySnakePlay) {
    var socketdata;
    (function (socketdata) {
        var XmlDataHelper = (function () {
            function XmlDataHelper() {
            }
            //取得节点的值,<c/>这样的节点反回空串值
            XmlDataHelper.getNodeValue = function (tempNode) {
                var res = "";
                var noteValue = tempNode.children[0];
                if (noteValue != null && noteValue != undefined) {
                    res = noteValue.text; //取得下一个节点的值
                }
                return res;
            };
            /**
             * <Direction> <root> <direction>
             */
            //判断是否是返回登录字符串，由发送构造器可以知道每一个登陆节点共三层，信息储存在最后一层
            XmlDataHelper.PlayInfoXml = function (reXML_xml) {
                var tempList = new Array();
                var tempStr = "";
                tempList.push("Direction");
                // 根节点的孩子
                var firstChild = reXML_xml.children;
                var sencondChild = null;
                var onetNode = null;
                var twoNode = null;
                // 对第一级子节点进行操作
                for (var i = 0; i < firstChild.length; i++) {
                    onetNode = firstChild[i];
                    if (onetNode != null && onetNode != undefined) {
                        // 对第二级子节点进行操作
                        sencondChild = onetNode.children;
                        if (sencondChild.length > 0) {
                            for (var j = 0; j < sencondChild.length; j++) {
                                twoNode = sencondChild[j];
                                // 判断节点类型
                                if (twoNode != null && twoNode != undefined && twoNode.nodeType == 1) {
                                    if (twoNode.name == "direction") {
                                        tempStr = this.getNodeValue(twoNode); // 成功解析，获取下一个值
                                        tempList.push(tempStr);
                                    }
                                }
                                else {
                                    console.log("xml解析失败");
                                }
                            }
                        }
                    }
                }
                return tempList;
            };
            //做数据解析
            XmlDataHelper.dateHelper = function (xmlStr) {
                var tempList = null;
                var xml = egret.XML.parse(xmlStr);
                if (xml != null && xml != undefined) {
                    var messageQuFen = xml.name;
                    var hasChildNodesFlg = xml.children.length > 0 ? true : false; //是否有子节点
                    if (hasChildNodesFlg) {
                        if (messageQuFen == "Direction") {
                            tempList = this.PlayInfoXml(xml);
                        }
                        else if (messageQuFen == "Speed") {
                            tempList = new Array();
                            tempList.push("Speed");
                        }
                    }
                }
                return tempList;
            };
            return XmlDataHelper;
        }());
        socketdata.XmlDataHelper = XmlDataHelper;
        __reflect(XmlDataHelper.prototype, "GreedySnakePlay.socketdata.XmlDataHelper");
    })(socketdata = GreedySnakePlay.socketdata || (GreedySnakePlay.socketdata = {}));
})(GreedySnakePlay || (GreedySnakePlay = {}));
//# sourceMappingURL=XmlDataHelper.js.map