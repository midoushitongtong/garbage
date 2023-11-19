//
//  Person.m
//  Code06
//
//  Created by Mac on 2023/10/16.
//

#import "Person.h"

@implementation Person

- (void)setMyFriend:(Person *)myFriend
{
    _myFriend = myFriend;
}

- (Person *)getMyFriend
{
    return _myFriend;
}

- (BOOL)compareAgeWithPerson:(Person *)person
{
    return _age > person->_age;
}

@end
