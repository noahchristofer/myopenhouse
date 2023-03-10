#if 0
#elif defined(__arm64__) && __arm64__
// Generated by Apple Swift version 5.5.1 (swiftlang-1300.0.31.4 clang-1300.0.29.6)
#ifndef FBSDKLOGINKIT_SWIFT_H
#define FBSDKLOGINKIT_SWIFT_H
#pragma clang diagnostic push
#pragma clang diagnostic ignored "-Wgcc-compat"

#if !defined(__has_include)
# define __has_include(x) 0
#endif
#if !defined(__has_attribute)
# define __has_attribute(x) 0
#endif
#if !defined(__has_feature)
# define __has_feature(x) 0
#endif
#if !defined(__has_warning)
# define __has_warning(x) 0
#endif

#if __has_include(<swift/objc-prologue.h>)
# include <swift/objc-prologue.h>
#endif

#pragma clang diagnostic ignored "-Wauto-import"
#include <Foundation/Foundation.h>
#include <stdint.h>
#include <stddef.h>
#include <stdbool.h>

#if !defined(SWIFT_TYPEDEFS)
# define SWIFT_TYPEDEFS 1
# if __has_include(<uchar.h>)
#  include <uchar.h>
# elif !defined(__cplusplus)
typedef uint_least16_t char16_t;
typedef uint_least32_t char32_t;
# endif
typedef float swift_float2  __attribute__((__ext_vector_type__(2)));
typedef float swift_float3  __attribute__((__ext_vector_type__(3)));
typedef float swift_float4  __attribute__((__ext_vector_type__(4)));
typedef double swift_double2  __attribute__((__ext_vector_type__(2)));
typedef double swift_double3  __attribute__((__ext_vector_type__(3)));
typedef double swift_double4  __attribute__((__ext_vector_type__(4)));
typedef int swift_int2  __attribute__((__ext_vector_type__(2)));
typedef int swift_int3  __attribute__((__ext_vector_type__(3)));
typedef int swift_int4  __attribute__((__ext_vector_type__(4)));
typedef unsigned int swift_uint2  __attribute__((__ext_vector_type__(2)));
typedef unsigned int swift_uint3  __attribute__((__ext_vector_type__(3)));
typedef unsigned int swift_uint4  __attribute__((__ext_vector_type__(4)));
#endif

#if !defined(SWIFT_PASTE)
# define SWIFT_PASTE_HELPER(x, y) x##y
# define SWIFT_PASTE(x, y) SWIFT_PASTE_HELPER(x, y)
#endif
#if !defined(SWIFT_METATYPE)
# define SWIFT_METATYPE(X) Class
#endif
#if !defined(SWIFT_CLASS_PROPERTY)
# if __has_feature(objc_class_property)
#  define SWIFT_CLASS_PROPERTY(...) __VA_ARGS__
# else
#  define SWIFT_CLASS_PROPERTY(...)
# endif
#endif

#if __has_attribute(objc_runtime_name)
# define SWIFT_RUNTIME_NAME(X) __attribute__((objc_runtime_name(X)))
#else
# define SWIFT_RUNTIME_NAME(X)
#endif
#if __has_attribute(swift_name)
# define SWIFT_COMPILE_NAME(X) __attribute__((swift_name(X)))
#else
# define SWIFT_COMPILE_NAME(X)
#endif
#if __has_attribute(objc_method_family)
# define SWIFT_METHOD_FAMILY(X) __attribute__((objc_method_family(X)))
#else
# define SWIFT_METHOD_FAMILY(X)
#endif
#if __has_attribute(noescape)
# define SWIFT_NOESCAPE __attribute__((noescape))
#else
# define SWIFT_NOESCAPE
#endif
#if __has_attribute(ns_consumed)
# define SWIFT_RELEASES_ARGUMENT __attribute__((ns_consumed))
#else
# define SWIFT_RELEASES_ARGUMENT
#endif
#if __has_attribute(warn_unused_result)
# define SWIFT_WARN_UNUSED_RESULT __attribute__((warn_unused_result))
#else
# define SWIFT_WARN_UNUSED_RESULT
#endif
#if __has_attribute(noreturn)
# define SWIFT_NORETURN __attribute__((noreturn))
#else
# define SWIFT_NORETURN
#endif
#if !defined(SWIFT_CLASS_EXTRA)
# define SWIFT_CLASS_EXTRA
#endif
#if !defined(SWIFT_PROTOCOL_EXTRA)
# define SWIFT_PROTOCOL_EXTRA
#endif
#if !defined(SWIFT_ENUM_EXTRA)
# define SWIFT_ENUM_EXTRA
#endif
#if !defined(SWIFT_CLASS)
# if __has_attribute(objc_subclassing_restricted)
#  define SWIFT_CLASS(SWIFT_NAME) SWIFT_RUNTIME_NAME(SWIFT_NAME) __attribute__((objc_subclassing_restricted)) SWIFT_CLASS_EXTRA
#  define SWIFT_CLASS_NAMED(SWIFT_NAME) __attribute__((objc_subclassing_restricted)) SWIFT_COMPILE_NAME(SWIFT_NAME) SWIFT_CLASS_EXTRA
# else
#  define SWIFT_CLASS(SWIFT_NAME) SWIFT_RUNTIME_NAME(SWIFT_NAME) SWIFT_CLASS_EXTRA
#  define SWIFT_CLASS_NAMED(SWIFT_NAME) SWIFT_COMPILE_NAME(SWIFT_NAME) SWIFT_CLASS_EXTRA
# endif
#endif
#if !defined(SWIFT_RESILIENT_CLASS)
# if __has_attribute(objc_class_stub)
#  define SWIFT_RESILIENT_CLASS(SWIFT_NAME) SWIFT_CLASS(SWIFT_NAME) __attribute__((objc_class_stub))
#  define SWIFT_RESILIENT_CLASS_NAMED(SWIFT_NAME) __attribute__((objc_class_stub)) SWIFT_CLASS_NAMED(SWIFT_NAME)
# else
#  define SWIFT_RESILIENT_CLASS(SWIFT_NAME) SWIFT_CLASS(SWIFT_NAME)
#  define SWIFT_RESILIENT_CLASS_NAMED(SWIFT_NAME) SWIFT_CLASS_NAMED(SWIFT_NAME)
# endif
#endif

#if !defined(SWIFT_PROTOCOL)
# define SWIFT_PROTOCOL(SWIFT_NAME) SWIFT_RUNTIME_NAME(SWIFT_NAME) SWIFT_PROTOCOL_EXTRA
# define SWIFT_PROTOCOL_NAMED(SWIFT_NAME) SWIFT_COMPILE_NAME(SWIFT_NAME) SWIFT_PROTOCOL_EXTRA
#endif

#if !defined(SWIFT_EXTENSION)
# define SWIFT_EXTENSION(M) SWIFT_PASTE(M##_Swift_, __LINE__)
#endif

#if !defined(OBJC_DESIGNATED_INITIALIZER)
# if __has_attribute(objc_designated_initializer)
#  define OBJC_DESIGNATED_INITIALIZER __attribute__((objc_designated_initializer))
# else
#  define OBJC_DESIGNATED_INITIALIZER
# endif
#endif
#if !defined(SWIFT_ENUM_ATTR)
# if defined(__has_attribute) && __has_attribute(enum_extensibility)
#  define SWIFT_ENUM_ATTR(_extensibility) __attribute__((enum_extensibility(_extensibility)))
# else
#  define SWIFT_ENUM_ATTR(_extensibility)
# endif
#endif
#if !defined(SWIFT_ENUM)
# define SWIFT_ENUM(_type, _name, _extensibility) enum _name : _type _name; enum SWIFT_ENUM_ATTR(_extensibility) SWIFT_ENUM_EXTRA _name : _type
# if __has_feature(generalized_swift_name)
#  define SWIFT_ENUM_NAMED(_type, _name, SWIFT_NAME, _extensibility) enum _name : _type _name SWIFT_COMPILE_NAME(SWIFT_NAME); enum SWIFT_COMPILE_NAME(SWIFT_NAME) SWIFT_ENUM_ATTR(_extensibility) SWIFT_ENUM_EXTRA _name : _type
# else
#  define SWIFT_ENUM_NAMED(_type, _name, SWIFT_NAME, _extensibility) SWIFT_ENUM(_type, _name, _extensibility)
# endif
#endif
#if !defined(SWIFT_UNAVAILABLE)
# define SWIFT_UNAVAILABLE __attribute__((unavailable))
#endif
#if !defined(SWIFT_UNAVAILABLE_MSG)
# define SWIFT_UNAVAILABLE_MSG(msg) __attribute__((unavailable(msg)))
#endif
#if !defined(SWIFT_AVAILABILITY)
# define SWIFT_AVAILABILITY(plat, ...) __attribute__((availability(plat, __VA_ARGS__)))
#endif
#if !defined(SWIFT_WEAK_IMPORT)
# define SWIFT_WEAK_IMPORT __attribute__((weak_import))
#endif
#if !defined(SWIFT_DEPRECATED)
# define SWIFT_DEPRECATED __attribute__((deprecated))
#endif
#if !defined(SWIFT_DEPRECATED_MSG)
# define SWIFT_DEPRECATED_MSG(...) __attribute__((deprecated(__VA_ARGS__)))
#endif
#if __has_feature(attribute_diagnose_if_objc)
# define SWIFT_DEPRECATED_OBJC(Msg) __attribute__((diagnose_if(1, Msg, "warning")))
#else
# define SWIFT_DEPRECATED_OBJC(Msg) SWIFT_DEPRECATED_MSG(Msg)
#endif
#if !defined(IBSegueAction)
# define IBSegueAction
#endif
#if __has_feature(modules)
#if __has_warning("-Watimport-in-framework-header")
#pragma clang diagnostic ignored "-Watimport-in-framework-header"
#endif
@import FBSDKCoreKit;
@import Foundation;
@import ObjectiveC;
#endif

#import <FBSDKLoginKit/FBSDKLoginKit.h>

#pragma clang diagnostic ignored "-Wproperty-attribute-mismatch"
#pragma clang diagnostic ignored "-Wduplicate-method-arg"
#if __has_warning("-Wpragma-clang-attribute")
# pragma clang diagnostic ignored "-Wpragma-clang-attribute"
#endif
#pragma clang diagnostic ignored "-Wunknown-pragmas"
#pragma clang diagnostic ignored "-Wnullability"

#if __has_attribute(external_source_symbol)
# pragma push_macro("any")
# undef any
# pragma clang attribute push(__attribute__((external_source_symbol(language="Swift", defined_in="FBSDKLoginKit",generated_declaration))), apply_to=any(function,enum,objc_interface,objc_category,objc_protocol))
# pragma pop_macro("any")
#endif

@class NSNumber;

/// Internal Type exposed to facilitate transition to Swift.
/// API Subject to change or removal without warning. Do not use.
/// @warning INTERNAL - DO NOT USE
SWIFT_PROTOCOL_NAMED("_LoginEventLogging")
@protocol _FBSDKLoginEventLogging
@property (nonatomic, readonly) FBSDKAppEventsFlushBehavior flushBehavior;
- (void)logInternalEvent:(FBSDKAppEventName _Nonnull)eventName parameters:(NSDictionary<FBSDKAppEventParameterName, id> * _Nullable)parameters isImplicitlyLogged:(BOOL)isImplicitlyLogged;
- (void)flush;
@end


@interface FBSDKAppEvents (SWIFT_EXTENSION(FBSDKLoginKit)) <_FBSDKLoginEventLogging>
@end

@class NSString;
@class NSURL;
@class NSDate;

/// Describes the initial response when starting the device login flow.
/// This is used by <code>DeviceLoginManager</code>.
SWIFT_CLASS_NAMED("DeviceLoginCodeInfo")
@interface FBSDKDeviceLoginCodeInfo : NSObject
/// The unique id for this login flow.
@property (nonatomic, readonly, copy) NSString * _Nonnull identifier;
/// The short “user_code” that should be presented to the user.
@property (nonatomic, readonly, copy) NSString * _Nonnull loginCode;
/// The verification URL.
@property (nonatomic, readonly, copy) NSURL * _Nonnull verificationURL;
/// The expiration date.
@property (nonatomic, readonly, copy) NSDate * _Nonnull expirationDate;
/// The polling interval
@property (nonatomic, readonly) NSUInteger pollingInterval;
- (nonnull instancetype)initWithIdentifier:(NSString * _Nonnull)identifier loginCode:(NSString * _Nonnull)loginCode verificationURL:(NSURL * _Nonnull)verificationURL expirationDate:(NSDate * _Nonnull)expirationDate pollingInterval:(NSUInteger)pollingInterval OBJC_DESIGNATED_INITIALIZER;
- (nonnull instancetype)init SWIFT_UNAVAILABLE;
+ (nonnull instancetype)new SWIFT_UNAVAILABLE_MSG("-init is unavailable");
@end

@class FBSDKAccessToken;

/// Represents the results of the a device login flow. This is used by <code>DeviceLoginManager</code>
SWIFT_CLASS_NAMED("DeviceLoginManagerResult")
@interface FBSDKDeviceLoginManagerResult : NSObject
/// The token
@property (nonatomic, readonly, strong) FBSDKAccessToken * _Nullable accessToken;
/// Indicates if the login was cancelled by the user, or if the device login code has expired.
@property (nonatomic, readonly) BOOL isCancelled;
/// Internal method exposed to facilitate transition to Swift.
/// API Subject to change or removal without warning. Do not use.
/// @warning INTERNAL - DO NOT USE
- (nonnull instancetype)initWithToken:(FBSDKAccessToken * _Nullable)token isCancelled:(BOOL)cancelled OBJC_DESIGNATED_INITIALIZER;
- (nonnull instancetype)init SWIFT_UNAVAILABLE;
+ (nonnull instancetype)new SWIFT_UNAVAILABLE_MSG("-init is unavailable");
@end

@class UIViewController;
@class UIView;

/// Internal Type exposed to facilitate transition to Swift.
/// API Subject to change or removal without warning. Do not use.
/// @warning INTERNAL - DO NOT USE
SWIFT_PROTOCOL_NAMED("_UserInterfaceElementProviding")
@protocol _FBSDKUserInterfaceElementProviding
- (UIViewController * _Nullable)topMostViewController SWIFT_WARN_UNUSED_RESULT;
- (UIViewController * _Nullable)viewControllerForView:(UIView * _Nonnull)view SWIFT_WARN_UNUSED_RESULT;
@end


@interface FBSDKInternalUtility (SWIFT_EXTENSION(FBSDKLoginKit)) <_FBSDKUserInterfaceElementProviding>
@end

@class NSBundle;

/// Internal Type exposed to facilitate transition to Swift.
/// API Subject to change or removal without warning. Do not use.
/// @warning INTERNAL - DO NOT USE
SWIFT_PROTOCOL_NAMED("_UserInterfaceStringProviding")
@protocol _FBSDKUserInterfaceStringProviding
@property (nonatomic, readonly, strong) NSBundle * _Nonnull bundleForStrings;
@end


@interface FBSDKInternalUtility (SWIFT_EXTENSION(FBSDKLoginKit)) <_FBSDKUserInterfaceStringProviding>
@end


/// Internal Type exposed to facilitate transition to Swift.
/// API Subject to change or removal without warning. Do not use.
/// @warning INTERNAL - DO NOT USE
SWIFT_PROTOCOL_NAMED("_ServerConfigurationProviding")
@protocol _FBSDKServerConfigurationProviding
- (void)loadServerConfigurationWithCompletionBlock:(FBSDKLoginTooltipBlock _Nullable)completion;
@end


@interface FBSDKServerConfigurationProvider (SWIFT_EXTENSION(FBSDKLoginKit)) <_FBSDKServerConfigurationProviding>
@end


/// Internal Type exposed to facilitate transition to Swift.
/// API Subject to change or removal without warning. Do not use.
/// @warning INTERNAL - DO NOT USE
SWIFT_CLASS_NAMED("_DevicePoller")
@interface FBSDKDevicePoller : NSObject <FBSDKDevicePolling>
- (void)scheduleBlock:(void (^ _Nonnull)(void))block interval:(NSUInteger)interval;
- (nonnull instancetype)init OBJC_DESIGNATED_INITIALIZER;
@end

@protocol NSNetServiceDelegate;
@class NSNetService;

SWIFT_CLASS_NAMED("_DeviceRequestsHelper")
@interface FBSDKDeviceRequestsHelper : NSObject
/// Get device info to include with the GraphRequest
+ (NSString * _Nonnull)getDeviceInfo SWIFT_WARN_UNUSED_RESULT;
/// Start the mDNS advertisement service for a device request
/// @param loginCode The login code associated with the action for the device request.
/// @return True if the service broadcast was successfully started.
+ (BOOL)startAdvertisementServiceWithLoginCode:(NSString * _Nonnull)loginCode delegate:(id <NSNetServiceDelegate> _Nonnull)delegate;
/// Check if a service delegate is registered with particular advertisement service
/// @param delegate The delegate to check if registered.
/// @param service The advertisement service to check for.
/// @return True if the service is the one the delegate registered with.
+ (BOOL)isDelegate:(id <NSNetServiceDelegate> _Nonnull)delegate forAdvertisementService:(NSNetService * _Nonnull)service SWIFT_WARN_UNUSED_RESULT;
/// Stop the mDNS advertisement service for a device request
/// @param delegate The delegate registered with the service.
+ (void)cleanUpAdvertisementServiceFor:(id <NSNetServiceDelegate> _Nonnull)delegate;
- (nonnull instancetype)init OBJC_DESIGNATED_INITIALIZER;
@end





#if __has_attribute(external_source_symbol)
# pragma clang attribute pop
#endif
#pragma clang diagnostic pop
#endif

#elif defined(__x86_64__) && __x86_64__
// Generated by Apple Swift version 5.5.1 (swiftlang-1300.0.31.4 clang-1300.0.29.6)
#ifndef FBSDKLOGINKIT_SWIFT_H
#define FBSDKLOGINKIT_SWIFT_H
#pragma clang diagnostic push
#pragma clang diagnostic ignored "-Wgcc-compat"

#if !defined(__has_include)
# define __has_include(x) 0
#endif
#if !defined(__has_attribute)
# define __has_attribute(x) 0
#endif
#if !defined(__has_feature)
# define __has_feature(x) 0
#endif
#if !defined(__has_warning)
# define __has_warning(x) 0
#endif

#if __has_include(<swift/objc-prologue.h>)
# include <swift/objc-prologue.h>
#endif

#pragma clang diagnostic ignored "-Wauto-import"
#include <Foundation/Foundation.h>
#include <stdint.h>
#include <stddef.h>
#include <stdbool.h>

#if !defined(SWIFT_TYPEDEFS)
# define SWIFT_TYPEDEFS 1
# if __has_include(<uchar.h>)
#  include <uchar.h>
# elif !defined(__cplusplus)
typedef uint_least16_t char16_t;
typedef uint_least32_t char32_t;
# endif
typedef float swift_float2  __attribute__((__ext_vector_type__(2)));
typedef float swift_float3  __attribute__((__ext_vector_type__(3)));
typedef float swift_float4  __attribute__((__ext_vector_type__(4)));
typedef double swift_double2  __attribute__((__ext_vector_type__(2)));
typedef double swift_double3  __attribute__((__ext_vector_type__(3)));
typedef double swift_double4  __attribute__((__ext_vector_type__(4)));
typedef int swift_int2  __attribute__((__ext_vector_type__(2)));
typedef int swift_int3  __attribute__((__ext_vector_type__(3)));
typedef int swift_int4  __attribute__((__ext_vector_type__(4)));
typedef unsigned int swift_uint2  __attribute__((__ext_vector_type__(2)));
typedef unsigned int swift_uint3  __attribute__((__ext_vector_type__(3)));
typedef unsigned int swift_uint4  __attribute__((__ext_vector_type__(4)));
#endif

#if !defined(SWIFT_PASTE)
# define SWIFT_PASTE_HELPER(x, y) x##y
# define SWIFT_PASTE(x, y) SWIFT_PASTE_HELPER(x, y)
#endif
#if !defined(SWIFT_METATYPE)
# define SWIFT_METATYPE(X) Class
#endif
#if !defined(SWIFT_CLASS_PROPERTY)
# if __has_feature(objc_class_property)
#  define SWIFT_CLASS_PROPERTY(...) __VA_ARGS__
# else
#  define SWIFT_CLASS_PROPERTY(...)
# endif
#endif

#if __has_attribute(objc_runtime_name)
# define SWIFT_RUNTIME_NAME(X) __attribute__((objc_runtime_name(X)))
#else
# define SWIFT_RUNTIME_NAME(X)
#endif
#if __has_attribute(swift_name)
# define SWIFT_COMPILE_NAME(X) __attribute__((swift_name(X)))
#else
# define SWIFT_COMPILE_NAME(X)
#endif
#if __has_attribute(objc_method_family)
# define SWIFT_METHOD_FAMILY(X) __attribute__((objc_method_family(X)))
#else
# define SWIFT_METHOD_FAMILY(X)
#endif
#if __has_attribute(noescape)
# define SWIFT_NOESCAPE __attribute__((noescape))
#else
# define SWIFT_NOESCAPE
#endif
#if __has_attribute(ns_consumed)
# define SWIFT_RELEASES_ARGUMENT __attribute__((ns_consumed))
#else
# define SWIFT_RELEASES_ARGUMENT
#endif
#if __has_attribute(warn_unused_result)
# define SWIFT_WARN_UNUSED_RESULT __attribute__((warn_unused_result))
#else
# define SWIFT_WARN_UNUSED_RESULT
#endif
#if __has_attribute(noreturn)
# define SWIFT_NORETURN __attribute__((noreturn))
#else
# define SWIFT_NORETURN
#endif
#if !defined(SWIFT_CLASS_EXTRA)
# define SWIFT_CLASS_EXTRA
#endif
#if !defined(SWIFT_PROTOCOL_EXTRA)
# define SWIFT_PROTOCOL_EXTRA
#endif
#if !defined(SWIFT_ENUM_EXTRA)
# define SWIFT_ENUM_EXTRA
#endif
#if !defined(SWIFT_CLASS)
# if __has_attribute(objc_subclassing_restricted)
#  define SWIFT_CLASS(SWIFT_NAME) SWIFT_RUNTIME_NAME(SWIFT_NAME) __attribute__((objc_subclassing_restricted)) SWIFT_CLASS_EXTRA
#  define SWIFT_CLASS_NAMED(SWIFT_NAME) __attribute__((objc_subclassing_restricted)) SWIFT_COMPILE_NAME(SWIFT_NAME) SWIFT_CLASS_EXTRA
# else
#  define SWIFT_CLASS(SWIFT_NAME) SWIFT_RUNTIME_NAME(SWIFT_NAME) SWIFT_CLASS_EXTRA
#  define SWIFT_CLASS_NAMED(SWIFT_NAME) SWIFT_COMPILE_NAME(SWIFT_NAME) SWIFT_CLASS_EXTRA
# endif
#endif
#if !defined(SWIFT_RESILIENT_CLASS)
# if __has_attribute(objc_class_stub)
#  define SWIFT_RESILIENT_CLASS(SWIFT_NAME) SWIFT_CLASS(SWIFT_NAME) __attribute__((objc_class_stub))
#  define SWIFT_RESILIENT_CLASS_NAMED(SWIFT_NAME) __attribute__((objc_class_stub)) SWIFT_CLASS_NAMED(SWIFT_NAME)
# else
#  define SWIFT_RESILIENT_CLASS(SWIFT_NAME) SWIFT_CLASS(SWIFT_NAME)
#  define SWIFT_RESILIENT_CLASS_NAMED(SWIFT_NAME) SWIFT_CLASS_NAMED(SWIFT_NAME)
# endif
#endif

#if !defined(SWIFT_PROTOCOL)
# define SWIFT_PROTOCOL(SWIFT_NAME) SWIFT_RUNTIME_NAME(SWIFT_NAME) SWIFT_PROTOCOL_EXTRA
# define SWIFT_PROTOCOL_NAMED(SWIFT_NAME) SWIFT_COMPILE_NAME(SWIFT_NAME) SWIFT_PROTOCOL_EXTRA
#endif

#if !defined(SWIFT_EXTENSION)
# define SWIFT_EXTENSION(M) SWIFT_PASTE(M##_Swift_, __LINE__)
#endif

#if !defined(OBJC_DESIGNATED_INITIALIZER)
# if __has_attribute(objc_designated_initializer)
#  define OBJC_DESIGNATED_INITIALIZER __attribute__((objc_designated_initializer))
# else
#  define OBJC_DESIGNATED_INITIALIZER
# endif
#endif
#if !defined(SWIFT_ENUM_ATTR)
# if defined(__has_attribute) && __has_attribute(enum_extensibility)
#  define SWIFT_ENUM_ATTR(_extensibility) __attribute__((enum_extensibility(_extensibility)))
# else
#  define SWIFT_ENUM_ATTR(_extensibility)
# endif
#endif
#if !defined(SWIFT_ENUM)
# define SWIFT_ENUM(_type, _name, _extensibility) enum _name : _type _name; enum SWIFT_ENUM_ATTR(_extensibility) SWIFT_ENUM_EXTRA _name : _type
# if __has_feature(generalized_swift_name)
#  define SWIFT_ENUM_NAMED(_type, _name, SWIFT_NAME, _extensibility) enum _name : _type _name SWIFT_COMPILE_NAME(SWIFT_NAME); enum SWIFT_COMPILE_NAME(SWIFT_NAME) SWIFT_ENUM_ATTR(_extensibility) SWIFT_ENUM_EXTRA _name : _type
# else
#  define SWIFT_ENUM_NAMED(_type, _name, SWIFT_NAME, _extensibility) SWIFT_ENUM(_type, _name, _extensibility)
# endif
#endif
#if !defined(SWIFT_UNAVAILABLE)
# define SWIFT_UNAVAILABLE __attribute__((unavailable))
#endif
#if !defined(SWIFT_UNAVAILABLE_MSG)
# define SWIFT_UNAVAILABLE_MSG(msg) __attribute__((unavailable(msg)))
#endif
#if !defined(SWIFT_AVAILABILITY)
# define SWIFT_AVAILABILITY(plat, ...) __attribute__((availability(plat, __VA_ARGS__)))
#endif
#if !defined(SWIFT_WEAK_IMPORT)
# define SWIFT_WEAK_IMPORT __attribute__((weak_import))
#endif
#if !defined(SWIFT_DEPRECATED)
# define SWIFT_DEPRECATED __attribute__((deprecated))
#endif
#if !defined(SWIFT_DEPRECATED_MSG)
# define SWIFT_DEPRECATED_MSG(...) __attribute__((deprecated(__VA_ARGS__)))
#endif
#if __has_feature(attribute_diagnose_if_objc)
# define SWIFT_DEPRECATED_OBJC(Msg) __attribute__((diagnose_if(1, Msg, "warning")))
#else
# define SWIFT_DEPRECATED_OBJC(Msg) SWIFT_DEPRECATED_MSG(Msg)
#endif
#if !defined(IBSegueAction)
# define IBSegueAction
#endif
#if __has_feature(modules)
#if __has_warning("-Watimport-in-framework-header")
#pragma clang diagnostic ignored "-Watimport-in-framework-header"
#endif
@import FBSDKCoreKit;
@import Foundation;
@import ObjectiveC;
#endif

#import <FBSDKLoginKit/FBSDKLoginKit.h>

#pragma clang diagnostic ignored "-Wproperty-attribute-mismatch"
#pragma clang diagnostic ignored "-Wduplicate-method-arg"
#if __has_warning("-Wpragma-clang-attribute")
# pragma clang diagnostic ignored "-Wpragma-clang-attribute"
#endif
#pragma clang diagnostic ignored "-Wunknown-pragmas"
#pragma clang diagnostic ignored "-Wnullability"

#if __has_attribute(external_source_symbol)
# pragma push_macro("any")
# undef any
# pragma clang attribute push(__attribute__((external_source_symbol(language="Swift", defined_in="FBSDKLoginKit",generated_declaration))), apply_to=any(function,enum,objc_interface,objc_category,objc_protocol))
# pragma pop_macro("any")
#endif

@class NSNumber;

/// Internal Type exposed to facilitate transition to Swift.
/// API Subject to change or removal without warning. Do not use.
/// @warning INTERNAL - DO NOT USE
SWIFT_PROTOCOL_NAMED("_LoginEventLogging")
@protocol _FBSDKLoginEventLogging
@property (nonatomic, readonly) FBSDKAppEventsFlushBehavior flushBehavior;
- (void)logInternalEvent:(FBSDKAppEventName _Nonnull)eventName parameters:(NSDictionary<FBSDKAppEventParameterName, id> * _Nullable)parameters isImplicitlyLogged:(BOOL)isImplicitlyLogged;
- (void)flush;
@end


@interface FBSDKAppEvents (SWIFT_EXTENSION(FBSDKLoginKit)) <_FBSDKLoginEventLogging>
@end

@class NSString;
@class NSURL;
@class NSDate;

/// Describes the initial response when starting the device login flow.
/// This is used by <code>DeviceLoginManager</code>.
SWIFT_CLASS_NAMED("DeviceLoginCodeInfo")
@interface FBSDKDeviceLoginCodeInfo : NSObject
/// The unique id for this login flow.
@property (nonatomic, readonly, copy) NSString * _Nonnull identifier;
/// The short “user_code” that should be presented to the user.
@property (nonatomic, readonly, copy) NSString * _Nonnull loginCode;
/// The verification URL.
@property (nonatomic, readonly, copy) NSURL * _Nonnull verificationURL;
/// The expiration date.
@property (nonatomic, readonly, copy) NSDate * _Nonnull expirationDate;
/// The polling interval
@property (nonatomic, readonly) NSUInteger pollingInterval;
- (nonnull instancetype)initWithIdentifier:(NSString * _Nonnull)identifier loginCode:(NSString * _Nonnull)loginCode verificationURL:(NSURL * _Nonnull)verificationURL expirationDate:(NSDate * _Nonnull)expirationDate pollingInterval:(NSUInteger)pollingInterval OBJC_DESIGNATED_INITIALIZER;
- (nonnull instancetype)init SWIFT_UNAVAILABLE;
+ (nonnull instancetype)new SWIFT_UNAVAILABLE_MSG("-init is unavailable");
@end

@class FBSDKAccessToken;

/// Represents the results of the a device login flow. This is used by <code>DeviceLoginManager</code>
SWIFT_CLASS_NAMED("DeviceLoginManagerResult")
@interface FBSDKDeviceLoginManagerResult : NSObject
/// The token
@property (nonatomic, readonly, strong) FBSDKAccessToken * _Nullable accessToken;
/// Indicates if the login was cancelled by the user, or if the device login code has expired.
@property (nonatomic, readonly) BOOL isCancelled;
/// Internal method exposed to facilitate transition to Swift.
/// API Subject to change or removal without warning. Do not use.
/// @warning INTERNAL - DO NOT USE
- (nonnull instancetype)initWithToken:(FBSDKAccessToken * _Nullable)token isCancelled:(BOOL)cancelled OBJC_DESIGNATED_INITIALIZER;
- (nonnull instancetype)init SWIFT_UNAVAILABLE;
+ (nonnull instancetype)new SWIFT_UNAVAILABLE_MSG("-init is unavailable");
@end

@class UIViewController;
@class UIView;

/// Internal Type exposed to facilitate transition to Swift.
/// API Subject to change or removal without warning. Do not use.
/// @warning INTERNAL - DO NOT USE
SWIFT_PROTOCOL_NAMED("_UserInterfaceElementProviding")
@protocol _FBSDKUserInterfaceElementProviding
- (UIViewController * _Nullable)topMostViewController SWIFT_WARN_UNUSED_RESULT;
- (UIViewController * _Nullable)viewControllerForView:(UIView * _Nonnull)view SWIFT_WARN_UNUSED_RESULT;
@end


@interface FBSDKInternalUtility (SWIFT_EXTENSION(FBSDKLoginKit)) <_FBSDKUserInterfaceElementProviding>
@end

@class NSBundle;

/// Internal Type exposed to facilitate transition to Swift.
/// API Subject to change or removal without warning. Do not use.
/// @warning INTERNAL - DO NOT USE
SWIFT_PROTOCOL_NAMED("_UserInterfaceStringProviding")
@protocol _FBSDKUserInterfaceStringProviding
@property (nonatomic, readonly, strong) NSBundle * _Nonnull bundleForStrings;
@end


@interface FBSDKInternalUtility (SWIFT_EXTENSION(FBSDKLoginKit)) <_FBSDKUserInterfaceStringProviding>
@end


/// Internal Type exposed to facilitate transition to Swift.
/// API Subject to change or removal without warning. Do not use.
/// @warning INTERNAL - DO NOT USE
SWIFT_PROTOCOL_NAMED("_ServerConfigurationProviding")
@protocol _FBSDKServerConfigurationProviding
- (void)loadServerConfigurationWithCompletionBlock:(FBSDKLoginTooltipBlock _Nullable)completion;
@end


@interface FBSDKServerConfigurationProvider (SWIFT_EXTENSION(FBSDKLoginKit)) <_FBSDKServerConfigurationProviding>
@end


/// Internal Type exposed to facilitate transition to Swift.
/// API Subject to change or removal without warning. Do not use.
/// @warning INTERNAL - DO NOT USE
SWIFT_CLASS_NAMED("_DevicePoller")
@interface FBSDKDevicePoller : NSObject <FBSDKDevicePolling>
- (void)scheduleBlock:(void (^ _Nonnull)(void))block interval:(NSUInteger)interval;
- (nonnull instancetype)init OBJC_DESIGNATED_INITIALIZER;
@end

@protocol NSNetServiceDelegate;
@class NSNetService;

SWIFT_CLASS_NAMED("_DeviceRequestsHelper")
@interface FBSDKDeviceRequestsHelper : NSObject
/// Get device info to include with the GraphRequest
+ (NSString * _Nonnull)getDeviceInfo SWIFT_WARN_UNUSED_RESULT;
/// Start the mDNS advertisement service for a device request
/// @param loginCode The login code associated with the action for the device request.
/// @return True if the service broadcast was successfully started.
+ (BOOL)startAdvertisementServiceWithLoginCode:(NSString * _Nonnull)loginCode delegate:(id <NSNetServiceDelegate> _Nonnull)delegate;
/// Check if a service delegate is registered with particular advertisement service
/// @param delegate The delegate to check if registered.
/// @param service The advertisement service to check for.
/// @return True if the service is the one the delegate registered with.
+ (BOOL)isDelegate:(id <NSNetServiceDelegate> _Nonnull)delegate forAdvertisementService:(NSNetService * _Nonnull)service SWIFT_WARN_UNUSED_RESULT;
/// Stop the mDNS advertisement service for a device request
/// @param delegate The delegate registered with the service.
+ (void)cleanUpAdvertisementServiceFor:(id <NSNetServiceDelegate> _Nonnull)delegate;
- (nonnull instancetype)init OBJC_DESIGNATED_INITIALIZER;
@end





#if __has_attribute(external_source_symbol)
# pragma clang attribute pop
#endif
#pragma clang diagnostic pop
#endif

#endif
