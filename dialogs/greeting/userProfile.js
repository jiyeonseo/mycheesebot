// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

/**
 * Simple user profile class.
 */
class UserProfile {
    constructor(name, city, phone) {
        this.name = name || undefined;
        this.city = city || undefined;
        this.phone = phone || undefined;
    }
};

exports.UserProfile = UserProfile;
