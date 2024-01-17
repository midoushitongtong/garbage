//
//  Bird.h
//  Code10
//
//  Created by Mac on 2023/11/30.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface Bird : NSObject
{
    @private
    NSString *_color;
    int _age;
}

- (void)fly;

@end

NS_ASSUME_NONNULL_END
