//
//  Book.h
//  Code16_MRC
//
//  Created by Mac on 2023/12/31.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@class Person;

@interface Book : NSObject

@property(nonatomic, retain) NSString *name;
@property(nonatomic, retain) NSString *authorName;
@property(nonatomic, retain) Person *owner;

- (void)castZhiShi;

@end

NS_ASSUME_NONNULL_END
