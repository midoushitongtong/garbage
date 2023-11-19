//
//  Player.m
//  Code05
//
//  Created by Mac on 2023/10/13.
//

#import "Player.h"
#import <stdlib.h>
#import "Format.h"

@implementation Player

- (void)showFist
{
    
    int select = 0;
    
    NSLog(@"玩家:%@, 请选择出拳类型: 1(剪刀)、2(石头)、3(布)", _name);
    scanf("%d", &select);
    
    NSLog(@"玩家:%@, 出的是%@", _name, formatFistType(select));
    
    _currentFistType = select;
}

@end
