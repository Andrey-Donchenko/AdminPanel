(function() {
    'use strict';

    angular
        .module('app.admin.contentUser')
        .controller('ContentUserController', ContentUserController);

    /* @ngInject */
    function ContentUserController($scope, $stateParams, $firebaseArray, $firebaseStorage, DataUser, dragulaService) {
        var vm = this;
        
        vm.checkType = checkType;
        vm.checkItem = checkItem;
        vm.checkName = checkName;
        vm.trimFileName = trimFileName;
        vm.changeFileName = changeFileName;
        vm.uploadFiles = uploadFiles;
        vm.determinateValue = [];
        vm.state = [];
        vm.selected = [];
        vm.check = [];
        vm.selectFolders = [];
        vm.setFolder = [];
        var content = {};

        vm.$onInit = function() {
            if ($stateParams.folderId) {
                vm.dest = $stateParams.folderId;
            }
            else {
                vm.dest = '';
            }
            DataUser.getUsers()
                .$loaded()
                .then(function(data) {
                    var record = data.$getRecord($stateParams.userId);
                    var arr = [];
                    if (record.content) {
                        record.content.forEach(function(el, i) {
                            if (el.url) {
                                arr.push(el);
                            }
                        });
                        record.content = arr;
                        data.$save(record);
                    }
                    vm.data = data;
                    vm.user = record;
                    vm.load = true;
                });
        };
        
        function uploadFiles($files) {
            if ($files !== null && $files.length > 0) {
                var fileList = [];
                $files.forEach(function(el, i) {
                    fileList.push({
                        name: el.name,
                        type: el.type,
                        fullPath: new Date().getTime()  + i + "",
                        dest: vm.dest
                    });
                });
                if (vm.user.content) {
                    vm.user.content = vm.user.content.concat(fileList);
                }
                else {
                    vm.user.content = fileList;
                }
                fileList.forEach(function(el, i) {
                    var index = vm.user.content.length - fileList.length + i;
                    var ref = firebase.storage().ref("content/" + $stateParams.userId + "/" + el.fullPath);
                    var storage = $firebaseStorage(ref);
                    var metadata = {
                        contentDisposition: 'attachment; filename="' + el.name + '"'
                    };
                    var uploadTask = storage.$put($files[i], metadata);
                    uploadTask.$progress(function(snapshot) {
                        vm.determinateValue[el.fullPath] = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                    });
                    uploadTask.$complete(function(snapshot) {
                        content = {
                            url: snapshot.downloadURL,
                            fullPath: snapshot.metadata.fullPath
                        };
                        vm.user.content.forEach(function(obj, i, arr) {
                            if (snapshot.metadata.name === obj.fullPath) {
                                Object.assign(arr[i], content);
                            }
                        })
                        vm.data.$save(vm.user);
                    });
                });
            }
        }

        function checkType(type) {
            if (type) {
                if (type.search(/jpeg|png|svg|gif|bmp|icon/) === -1) {
                    return false;
                }
                return true;
            }
            else {
                return false;
            }
        }

        function checkItem(item, index) {
            if (vm.check[index]) {
                vm.selected.push(item);
            }
            else {
                vm.selected.forEach(function(el, i, arr) {
                    if (el.name === item.name) {
                        arr.splice(i, 1);
                    }
                });
            }
        }
        
        function trimFileName(fileName) {
            var pos = fileName.lastIndexOf('.');
            if (pos === -1) {
                return fileName;
            }
            else {
                vm.ext = fileName.slice(pos);
                return fileName.slice(0, pos);
            }
        }

        function changeFileName(item) {
            var currentName = trimFileName(item.name);
            if (!vm.newFileName || currentName === vm.newFileName) {
                vm.changeName = false;
                vm.ext = "";
                return;
            }
            else {
                var newFileName = vm.newFileName + vm.ext;
                DataUser.changeFileName($stateParams.userId, item, newFileName);
                vm.ext = "";
                vm.changeName = false;
            }
        }

        function checkName(event) {
            var pattern = /[^\/\\:*?"<>|]/;
            if (event.key.search(pattern) === -1) {
                event.preventDefault();
            }
        }

        dragulaService.options($scope, 'drag-file', {
            moves: function (el, container, handle) {
                return handle.id === 'drag-icon' || handle.id === 'drag-folder';
            },
            accepts: function (el, target, source, sibling) {
                return false;
            },
        });
    }
})();