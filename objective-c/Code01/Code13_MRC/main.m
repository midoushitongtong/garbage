//
//  main.m
//  Code13_MRC
//
//  Created by Mac on 2023/12/23.
//

#import <Foundation/Foundation.h>
#import "Person.h"
#import "God.h"

int main(int argc, const char * argv[]) {
//    Person *p1 = [Person new];
//
//    // 输出1
//    NSLog(@"%lu", [p1 retainCount]);
//
//    // 引用加一
//    [p1 retain];
//
//    // 输出2
//    NSLog(@"%lu", [p1 retainCount]);
//
//    // 引用减一
//    [p1 release];
//
//    // 输出1
//    NSLog(@"%lu", [p1 retainCount]);
//
//    // 引用减一
//    [p1 release];
//
//    // 输出0 对象被回收
//    NSLog(@"%lu", [p1 retainCount]);
    
//    Person *p1 = [Person new];
//    [p1 release];
//
//    p1 = nil;
//
//    [p1 sayHi];
//
    
    Person *p1 = [Person new];
    God *g1 = [God new];
    
    [g1 killWithPerson:p1];
    
    
    [p1 release];
    p1 = nil;
    [g1 release];
    g1 = nil;

    
    
    
    return 0;
}
