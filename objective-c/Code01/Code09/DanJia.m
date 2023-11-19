//
//  DanJia.m
//  Code09
//
//  Created by Mac on 2023/11/13.
//

#import "DanJia.h"

@implementation DanJia

- (void)setMaxCapacity:(int)maxCapacity
{
    _maxCapacity = maxCapacity;
}
- (int)maxCapacity
{
    return _maxCapacity;
}

- (void)setBulletCount:(int)bulletCount
{
    if (bulletCount <= _maxCapacity) {
        _bulletCount = bulletCount;
    } else {
        _bulletCount = _maxCapacity;
    }
}
- (int)bulletCount
{
    return _bulletCount;
}

@end
