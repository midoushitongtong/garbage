//
//  main.m
//  Code16_MRC
//
//  Created by Mac on 2023/12/31.
//

#import <Foundation/Foundation.h>
#import "Person.h"
#import "Book.h"
#import "Pig.h"

int main(int argc, const char *argv[]) {
//    Person *p = [Person new]; // 1 0
//    Book *b = [Book new]; // 1 2 1
//
//    p.book = b;
//    b.owner = p;
//
//    [p readBook];
//
//    [p release];
//    [b release];
    
//    @autoreleasepool {
//        // 调用对象的 autorelease 方法将对象放入自动释放池中
//        Person *p1 = [[Person new] autorelease];
//    }
//
//    Person *p1 = [Person new];
//    @autoreleasepool {
//        // 可以在外部创建对象，但是 autorelease 方法必须在 @autorelease 中执行
//        [p1 autorelease];
//    }
//
//    Person *p2 = [Person new];
//    @autoreleasepool {
//        [p2 autorelease];
////        [p2 autorelease]; // 可能会出现僵尸对象
////        [p2 autorelease]; // 可能会出现僵尸对象
//        // 往自动释放池中存放三次，就会被 release 三次
//    }
//
    
    @autoreleasepool {
        Pig *p1 = [[Pig alloc] initWithName:@"八戒" andAge:10 andWeight:200.5];
        Pig *p2 = [Pig pigWithName:@"八戒" andAge:10 andWeight:200.5];
        Pig *p3 = [Pig pig];
    }
    
    NSLog(@"end");
    
    return 0;
}
