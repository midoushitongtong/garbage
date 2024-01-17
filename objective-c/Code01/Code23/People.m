//
//  People.m
//  Code23
//
//  Created by Mac on 2024/1/17.
//

#import "People.h"

@implementation People


+ (instancetype)defaultPerson
{
    static id instance = nil;
    if (instance == nil) {
        instance = [[super alloc] init];
    }
    return instance;
}

//+ (instancetype)allocWithZone:(struct _NSZone *)zone
//{
//    static id instance = nil;
//    if (instance == nil) {
//        instance = [super allocWithZone:zone];
//    }
//    return instance;
//}

@end
