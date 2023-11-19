//
//  Solider.m
//  Code09
//
//  Created by Mac on 2023/11/13.
//

#import "Solider.h"

@implementation Solider

- (void)setName:(NSString *)name;
{
    _name = name;
}
- (NSString *)name
{
    return _name;
}

- (void)setType:(NSString *)type
{
    _type = type;
}
- (NSString *)type
{
    return _type;
}

- (void)setGun:(Gun *)gun
{
    _gun = gun;
}
- (Gun *)gun
{
    return _gun;
}

- (void)fire
{
    [_gun shoot];
}

+ (void)sayHi
{
    NSLog(@"Hi");
}

@end
