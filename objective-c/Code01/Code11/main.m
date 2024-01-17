//
//  main.m
//  Code11
//
//  Created by Mac on 2023/12/9.
//

#import <Foundation/Foundation.h>
#import "Man.h"
#import "Woman.h"
#import "SuperMan.h"
#import "Killer.h"
#import "Book1.h"
#import "Author1.h"
#import "Person1.h"
#import "Student1.h"

int main(int argc, const char * argv[]) {
//    Man *p = [Man new];
//    Woman *w = [Woman new];
//    SuperMan *sm = [SuperMan new];
//    Killer *k = [Killer new];
//
//    [k kill:p];
//    [k kill:w];
//    [k kill:sm];
//
//    NSLog(@"%@", p);
    
    Author1 *a1 = [Author1 new];
    [a1 setName:@"作者"];
    [a1 setAge:66];
    [a1 setGender:GenderMale];
    
    Book1 *b1 = [Book1 new];
    [b1 setName:@"钢铁是怎样炼成的"];
    [b1 setPublishDate:(Date){1998,12,12}];
    [b1 setPublisherName:@"人民邮电出版社"];
    [b1 setAuthor:a1];
    
    Student1 *s1 = [Student1 new];
    [s1 setName:@"小张"];
    [s1 setAge:20];
    [s1 setGender:GenderMale];
    [s1 setBook:b1];
    
    NSLog(@"%@", [[[s1 book]author]name]);
    
    Class c = [Student1 class];
    NSLog(@"%p", c);
    Student1 *s = [Student1 new];
    NSLog(@"%p", [s class]);
    
    Student1 *s2 = [c new];
    
    Person1 *s3 = [Person1 new];
    SEL sel1 = @selector(sayHi);
    
//    [s3 performSelector:sel1];
    
    SEL sel2 = @selector(eatFood:);
    [s3 performSelector:sel2 withObject:@"肉"];
        
    [s3 eatFood:@"123"];
    
    
    SEL sel3 = @selector(setAuthor:);
    [b1 performSelector:sel3 withObject:a1];

    
    
    return 0;
}
