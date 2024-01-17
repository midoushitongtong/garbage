//
//  People.h
//  Code10
//
//  Created by Mac on 2023/11/27.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface People : NSObject
{
    @private
    NSString *_name;
    int _age;
    double _salary;
}

- (void)setName:(NSString *)name;
- (NSString *)name;

- (void)setAge:(int)age;
- (int)age;

- (void)setSalary:(double)salary;
- (double)salary;

@end

NS_ASSUME_NONNULL_END
