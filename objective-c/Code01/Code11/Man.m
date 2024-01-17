//
//  Man.m
//  Code11
//
//  Created by Mac on 2023/12/12.
//

#import "Man.h"

@implementation Man

- (void)help
{
    NSLog(@"man help");
}

- (NSString *)description
{
    return [NSString stringWithFormat:@"%@, %d", @"test", 100];
}

@end
