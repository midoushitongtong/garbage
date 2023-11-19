//
//  Point.m
//  Code06
//
//  Created by Mac on 2023/10/18.
//

#import "MyPoint.h"
#import <math.h>

@implementation MyPoint

- (double)distanceWithOtherPointer:(MyPoint *) otherPointer
{
    // 获取当前 xy
    
    // 拿到需要对比的 xy
    
    // 套公式得结果
    
    double res1 = (_x - otherPointer->_x) * (_x - otherPointer->_x);
    double res2 = (_y - otherPointer->_y) * (_y - otherPointer->_y);
    
    double res3 = res1 + res2;
    
    return sqrt(res3);
}

@end
