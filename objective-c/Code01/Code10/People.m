//
//  People.m
//  Code10
//
//  Created by Mac on 2023/11/27.
//

#import "People.h"

@implementation People

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

- (void)setSalary:(double)salary
{
    _salary = salary;
}
- (double)salary
{
    return _salary;
}

@end
