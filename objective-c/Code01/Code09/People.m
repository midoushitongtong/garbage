//
//  People.m
//  Code09
//
//  Created by Mac on 2023/11/12.
//

#import "People.h"

@implementation People

- (void)setName:(NSString *)name
{
    if ([name length] < 2) {
        NSLog(@"name 参数无效，字符长度应该 >= 2");
    } else {
        _name = name;
    }
}

- (void)setAge:(int)age
{
    if (age >= 0 && age <= 200) {
        _age = age;
    } else {
        NSLog(@"age 参数无效，值应该传入 0 ~ 200，当前传入 %d", age);
    }
}

- (NSString *)getName
{
    return _name;
}

- (int)getAge
{
    return _age;
}

- (void)sayHi
{
    NSLog(@"age: %d", _age);
}

@end
