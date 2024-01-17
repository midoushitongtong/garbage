//
//  Pig.h
//  Code16_MRC
//
//  Created by Mac on 2024/1/2.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface Pig : NSObject

@property(nonatomic, retain) NSString *name;
@property(nonatomic, assign) int age;
@property(nonatomic, assign) float weight;

- (instancetype)initWithName:(NSString *)name andAge:(int)age andWeight:(float)weight;

+ (instancetype)pigWithName:(NSString *)name andAge:(int)age andWeight:(float)weight;

@end

NS_ASSUME_NONNULL_END
