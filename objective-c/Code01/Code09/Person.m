//
//  Person.m
//  Code09
//
//  Created by Mac on 2023/11/11.
//
#import "Person.h"
#import <Foundation/Foundation.h>

@implementation Person
- (void)sayHi
{
    NSLog(@"Hi");
    NSLog(@"%p", self);
    [self setAge:200];
}

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

+ (instancetype)person
{
    return [Person new];
}

+ (instancetype)personWithName:(NSString *)name andAge:(int)age
{
    static int id = 1;
    Person *p = [Person new];
    [p setName:name];
    [p setAge:age];
    p->_id = id;
    id++;
    
    return p;
}

- (void)test
{
    NSLog(@"%p", self);
}

+ (void)test
{
    NSLog(@"%p", self);
}

@end
