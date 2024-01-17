//
//  Test1.h
//  Code11
//
//  Created by Mac on 2023/12/14.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

typedef enum
{
    GenerMale,
    GenerFemale
} Gender;

@interface Test1 : NSObject
{
    @private
    NSString *_name;
    Gender _gender;
}

- (void)setName:(NSString *)name;

- (NSString *)name;

- (void)sayHi;

@end

NS_ASSUME_NONNULL_END
