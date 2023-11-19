//
//  Person.h
//  Code07
//
//  Created by Mac on 2023/10/18.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface Person : NSObject
{
    @public
    NSString *_name;
    int _age;
}

- (void)sayHi;

+ (void)showHi;

+ (Person *)person;

+ (Person *)personWithName:(NSString *)name andAge:(int)age;

@end

NS_ASSUME_NONNULL_END
