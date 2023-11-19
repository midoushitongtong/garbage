//
//  Student.h
//  Code09
//
//  Created by Mac on 2023/11/12.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface Student : NSObject
{
    @private
    NSString *_name;
    int _age;
    int _yuWen;
}

- (void)setName:(NSString *)name;

- (void)setAge:(int)age;

- (void)setYuWen:(int)age;

- (void)show;

@end

NS_ASSUME_NONNULL_END
