//
//  Student.m
//  Code09
//
//  Created by Mac on 2023/11/12.
//

#import "Student.h"

@implementation Student

- (void)setName:(NSString *)name
{
    if ([name length] < 2 || [name isEqualToString:@"张三"]) {
        NSLog(@"name 设置失败");
    } else {
        _name = name;
    }
}

- (void)setAge:(int)age
{
    if (age < 0 || age > 200) {
        NSLog(@"age 设置失败");
    } else {
        _age = age;
    }
}

- (void)setYuWen:(int)yuWen
{
    if (yuWen < 0 || yuWen > 100) {
        NSLog(@"语文成绩设置失败");
    } else {
        _yuWen = yuWen;
    }
}

- (void)show
{
    NSLog(@"姓名：%@，年龄：%d，语文成绩：%d", _name, _age, _yuWen);
}

@end
