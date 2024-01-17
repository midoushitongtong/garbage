//
//  MDSTTArray.m
//  Code19
//
//  Created by Mac on 2024/1/5.
//

#import "MDSTTArray.h"
#import <string.h>

@implementation MDSTTArray

- (instancetype) init
{
    if (self = [super init]) {
        for (int i = 0; i < 10; i++) {
            arr[i] = (i + 1) * 100;
        }
    }
    return self;
}

- (void)shortWithCountries:(char *[])countries andLength:(int)len andCompareBlock:(CompareBlock)compareBlock
{
    for (int i = 0; i < len -1; i++) {
        for (int j = 0; j < len - 1 - i; j++) {
            if (compareBlock(countries[j], countries[j + 1])) {
                char *temp = countries[j];
                countries[j] = countries[j + 1];
                countries[j + 1] = temp;
            }
        }
    }
}

- (void)forEach:(ParseBlock)parseBlock
{
    for (int i = 0; i < sizeof(arr) / sizeof(int); i++) {
        parseBlock(arr[i]);
    }
}

@end
