//
//  Person.h
//  Code11
//
//  Created by Mac on 2023/12/9.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface Person : NSObject
{
    @private
    NSString *_name;
}

- (void)setName:(NSString *)name;

- (NSString *)name;


- (void)sayHi;

- (void)help;

@end

NS_ASSUME_NONNULL_END
