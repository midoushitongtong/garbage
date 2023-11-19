//
//  God.h
//  Code03
//
//  Created by Mac on 2023/10/10.
//

#import <Foundation/Foundation.h>
#import "Gender.h"
#import "Person.h"

NS_ASSUME_NONNULL_BEGIN

@interface God : NSObject
{
    @public
    NSString *_name;
    int _age;
    Gender gender;
}

- (void)kill:(Person *)p;

- (Person *)create;

- (Person *)create:(NSString *)name andAge:(int)age andGender:(Gender)gender andLeftLife:(int)leftLife;

@end

NS_ASSUME_NONNULL_END
