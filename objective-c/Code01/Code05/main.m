//
//  main.m
//  Code05
//
//  Created by Mac on 2023/10/10.
//

#import <Foundation/Foundation.h>
#import "Player.h"
#import "Robot.h"
#import "Judge.h"

int main(int argc, const char *argv[]) {
    /*
        猜拳游戏流程：
        - 玩家出拳
        - 机器人出拳
        - 判断比赛结果
     */
    
    Player *xiaoming = [Player new];
    xiaoming->_name = @"小明";
    
    Robot *ai = [Robot new];
    ai->_name = @"AI";
    
    Judge *judge = [Judge new];
    
    while (1) {
        [xiaoming showFist];
        [ai showFist];
        [judge compareFistType:xiaoming :ai];
        NSLog(@"是否继续? y/n");
        char answer = 'a';
        rewind(stdin);
        scanf("%c", &answer);
        if (answer != 'y') {
            break;
        }
    }
    
    
    return 0;
}
