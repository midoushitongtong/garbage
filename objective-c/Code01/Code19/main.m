//
//  main.m
//  Code19
//
//  Created by Mac on 2024/1/5.
//

#import <Foundation/Foundation.h>
#import "Person.h"
#import "MDSTTArray.h"

typedef void (^Block1)();

void test(Block1 block1) {
    NSLog(@"test");
    block1();
}

void test2(int (^block)(int num1, int num2)) {
    int num3 = block(100, 200);
    NSLog(@"%d", num3);
}

typedef void (^Block)();

Block dtest() {
    return ^void() {
        
    };
}

int main(int arc, const char *argv[]) {
    MDSTTArray *mdsttArray = [MDSTTArray new];
    
    [mdsttArray forEach:^(int num) {
        NSLog(@"%d", num);
    }];
    
//    char *countries[] = {
//        "China",
//        "USA",
//        "Austria"
//    };
//
//    MDSTTArray *ma = [MDSTTArray new];
//    [ma shortWithCountries:countries andLength:sizeof(countries) / sizeof(char *) andCompareBlock:^BOOL(char *ch, char *ch2) {
//        return strcmp(ch, ch2) > 0;
//    }];
//
//    for (int i = 0; i < sizeof(countries) / sizeof(char *); i++) {
//        NSLog(@"%s", countries[i]);
//    }
//
//    Block1 block1 = ^{
//        NSLog(@"block1");
//    };
//
//    test(^{
//        NSLog(@"block1");
//    });
//
//    test2(^(int num1, int num2) {
//        return num1 + num2;
//    });
    
    
    return 0;
}

//
//void getUserInfo(void (^block)()) {
//    block();
//}
//
//int num3 = 100;

//int main(int argc, const char * argv[]) {
//    Person *p1 = [Person new];
//    [p1 run];
//
//    typedef void (^Type1)();
//    __block int num3 = 100;
//
//    Type1 block100 = ^void() {
//        num3++;
//        NSLog(@"%d", num3);
//    };
//
//    void (^block1)() = ^() {
//        NSLog(@"block1");
//    };
//
//    int (^block2)() = ^int() {
//        return 1;
//    };
//
//    int (^block3)(int num1, int num2) = ^int(int num1, int num2) {
//        return num1 + num2;
//    };
//
//    getUserInfo(^void() {
//        NSLog(@"test");
//    });
//
//    void (^block11)() = ^void() {
//
//    };
//
//    int (^block22)() = ^int() {
//        return 1;
//    };
//
//    typedef void (^NewType)();
//
//    NewType blocka;
//    NewType blockb;
//
//
//    return 0;
//}
