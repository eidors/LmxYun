

$(document).ready(function () {

    $(document).on({
        dragleave: function (e) {
            e.preventDefault();
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


    $("#drapFileInput")[0].addEventListener("drop", function (e) {
        var objThis = e.currentTarget;
        var objFile = [];
        $.each(e.dataTransfer.files, function (index, file) {
            if (file.type != '') {
                $(".FileList div").data("filename");
                $(".FileList div").each(function (index, obj) {
                    var $obj = $(this);
                    var strFileName = $obj.data("filename");
                    if (file.name == strFileName) {
                        $obj.remove();
                    }
                });
                //objFile.push(file);
                SingleUploadTask(file, index);
            }
        });
        //DrapPitchOnFile(objThis, objFile, false);
    });
    //$("#myModal").modal("show");
    $('#myModal').on('hide.bs.modal', function () {
        $(this).find("video")[0].pause();
    })
});


//function DrapPitchOnFile(obj, objFile, selectFromFileBrowser) {
//    if (objFile.length == 0) {
//        return false;
//    }
//    $("#showFileListParent").show();
//    if ($(".showFileList div").length > 0) {
//        $.each(objFile, function (i, file) {
//            var fileName = file.name;
//            DeleteFileByName(fileName);
//        });
//    }
//    if (selectFromFileBrowser) {
//        if (isIE()) {
//            var real = $("#drapFileInput");
//            var cloned = real.clone(true);
//            real.hide();
//            cloned.insertBefore(real);
//            objFilesList.push(real[0].files);
//        }
//        else {
//            objFilesList.push(objFile);
//        }

//    }
//    else
//        objFilesList.push(objFile);
//    var $btnChooseFile = $("#btnChooseFile");
//    var $openConfirmModal = $("#openConfirmModal");
//    var $TaskCategories = $("#TaskCategories");
//    if ($TaskCategories.val() != "") {
//        $btnChooseFile.prop("disabled", false);
//        $openConfirmModal.prop("disabled", false);
//    }
//    var $showFileList = $(".showFileList");
//    var $showFileListDiv = $(".showFileList>Div");
//    var $showFileList2 = $(".showFileList2");
//    var strClaassStyle = FormatFileListView(objFile.length + $showFileListDiv.length, 1);
//    var valFileLength = GetTotalFileCount();

//    $.each(objFile, function (i, file) {
//        var SelecrFileHtml = [];
//        SelecrFileHtml.push('<div class="' + ca.string.encodeHTML(strClaassStyle) + '">');
//        SelecrFileHtml.push('   <div class="table-row">');
//        SelecrFileHtml.push('       <div class="overflow-text-hidden text-size15 gray-color selectedFile PitchOnFile_' + (valFileLength - objFile.length + 1 + i) + '">' + ca.string.encodeHTML(file.name) + '</div>');
//        SelecrFileHtml.push('       <span class="icon-remove strClaassName" data-index="' + (valFileLength - objFile.length + i) + '" onclick="javascript:removeFilelist(this);"></span>');
//        SelecrFileHtml.push('   </div>');
//        SelecrFileHtml.push('</div>');
//        $showFileList.append(SelecrFileHtml.join(""));
//        var SelecrFilelistHtml = [];
//        SelecrFilelistHtml.push('<div class="col-md-12">');
//        SelecrFilelistHtml.push('   <div class="row">');
//        SelecrFilelistHtml.push('       <div class="gray-color text-size15 padding-right0 long-file-name-wrap PitchOnFile_' + (valFileLength - objFile.length + 1 + i) + '">' + ca.string.encodeHTML(file.name) + '</div>');
//        SelecrFilelistHtml.push('       <div class="remove-icon-align padding-left50">');
//        SelecrFilelistHtml.push('           <span class="icon-remove gray-color tablesaw-advance margin-right15" data-index=' + (valFileLength - objFile.length + i) + ' onclick="javascript:removeFilelist(this);"></span>');
//        SelecrFilelistHtml.push('       </div>');
//        SelecrFilelistHtml.push('   </div>');
//        SelecrFilelistHtml.push('</div>');
//        $showFileList2.append(SelecrFilelistHtml.join(""));
//    });
//}

function SingleUploadTask(objFile, index, $uploadState) {
    //var $FileNames = $("#FileNames");
    //var $FileStoreNames = $("#FileStoreNames");
    //var $FileRevisionID = $("#FileRevisionID");
    //var $FileExtensions = $("#FileExtensions");
    //var $FileSizes = $("#FileSizes");
    var objSaveFile = objFile;
    var fileName = objFile.name;
    var fileType = objFile.type;
    var IsUploadComplete = true;
    var resizeTimer = null;
    var fd = new FormData();
    //var uploadRetry = [];
    //uploadRetry.push('<a class="color-red"><span class="icon-alert icon-alert-color"></span>Failed&nbsp;</a>');
    //uploadRetry.push('<a class="sa-upload-failed" href="javascript:void(0);" onclick="javascript:RetryUploadFile(\'' + ca.string.encodeJS(fileName) + '\',' + index + ');"><span class="icon-refresh icon-refresh-color"></span>Retry&nbsp;</a>');
    //uploadRetry.push('<a class="sa-upload-failed" href="javascript:void(0);"><span class="margin-left20" onclick="javascript:removeErrorFile(this,' + index + ');"><span class="icon-trash"></span>Delete&nbsp;</span></a>');
    fd.append("fileToUpload", objFile);
    fd.append('mypic', objFile);
    try {
        //if (objFile.size > 0) {
        //    $uploadState.html(progressBarHtml.join(""));
        //}
        //else {
        //    $uploadState.html(uploadRetry.join(""));
        //}
        jQuery.ajax({
            data: fd,
            type: "POST",
            processData: false,
            contentType: false,
            url: '/LmxYun/Home/SalAjxFilesUpload',
            xhr: function () {
                var xhr = new XMLHttpRequest();
                xhr.upload.addEventListener("progress", function (evt) {
                    $progress = $("#uploadProgress" + index + " .progress");
                    $progressNumber = $("#uploadProgress" + index + " .progress-number");
                    if (evt.lengthComputable && $progress.length > 0) {
                        var percentComplete = Math.round(evt.loaded * 100 / evt.total);
                        $progress.children(".progress-bar").width(percentComplete + "%");
                        $progressNumber.text(percentComplete + "%");
                    }
                }, false);
                return xhr;
            },
            beforeSend: function (XMLHttpRequest) {
            },
            success: function (r) {
                if (r.Data[0] == "success") {
                    var strHtml = "";
                    var aryHtml = [];
                    var strFileLogo = "";
                    if (fileType == "video/mp4") {
                        strFileLogo = "video_logo.jpg"
                    }
                    else if(fileType == "audio/mp3") {
                        strFileLogo = "audio_logo.jpg"
                    }
                    aryHtml.push('<div class="col-xs-2 img-rounded text-center" data-filename="' + fileName + '" data-type="' + fileType + '" data-fileurl="/LmxYun/UploadPath/LMX/' + fileName + '" onclick="openVideo(this);">');
                    aryHtml.push('<img class="single" src="/LmxYun/Images/' + strFileLogo + '"/>');
                    aryHtml.push('<span>' + fileName + '</span>');
                    aryHtml.push('</div>');
                    strHtml = aryHtml.join("");
                    $(".FileList").append(strHtml);
                }
                //alert("upload success");
                //$uploadState.html(uploadCompleted.join(""));
                //var fileExtension = fileName.substr(fileName.lastIndexOf(".")).toLowerCase();
                //if ($FileNames.val() == "") {
                //    $FileNames.val(fileName);
                //    $FileStoreNames.val(r.Data[1]);
                //    $FileRevisionID.val(r.Data[2]);
                //    $FileExtensions.val(fileExtension);
                //    $FileSizes.val(objSaveFile.size);
                //}
                //else {
                //    $FileNames.val($FileNames.val() + "|||" + fileName);
                //    $FileStoreNames.val($FileStoreNames.val() + "|||" + r.Data[1]);
                //    $FileRevisionID.val($FileRevisionID.val() + "|||" + r.Data[2]);
                //    $FileExtensions.val($FileExtensions.val() + "|||" + fileExtension);
                //    $FileSizes.val($FileSizes.val() + "|||" + objSaveFile.size);
                //}
                //DeleteFileInFileList(fileName);
                //uploadedFileCount++;
                //if (uploadedFileCount < $(".selectedFile").length) {
                //    IsUploadComplete = false;
                //    return false;
                //}
                //if (IsUploadComplete && !IsFinish) {
                //    IsFinish = true;
                //    SaveUploadFilesList("");
                //}
            },
            complete: function () {
                //if ($(".icon-export-color").length > 0) {
                //    $uploadState = $("#uploadProgress" + valIndex + " .state");
                //    var valNumber = valIndex;
                //    valIndex++;
                //    SingleUploadTask(GetFileByName($(".selectedFile").eq(valNumber).text()), valNumber, $uploadState);
                //}
            },
            error: function (r) {
                //$uploadState.html(uploadRetry.join(""));
                ////$("#cancelConfirmModal").prop("disabled", false);
                //$("#openConfirmModal .icon-check").show();
                //$(".icon-loading-motion").hide();
                //$("#nav-global-user ul li a").off("click");
            }
        });
    }
    catch (error) {
        console.log(error);
        //$uploadState.html(uploadRetry.join(""));
        //if ($(".icon-export-color").length > 0) {
        //    $uploadState = $("#uploadProgress" + valIndex + " .state");
        //    var valNumber = valIndex;
        //    valIndex++;
        //    if ($(".selectedFile").eq(valNumber).text() != "")
        //        SingleUploadTask(GetFileByName($(".selectedFile").eq(valNumber).text()), valNumber, $uploadState);
        //    return false;
        //}
    }
}

function openVideo(obj) {
    var $objThis = $(obj);
    var strType = $objThis.data("type");
    var strURL = $objThis.data("fileurl");
    if (strType == "video/mp4") {
        var $myModal = $("#myModal");
        var domVideo = $myModal.find("video")[0];
        domVideo.src = strURL;
        domVideo.play();
        $myModal.modal("show");
    }
    else if (strType == "audio/mp3") {
        var $myModalAudio = $("#myModalAudio");
        var domAudio = $myModalAudio.find("audio")[0];
        domAudio.src = strURL;
        domAudio.play();
        $myModalAudio.modal("show");
    }

    //$("#myModal").modal("show");
} 