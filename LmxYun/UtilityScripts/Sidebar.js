/// <reference path="jquery-1.10.2.js" />

var sidebar = (function () {
    var isPinOn = false;
    var isMouseOver = false;

    function pinButton_click() {
        var $pinButton = $("#sidebar > .pinButton");

        if (isPinOn) {
            $pinButton.find(">.sideBarClose").show();
            $pinButton.find(">.open").hide();
        } else {
            $pinButton.find(">.open").show();
            $pinButton.find(">.sideBarClose").hide();
        }

        isPinOn = !isPinOn;
    }

    function hideSidebar() {
        if (!isPinOn) {
            $("#sidebar").animate({ right: "-185px" });
            $("#sidebar>.sidebarContent>li>.item-groupname").removeClass("border-top").last().addClass("no-border-bottom");
        }
    }

    function showSidebar() {
        if (!isPinOn) {
            $("#sidebar").animate({ right: 0 });
        }
    }

    function init() {
        var hideSidebarTimer;
        var $sidebar = $("#sidebar");
        var hideFirstLevelSubitems = function () {
            //return;
            $("#sidebar>ul>li>.subitems").hide();
        };

        $sidebar.mouseover(function () {
            if (hideSidebarTimer) {
                clearTimeout(hideSidebarTimer);
            }

            if (!isMouseOver) {
                showSidebar();
            }

            isMouseOver = true;
        }).mouseout(function () {
            hideSidebarTimer = setTimeout(function () {
                isMouseOver = false;
                hideSidebar();

                hideFirstLevelSubitems();
            }, 1000);
        });

        // default is only show icons of first level menu
        $sidebar.css("right", "-185px").find(".subitems").hide();

        // show second level menu
        $sidebar.find(">.sidebarContent>li>.item-groupname").each(function (index, element) {
            $(this).click(function () {
                hideFirstLevelSubitems();

                var $groupNames = $("#sidebar>.sidebarContent>li>.item-groupname");
                $groupNames.find(">.status").removeClass("selected");
                $groupNames.removeClass("border-top");
                $(this).siblings(".subitems").show();
                $(this).find(">.status").addClass("selected");

                if ($groupNames.length > index + 1) {
                    $($groupNames[index + 1]).addClass("border-top");
                }

                if ($groupNames.length === index + 1) {
                    $(this).removeClass("no-border-bottom");
                } else {
                    $sidebar.find(">.sidebarContent>li>.item-groupname:last").addClass("no-border-bottom");
                }
            });
        }).last().addClass("no-border-bottom");

        // show/hide third level menu
        $sidebar.find(".subitems .item-groupname").toggle(function () {
            $(this).siblings(".subitems").show();
            $(this).find(">.status").addClass("expand").removeClass("collapse");
        }, function () {
            $(this).siblings(".subitems").hide();
            $(this).find(">.status").addClass("collapse").removeClass("expand");
        });
    }

    return {
        pinButton_click: pinButton_click,
        init: init
    };
}());

$(function () {
    sidebar.init();
});

