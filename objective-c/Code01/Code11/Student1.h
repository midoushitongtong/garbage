//
//  Student1.h
//  Code11
//
//  Created by Mac on 2023/12/15.
//

#import "Person1.h"
#import "Book1.h"

NS_ASSUME_NONNULL_BEGIN

@interface Student1 : Person1
{
    @private
    NSString *_stuNumber;
    Book1 *_book;
}

- (void)setStuNumber:(NSString *)stuNumber;

- (NSString *)stuNumber;

- (void)setBook:(Book1 *)book;

- (Book1 *)book;

+ (void)sayHi;

@end

NS_ASSUME_NONNULL_END
