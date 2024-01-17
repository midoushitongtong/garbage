//
//  Pig.m
//  Code16_MRC
//
//  Created by Mac on 2024/1/2.
//

#import "Pig.h"

@implementation Pig

- (instancetype)initWithName:(NSString *)name andAge:(int)age andWeight:(float)weight
{
    if (self = [super init]) {
        _name = name;
        _age = age;
        _weight = weight;
    }
    return [self autorelease];
}

+ (instancetype)pigWithName:(NSString *)name andAge:(int)age andWeight:(float)weight
{
    return [[[self alloc] initWithName:name andAge:age andWeight:weight] autorelease];
}

+ (instancetype)pig
{
    return [[[self alloc] init] autorelease];
}

- (void)dealloc
{
    NSLog(@"Pig dealloc");
}

@end
