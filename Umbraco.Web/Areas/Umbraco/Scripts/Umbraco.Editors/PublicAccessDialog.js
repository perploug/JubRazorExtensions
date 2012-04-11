/// <reference path="/Areas/Umbraco/Scripts/Umbraco.System/NamespaceManager.js" />

Umbraco.System.registerNamespace("Umbraco.Editors");

(function ($, Base) {

    Umbraco.Editors.PublicAccessDialog = Base.extend({
        
        _opts: null,

        _dialogViewModel: null,
            
        constructor: function () {

            var _this = this;

            this._dialogViewModel = $.extend({}, Umbraco.System.BaseViewModel, {
                parent: this, // Allways set
                id: null,
                
                /* Dummy props to stop treepicker from erroring */
                selectedValue: ko.observable(),
                selectedText: ko.observable(),
                deleteLink: ko.observable(),
                chooseLink: ko.observable(),
                /* End dummy props */
                
                memberGroups: ko.observableArray([]),
                leftMemberGroupSelection: ko.observable(""),
                rightMemberGroupSelection: ko.observable(""),
                selectedMemberGroupIds: ko.observableArray([]),
                transferRight: function () {
                    this.selectedMemberGroupIds.push(this.leftMemberGroupSelection());
                    this.leftMemberGroupSelection("");
                },
                transferLeft: function () {
                    this.selectedMemberGroupIds.remove(this.rightMemberGroupSelection());
                    this.rightMemberGroupSelection("");
                },

                success: ko.observable(false),
                msgText: ko.observable(""),
                save: function(e) {
                    e.preventDefault();
                    var _this = this;
                    var data = {
                        id: _this.id,
                        userGroupIds: _this.selectedMemberGroupIds(),
                        loginPageId: $("#LoginPageId").val(),
                        errorPageId: $("#ErrorPageId").val()
                    };
                    $("#submit_Save").hide().parent().append("<div class='progress-spinner'/>");
                    $.post(_this.parent._opts.ajaxUrl, ko.toJSON(data), function(e) {
                        $("#submit_Save").show().parent().find(".progress-spinner").remove();
                        //check result for errors and use our custom validator
                        if (Umbraco.System.ValidationHelper.validateJsonResponse(e, "CustomDataValidationRule")) {
                            $(".validation-summary").validationSummaryApi().hideSummary();
                            _this.success(e.success);
                            _this.msgText(e.msg);
                            Umbraco.System.NotificationManager.getInstance().showNotifications(e.notifications);
                        }
                    });
                }
            });
            
            this._dialogViewModel.unselectedMemberGroups = ko.dependentObservable(function() {
                var _this = this;

                return ko.utils.arrayFilter(_this.memberGroups(), function(itm) {
                    return $.inArray(itm.value, _this.selectedMemberGroupIds()) == -1;
                });

            }, this._dialogViewModel);
            
            this._dialogViewModel.selectedMemberGroups = ko.dependentObservable(function() {
                var _this = this;
                
                return ko.utils.arrayFilter(_this.memberGroups(), function(itm) {
                    return $.inArray(itm.value, _this.selectedMemberGroupIds()) != -1;
                });

            }, this._dialogViewModel);
        },

        init: function(o) {

            this._opts = $.extend({ ajaxUrl: $("form").attr("action") }, o);

            //populate the view model                
            this._dialogViewModel.id = this._opts.id;
            
            for(var i = 0; i < this._opts.memberGroups.length; i++) {
                var memberGroup = this._opts.memberGroups[i];
                this._dialogViewModel.memberGroups.push(memberGroup);
            }
            
            for(var i = 0; i < this._opts.selectedMemberGroupIds.length; i++) {
                var selectedMemberGroupId = this._opts.selectedMemberGroupIds[i];
                this._dialogViewModel.selectedMemberGroupIds.push(selectedMemberGroupId);
            }
                
            $("#submit_Save").attr("data-bind", "click: save, visible: !success()");

            //apply knockout js bindings
            ko.applyBindings(this._dialogViewModel);
        }

    }, {
        
        _instance: null,
        
        // Singleton accessor
        getInstance: function () {
            if(this._instance == null)
                this._instance = new Umbraco.Editors.PublicAccessDialog();
            return this._instance;
        }
        
    });

})(jQuery, base2.Base);