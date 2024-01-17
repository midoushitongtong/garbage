//
//  Person1.h
//  Code11
//
//  Created by Mac on 2023/12/15.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

typedef enum
{
    GenderMale,
    GenderFelmale
} Gender;

@interface Person1 : NSObject
{
    @private
    NSString *_name;
    int _age;
    Gender _gender;
}

- (void)setName:(NSString *)name;

- (NSString *)name;

- (void)setAge:(int)age;

- (int)age;

- (void)setGender:(Gender)gender;

- (Gender)gender;

- (void)eatFood:(NSString *)food;

@end

NS_ASSUME_NONNULL_END
