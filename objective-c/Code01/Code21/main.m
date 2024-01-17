//
//  main.m
//  Code21
//
//  Created by Mac on 2024/1/7.
//

#import <Foundation/Foundation.h>
#import "Person.h"
#import "Number.h"
#define LogBOOL(var) NSLog(@"%@", var == YES ? @"真" : @"假");

int main(int argc, const char * argv[]) {
//    NSString *s2 = @"str3";
//    NSString *s1 = @"str1";
//
//    NSLog(@"%p", s1);
//
//    s1 = @"str3";
//
//    NSLog(@"%p", s2);
//    NSLog(@"%p", s1);
//
//    // 使用拼接的方式创建一个 NSString 对象
//    NSString *s1 = [NSString stringWithFormat:@"大家好，我叫%@", @"小李"];
//    NSLog(@"%@", s1);
//
//    // 得到字符串长度
//    NSString *s2 = @"你好";
//    NSLog(@"%d", [s2 length]);
//
//    // 获取指定下标的字符
//    NSString *s3 = @"1你好";
//    UniChar c = [s1 characterAtIndex:0];
//    NSLog(@"%C", [s1 characterAtIndex:0]);
//
//    int a = 10;
//    int b = 10;
//    int *p1 = &a;
//    int *p2 = &b;
//    BOOL res = a == b;
//    BOOL res2 = p1 == p2;
//    LogBOOL(res2);
    
//    NSString *s1 = @"hello";
//    NSString *s2 = [NSString stringWithFormat:@"hello"];
//
//    LogBOOL([s1 isEqualToString:s2]);
//
    
//    Person *p1 = [Person new];
    
//    // 将 c 字符串转成 oc 字符串
//    char *str = "jack";
//    p1.name = [NSString stringWithUTF8String:str];
//    NSLog(@"%@", p1.name);
//
//    // 将 oc 字符串转成 c 字符串
//    char *str2 = p1.name.UTF8String;
//    NSLog(@"%s", str2);
//
    
//    NSString *str = @"你好 hello";
//    NSError *error;
//    /*
//     参数1：写入的路径
//     参数2：YES 先写入到临时文件，临时文件写入成功在搬到指定路径，安全，效率低
//           NO 直接写入到指定文件，不安全效率高
//     参数3：编码格式
//     参数4：二级指针，要传一个 NSError 指针的地址，如果写入成功这个指针的值就是 nil 如果写入失败这个指针就指向一个错误信息的对象
//     */
//    BOOL res = [str writeToFile:@"/Users/mac/Downloads/test/abc.txt" atomically:NO encoding:NSUTF8StringEncoding error:&error];
//    if (res == YES) {
//        NSLog(@"写入成功");
//    } else {
//        NSLog(@"写入失败, %@", error);
//    }
//
//
//    NSError *error2 = nil;
//    /*
//     参数1：文件的路径
//     参数2：使用的编码
//     参数3：错误指针
//     */
//    NSString *str2 = [NSString stringWithContentsOfFile:@"/Users/mac/Downloads/test/abc.txt" encoding:NSUTF8StringEncoding error:&error2];
//    NSLog(@"%@", str2);
//    if (error != nil) {
//        NSLog(@"%@", str2);
//    } else {
//        NSLog(@"读取失败, %@", error2);
//    }
    
    
    // 读取某个 url 的内容
//    NSURL *u1 = [NSURL URLWithString:@"https://baidu.com"];
//    NSURL *u1 = [NSURL URLWithString:@"file:///Users/mac/Downloads/test/abc.txt"];
//    NSError *error;
//    NSString *str = [NSString stringWithContentsOfURL:u1 encoding:NSUTF8StringEncoding error:&error];
//    if (error != nil) {
//        NSLog(@"%@", str);
//    } else {
//        NSLog(@"读取失败, %@", error);
//    }
    
//    NSString *str2 = @"你好 hello";
//    NSError *error2 = nil;
//    [str2 writeToURL:u1 atomically:NO encoding:NSUTF8StringEncoding error:&error2];
//    if (error2 != nil) {
//        NSLog(@"写入成功");
//    } else {
//        NSLog(@"写入失败: %@", error2);
//    }
    
    
//    NSString *s1 = @"1你好D";
//    NSString *s2 = @"1你好d";
//    // 字符串比较
//    // NSCaseInsensitiveSearch 忽略大小写进行比较
//    NSComparisonResult res = [s1 compare:s2 options:NSCaseInsensitiveSearch];
//    switch (res) {
//        case NSOrderedAscending:
//            NSLog(@"小");
//            break;
//        case NSOrderedSame:
//            NSLog(@"一样");
//            break;
//        case NSOrderedDescending:
//            NSLog(@"大");
//            break;
//    }
    
//    NSString *s1 = @"dwq10001.jpg";
//    NSString *s2 = @"dwq10002.jpg";
//
//    NSComparisonResult res = [s1 compare:s2 options:NSNumericSearch];
//    switch (res) {
//        case NSOrderedAscending:
//            NSLog(@"小");
//            break;
//        case NSOrderedSame:
//            NSLog(@"一样");
//            break;
//        case NSOrderedDescending:
//            NSLog(@"大");
//            break;
//    }
//
    
//    NSString *s1 = @"你好";
//    // 是否以什么开头
//    NSLog(@"%@", [s1 hasPrefix:@"你"] ? @"1" : @"0");
//    // 是否以什么结尾
//    NSLog(@"%@", [s1 hasSuffix:@"好"] ? @"1" : @"0");
//
    
//    NSString *str = @"hello world";
//    NSRange range = [str rangeOfString:str];
//    NSRange range2 = [str rangeOfString:str options:NSBackwardsSearch];
//    if (range.length != 0) {
//        NSLog(@"找到了");
//        NSLog(@"%lu", range.location);
//        NSLog(@"%lu", range.length);
//    }
//
    
//    NSRange range = {.location = 3, .length = 5};
//    NSRange range2 = {3, 5};
//    NSRange range3;
//    range3.location = 3;
//    range3.length = 5;
//    NSRange range4 = NSMakeRange(3, 5);
//
//    NSLog(@"%@", NSStringFromRange(range4));
    
//    NSString *str = @"hello world";
//    NSString *str2 = [str substringFromIndex:1];
//    NSLog(@"%@", str2);
//    NSString *str3 = [str substringToIndex:1];
//    NSLog(@"%@", str3);
//    NSString *str4 = [str substringWithRange:NSMakeRange(6, 3)];
//    NSLog(@"%@", str4);
//
//    NSString *str2 = @"hello world";
//    NSString *str3 = [str2 stringByReplacingOccurrencesOfString:@"hello" withString:@"你好"];
//    NSLog(@"%@", str
    
//    NSString *str = @"1";
//    double num = str.boolValue;
//
//    NSLog(@"%lf", num);
    
    // 去掉字符串前后的空格, 中间的空格无法去掉
//    NSString *str = @"  hello world  123";
//    NSLog(@"%@", [str stringByTrimmingCharactersInSet:[NSCharacterSet whitespaceCharacterSet]]);
//
//
//    NSString *str = @"hello world HELLO WORLD";
//    NSLog(@"%@", [str uppercaseString]);
//    NSLog(@"%@", [str
    
//    NSLog(@"-----");
//
//    NSString *str = @"";
//    NSMutableString *str = [NSMutableString string];
//    for (int i = 0; i < 3000000; i++) {
//        [str setString:@""];
//        [str appendFormat:@"hello %d", i];
//        str = [NSString stringWithFormat:@"hello %d", i];
//    }

//    NSLog(@"-----");
//    NSLog(@"%@", str);
    
//
//    NSString *str = @"123";
//
//    NSMutableString *str2 = [NSMutableString string];
//    [str2 setString:@"test"];
//
//    str = str2;
//
//    NSLog(@"%@", str);
    
    
//    NSMutableString *str = [NSMutableString string];
//    [str appendString:@"1"];
//    [str appendString:@"1"];
//    [str appendFormat:@"%d", 2];
//
//    NSLog(@"%@", str);
    
//    NSArray *arr = [NSArray array];
//    NSArray *arr2 = [[NSArray alloc] init];
//    NSArray *arr3 = [NSArray new];
//
//    NSArray *arr4 = [NSArray arrayWithObject:@"test"];
////    NSLog(@"%@", arr4);
//
//    NSArray *arr5 = [NSArray arrayWithObjects:@"test", @"test2", [NSMutableString string], nil];
//    NSLog(@"%@", arr5);
    
//    Person *p1 = [Person new];
//    NSArray *arr6 = [NSArray arrayWithObjects:p1, p1, nil];
//
//    // 简化写法效果是一样的, 不需要再后面加 nil
//    NSArray *arr7 = @[@"第一个元素", @"第二个元素"];
//    NSLog(@"%@", [arr7 objectAtIndex:0]); // 获取指定下标的元素
//    NSLog(@"%d", [arr7 count]); // 获取数组长度
//    NSLog(@"%@", [arr7 containsObject:@"第一个元素"] ? @"1" : @"0"); // 判断数组是否包含某个元素
//    NSLog(@"%@", arr7.firstObject); // 拿到数组第0个下标的元素, 与 arr[0] 的区别, arr[0] 会报越界错误, firstObject 不会报越界错误
//    NSLog(@"%@", arr7[0]);
//    NSLog(@"%lu", [arr7 indexOfObject:@"第一个元素"]); // 获取某个元素的下标, 找不到会返回 NSUInteger 最大值
//    if ([arr7 indexOfObject:@"第一个元素"] != NSNotFound) {
//        NSLog(@"找到了元素");
//    } else {
//        NSLog(@"找不到元素");
//    }
//
    
//    NSArray *arr = @[@"1", @"2", @"3"];
//
//    for (int i = 0; i < arr.count; i++) {
//        NSLog(@"%@", [arr objectAtIndex:i]);
//    }
//
//
//    for (NSString *str in arr) {
//        NSLog(@"%@", str);
//    }
    
//    Person *p1 = [Person new];
//    NSArray *arr2 = @[p1, p1, p1];
//
//    for (Person *p in arr2) {
//        NSLog(@"%@", p);
//    }
    
//    Person *p1 = [Person new];
//    NSArray *arr = @[p1, p1, p1, @"4", @"5", @"6"];
//
//    for (id item in arr) {
//        NSLog(@"%@", item);
//    }
    
//    NSArray *arr = @[@"1", @"2", @"3"];
//
//    [arr enumerateObjectsUsingBlock:^(id item, NSUInteger index, BOOL *stop) {
//        NSLog(@"%@, %lu, %@", item, index, stop ? @"1" : @"0");
//        // 如果想停止循环，可以将 STOP 指向的变量赋值为 0
//        if (index == 1) {
//            *stop = YES;
//        }
//    }];
    
//    NSArray *arr = @[@"1", @"2", @"3"];
//    // 将数组转为字符串
//    NSLog(@"%@", [arr componentsJoinedByString:@","]);
//
//    // 将字符串拆分为数组
//    NSString *str = @"123,456,789";
//    NSArray *arr2 = [str componentsSeparatedByString:@","];
//
//    for (NSString *str in arr2) {
//        NSLog(@"%@", str);
//    }
    
//    NSArray *arr = @[@"1", @"2", @"3"];
//    NSMutableArray *arr = [NSMutableArray new];
//    NSMutableArray *arr2 = [NSMutableArray arrayWithObjects:@"1", @"2", nil];
//    NSLog(@"%d", arr2.count);
    
//    NSMutableArray *arr = [NSMutableArray new];
//    [arr addObject:@"111"];
//    [arr addObject:@"222"];
//    [arr addObject:@"333"];
//
//    NSArray *arr2 = @[@"444", @"555"];
//
//    [arr addObjectsFromArray:arr2];
//
//    NSLog(@"%@", arr);
    
    // 在指定下标插入一个元素
//    [arr insertObject:@"test" atIndex:1];
    
//    NSMutableArray *arr = [NSMutableArray arrayWithObjects:@"111", @"222", @"333", nil];
//
//    // 添加元素
//    [arr addObject:@"111"];
//
//    // 删除所有指定的元素
//    [arr removeObject:@"111"];
//
//    // 删除指定范围内的元素
//    [arr removeObjectsInRange: NSMakeRange(0, 1)];
//
//    [arr addObjectsFromArray:@[@"111", @"222"]];
//
//    [arr removeObjectAtIndex:arr.count -1];
//
//    NSLog(@"%@", arr);
//
    
//    NSMutableArray *arr = [NSMutableArray arrayWithObjects:[Number initValue:10] , nil];
//
//    [arr enumerateObjectsUsingBlock:^(id item, NSUInteger index, BOOL *stop) {
//        Number *n = item;
//        NSLog(@"%d", n.value);
//    }];
//
//    NSMutableArray *arr2 = [NSMutableArray new];
//    [arr2 addObject:[NSNumber numberWithInt:10]];
//    [arr2 addObject:[NSNumber numberWithInt:11]];
//    [arr2 addObject:[NSNumber numberWithDouble:12.1f]];
//
//    [arr2 enumerateObjectsUsingBlock:^(id obj, NSUInteger idx, BOOL * _Nonnull stop) {
//        NSNumber *nn = obj;
//        NSLog(@"%lf", nn.floatValue);
//    }];
//
//    for (NSNumber *Num in arr2) {
//        NSLog(@"%f", Num.floatValue);
//    }
    
    int num = 100;
    NSMutableArray *arr = [NSMutableArray new];
    [arr addObject:@10];
    [arr addObject:@(num)];
    [arr enumerateObjectsUsingBlock:^(id obj, NSUInteger index, BOOL *stop) {
        NSNumber *num = obj;
        NSLog(@"%d", [num intValue]);
    }];
    
    
    return 0;
}
