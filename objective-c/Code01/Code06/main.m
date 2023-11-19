//
//  main.m
//  Code06
//
//  Created by Mac on 2023/10/16.
//

#import <Foundation/Foundation.h>
#import "Person.h"
#import "MyPoint.h"

int main() {
    Person *p1 = [Person new];
    p1->_age = 23;
    p1->_name = @"张三";
    
    Person *p2 = [Person new];
    p2->_name = @"李四";
    p2->_age = 25;
    
    [p1 setMyFriend:(p2)];
    
    NSLog(@"张三的好友是: %@", [p1 getMyFriend]->_name);
    
    if ([p1 compareAgeWithPerson:p2]) {
        NSLog(@"张三的年龄比李四大");
    } else {
        NSLog(@"张三的年龄比李四小或者相等");
    }
    
    MyPoint *mp1 = [MyPoint new];
    mp1->_x = 1;
    mp1->_y = 1;
    
    MyPoint *mp2 = [MyPoint new];
    mp2->_x = 10;
    mp2->_y = 10;
    
    NSLog(@"%lf", [mp1 distanceWithOtherPointer:mp2]);
    
    return 0;
}
