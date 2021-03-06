angular.module('starter.services', [])

.service('LoginService', function($q) {
    return {
        loginUser: function(name) {
            var deferred = $q.defer();
            var promise = deferred.promise;
 
            if (name != '0') {
                deferred.resolve('Welcome ' + name + '!');
            } else {
                deferred.reject('Wrong credentials.');
            }
            promise.success = function(fn) {
                promise.then(fn);
                return promise;
            }
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }
            return promise;
        }
    }
});
