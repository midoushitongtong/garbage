//
//  main.m
//  Code18
//
//  Created by Mac on 2024/1/4.
//

#import <Foundation/Foundation.h>
#import "Person.h"
#import "NSObject+midoushitongtong.h"
#import "NSString+midoushitongtong.h"

int main(int argc, const char * argv[]) {
    Person *p1 = [Person new];
    [p1 run];
    
    NSString *s1 = @"aaa123";
    NSLog(@"%d", [s1 numberCount]);
   
    
    return 0;
}
