//
//  Boy.h
//  Code20
//
//  Created by Mac on 2024/1/6.
//

#import <Foundation/Foundation.h>
#import "GFProtocol.h"

NS_ASSUME_NONNULL_BEGIN

@interface Boy : NSObject

@property (nonatomic, strong) NSString *name;
@property (nonatomic, assign) int age;
@property (nonatomic, assign) int money;
@property (nonatomic, strong) id<GFProtocol> girlFriend;

- (void)talkLove;

@end

NS_ASSUME_NONNULL_END
