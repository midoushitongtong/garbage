//
//  Person1.m
//  Code11
//
//  Created by Mac on 2023/12/15.
//

#import "Person1.h"

@implementation Person1

- (void)setName:(NSString *)name
{
    _name = name;
}

- (NSString *)name
{
    return _name;
}

- (void)setAge:(int)age
{
    _age = age;
}

- (int)age
{
    return _age;
}

- (void)setGender:(Gender)gender
{
    _gender = gender;
}

- (Gender)gender
{
    return _gender;
}

- (void)eatFood:(NSString *)food
{
    NSLog(@"吃%@", food);
}

@end
