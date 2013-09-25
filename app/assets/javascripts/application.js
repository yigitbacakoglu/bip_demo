// This is a manifest file that'll be compiled into including all the files listed below.
// Add new JavaScript/Coffee code in separate files in this directory and they'll automatically
// be included in the compiled file accessible from http://example.com/assets/application.js
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
//= require jquery
//= require jquery_ujs
//= require twitter/bootstrap
//= require best_in_place
//= require_tree .

$(document).ready(function () {
    /* Activating Best In Place */
    jQuery(".best_in_place").best_in_place();


    $('.best_in_place').bind("ajax:success", function () {
        notify_user($(this), 'success', "Saved")
    });

    $('.best_in_place').bind("best_in_place:startedCall", function () {
        $(this).next('i').remove();
        $('<img class="loading bip-icon" src="/assets/ajax-loader.gif"></img>').insertAfter($(this))
    });


    $('.best_in_place').bind("best_in_place:endedCall", function () {
        $('.loading').remove();
    });

    $('.best_in_place').bind("ajax:error", function (error, request) {
        var el = $(this);
        jQuery.each(jQuery.parseJSON(request.responseText), function (index, value) {
            if (typeof(value) == "object") {
                value = index + " " + value.toString();
            }
            notify_user(el, 'error', value);
        });


    });

});

notify_user = function (el, type, message) {
    el.next().next('i').remove();

    var notification_element = $(document.createElement('i'));
    if (type == "success") {
        notification_element.attr('class', "bip-icon icon-ok-sign success");
    } else {
        notification_element.attr('class', "bip-icon icon-remove-sign error");
    }
    notification_element.html(' '+ message);

    notification_element.insertAfter(el);

};

//
//$.extend(BestInPlaceEditor.prototype,
//    {
//        update: function () {
//            var editor = this;
//            if (this.formType in {"input": 1, "textarea": 1} && this.getValue() == this.oldValue) { // Avoid request if no change is made
//                this.abort();
//                return true;
//            }
//            editor.startedCall();
//            editor.ajax({
//                "type": "post",
//                "dataType": "text",
//                "data": editor.requestData(),
//                "success": function (data) {
//                    editor.loadSuccessCallback(data);
//                },
//                "error": function (request, error) {
//                    editor.loadErrorCallback(request, error);
//                },
//                "complete": function () {
//                    editor.endedCall();
//                }
//            });
//            if (this.formType == "select") {
//                var value = this.getValue();
//                this.previousCollectionValue = value;
//
//                jQuery.each(this.values, function (i, v) {
//                        if (value == v[0]) {
//                            editor.element.html(v[1]);
//                        }
//                    }
//                );
//            } else if (this.formType == "checkbox") {
//                editor.element.html(this.getValue() ? this.values[1] : this.values[0]);
//            } else {
//                if (this.getValue() !== "") {
//                    editor.element.text(this.getValue());
//                } else {
//                    editor.element.html(this.nil);
//                }
//            }
//            editor.element.trigger(jQuery.Event("best_in_place:update"));
//        },
//        startedCall: function () {
//            this.element.append('<p class="loading">Loading</p>');
//        },
//        endedCall: function () {
//            $('.loading').remove();
//
//        }
//    });


