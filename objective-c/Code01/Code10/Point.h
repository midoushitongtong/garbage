//
//  Point.h
//  Code10
//
//  Created by Mac on 2023/12/17.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface Point2 : NSObject
{
    NSString *_name;
    NSString *_sexHelloWorld;
}

- (void)setName:(NSString *)name;

- (NSString *)name;

- (void)setSexHelloWorld:(NSString *)sexHelloWorld;

- (NSString *)sexHelloWorld;

@end

NS_ASSUME_NONNULL_END
