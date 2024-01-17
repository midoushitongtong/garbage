//
//  Book1.m
//  Code11
//
//  Created by Mac on 2023/12/15.
//

#import "Book1.h"

@implementation Book1

- (void)setName:(NSString *)name
{
    _name = name;
}

- (NSString *)name
{
    return _name;
}

- (void)setPublisherName:(NSString *)publisherName
{
    _publisherName = publisherName;
}

- (NSString *)publisherName
{
    return _publisherName;
}

- (void)setAuthor:(Author1 *)author
{
    _author = author;
}

- (Author1 *)author
{
    return _author;
}

- (void)setPublishDate:(Date)pubishDate
{
    _pubishDate = pubishDate;
}

- (Date)publichDate
{
    return _pubishDate;
}

@end
