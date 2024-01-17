//
//  Person.m
//  Code12
//
//  Created by Mac on 2023/12/17.
//

#import "Person.h"

@implementation Person

- (void)sayHi
{
    NSLog(@"hi");
}

+ (instancetype)person
{
    return [self new];
}

@end
