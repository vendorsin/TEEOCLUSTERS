jQuery(function(e){if("undefined"==typeof wc_checkout_params)return!1;e.blockUI.defaults.overlayCSS.cursor="default";var t={updateTimer:!1,dirtyInput:!1,xhr:!1,$order_review:e("#order_review"),$checkout_form:e("form.checkout"),init:function(){e(document.body).bind("update_checkout",this.update_checkout),e(document.body).bind("init_checkout",this.init_checkout),this.$checkout_form.on("click",'input[name="payment_method"]',this.payment_method_selected),e(document.body).hasClass("woocommerce-order-pay")&&this.$order_review.on("click",'input[name="payment_method"]',this.payment_method_selected),this.$checkout_form.attr("novalidate","novalidate"),this.$checkout_form.on("submit",this.submit),this.$checkout_form.on("input validate change",".input-text, select, input:checkbox",this.validate_field),this.$checkout_form.on("update",this.trigger_update_checkout),this.$checkout_form.on("change",'select.shipping_method, input[name^="shipping_method"], #ship-to-different-address input, .update_totals_on_change select, .update_totals_on_change input[type="radio"], .update_totals_on_change input[type="checkbox"]',this.trigger_update_checkout),this.$checkout_form.on("change",".address-field select",this.input_changed),this.$checkout_form.on("change",".address-field input.input-text, .update_totals_on_change input.input-text",this.maybe_input_changed),this.$checkout_form.on("keydown",".address-field input.input-text, .update_totals_on_change input.input-text",this.queue_update_checkout),this.$checkout_form.on("change","#ship-to-different-address input",this.ship_to_different_address),this.$checkout_form.find("#ship-to-different-address input").change(),this.init_payment_methods(),"1"===wc_checkout_params.is_checkout&&e(document.body).trigger("init_checkout"),"yes"===wc_checkout_params.option_guest_checkout&&e("input#createaccount").change(this.toggle_create_account).change()},init_payment_methods:function(t){var o=e(".woocommerce-checkout").find('input[name="payment_method"]');1===o.length&&o.eq(0).hide(),t&&e("#"+t).prop("checked",!0),0===o.filter(":checked").length&&o.eq(0).prop("checked",!0),o.filter(":checked").eq(0).trigger("click")},get_payment_method:function(){return t.$checkout_form.find('input[name="payment_method"]:checked').val()},payment_method_selected:function(){if(e(".payment_methods input.input-radio").length>1){var t=e("div.payment_box."+e(this).attr("ID"));e(this).is(":checked")&&!t.is(":visible")&&(e("div.payment_box").filter(":visible").slideUp(250),e(this).is(":checked")&&e("div.payment_box."+e(this).attr("ID")).slideDown(250))}else e("div.payment_box").show();e(this).data("order_button_text")?e("#place_order").val(e(this).data("order_button_text")):e("#place_order").val(e("#place_order").data("value"))},toggle_create_account:function(){e("div.create-account").hide(),e(this).is(":checked")&&(e("#account_password").val("").change(),e("div.create-account").slideDown())},init_checkout:function(){e("#billing_country, #shipping_country, .country_to_state").change(),e(document.body).trigger("update_checkout")},maybe_input_changed:function(e){t.dirtyInput&&t.input_changed(e)},input_changed:function(e){t.dirtyInput=e.target,t.maybe_update_checkout()},queue_update_checkout:function(e){if(9===(e.keyCode||e.which||0))return!0;t.dirtyInput=this,t.reset_update_checkout_timer(),t.updateTimer=setTimeout(t.maybe_update_checkout,"1000")},trigger_update_checkout:function(){t.reset_update_checkout_timer(),t.dirtyInput=!1,e(document.body).trigger("update_checkout")},maybe_update_checkout:function(){var o=!0;if(e(t.dirtyInput).length){var c=e(t.dirtyInput).closest("div").find(".address-field.validate-required");c.length&&c.each(function(){""===e(this).find("input.input-text").val()&&(o=!1)})}o&&t.trigger_update_checkout()},ship_to_different_address:function(){e("div.shipping_address").hide(),e(this).is(":checked")&&e("div.shipping_address").slideDown()},reset_update_checkout_timer:function(){clearTimeout(t.updateTimer)},is_valid_json:function(t){try{var o=e.parseJSON(t);return o&&"object"==typeof o}catch(c){return!1}},validate_field:function(t){var o=e(this),c=o.closest(".form-row"),i=!0,r=c.is(".validate-required"),n=c.is(".validate-email"),a=t.type;"input"===a&&c.removeClass("woocommerce-invalid woocommerce-invalid-required-field woocommerce-invalid-email woocommerce-validated"),"validate"!==a&&"change"!==a||(r&&("checkbox"!==o.attr("type")||o.is(":checked")?""===o.val()&&(c.removeClass("woocommerce-validated").addClass("woocommerce-invalid woocommerce-invalid-required-field"),i=!1):(c.removeClass("woocommerce-validated").addClass("woocommerce-invalid woocommerce-invalid-required-field"),i=!1)),n&&o.val()&&(new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i).test(o.val())||(c.removeClass("woocommerce-validated").addClass("woocommerce-invalid woocommerce-invalid-email"),i=!1)),i&&c.removeClass("woocommerce-invalid woocommerce-invalid-required-field woocommerce-invalid-email").addClass("woocommerce-validated"))},update_checkout:function(e,o){t.reset_update_checkout_timer(),t.updateTimer=setTimeout(t.update_checkout_action,"5",o)},update_checkout_action:function(o){if(t.xhr&&t.xhr.abort(),0!==e("form.checkout").length){o=void 0!==o?o:{update_shipping_method:!0};var c=e("#billing_country").val(),i=e("#billing_state").val(),r=e("input#billing_postcode").val(),n=e("#billing_city").val(),a=e("input#billing_address_1").val(),u=e("input#billing_address_2").val(),d=c,s=i,m=r,p=n,h=a,_=u,l=e(t.$checkout_form).find(".address-field.validate-required:visible"),f=!0;l.length&&l.each(function(){""===e(this).find(":input").val()&&(f=!1)}),e("#ship-to-different-address").find("input").is(":checked")&&(d=e("#shipping_country").val(),s=e("#shipping_state").val(),m=e("input#shipping_postcode").val(),p=e("#shipping_city").val(),h=e("input#shipping_address_1").val(),_=e("input#shipping_address_2").val());var g={security:wc_checkout_params.update_order_review_nonce,payment_method:t.get_payment_method(),country:c,state:i,postcode:r,city:n,address:a,address_2:u,s_country:d,s_state:s,s_postcode:m,s_city:p,s_address:h,s_address_2:_,has_full_address:f,post_data:e("form.checkout").serialize()};if(!1!==o.update_shipping_method){var v={};e('select.shipping_method, input[name^="shipping_method"][type="radio"]:checked, input[name^="shipping_method"][type="hidden"]').each(function(){v[e(this).data("index")]=e(this).val()}),g.shipping_method=v}e(".woocommerce-checkout-payment, .woocommerce-checkout-review-order-table").block({message:null,overlayCSS:{background:"#fff",opacity:.6}}),t.xhr=e.ajax({type:"POST",url:wc_checkout_params.wc_ajax_url.toString().replace("%%endpoint%%","update_order_review"),data:g,success:function(o){var c=e('.woocommerce-checkout input[name="payment_method"]:checked').attr("id");if(!0!==o.reload){e(".woocommerce-NoticeGroup-updateOrderReview").remove();var i=e("#terms").prop("checked"),r={};if(e(".payment_box input").each(function(){var t=e(this).attr("id");t&&(-1!==e.inArray(e(this).attr("type"),["checkbox","radio"])?r[t]=e(this).prop("checked"):r[t]=e(this).val())}),o&&o.fragments&&e.each(o.fragments,function(t,o){e(t).replaceWith(o),e(t).unblock()}),i&&e("#terms").prop("checked",!0),e.isEmptyObject(r)||e(".payment_box input").each(function(){var t=e(this).attr("id");t&&(-1!==e.inArray(e(this).attr("type"),["checkbox","radio"])?e(this).prop("checked",r[t]).change():0===e(this).val().length&&e(this).val(r[t]).change())}),"failure"===o.result){var n=e("form.checkout");e(".woocommerce-error, .woocommerce-message").remove(),o.messages?n.prepend('<div class="woocommerce-NoticeGroup woocommerce-NoticeGroup-updateOrderReview">'+o.messages+"</div>"):n.prepend(o),n.find(".input-text, select, input:checkbox").trigger("validate").blur(),e("html, body").animate({scrollTop:e("form.checkout").offset().top-100},1e3)}t.init_payment_methods(c),e(document.body).trigger("updated_checkout",[o])}else window.location.reload()}})}},submit:function(){t.reset_update_checkout_timer();var o=e(this);return!o.is(".processing")&&(!1!==o.triggerHandler("checkout_place_order")&&!1!==o.triggerHandler("checkout_place_order_"+t.get_payment_method())&&(o.addClass("processing"),1!==o.data()["blockUI.isBlocked"]&&o.block({message:null,overlayCSS:{background:"#fff",opacity:.6}}),e.ajaxSetup({dataFilter:function(e,o){if("json"!==o)return e;if(t.is_valid_json(e))return e;var c=e.match(/{"result.*}/);return null===c?console.log("Unable to fix malformed JSON"):t.is_valid_json(c[0])?(console.log("Fixed malformed JSON. Original:"),console.log(e),e=c[0]):console.log("Unable to fix malformed JSON"),e}}),e.ajax({type:"POST",url:wc_checkout_params.checkout_url,data:o.serialize(),dataType:"json",success:function(o){try{if("success"!==o.result)throw"failure"===o.result?"Result failure":"Invalid response";-1===o.redirect.indexOf("https://")||-1===o.redirect.indexOf("http://")?window.location=o.redirect:window.location=decodeURI(o.redirect)}catch(c){if(!0===o.reload)return void window.location.reload();!0===o.refresh&&e(document.body).trigger("update_checkout"),o.messages?t.submit_error(o.messages):t.submit_error('<div class="woocommerce-error">'+wc_checkout_params.i18n_checkout_error+"</div>")}},error:function(e,o,c){t.submit_error('<div class="woocommerce-error">'+c+"</div>")}})),!1)},submit_error:function(o){e(".woocommerce-NoticeGroup-checkout, .woocommerce-error, .woocommerce-message").remove(),t.$checkout_form.prepend('<div class="woocommerce-NoticeGroup woocommerce-NoticeGroup-checkout">'+o+"</div>"),t.$checkout_form.removeClass("processing").unblock(),t.$checkout_form.find(".input-text, select, input:checkbox").trigger("validate").blur(),e("html, body").animate({scrollTop:e("form.checkout").offset().top-100},1e3),e(document.body).trigger("checkout_error")}},o={init:function(){e(document.body).on("click","a.showcoupon",this.show_coupon_form),e(document.body).on("click",".woocommerce-remove-coupon",this.remove_coupon),e("form.checkout_coupon").hide().submit(this.submit)},show_coupon_form:function(){return e(".checkout_coupon").slideToggle(400,function(){e(".checkout_coupon").find(":input:eq(0)").focus()}),!1},submit:function(){var t=e(this);if(t.is(".processing"))return!1;t.addClass("processing").block({message:null,overlayCSS:{background:"#fff",opacity:.6}});var o={security:wc_checkout_params.apply_coupon_nonce,coupon_code:t.find('input[name="coupon_code"]').val()};return e.ajax({type:"POST",url:wc_checkout_params.wc_ajax_url.toString().replace("%%endpoint%%","apply_coupon"),data:o,success:function(o){e(".woocommerce-error, .woocommerce-message").remove(),t.removeClass("processing").unblock(),o&&(t.before(o),t.slideUp(),e(document.body).trigger("update_checkout",{update_shipping_method:!1}))},dataType:"html"}),!1},remove_coupon:function(t){t.preventDefault();var o=e(this).parents(".woocommerce-checkout-review-order"),c=e(this).data("coupon");o.addClass("processing").block({message:null,overlayCSS:{background:"#fff",opacity:.6}});var i={security:wc_checkout_params.remove_coupon_nonce,coupon:c};e.ajax({type:"POST",url:wc_checkout_params.wc_ajax_url.toString().replace("%%endpoint%%","remove_coupon"),data:i,success:function(t){e(".woocommerce-error, .woocommerce-message").remove(),o.removeClass("processing").unblock(),t&&(e("form.woocommerce-checkout").before(t),e(document.body).trigger("update_checkout",{update_shipping_method:!1}),e("form.checkout_coupon").find('input[name="coupon_code"]').val(""))},error:function(e){wc_checkout_params.debug_mode&&console.log(e.responseText)},dataType:"html"})}},c={init:function(){e(document.body).on("click","a.showlogin",this.show_login_form)},show_login_form:function(){return e("form.login, form.woocommerce-form--login").slideToggle(),!1}},i={init:function(){e(document.body).on("click","a.woocommerce-terms-and-conditions-link",this.toggle_terms)},toggle_terms:function(){if(e(".woocommerce-terms-and-conditions").length)return e(".woocommerce-terms-and-conditions").slideToggle(),!1}};t.init(),o.init(),c.init(),i.init()});