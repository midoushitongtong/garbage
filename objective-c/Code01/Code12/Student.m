//
//  Student.m
//  Code12
//
//  Created by Mac on 2023/12/18.
//

#import "Student.h"

@implementation Student

- (instancetype)init
{
    if (self = [super init]) {
        self.name = @"student";
    }
    return self;
}

- (void)study
{
    NSLog(@"学习");
}

@end
