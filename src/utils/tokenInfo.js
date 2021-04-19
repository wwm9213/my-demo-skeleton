/*
 * @Date: 2021-04-19 15:37:56
 * @Author: wwm
 * @LastEditTime: 2021-04-19 15:45:43
 * @LastEditors: wwm
 * @Description: 封装存取token
 */

import Cookies from 'js-cookie'

const tokenInfo = {
    get() {
        return Cookies.get('tokenInfo') || false;

    },
    set(data) {
        Cookies.set('tokenInfo', data, { expires: 3 });
    },
    del() {
        return new Promise(res => {
            Cookies.remove('tokenInfo');
            res(true);
        });
    }
};

export default tokenInfo
