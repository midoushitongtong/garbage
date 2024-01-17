//
//  Person.h
//  Code09
//
//  Created by Mac on 2023/11/11.
//

#import <Foundation/Foundation.h>

@interface Person : NSObject
{
    @public
    int _id;
    @private
    NSString *_name;
    int _age;
}

- (void)sayHi;

- (void)setName:(NSString *)name;
- (NSString *)name;

- (void)setAge:(int)age;
- (int)age;

+ (instancetype)person;

+ (instancetype)personWithName:(NSString *)name andAge:(int)age;

+ (void)test;
@end
