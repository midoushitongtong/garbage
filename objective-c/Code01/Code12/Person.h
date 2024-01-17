//
//  Person.h
//  Code12
//
//  Created by Mac on 2023/12/17.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface Person : NSObject

@property NSString *name;
@property int age;

- (void)sayHi;

+ (instancetype)person;

@end

NS_ASSUME_NONNULL_END
