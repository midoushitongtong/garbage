//
//  Year.m
//  Code23
//
//  Created by Mac on 2024/1/16.
//

#import "Year.h"

@implementation NSDate (midoushitongtong)

- (int)year {
    NSCalendar *calender = [NSCalendar currentCalendar];
    NSDateComponents *components = [calender components:NSCalendarUnitYear fromDate:self];
    return (int) components.year;
}

@end
