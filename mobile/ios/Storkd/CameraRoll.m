//
//  CameraRoll.m
//  Storkd
//
//  Created by Ryan St.Pierre on 10/10/16.
//  Copyright © 2016 Facebook. All rights reserved.
//

#import "CameraRoll.h"

@implementation CameraRoll

RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(getPhoto:(int)number:(RCTResponseSenderBlock)callback) {
  callback(@[[NSNull null], [NSNumber numberWithInt:(number *number)]]);
}
@end
