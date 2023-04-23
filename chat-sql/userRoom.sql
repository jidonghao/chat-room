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

 Date: 23/04/2023 17:32:20
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for userRoom
-- ----------------------------
DROP TABLE IF EXISTS `userRoom`;
CREATE TABLE `userRoom`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `roomId` int(11) NOT NULL,
  `creatTime` datetime NOT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 21 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

SET FOREIGN_KEY_CHECKS = 1;
