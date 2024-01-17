//
//  Person.m
//  Code15_MRC
//
//  Created by Mac on 2024/1/4.
//

#import "Person.h"

@implementation Person

- (instancetype)initWithCar:(Car *)car
{
    if (self = [super init]) {
        self.car = car;
    }
    return self;
}

- (void)dealloc
{
    NSLog(@"Person dealloc");
    [_car release];
    [super dealloc];
}

@end
