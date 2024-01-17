//
//  Person.m
//  Code11
//
//  Created by Mac on 2023/12/9.
//

#import "Person.h"

@implementation Person

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
    NSLog(@"Hi");
}

- (void)help
{
    NSLog(@"啊");
}

@end
