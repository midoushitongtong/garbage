//
//  main.m
//  Code10
//
//  Created by Mac on 2023/11/27.
//

#import <Foundation/Foundation.h>
#import "Student2.h"
#import "Point.h"

int main(int argc, const char * argv[]) {
//    MaQue2 *f = [MaQue2 new];
//    [f fly3];
    
//    Student2 *s2 = [Student2 new];
//    [s2 sayHi];
//
//    [Student2 hehe];
    
    
    Point2 *p11 = [Point2 new];
    p11.name = @"123";
    NSLog(@"%@", p11.name);
    
    p11.sexHelloWorld = @"Male";
    NSLog(@"%@", p11.sexHelloWorld);
    
    
    return 0;
}
