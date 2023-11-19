//
//  main.m
//  Code07
//
//  Created by Mac on 2023/10/18.
//

#import <Foundation/Foundation.h>
#import "Person.h"

int main(int argc, const char *argv[]) {
//    @try {
//        Person *p1 = [Person new];
//        [p1 sayHi];
//    } @catch (NSException *ex) {
//        NSLog(@"捕获异常");
//    }
//
//    @try {
//        int num1 = 10;
//        int num2 = 0;
//        int num3 = num1 / num2;
//    } @catch (NSException *ex) {
//        NSLog(@"发生异常了");
//    }
    
    
//    NSLog(@"运行完成");
    
    Person *p1 = [Person new];
    
    [p1 sayHi];
    [Person showHi];
    
    Person *p2 = [Person person];
    
    Person *p3 = [Person personWithName:@"123" andAge:15];
    
    
    return 0;
}
