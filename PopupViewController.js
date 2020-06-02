

window.popupViewController = {
    stack: [],
    popups: new Map(),

    gameScene: cc.Scene,

    ctor: function () {
    },

    addPopupView: function (view) {
        // if (this.gameScene == undefined  || this.gameScene.popupLayer == undefined ) {
        //     return;
        // } 
        var script = view.getComponent("PopupBaseView");
        var sName = script.node._name;
        if (script.showMode == PopupShowMode.Normal) {
            this.popups.set(script._viewId, view);
            cc.log("log==ggggggfff=" + this.gameScene);
            cc.log("log===" + this.gameScene.popupLayer); 
            this.gameScene.popupLayer.addChild(view);
        } else if (script.showMode == PopupShowMode.Stack) {//全屏
            this.setBackViewVisible(false);
            this.stack.push(view);
            var type = 0;
            if (sName == ConfigStr.p_cqssc) {
                
            }  
            this.gameScene.popupInLayer.addChild(view);
            RMNotification.emit(SysDefine.p1028, type);//隐藏主ui
        }
        
    },
    setBackViewVisible: function (visible) {
        if (this.stack.length > 0) {
            var view = this.stack[this.stack.length - 1];
            view.active = visible;
        }
    },
    goBackPopupView: function () {
        var view = this.stack.pop();
        view.destroy();
        this.setBackViewVisible(true);

        var type = 0;
        if (this.stack.length == 0) {
            RMNotification.emit(SysDefine.p1029, type);  
        }
        
    },
    removePopupView: function (viewId) {//非全屏
        var tmpView = this.popups.get(viewId);
        if (tmpView) {
            this.popups.delete(viewId);
            tmpView.destroy();
        }
    },
    removeAllPopupView: function () {
        cc.log("before remove");
        cc.log(this.stack.length);
        cc.log(this.popups.size);
        this.stack.forEach(function (view) {
            view.destroy();
        });
        this.popups.forEach(function (view) {
            view.destroy();
        });
        this.stack.splice(0, this.stack.length);
        this.popups.clear();
        cc.log("after remove");
        cc.log(this.stack.length);
        cc.log(this.popups.size);
        RMNotification.emit(SysDefine.p1029, 9999);
    }
};
popupViewController.ctor();

// module.exports = popupViewController;