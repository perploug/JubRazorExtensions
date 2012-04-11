/// <reference path="/Areas/Umbraco/Scripts/Umbraco.System/NamespaceManager.js" />

Umbraco.System.registerNamespace("Umbraco.Editors");

(function ($, Base) {

    Umbraco.Editors.LanguageDialog = Base.extend({
        
        _opts: null,
        _dialogViewModel: null,
            
        constructor: function () {
            
            //view model for knockout js
            this._dialogViewModel = $.extend({}, Umbraco.System.BaseViewModel, {
                parent: this, // Allways set
                id: null, 
                success: ko.observable(false),
                msgText: ko.observable(""),
                isoCode: ko.observable(""),
                save: function(e) {
                    ///<summary>Saves the hostnames</summary>

                    e.preventDefault();

                    if ($("form").valid()) {
                        $(".validation-summary").validationSummaryApi().hideSummary();
                        var _this = this;
                        var data = ko.toJSON(_this);
                        $("#submit_Save").hide().parent().append("<div class='progress-spinner'/>");
                        $.post(_this.parent._opts.ajaxUrl, data, function(e) {
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
                }
            });
            
        },
        init: function(o) {

            var _this = this;

            this._opts = $.extend({ ajaxUrl: $("form").attr("action") }, o);;

            //populate the view model                
            this._dialogViewModel.id = this._opts.id;
            this._dialogViewModel.isoCode(this._opts.isoCode);

            //manually add ko-bindings to the form elements
            $("#submit_Save").attr("data-bind", "click: save, visible: !success()");

            //apply knockout js bindings
            ko.applyBindings(this._dialogViewModel);
        }

    }, {

        _instance: null,

        // Singleton accessor
        getInstance: function () {
            if (this._instance == null)
                this._instance = new Umbraco.Editors.LanguageDialog();
            return this._instance;
        }

    });

})(jQuery, base2.Base);