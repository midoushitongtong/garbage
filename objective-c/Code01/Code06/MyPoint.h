//
//  Point.h
//  Code06
//
//  Created by Mac on 2023/10/18.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface MyPoint : NSObject
{
    @public
    int _x;
    int _y;
}

// 计算当前点与另一个点的距离
- (double)distanceWithOtherPointer:(MyPoint *) otherPointer;
@end

NS_ASSUME_NONNULL_END
