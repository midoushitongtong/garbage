//
//  Person.h
//  Code15_MRC
//
//  Created by Mac on 2024/1/4.
//

#import <Foundation/Foundation.h>
#import "Car.h"

NS_ASSUME_NONNULL_BEGIN

@interface Person : NSObject

@property (nonatomic, retain) Car* car;

- (instancetype)initWithCar:(Car *)car;

@end

NS_ASSUME_NONNULL_END
