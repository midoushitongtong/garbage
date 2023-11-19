//
//  Person.m
//  Code07
//
//  Created by Mac on 2023/10/18.
//

#import "Person.h"

@implementation Person

- (void)sayHi
{
    NSLog(@"Hi");
}

+ (void)showHi
{
    NSLog(@"Hi");
}


+ (Person *)person
{
    Person *p = [Person new];
    return p;
}

+ (Person *)personWithName:(NSString *)name andAge:(int)age
{
    Person *p = [Person new];
    p->_name = name;
    p->_age = age;
    return p;
}

@end
