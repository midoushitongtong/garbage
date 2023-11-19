//
//  Judge.h
//  Code05
//
//  Created by Mac on 2023/10/13.
//

#import <Foundation/Foundation.h>
#import "Player.h"
#import "Robot.h"

NS_ASSUME_NONNULL_BEGIN

@interface Judge : NSObject
{
    @public
    NSString *_name;
}

- (void)compareFistType:(Player *)player :(Robot *)robot;

@end

NS_ASSUME_NONNULL_END
