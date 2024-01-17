//
//  Person.m
//  Code23
//
//  Created by Mac on 2024/1/16.
//

#import "Person.h"

@implementation Person

- (void)setName:(NSString *)name
{
    _name = [name copy];
}

- (NSString *)name
{
    return _name;
}

- (id)copyWithZone:(NSZone *)zone
{
    Person *p = [Person new];
    p.name = _name;
    p.age = _age;
    return p;
}

@end
