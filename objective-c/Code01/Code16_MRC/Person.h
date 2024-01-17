//
//  Person.h
//  Code16_MRC
//
//  Created by Mac on 2023/12/31.
//

#import <Foundation/Foundation.h>


NS_ASSUME_NONNULL_BEGIN

@class Book;

@interface Person : NSObject

@property(nonatomic, retain) Book* book;
@property(nonatomic, assign) NSString* name;

- (void)readBook;

@end

NS_ASSUME_NONNULL_END
