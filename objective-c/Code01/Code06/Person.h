//
//  Person.h
//  Code06
//
//  Created by Mac on 2023/10/16.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface Person : NSObject
{
    @public
    NSString *_name;
    int _age;
    
    @private
    Person *_myFriend;
}

- (void)setMyFriend:(Person *)myFriend;

- (Person *)getMyFriend;

- (BOOL)compareAgeWithPerson:(Person *)person;
@end

NS_ASSUME_NONNULL_END
