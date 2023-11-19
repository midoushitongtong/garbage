//
//  Robot.m
//  Code05
//
//  Created by Mac on 2023/10/13.
//

#import "Robot.h"
#import "Format.h"

@implementation Robot

- (void)showFist
{
    int select = arc4random_uniform(3) + 1;
    
    NSLog(@"机器人:%@, 出的是%@", _name, formatFistType(select));
    
    _currentFistType = select;
}

@end
