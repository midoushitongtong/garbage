//
//  CPU.h
//  Code09
//
//  Created by Mac on 2023/11/12.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface CPU : NSObject
{
    @public
    NSString *_brand;
    NSString *_model;
    int zhenJiaoShu;
}

- (void)calculator;

@end

NS_ASSUME_NONNULL_END
