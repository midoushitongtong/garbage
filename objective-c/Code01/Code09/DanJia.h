//
//  DanJia.h
//  Code09
//
//  Created by Mac on 2023/11/13.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface DanJia : NSObject
{
    @private
    // 弹夹最多可装载的子弹数
    int _maxCapacity;
    // 弹夹中有几发子弹
    int _bulletCount;
}

- (void)setMaxCapacity:(int)maxCapacity;
- (int)maxCapacity;

- (void)setBulletCount:(int)bulletCount;
- (int)bulletCount;

@end

NS_ASSUME_NONNULL_END
