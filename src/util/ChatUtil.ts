module GreedySnakePlay.util {

    export class ChatUtil {
        public constructor() {
        }

        //去掉字符串的前后空格
        public static trim(char: string): string {
            return ChatUtil.rtrim(ChatUtil.ltrim(char));
        }
        public static ltrim(char: string): string {
            let pattern: RegExp = /^\s*/;
            return char.replace(pattern, "");
        }
        public static rtrim(char: string): string {
            let pattern: RegExp = /\s*$/;
            return char.replace(pattern, "");
        }
    }

       
}
