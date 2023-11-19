//
//  People.h
//  Code09
//
//  Created by Mac on 2023/11/12.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface People : NSObject
{
    @private
    NSString *_name;
    int _age;
}

- (void)setName:(NSString *)name;

- (void)setAge:(int)age;

- (NSString *) getName;

- (int) getAge;

- (void)sayHi;

@end

NS_ASSUME_NONNULL_END
