/**
 * 发送构造器
 */
module GreedySnakePlay.socketdata {

    export class SendXmlHelper {
        public constructor() {

		}

		//构造 分数 
		public static buildUserGradeXml(userName: string, grade: number): string {
			let res: string = "<UserGrade><root>"
				+ "<userName><![CDATA[" + userName + "]]></userName>"
				+ "<userGrade><![CDATA[" + grade + "]]></userGrade>"
				+ "</root></UserGrade></over>";
			return res;
		}

		// 开始与结束
		public static buildGameStaticXml(time: number, userName: string): string {
			let res: string = "<GameTime><root>"
				+ "<gameStatic><![CDATA[" + time + "]]></gameStatic>"
				+ "<userName><![CDATA[" + userName + "]]></userName>"
				+ "</root></GameTime></over>";
			return res;
		}

		// 排名 在后端 前端此处不进行实现
		public static buildGameRankXml(player: number[]): string {
			
			let res: string = "<UserRank><root>";
				// + "<gameEnd><![CDATA[" + userName + "]]></gameEnd>"
				// + "</root></UserGrade></over>";
				for(let i = 0; i< player.length; i++){
					res = res + `"<rank${i}><![CDATA[${player[i]}]]></rank${i}>"`
				}
				res = res + "</root></UserRank></over>";


			return res;
		}

    }

}