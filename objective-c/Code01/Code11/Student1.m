//
//  Student1.m
//  Code11
//
//  Created by Mac on 2023/12/15.
//

#import "Student1.h"

@implementation Student1

- (void)setStuNumber:(NSString *)stuNumber
{
    _stuNumber = stuNumber;
}

- (NSString *)stuNumber
{
    return _stuNumber;
}

- (void)setBook:(Book1 *)book
{
    _book = book;
}

- (Book1 *)book
{
    return _book;
}

+ (void)sayHi
{
    NSLog(@"你好");
}

@end
