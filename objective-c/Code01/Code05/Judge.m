//
//  Judge.m
//  Code05
//
//  Created by Mac on 2023/10/13.
//

#import "Judge.h"
#import "Robot.h"
#import "FistType.h"

@implementation Judge

- (void)compareFistType:(Player *)player :(Robot *)robot
{
    FistType playerFistType = player->_currentFistType;
    FistType robotFistType = robot->_currentFistType;
    
    if ((playerFistType == FistTypeJianDao && robotFistType == FistTypeBu) ||
        (playerFistType == FistTypeShiTou && robotFistType == FistTypeJianDao) ||
        (playerFistType == FistTypeBu && robotFistType == FistTypeShiTou)) {
        player->_score++;
        NSLog(@"玩家:%@, 获胜", player->_name);
    } else if (playerFistType == robotFistType) {
        NSLog(@"平局");
    } else {
        robot->_score++;
        NSLog(@"机器人:%@, 获胜", robot->_name);
    }
    NSLog(@"玩家:%@, 分数:%d, 机器人:%@, 分数:%d", player->_name, player->_score, robot->_name, robot->_score);
}

@end
