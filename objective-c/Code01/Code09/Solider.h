//
//  Solider.h
//  Code09
//
//  Created by Mac on 2023/11/13.
//

#import <Foundation/Foundation.h>
#import "Gun.h"

NS_ASSUME_NONNULL_BEGIN

@interface Solider : NSObject
{
    @private
    NSString *_name;
    NSString *_type;
    Gun *_gun;
}

- (void)setName:(NSString *)name;
- (NSString *)name;

- (void)setType:(NSString *)type;
- (NSString *)type;

- (void)setGun:(Gun *)gun;
- (Gun *)gun;

- (void)fire;

+ (void)sayHi;

@end

NS_ASSUME_NONNULL_END
