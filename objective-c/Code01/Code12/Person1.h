//
//  Person1.h
//  Code12
//
//  Created by Mac on 2023/12/19.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface Person1 : NSObject

@property NSString *name;
@property int age;
@property float height;
@property float weight;

- (instancetype)initWithName:(NSString *)name andAge:(int)age andHeight:(float)height andWeight:(float)weight;

- (void)sayHi;

@end

NS_ASSUME_NONNULL_END
