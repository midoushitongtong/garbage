//
//  Test1.m
//  Code11
//
//  Created by Mac on 2023/12/14.
//

#import "Test1.h"

@implementation Test1

- (void)setName:(NSString *)name
{
    _name = name;
}

- (NSString *)name
{
    return _name;
}

- (void)sayHi
{
    NSLog(@"person hi");
}

@end
