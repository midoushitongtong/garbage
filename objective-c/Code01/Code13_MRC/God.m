//
//  God.m
//  Code13_MRC
//
//  Created by Mac on 2023/12/28.
//

#import "God.h"

@implementation God

- (void)dealloc
{
    NSLog(@"God 对象被回收了");
    [super dealloc];
}

- (void)killWithPerson:(Person *)person
{
    [person retain];
    NSLog(@"杀");
}

@end
