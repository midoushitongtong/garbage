//
//  God.m
//  Code03
//
//  Created by Mac on 2023/10/10.
//

#import "God.h"
#import "Person.h"

@implementation God

- (void)kill:(Person *)p
{
    p->_leftLife = 0;
    NSLog(@"%@", p->_name);
}

- (Person *)create
{
    Person *p = [Person new];
    p->_name = @"Hello";
    p->_age = 1;
    p->_gender = GenderFemale;
    p->_leftLife = 99;
    return p;
}

- (Person *)create:(NSString *)name andAge:(int)age andGender:(Gender)gender andLeftLife:(int)leftLife
{
    Person *p = [Person new];
    p->_name = name;
    p->_age = age;
    p->_gender = gender;
    p->_leftLife = leftLife;
    return p;
}

@end
