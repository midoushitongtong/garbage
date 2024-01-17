//
//  Person.m
//  Code19
//
//  Created by Mac on 2024/1/5.
//

#import "Person.h"

@interface Person ()

@property (nonatomic, assign) int age;

- (void)play;

@end;

@implementation Person

- (void)run
{
    self.age = 1;
    NSLog(@"%d", self.age);
    
    [self play];
    
    NSLog(@"跑");
}

- (void) play
{
    NSLog(@"play");
}

@end
