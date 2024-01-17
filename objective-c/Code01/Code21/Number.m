//
//  Number.m
//  Code21
//
//  Created by Mac on 2024/1/9.
//

#import "Number.h"

@implementation Number

- (instancetype)initValue:(int)value
{
    if (self = [super init]) {
        self.value = value;
    }
    return self;
}

+ (instancetype)initValue:(int)value
{
    return [[Number alloc] initValue:value];
}

@end
