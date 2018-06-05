// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
      // 跳跃高度
      jumpHeight: 0,
      // 跳跃持续
      jumpDuration: 0,
      // 最大移速
      maxMoveSpeed: 0,
      // 加速度
      accel: 0,

      jumpAudio: {
        default: null,
        url: cc.AudioClip
      },

        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    setJumpAction () {
      let jumpUp = cc
        .moveBy(this.jumpDuration, cc.p(0, this.jumpHeight))
        .easing(cc.easeCubicActionOut())

      let jumpDown = cc
        .moveBy(this.jumpDuration, cc.p(0, -this.jumpHeight))
        .easing(cc.easeCubicActionIn())

      let callback = cc.callFunc(this.playJumpSound, this)

      return cc.repeatForever(cc.sequence(jumpUp, jumpDown, callback))
    },

    playJumpSound () {
      cc.audioEngine.playEffect(this.jumpAudio, false)
    },

    setInputControl () {
      let self = this

      // 监听键盘
      cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, (event) => {
        switch (event.keyCode) {
          case cc.KEY.a:
            this.accLeft = true
            break
          case cc.KEY.d:
            this.accRight = true
            break
          default:
            console.log('啥都不是')
        }
      })
      // 松开按键
      cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, (event) => {
        switch (event.keyCode) {
          case cc.KEY.a:
            self.accLeft = false
            break
          case cc.KEY.d:
            self.accRight = false
            break
        }
      })
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
      this.jumpAction = this.setJumpAction()
      this.node.runAction(this.jumpAction)

      // 加速度
      this.accLeft = false
      this.accRight = false

      this.xSpeed = 0

      this.setInputControl()
    },

    start () {

    },

    update (dt) {
      // 根据加速度更新
      if (this.accLeft) {
        this.xSpeed -= this.accel * dt
      } else if (this.accRight) {
        this.xSpeed += this.accel * dt
      }

      if (Math.abs(this.xSpeed) > this.maxMoveSpeed) {
        this.xSpeed = this.maxMoveSpeed * this.xSpeed / Math.abs(this.xSpeed)
      }

      this.node.x += this.xSpeed * dt
    },
});
