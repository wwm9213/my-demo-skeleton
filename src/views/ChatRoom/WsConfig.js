import * as TYPE from "./types";
import moment from "moment";
class WsConfig {
    constructor(wsUrl) {
        this.wsUrl = wsUrl
        this.ws = null
        this.lockReconnect = false; //避免重复连接
        this.timeout = 3000 //每隔三秒发送心跳
        this.num = 3  //3次心跳均未响应重连
        this.timeoutObj = null
        this.serverTimeoutObj = null

        this.createWs()
    }

    // 创建连接
    createWs() {
        try {
            this.ws = new WebSocket(this.wsUrl)
            this.init();
        } catch (e) {
            console.log('catch', e);
            this.reconnect();
        }
    }

    init() {
        this.onclose()
        this.onerror()
        this.onopen()
        this.onmessage()
    }

    onclose(cb) {
        const _this = this
        this.ws.onclose = function (e) {
            console.log('链接关闭');
            cb && cb(e)
            _this.reconnect();
        };
    }

    onerror(cb) {
        const _this = this
        this.ws.onerror = function (e) {
            console.log('发生异常了');
            cb && cb(e)
            _this.reconnect();
        };
    }

    onopen(cb) {
        const _this = this
        this.ws.onopen = function (e) {
            //心跳检测重置
            cb && cb(e)
            _this.heartCheck();
        };
    }

    onmessage(cb) {
        const _this = this
        this.ws.onmessage = function (event) {
            //拿到任何消息都说明当前连接是正常的
            cb && cb(event)
            _this.heartCheck();
        }
    }

    // 重连操作
    reconnect() {
        if (this.lockReconnect) {
            return;
        };
        this.lockReconnect = true;
        //没连接上会一直重连，设置延迟避免请求过多
        let tt = null
        const _this = this;
        tt && clearTimeout(tt);
        tt = setTimeout(function () {
            _this.createWs();
            _this.lockReconnect = false;
        }, 4000);
    }

    // 心跳检测
    heartCheck() {
        const _this = this
        let _num = this.num;
        this.timeoutObj && clearTimeout(this.timeoutObj);
        this.serverTimeoutObj && clearTimeout(this.serverTimeoutObj);
        this.timeoutObj = setTimeout(function () {
            //这里发送一个心跳，后端收到后，返回一个心跳消息，
            //onmessage拿到返回的心跳就说明连接正常
            const msgInfo = {
                msg: '123456789', // 心跳包
                date: moment().format("HH:mm:ss"),
                type: TYPE.TYPE_HEART_CHECK
            };
            _this.ws.send(JSON.stringify(msgInfo));
            _num--;
            //计算答复的超时次数
            if (_num === 0) {
                _this.ws.colse();
            }
        }, _this.timeout)
    }
}

export default WsConfig