//
//  MDSTTArray.h
//  Code19
//
//  Created by Mac on 2024/1/5.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

typedef BOOL(^CompareBlock)(char *ch1, char *ch2);

typedef void(^ParseBlock)(int num);

@interface MDSTTArray : NSObject
{
    int arr[10];
}

- (instancetype) init;

- (void)shortWithCountries:(char *[])countries andLength:(int)len andCompareBlock:(CompareBlock)compareBlock;

- (void)forEach:(ParseBlock)parseBlock;

@end

NS_ASSUME_NONNULL_END
