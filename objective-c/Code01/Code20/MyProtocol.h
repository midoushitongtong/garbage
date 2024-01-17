//
//  MyProtocol.h
//  Code20
//
//  Created by Mac on 2024/1/6.
//

#import <Foundation/Foundation.h>
#import "YouProcol.h"

NS_ASSUME_NONNULL_BEGIN

@protocol MyProtocol <YouProcol>


@required
- (void)run;

@optional
- (void)sleep;


@end

NS_ASSUME_NONNULL_END
