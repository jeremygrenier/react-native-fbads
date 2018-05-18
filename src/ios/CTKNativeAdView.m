//
//  CTKNativeAdManager.m
//  rn-fbads
//
//  Created by Mike Grabowski on 24/09/16.
//  Copyright © 2016 Callstack.io. All rights reserved.
//

@import FBAudienceNetwork;
#import "CTKNativeAdView.h"
#import <React/RCTUtils.h>

@interface FBAdImage (json)
@end

@implementation FBAdImage (json)

- (NSDictionary *)json
{
    NSString *url = [self.url absoluteString];
    return @{@"url": url, @"width": @(self.width), @"height": @(self.height)};
}

@end

@interface CTKNativeAdView ()
@end

@implementation CTKNativeAdView

- (void)setNativeAd:(FBNativeAd *)nativeAd {
    _nativeAd = nativeAd;

    _onAdLoaded(@{
                  @"title": _nativeAd.title,
                  @"subtitle": _nativeAd.subtitle,
                  @"description": _nativeAd.body,
                  @"socialContext": _nativeAd.socialContext,
                  @"callToActionText": _nativeAd.callToAction,
                  @"coverImage": _nativeAd.coverImage ? [_nativeAd.coverImage json]  : [NSNull null],
                  @"icon": _nativeAd.icon ? [_nativeAd.icon json] : [NSNull null],
                  });

    [_nativeAd registerViewForInteraction:self withViewController:RCTKeyWindow().rootViewController];
}

@end
