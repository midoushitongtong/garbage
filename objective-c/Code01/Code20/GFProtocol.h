//
//  GFProtocol.h
//  Code20
//
//  Created by Mac on 2024/1/6.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@protocol GFProtocol <NSObject>

@required
- (void)wash;
- (void)cook;

@optional
- (void)job;

@end

NS_ASSUME_NONNULL_END
