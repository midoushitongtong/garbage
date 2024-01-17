//
//  Account.m
//  Code15_MRC
//
//  Created by Mac on 2024/1/4.
//

#import "Account.h"

@implementation Account

- (void)dealloc
{
    NSLog(@"Account dealloc");
    [_name release];
    [super dealloc];
}

@end
