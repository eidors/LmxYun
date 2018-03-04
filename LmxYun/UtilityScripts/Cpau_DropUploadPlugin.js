

(function ($, window, document, undefined) {
    var ObjAllPlugin = function (el, opt) {
        this.$element = el,
            this.defaults = {
                'filename': '',
                'Schedule': '',
                'progress': '',
                'height': '250px',
                'background_img_error': '/CompAnalyst/Cloud/Images/Failure.png',
                'background_img_right': '/CompAnalyst/Cloud/Images/done.png',
            	'background_size': '150px',
                'uploadAjaxRequestPath': '',
                'uploadAjaxRequestCallback': null,
                'incorrectUploadFileTypeAlert': 'the file type is incorrect, please upload again！'
            },
            this.options = $.extend({}, this.defaults, opt)
    }
    ObjAllPlugin.prototype = {
        dropfileload: function () {
            var Strfiletypes = this.options.filetypes;
            var Objfilename = this.options.filename;
            var ObjSchedule = this.options.Schedule;
            var Objprogress = this.options.progress;
            var StrHeight = this.options.height;
            var StrBackgroundImgError = this.options.background_img_error;
            var StrBackgroundImgRight = this.options.background_img_right;
            var StrBackgroundSize = this.options.background_size;
            var AjaxRequestPath = this.options.uploadAjaxRequestPath;
            var AjaxCallback = this.options.uploadAjaxRequestCallback;
            var IncorrectUploadFileTypeAlert = this.options.incorrectUploadFileTypeAlert;
			var dragCounter = 0;

            $(document).on({
                dragleave: function (e) {
                    //Prevent browser defaults
                    e.preventDefault();
                    //Cancel the bubble
                    e.stopPropagation();
                },
                drop: function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                },
                dragenter: function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                },
                dragover: function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                }
            });
			if (this.$element.length > 0) {
                this.$element[0].addEventListener("drop", function (e) {
					var $tempElement = $(e.target || e.srcElement);

					if ($tempElement.hasClass("upload-right-hover")) {
						$tempElement.removeClass("upload-right-hover");
					} else {
						$tempElement.closest(".upload-right-hover").removeClass("upload-right-hover");
					}

					dragCounter = 0;

                //file Object
                var fileList = e.dataTransfer.files;
                var filename = fileList[0].name;
                var filesize = Math.floor((fileList[0].size) / 1024);
                var fileExtension = filename.substr(filename.lastIndexOf(".") + 1).toUpperCase();
                Objprogress.css({ "height": '0px', "margin-top": StrHeight, "background": '' });
                Objprogress.siblings().show();
                if (fileList == undefined) {
                    alert("Upload failed, please test again");
                    return false;
                }
                if (fileList.length > 1) {
                    alert("Please just update one file every time！");
                    return false;
                }
                if (fileList.length == 0) {
                    return false;
                }
                if (fileList[0].type.indexOf('application') === -1 || jQuery.inArray(fileExtension, Strfiletypes.toUpperCase().split("|||")) === -1) {
                    alert(IncorrectUploadFileTypeAlert);
                    return false;
                }
                $(function () {
                    var fd = new FormData();
                    fd.append("fileToUpload", fileList[0]);
                    fd.append('mypic', fileList[0]);
                    $.ajax({
                        xhr: function () {
                            var xhr = new XMLHttpRequest();
                            xhr.upload.addEventListener("progress", uploadProgress, false);
                            return xhr;
                        },
                        type: 'POST',
							processData: false,
							contentType: false,
                        url: AjaxRequestPath,
                        data: fd,
                        success: function (r) {
                            if (AjaxCallback != null) {
                                AjaxCallback(r);
                            }
                        },
                        error: function (jqXHR, textStatus, errorMessage) {
                            //console.log(errorMessage);
                        }
                    });
                }, false);
                function uploadProgress(evt) {
                    if (evt.lengthComputable) {
                        var percentComplete = Math.round(evt.loaded * 100 / evt.total);
                        ObjSchedule.html(percentComplete.toString() + '%');
                        ObjSchedule.val(percentComplete.toString() + '%');
                        if (percentComplete > 0 && percentComplete < 100) {
                            Objprogress.animate({
                                marginTop: parseInt(StrHeight) - (parseInt(StrHeight) * (percentComplete / 100)) + 'px',
                                height: (parseInt(StrHeight)) * (percentComplete / 100) + 'px'
                            });
                        }
                        else if (percentComplete == 100) {
                            Objprogress.animate({
                                marginTop: parseInt(StrHeight) - (parseInt(StrHeight) * (percentComplete / 100)) + 'px',
                                height: (parseInt(StrHeight)) * (percentComplete / 100) + 'px'
                            }, function () {
                                Objprogress.siblings().hide();
                                Objprogress.css({
                                    'background': 'url(' + StrBackgroundImgRight + ') 50% 50% no-repeat',
                                    'background-size': StrBackgroundSize + " " + StrBackgroundSize
                                });
                            });
                        }
                    } else {
                        ObjSchedule.html('unable to compute');
                        ObjSchedule.val('unable to compute');
                    }
                    Objfilename.val(filename);
                }

                function uploadFailed(evt) {
                    Objprogress.siblings().hide();
                    Objprogress.css({
                        'background': 'url(' + StrBackgroundImgError + ') 50% 50% no-repeat',
                        'background-size': StrBackgroundSize + " " + StrBackgroundSize
                    });
                    //console.log("There was an error attempting to upload the file.");
                }

                function uploadCanceled(evt) {
                    Objprogress.siblings().hide();
                    Objprogress.css({
                        'background': 'url(' + StrBackgroundImgError + ') 50% 50% no-repeat',
                        'background-size': StrBackgroundSize + " " + StrBackgroundSize
                    });
                    //console.log("The upload has been canceled by the user or the browser dropped the connection.");
                }
            });

				$(this.$element[0]).on("dragenter", function (e) {
					dragCounter++;
					$(this).addClass("upload-right-hover");
				}).on("dragleave", function (e) {
					dragCounter--;

					if (dragCounter === 0) {
						$(this).removeClass("upload-right-hover");
					}
				});
            }
        }
    }
    //install default attributes
    //new ObjAllPlugin Object
    $.fn.FileUploadPlugin = function (options) {
        var objAllPlugins = new ObjAllPlugin(this, options);
        return objAllPlugins.dropfileload();
    }
})(jQuery, window, document);