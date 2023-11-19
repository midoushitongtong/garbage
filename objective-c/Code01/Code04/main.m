//
//  main.m
//  Code04
//
//  Created by Mac on 2023/10/10.
//

#import <Foundation/Foundation.h>
#import "Person.h"

int main(int argc, const char * argv[]) {
    Person *p = [Person new];
    Person *p2 = [Person new];
    p2->_name = @"Hello";
    p->myFriend = p2;
    [p showMyFriend];
    p->myFriend->myFriend = [Person new];
    p->myFriend->myFriend->_name = @"123";
    [p2 showMyFriend];
    
    return 0;
}
