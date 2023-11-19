//
//  Gun.m
//  Code09
//
//  Created by Mac on 2023/11/13.
//

#import "Gun.h"

@implementation Gun

- (void)setModel:(NSString *)model
{
    _model = model;
}
- (NSString *)model
{
    return _model;
}

- (void)setSheCheng:(int)sheCheng
{
    _sheCheng = sheCheng;
}
- (int)sheCheng
{
    return _sheCheng;
}

- (void)setDanJia:(DanJia *)danJia
{
    _danJia = danJia;
}
- (DanJia *)danJia
{
    return _danJia;
}

- (void)shoot
{
    if ([_danJia bulletCount] <= 0) {
        NSLog(@"%@，射击失败, 子弹用完了", _model);
        return;
    }
    [_danJia setBulletCount:[_danJia bulletCount] - 1];
    NSLog(@"%@，射击成功, 子弹剩余: %d", _model, [_danJia bulletCount]);
}

@end
