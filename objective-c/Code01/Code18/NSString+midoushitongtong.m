//
//  NSString+midoushitongtong.m
//  Code18
//
//  Created by Mac on 2024/1/4.
//

#import "NSString+midoushitongtong.h"

@implementation NSString (midoushitongtong)

- (int)numberCount
{
    
    int count = 0;
    for (int i = 0; i < self.length; i++) {
        unichar ch = [self characterAtIndex:i];
        if (ch >= '0' && ch <= '9') {
            count++;
        }
    }
    return count;
}

@end
