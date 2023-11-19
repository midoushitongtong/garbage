//
//  Person.h
//  Code03
//
//  Created by Mac on 2023/10/10.
//

#import <Foundation/Foundation.h>
#import "Gender.h"

NS_ASSUME_NONNULL_BEGIN

@interface Person : NSObject
{
    @public
    NSString *_name;
    int _age;
    Gender _gender;
    int _leftLife;
}

- (void)show;

@end

NS_ASSUME_NONNULL_END
