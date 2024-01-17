//
//  Person.m
//  Code13_MRC
//
//  Created by Mac on 2023/12/23.
//

#import "Person.h"

@implementation Person

- (void)dealloc
{
    NSLog(@"Person 对象被回收了");
    
    [super dealloc];
}

- (void)sayHi
{
    NSLog(@"hi");
}

@end
