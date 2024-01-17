//
//  Person.m
//  Code16_MRC
//
//  Created by Mac on 2023/12/31.
//

#import "Person.h"

@implementation Person

- (void)dealloc
{
    NSLog(@"Person dealloc");
    // [_book release];
    [_name release];
    [super dealloc];
}

- (void)readBook
{
    [_book castZhiShi];
}

+ (instancetype *)person
{
    return [[self new] autorelease];
}

@end
