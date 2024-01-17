//
//  Book.m
//  Code16_MRC
//
//  Created by Mac on 2023/12/31.
//

#import "Book.h"

@implementation Book

- (void)dealloc
{
    NSLog(@"Book dealloc");
    [_name release];
    [_authorName release];
    [super dealloc];
}

- (void)castZhiShi
{
    NSLog(@"传播知识");
}

@end
