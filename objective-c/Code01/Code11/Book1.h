//
//  Book1.h
//  Code11
//
//  Created by Mac on 2023/12/15.
//

#import <Foundation/Foundation.h>
#import "Author1.h"

NS_ASSUME_NONNULL_BEGIN

typedef struct
{
    int year;
    int mounth;
    int day;
} Date;

@interface Book1 : NSObject
{
    @private
    NSString *_name;
    NSString *_publisherName;
    Author1 *_author;
    Date _pubishDate;
}

- (void)setName:(NSString *)name;

- (NSString *)name;

- (void)setPublisherName:(NSString *)publisherName;

- (NSString *)publisherName;

- (void)setAuthor:(Author1 *)author;

- (Author1 *)author;

- (void)setPublishDate:(Date)pubishDate;

- (Date)publichDate;

@end

NS_ASSUME_NONNULL_END
