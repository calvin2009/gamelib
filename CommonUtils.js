

window.CommonUtils = {
    localClassName: "CommonUtils",

    load: function () {
        // index++;
        // ...
    },
    getCurrentTime: function (print = "") {
        var timestamp = new Date().getTime();//毫秒
        if (print != "") { 
            // console.log(print +"=====time====="+ timestamp);            
        }
        return timestamp;
    },
    getCurrentTime_sec: function () {
        var timestamp = Date.parse(new Date()) / 1000;
        return timestamp;
        // cc.log("=====currentTime with Sec======" + timestamp);
    },
    getBackTime: function () {
        var timestamp = Date.parse(new Date()) * 1000000;//后台是纳秒
        return timestamp;
        // cc.log("=====currentTime with Sec======" + timestamp);
    },

    setFormat: function (ori) {
        if (ori.toString().length == 1) {
            return "0" + ori.toString();
        } else {
            return ori;
        }
    },
    secToA: function (leftTime) {//s

        if (leftTime > 24 * 3600) {
            var day = leftTime / (3600 * 24);
            var hour = leftTime / 3600 % 24;
            var min = leftTime / 60 % 60;
            var sec = leftTime % 60;
            day = Math.floor(day);
            hour = Math.floor(hour);
            min = Math.floor(min);
            sec = Math.floor(sec);
            var flag = ":";
            var timeStr = CommonUtils.setFormat(day) + " " + CommonUtils.setFormat(hour) + flag + CommonUtils.setFormat(min) + flag + CommonUtils.setFormat(sec);
            return timeStr;

        } else {
            var hour = leftTime / 3600 % 24;
            var min = leftTime / 60 % 60;
            var sec = leftTime % 60;
            hour = Math.floor(hour);
            min = Math.floor(min);
            sec = Math.floor(sec);
            var flag = ":";//CommonUtils.setFormat(hour) + flag +
            var timeStr =  CommonUtils.setFormat(min) + flag + CommonUtils.setFormat(sec);
            return timeStr;
        }
    },
    splitString: function (_str, _splitStr) {
        if (_C.isNull(_str) || _str === '') {
            return [];
        }
        if (_C.isNull(_splitStr)) {
            console.log('error split str null')
            return [];
        }
        var arr = _str.split(_splitStr);
        if (_str.indexOf(_splitStr) == 0 && _str.lastIndexOf(_splitStr, _str.length - 1) == (_str.length - _splitStr.length)) {
            arr.splice(0, 1);
            arr.splice(arr.length - 1, 1);
        }
        else if (_str.indexOf(_splitStr) == 0) {
            arr.splice(0, 1);
        }
        else if (_str.lastIndexOf(_splitStr, _splitStr.length) == (_str.length - _splitStr.length)) {
            arr.splice(arr.length - 1, 1);
        }
        return arr;
    }
    ,
    //代码创建帧动画
    makeAni: function (aniNode, name,startNun, num, isLoop, dt) {
        var frames = [];
        for (var index = startNun; index < num + startNun; index++) {
            var _name = name + index.toString();
            // cc.log("log===" + _name);
            var tempFrame = _C.onGetSpFrame(_name)
            if (tempFrame) {
                frames.push(tempFrame);
            }
        }
        var clip = cc.AnimationClip.createWithSpriteFrames(frames, frames.length);
        var animation = aniNode.getComponent(cc.Animation);
        clip.name = "manuName";
        if (isLoop) {
            clip.wrapMode = cc.WrapMode.Loop;
        }
        clip.speed = 1 / dt;//默认是1，播放速度
        animation.addClip(clip);
        animation.play('manuName');
    }
    , 
    /**
     * 随机
     */
    getRandomInt: function (min, max) {
        var ratio = Math.random();
        return min + Math.floor((max - min) * ratio);
    },

    CC_CMDITOAL: function(v)
    {
        var n = v;
        if(v<0) {
            n = -v;
        }
        var ret = n + "";
        var pos = ret.toString().length-3;
        var indexs = [];
        while (pos>0) 
        {
            indexs.push(pos);
            pos -= 3;
        }
        ret = CommonUtils.setStrMarke(ret, ",", indexs);
        if (v<0) {
            ret = "-"+ret;
        }
        return ret;
    },

    CC_CMDITOAL_ATLAS: function(v)
    {
        var n = v;
        if(v<0) {
            n = -v;
        }
        var ret = n + "";
        var pos = ret.toString().length-3;
        var indexs = [];
        while (pos>0) 
        {
            indexs.push(pos);
            pos -= 3;
        }
        ret = CommonUtils.setStrMarke(ret, ">", indexs);
        if (v<0) {
            ret = ":"+ret;
        }
        return ret;
    },

    setStrMarke : function (str,flg,indexs)
    {
        var string=str;  
        for(var i=0;i<indexs.length;i++)
        {  
            var s = flg;  
            string = string.substr(0,indexs[i]) + s+string.substr(indexs[i] , string.length);  
        }  
        return string;
    }
};