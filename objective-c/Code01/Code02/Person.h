//
//  Person.h
//  Code02
//
//  Created by Mac on 2023/10/9.
//

#import <Foundation/Foundation.h>
#import "Bird.h"

NS_ASSUME_NONNULL_BEGIN

@interface Person : NSObject
{
    @public NSString *name;
}

- (void)sayHi:(Bird *) bird;
@end

NS_ASSUME_NONNULL_END
