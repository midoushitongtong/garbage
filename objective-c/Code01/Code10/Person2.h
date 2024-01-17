//
//  Person2.h
//  Code10
//
//  Created by Mac on 2023/11/30.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface Person2 : NSObject
{
    @public
    NSString *_name;
    int _age;
}

- (void)sayHi;

+ (void)hehe;

@end

NS_ASSUME_NONNULL_END
