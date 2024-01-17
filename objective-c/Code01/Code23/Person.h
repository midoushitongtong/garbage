//
//  Person.h
//  Code23
//
//  Created by Mac on 2024/1/16.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface Person : NSObject
{
    NSString *_name;
}

- (void)setName:(NSString *)name;

- (NSString *)name;

@property (nonatomic, copy) NSString *age;

@end

NS_ASSUME_NONNULL_END
