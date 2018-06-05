(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/Game.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '64f44PKJIJLxbZo/El4GPy2', 'Game', __filename);
// scripts/Game.js

'use strict';

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
    scoreDisplay: {
      default: null,
      type: cc.Label
    },

    starPrefab: {
      default: null,
      type: cc.Prefab
    },

    // 星星保质期
    maxStarDuration: 0,
    minStarDuration: 0,

    // 地面节点, 用于确定星星生成高度
    ground: {
      default: null,
      type: cc.Node
    },

    // player节点，用于获取主角弹跳高度
    player: {
      default: null,
      type: cc.Node
    },

    pickAudio: {
      default: null,
      url: cc.AudioClip
    }
  },

  // LIFE-CYCLE CALLBACKS:

  onLoad: function onLoad() {
    // 获取地平面的y轴坐标
    console.log(this.ground);
    this.groundY = this.ground.y + this.ground.height / 2;

    this.score = 0;

    // 计时器
    this.timer = 0;
    this.starDuration = 0;

    // 生成星星
    this.spawnNewStar();
  },
  spawnNewStar: function spawnNewStar() {
    // 使用给定的模板在场景中生成新Node
    var newStar = cc.instantiate(this.starPrefab);

    this.node.addChild(newStar);

    newStar.setPosition(this.getNewStarPosition());
    this.starDuration = this.minStarDuration + cc.random0To1() * (this.maxStarDuration - this.minStarDuration);
    this.timer = 0;

    newStar.getComponent('Star').game = this;
  },
  getNewStarPosition: function getNewStarPosition() {
    var randX = 0;

    var randY = this.groundY + cc.random0To1() * this.player.getComponent('Player').jumpHeight;
    // let randY = this.groundY

    var maxX = this.node.width / 2;
    randX = cc.randomMinus1To1() * maxX;

    return cc.p(randX, randY);
  },
  gainScore: function gainScore() {
    this.score += 1;
    this.scoreDisplay.string = 'Score: ' + this.score.toString();
    this.playPickedSound();
  },
  playPickedSound: function playPickedSound() {
    cc.audioEngine.playEffect(this.pickAudio, false);
  },
  start: function start() {},
  gameOver: function gameOver() {
    this.player.stopAllActions();
    cc.director.loadScene('game');
  },
  update: function update(dt) {
    if (this.timer > this.starDuration) {
      this.gameOver();
      return false;
    }
    this.timer += dt;
  }
});

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=Game.js.map
        