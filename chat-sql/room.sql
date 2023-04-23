/*
 Navicat Premium Data Transfer

 Source Server         : shuoshuo
 Source Server Type    : MySQL
 Source Server Version : 50562 (5.5.62-log)
 Source Host           : www.dhxt.fun:3306
 Source Schema         : shuoshuo

 Target Server Type    : MySQL
 Target Server Version : 50562 (5.5.62-log)
 File Encoding         : 65001

 Date: 23/04/2023 17:32:09
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for room
-- ----------------------------
DROP TABLE IF EXISTS `room`;
CREATE TABLE `room`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `roomId` int(11) NOT NULL COMMENT '房间id',
  `roomName` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '房间名称',
  `creatTime` datetime NOT NULL COMMENT '创建时间',
  `masterId` int(11) NOT NULL COMMENT '创建人id',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 55 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

SET FOREIGN_KEY_CHECKS = 1;
