//
//  main.m
//  Code09
//
//  Created by Mac on 2023/11/11.
//

#import <Foundation/Foundation.h>
#import "Person.h"
#import "People.h"
#import "God.h"
#import "Student.h"
#import "Gun.h"
#import "Solider.h"
#import "DanJia.h"

int test(void) {
    return 10;
}

int main(int argc, const char * argv[]) {
//    [[Person new] sayHi];
//
//    Person *p1 = [Person new];
//    [[God new] killWithPerson:p1];
//
//    People *p = [People new];
//    [p setAge:200];
//    NSLog(@"%d", [p getAge]);
//
//    Student *s = [Student new];
//    [s setName:@"123"];
//    [s setAge:150];
//    [s setYuWen:100];
//    [s show];
    
//    DanJia *danJia = [DanJia new];
//    [danJia setMaxCapacity:100];
//    [danJia setBulletCount:1];
//
//    Gun *gun = [Gun new];
//    [gun setModel:@"AK"];
//    [gun setDanJia:danJia];
//
//    Solider *solider = [Solider new];
//    [solider setName:@"张三"];
//    [solider setType:@"炮兵"];
//    [solider setGun:gun];
//    [solider fire];
//    [solider fire];
//
//
//    [Solider sayHi];
    
    Person *p = [Person personWithName:@"1" andAge:2];
    NSLog(@"%d", p->_id);
    
    Person *p2 = [Person personWithName:@"2" andAge:3];
    NSLog(@"%d", p2->_id);

    return 0;
}
