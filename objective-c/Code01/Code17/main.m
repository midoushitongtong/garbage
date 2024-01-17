//
//  main.m
//  Code17
//
//  Created by Mac on 2024/1/4.
//

#import <Foundation/Foundation.h>
#import "Student.h"
#import "Student+function.h"

int main(int argc, const char * argv[]) {
    @autoreleasepool {
        Student *s1 = [Student new];
        [s1 study];
        [s1 play];
        s1.test = 1;
        
        NSLog(@"%d", [s1 gettest]);
    }
    return 0;
}
