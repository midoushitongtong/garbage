//
//  Computer.h
//  Code09
//
//  Created by Mac on 2023/11/12.
//

#import <Foundation/Foundation.h>
#import "CPU.h"
#import "Memory.h"
#import "MainBoard.h"

NS_ASSUME_NONNULL_BEGIN

@interface Computer : NSObject
{
    @public
    CPU *_cpu;
    Memory *_memory;
    MainBoard *_mainBoard;
}

@end

NS_ASSUME_NONNULL_END
