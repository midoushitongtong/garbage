//
//  Player.h
//  Code05
//
//  Created by Mac on 2023/10/13.
//

#import <Foundation/Foundation.h>
#import "FistType.h"

NS_ASSUME_NONNULL_BEGIN

@interface Player : NSObject
{
    @public
    NSString *_name;
    FistType _currentFistType;
    int _score;
}

- (void)showFist;

@end

NS_ASSUME_NONNULL_END
