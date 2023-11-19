//
//  Phone.h
//  Code09
//
//  Created by Mac on 2023/11/12.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface Phone : NSObject
{
    NSString *_brand;
    int _price;
}

- (void)callNumber:(int)number;

@end

NS_ASSUME_NONNULL_END
