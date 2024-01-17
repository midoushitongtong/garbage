//
//  Animal.h
//  Code10
//
//  Created by Mac on 2023/11/30.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface Animal : NSObject
{
    @public
    NSString *_name;
}

- (void)setName:(NSString *)name;
- (NSString *)name;

@end

NS_ASSUME_NONNULL_END
