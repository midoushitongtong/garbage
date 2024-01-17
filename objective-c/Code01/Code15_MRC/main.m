//
//  main.m
//  Code15_MRC
//
//  Created by Mac on 2024/1/4.
//

#import <Foundation/Foundation.h>
#import "Person.h"
#import "Car.h"

int main(int argc, const char * argv[]) {
    @autoreleasepool {
        Car *c1 = [Car new];
        Person *p1 = [[Person alloc] initWithCar:c1];
        
        
        [c1 release];
        [p1 release];
        
        NSLog(@"test");
        
    }
    return 0;
}
