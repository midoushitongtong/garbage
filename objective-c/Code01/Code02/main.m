//
//  main.m
//  Code02
//
//  Created by Mac on 2023/10/8.
//

#import <Foundation/Foundation.h>
#import "Person.h"
#import "Bird.h"

int main() {
    Bird *b = [Bird new];
    b->name = @"Bird";
    [b run];
    
    Person *p = [Person new];
    p->name = @"Person";
    [p sayHi:b];
    
    
    return 0;
}
