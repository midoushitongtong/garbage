//
//  main.m
//  Code03
//
//  Created by Mac on 2023/10/10.
//

#import <Foundation/Foundation.h>
#import "Person.h"
#import "God.h"
#import "Gender.h"

int main(int argc, const char * argv[]) {
    Person *p = [Person new];
    p->_name = @"Hello";
    p->_age = 20;
    p->_gender = GenderMale;
    p->_leftLife = 75;
    
    [p show];
    
    God *g = [God new];
    g->_name = @"耶稣";
    [g kill:p];
    
    [p show];
    
    Person *p2 = [g create];
    [p2 show];
    
    Person *p3 = [g create:@"Hello" andAge:1 andGender:GenderMale andLeftLife:100];
    [p3 show];
    
    return 0;
}
