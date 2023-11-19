//
//  Person.m
//  Code02
//
//  Created by Mac on 2023/10/9.
//

#import <Foundation/Foundation.h>
#import "Person.h"

@implementation Person

- (void)sayHi:(Bird *)bird
{
    NSLog(@"%@", bird->name);
}

@end
