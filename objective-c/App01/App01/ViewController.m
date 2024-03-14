//
//  ViewController.m
//  App01
//
//  Created by Mac on 2024/1/21.
//

#import "ViewController.h"

@interface ViewController ()
@property (weak, nonatomic) IBOutlet UITextField *number1;
- (IBAction)test;

@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
}


- (IBAction)test {
    NSString *a = self.number1.text;
    NSLog(@"%@", [NSString stringWithFormat:@"%@", a]);
}

@end
