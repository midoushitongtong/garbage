//
//  Format.m
//  Code05
//
//  Created by Mac on 2023/10/13.
//

#import <Foundation/Foundation.h>
#import "Format.h"


NSString * formatFistType(int fistType)
{
    switch (fistType) {
        case 1:
            return @"剪刀";
        case 2:
            return @"石头";
        case 3:
            return @"布";
    }
    return @"未知参数";
}
