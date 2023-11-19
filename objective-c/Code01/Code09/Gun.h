//
//  Gun.h
//  Code09
//
//  Created by Mac on 2023/11/13.
//

#import <Foundation/Foundation.h>
#import "DanJia.h"

NS_ASSUME_NONNULL_BEGIN

@interface Gun : NSObject
{
    @private
    NSString *_model;
    int _sheCheng;
    DanJia *_danJia;
}

- (void)setModel:(NSString *)model;
- (NSString *)model;

- (void)setSheCheng:(int)sheCheng;
- (int)sheCheng;

- (void)setDanJia:(DanJia *)danJia;
- (DanJia *)danJia;

- (void)shoot;

@end

NS_ASSUME_NONNULL_END
