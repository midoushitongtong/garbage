//
//  Access.h
//  Code10
//
//  Created by Mac on 2023/12/3.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface Access : NSObject
{
    @private
    NSString *_name;
    @protected
    int _age;
}

- (void)test;

@end

NS_ASSUME_NONNULL_END
