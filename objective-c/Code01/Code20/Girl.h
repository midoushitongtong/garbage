//
//  Girl.h
//  Code20
//
//  Created by Mac on 2024/1/6.
//

#import <Foundation/Foundation.h>
#import "GFProtocol.h"

NS_ASSUME_NONNULL_BEGIN

@interface Girl : NSObject <GFProtocol>

@property (nonatomic, strong) NSString *name;

@end

NS_ASSUME_NONNULL_END
