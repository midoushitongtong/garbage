//
//  God.m
//  Code11
//
//  Created by Mac on 2023/12/9.
//

#import "God.h"
#import "Person.h"

@implementation God

- (void)killWithPerson:(Person *)person
{
    NSLog(@"杀死:%@", [person name]);
}

@end
