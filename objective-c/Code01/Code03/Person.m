//
//  Person.m
//  Code03
//
//  Created by Mac on 2023/10/10.
//

#import "Person.h"
#import "Gender.h"

@implementation Person

- (void)show
{
    NSLog(@"%@, %d, %@, %d", _name, _age, _gender == GenderMale ? @"男" : @"女", _leftLife);
}

@end
