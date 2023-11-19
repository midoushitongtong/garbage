//
//  main.m
//  Code01
//
//  Created by Mac on 2023/9/9.
//

#import <Foundation/Foundation.h>

//void test1(void) {
//    NSString *str = @"World";
//    NSLog(@"Hello %@", str);
//}
//
//@interface Person : NSObject
//{
//    @public NSString *_name;
//    @public int _age;
//    @public float _height;
//}
//@end;
//
//@implementation Person
//{
//
//}
//@end;

//int main() {
//    NSLog(@"Hello World");
//    float f1 = 123.1f;
//    NSLog(@"%f", f1);
    
//    NSString *str = @"Hello";
//    NSLog(str);
//    NSLog(@"你好%@", str);
    
//    test1();
    
//    BOOL b1 = YES;
//    int num1 = 10;
//    int num2 = 20;
//    BOOL b2 = num1 > num2;
//    NSLog(@"%@", b2 ? @"1" : @"0" );
    
//    int arr[] = {1,2,3,4,5};
//    int len = sizeof(arr) / sizeof(int);
//    NSLog(@"%d", len);
    
//    Person *p = [Person new];
//    p->_name = @"hello";
//    p->_age = 20;
//    p->_height = 160.5;
    
//    (*p)._name = @"hello";
//    (*p)._age = 20;
//    (*p)._height = 160.5;
//
//    NSLog(@"name: %@, age: %d, height: %f", p->_name, p->_age, p->_height);
//
//    return 0;
//}


//@interface Student : NSObject
//{
//    @public
//        NSString *_name;
//        int _age;
//        int _yuWen;
//        int _shuXue;
//        int _yingyu;
//}
//
//- (void)run;
//
//- (void)eat:(NSString *)foodName :(int)count;
//
//- (int)count:(int)num1 :(int)num2;
//
//- (void)sum:(int)sum1 :(int)sum2;
//
//@end;
//
//@implementation Student
//
//- (void)run
//{
//    NSLog(@"123");
//}
//
//- (void)eat:(NSString *)foodName :(int)count
//{
//    NSLog(@"吃:%@, 数量:%d", foodName, count);
//}
//
//- (int)count:(int)num1 :(int)num2
//{
//    return num1 + num2;
//}
//
//- (void)sumWith:(int)num1 and:(int)num2
//{
//    NSLog(@"%d", num1 + num2);
//}
//
//@end;
//
//int main() {
//    Student *s1 = [Student new];
//    s1->_name = @"张三";
//    s1->_age = 15;
//    s1->_yuWen = 80;
//    s1->_shuXue = 90;
//    s1->_yingyu = 100;
//
//    NSLog(@"name: %@, age: %d, yuWen: %d, shuXue: %d, yingYu: %d", s1->_name, s1->_age, s1->_yuWen, s1->_shuXue, s1->_yingyu);
//
//    [s1 run];
//
//    [s1 eat:@"面" :2];
//
//    int a = [s1 count:1 :2];
//    NSLog(@"%d", a);
//
//    [s1 sumWith:1 and:2];
//}
//
//@interface Person : NSObject
//{
//    @public
//        NSString *name;
//        int age;
//}
//
//- (void) sayHi;
//
//@end
//
//@implementation Person
//
//- (void)sayHi
//{
//    NSLog(@"姓名%@ 年龄%d", name, age);
//}
//
//@end
//
//@interface Student : NSObject
//{
//    @public
//        NSString *_name;
//        float _weight;
//}
//
//- (void)run;
//- (void)eat;
//
//@end;
//
//@implementation Student
//
//- (void)run
//{
//    _weight -= 0.5f;
//    NSLog(@"跑完了我的体重是 %f", _weight);
//}
//
//- (void)eat
//{
//    _weight += 0.5f;
//    NSLog(@"吃完了我的体重是 %f", _weight);
//}
//
//@end;
//
//int main() {
//    Person *p1 = [Person new];
//    p1->name = @"123";
//    p1->age = 1;
//    [p1 sayHi];
//
//    Student *s1 = [Student new];
//    s1->_name = @"1";
//    s1->_weight = 50.0f;
//    [s1 run];
//    [s1 eat];
//    [s1 run];
//    [s1 run];
//
//    return 0;
//}
//
//@interface Student : NSObject
//{
//    @public NSString *_name;
//    @public float _weight;
//}
//
//- (void)info;
//
//- (void)addWeight:(float)weight;
//
//- (void)minuteWeight:(float)weight;
//
//- (void)setData:(NSString*)name and:(float)weight;
//
//@end;
//
//@implementation Student
//
//- (void)info
//{
//    NSLog(@"name: %@, weight: %f", _name, _weight);
//}
//
//- (void)addWeight:(float)weight
//{
//    _weight += weight;
//}
//
//- (void)minuteWeight:(float)weight
//{
//    _weight -= weight;
//}
//
//- (void)setData:(NSString*)name and:(float)weight
//{
//    _name = name;
//    _weight = weight;
//}
//
//@end;
//
//
//int main() {
//    Student *s1 = [Student new];
//    s1->_name = @"张三";
//    s1->_weight = 50.0f;
//
//    [s1 addWeight:0.5f];
//    [s1 addWeight:0.5f];
//    [s1 info];
//    [s1 minuteWeight:0.5f];
//    [s1 minuteWeight:0.5f];
//    [s1 info];
//
//    [s1 setData:@"你好" and:0.5f];
//    [s1 info];
//
//    Student *s2 = s1;
//    s2->_name = @"123";
//
//    [s1 info];
//
//    NSLog(@"p1 = %p", s1);
//
//    return 0;
//}

//#pragma mark - Dog
//@interface Dog : NSObject
//
//@end
//
//@implementation Dog
//
//@end
//
//#pragma mark - Bird
//@interface Bird : NSObject
//
//@end
//
//@implementation Bird
//
//@end
//
//int main(int argc, char *argv[]) {
//    return 0;
//}

@interface Person : NSObject

- (void)test;

@end

@implementation Person

- (void)test {
    NSLog(@"123");
}

@end

int main() {
    Person *p = [Person new];
    
    [p test];
    
    return 0;
}
