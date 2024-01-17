//
//  main.m
//  Code23
//
//  Created by Mac on 2024/1/15.
//

#import <Foundation/Foundation.h>
#import "Year.h"
#import "Person.h"
#import "People.h"

int main(int argc, const char * argv[]) {
    
    
//    CGRect r1 = CGRectMake(10, 20, 100, 50);
//    CGRect r2 = CGRectMake(101, 201, 1001, 501);
//
//    NSArray *arr2 = @[
//        [NSValue valueWithRect:r1],
//        [NSValue valueWithRect:r2]
//    ];
//
//    [arr2 enumerateObjectsUsingBlock:^(id obj, NSUInteger idx, BOOL *stop) {
//        CGRect r = [(NSValue *) obj rectValue];
//        NSLog(@"%lf, %lf, %lf, %lf", r.origin.x, r.origin.y, r.size.width, r.size.height);
//    }];
//
//
//    // 将日期对象转为字符串
//    NSDate *date = [NSDate new];
//    NSDateFormatter *formatter = [NSDateFormatter new];
//    formatter.dateFormat = @"yyyy-MM-dd HH:mm:ss";
//    NSLog(@"%@", [formatter stringFromDate:date]);
//
//    // 将字符串转为日期对象
//    NSString *dateStr = @"2023年01月15号 20点00分00秒";
//    NSDateFormatter *formatter2 = [NSDateFormatter new];
//    formatter2.dateFormat = @"yyyy年MM月dd号 HH点mm分ss秒";
//    NSDate *date2 = [formatter2 dateFromString:dateStr];
//    NSLog(@"%@", date2);
//
//
//    // 1个小时后的时间
//    NSDate *date3 = [NSDate dateWithTimeIntervalSinceNow:1 * 60 * 60];
//    NSLog(@"%@", date3);
//
//    // 1个小时前的时间
//    NSDate *date4 = [NSDate dateWithTimeIntervalSinceNow:-1 * 60 * 60];
//    NSLog(@"%@", date4);
//
//
//    // 计算两个时间间隔多久
//    NSString *str = @"";
//    NSDate *startDate = [NSDate new];
//    for (int i = 0; i < 50000; i++) {
//        str = [NSString stringWithFormat:@"%d", i];
//    }
//    NSDate *endDate = [NSDate new];
//    double time = [endDate timeIntervalSinceDate:startDate];
//    NSLog(@"%lf", time);
//
//    NSDate *date5 = [NSDate new];
//    NSCalendar *calender = [NSCalendar currentCalendar];
//    NSDateComponents *com = [calender components:NSCalendarUnitYear | NSCalendarUnitMonth | NSCalendarUnitDay fromDate:date5];
//    NSLog(@"%lu, %lu, %lu", com.year, com.month, com.day);
//
//
//    NSDate *date6 = [NSDate new];
//    NSLog(@"%d", date6.year);
    
    // NSString copy 这种拷贝是浅拷贝，没有产生新对象，直接将对象本身的地址返回
    // NSString mutableCopy 这种拷贝是深拷贝，会产生新对象，返回的是新对象的地址
    // NSMutableString copy 这种拷贝是深拷贝，会产生新对象，返回的是新对象的地址
    // NSMutableString mutableCopy 这种拷贝是深拷贝，会产生新对象，返回的是新对象的地址
//    NSString *str1 = @"123";
//    NSString *str2 = [str1 copy];
//    NSLog(@"%p", str1);
//    NSLog(@"%p", str2); // 一样
//
//    NSString *str3 = @"123";
//    NSString *str4 = [str1 mutableCopy];
//    NSLog(@"%p", str3);
//    NSLog(@"%p", str4); // 不一样
//
//    NSMutableString *str5 = [NSMutableString stringWithFormat:@"123"];
//    NSString *str6 = [str5 copy];
//    NSLog(@"%p", str5);
//    NSLog(@"%p", str6); // 不一样
//
//    NSMutableString *str7 = [NSMutableString stringWithFormat:@"123"];
//    NSString *str8 = [str7 mutableCopy];
//    NSLog(@"%p", str7);
//    NSLog(@"%p", str8); // 不一样
//
    
//    Person *p1 = [Person new];
//
//    NSMutableString *str1 = [NSMutableString stringWithFormat:@"123"];
//
//    p1.age = str1;
//    p1.name = str1;
//
//    [str1 setString:@"233"];
//
//    NSLog(@"%@", p1.name);
//    NSLog(@"%@", p1.age);
//
//
//    Person *p2 = [p1 copy];
//
//    p1.name = @"2222";
//
//
//
//    NSLog(@"%@", p1.name);
//    NSLog(@"%@", p1.age);
//
//    NSLog(@"%@", p2.name);
//    NSLog(@"%@", p2.age);
    
    People *p = [People defaultPerson];
    People *p2 = [People defaultPerson];
    
    NSLog(@"%p", p);
    NSLog(@"%p", p2);
   
    return 0;
}
