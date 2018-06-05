"use strict";
cc._RF.push(module, 'ec404ZdO2lNIZ7omkSqAHp5', 'Star');
// scripts/Star.js

"use strict";

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
    // 距离小于此数值即收集
    pickRadius: 0,

    // 暂存game
    game: {
      default: null,
      serializable: false
    }

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

  // LIFE-CYCLE CALLBACKS:

  // onLoad () {},

  getPlayerDistance: function getPlayerDistance() {
    var playerPos = this.game.player.getPosition();

    var dist = cc.pDistance(this.node.position, playerPos);

    return dist;
  },
  onPicked: function onPicked() {
    // 销毁星星，得分，生成新星星
    this.node.destroy();
    this.game.spawnNewStar();
    this.game.gainScore();
  },
  start: function start() {},
  update: function update(dt) {
    var opacityRatio = 1 - this.game.timer / this.game.starDuration;
    var minOpacity = 50;
    this.node.opacity = minOpacity + Math.floor(opacityRatio * (255 - minOpacity));

    if (this.getPlayerDistance() < this.pickRadius) {
      // 调用收集
      this.onPicked();
      return true;
    }
  }
});

cc._RF.pop();