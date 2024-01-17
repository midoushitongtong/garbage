//
//  Person1.m
//  Code12
//
//  Created by Mac on 2023/12/19.
//

#import "Person1.h"

@implementation Person1

- (instancetype)init
{
    if (self = [super init]) {
        self.name = @"hello";
    }
    return self;
}

- (instancetype)initWithName:(NSString *)name andAge:(int)age andHeight:(float)height andWeight:(float)weight
{
    if (self = [super init]) {
        self.name = name;
        self.age = age;
        self.height = height;
        self.weight = weight;
    }
    return self;
}

- (void)sayHi
{
    NSLog(@"test");
}

@end
