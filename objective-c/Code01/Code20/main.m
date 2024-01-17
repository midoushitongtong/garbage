//
//  main.m
//  Code20
//
//  Created by Mac on 2024/1/6.
//

#import <Foundation/Foundation.h>
#import "Person.h"
#import "MyProtocol.h"
#import "Boy.h"
#import "Girl.h"

int main(int argc, const char * argv[]) {
//    NSObject<MyProtocol> *obj = [Person new];
    
    Boy *boy = [Boy new];
    boy.name = @"小张";
    boy.age = 25;
    boy.money = INT_MAX;
    
    Girl *girl = [Girl new];
    boy.girlFriend = girl;
    
    [boy talkLove];
    
    NSLog(@"%d", boy.money);
    return 0;
}
