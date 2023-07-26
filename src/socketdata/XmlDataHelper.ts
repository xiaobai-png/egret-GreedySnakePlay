/**
 * 对接受的xml数据进行处理,属于接受构造器
 */
module GreedySnakePlay.socketdata {
    export class XmlDataHelper {
        public constructor() {

		}

		//取得节点的值,<c/>这样的节点反回空串值
		private static getNodeValue(tempNode: egret.XML): string {
			let res: string = "";
			let noteValue: egret.XMLText = <egret.XMLText>tempNode.children[0];
			if (noteValue != null && noteValue != undefined) {//tempNode的下一个节点不等于空
				res = noteValue.text;//取得下一个节点的值
			}
			return res;
		}
        /**
         * <Direction> <root> <direction>
         */
        //判断是否是返回登录字符串，由发送构造器可以知道每一个登陆节点共三层，信息储存在最后一层
		public static PlayInfoXml(reXML_xml: egret.XML): Array<any> {
			let tempList: Array<any> = new Array<any>();
			let tempStr = "";
			tempList.push("Direction");
            // 根节点的孩子
			let firstChild = reXML_xml.children;
			let sencondChild = null;
			let onetNode: egret.XML = null;
			let twoNode: egret.XML = null;
            // 对第一级子节点进行操作
			for (let i = 0; i < firstChild.length; i++) {
				onetNode = <egret.XML>firstChild[i];
				if (onetNode != null && onetNode != undefined) {
                    // 对第二级子节点进行操作
					sencondChild = onetNode.children;
					if (sencondChild.length > 0) {
						for (let j = 0; j < sencondChild.length; j++) {
							twoNode = <egret.XML>sencondChild[j];
                            // 判断节点类型
							if (twoNode != null && twoNode != undefined && twoNode.nodeType == 1) {
								if (twoNode.name == "direction") {
									tempStr = this.getNodeValue(twoNode);  // 成功解析，获取下一个值
									tempList.push(tempStr);
								}
							}else{
                                console.log("xml解析失败");
                            }
						}
					}
				}
			}
			return tempList;
		}

		//做数据解析
		public static dateHelper(xmlStr: string): Array<any> {
			let tempList: Array<any> = null;
			
			let xml: egret.XML = egret.XML.parse(xmlStr);
			
			if (xml != null && xml != undefined) {
				let messageQuFen: string = xml.name;
				let hasChildNodesFlg: boolean = xml.children.length > 0 ? true : false;//是否有子节点
				if (hasChildNodesFlg) {
					if (messageQuFen == "Direction") {// 登录消息
						tempList = this.PlayInfoXml(xml);
					}else if (messageQuFen == "Speed") {
						tempList = new Array<any>();
						tempList.push("Speed");
					}
				}
			}

			return tempList;
        }
    }
}