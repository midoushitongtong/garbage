//
//  Person.h
//  Code04
//
//  Created by Mac on 2023/10/10.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface Person : NSObject
{
    @public
    NSString *_name;
    int _age;
    float _height;
    float _weight;
    NSString *_skinColor;
    NSString *_country;
    Person *myFriend;
}

- (void)showMyFriend;

@end

NS_ASSUME_NONNULL_END
