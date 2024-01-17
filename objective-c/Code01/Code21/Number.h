//
//  Number.h
//  Code21
//
//  Created by Mac on 2024/1/9.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface Number : NSObject

@property (nonatomic, assign) int value;

- (instancetype)initValue:(int)value;
+ (instancetype)initValue:(int)value;

@end

NS_ASSUME_NONNULL_END
