$(document).ready(function () {




    /**/



    /*скрипты для работы datepicker и селект*/
    var $datepicker = $('.datepicker-here');
    $datepicker.datepicker({
        minDate: new Date()
    });

    $('.c-select').SumoSelect();

    $datepicker.on('focus', function(){
        $(this).parents('.datepicker-layout').addClass('active-datepicker');
    });

    /* END скрипты для работы datepicker и селект*/




    // auth 
    $('#old .closeold').click(function () {
        $('#old').remove();
        $.cookie("old", "1", {expires: 1, path: '/'});
    });
    $('#auth_btn').click(function () {

        var rem = $('input[name=USER_REMEMBER]').prop('checked') ? 1 : 0;
        var recaptcha = $('#auth_form').find('.g-recaptcha-response').val();
        $.ajax({
            url: '/ajax/check_auth.php',
            method: 'POST',
            data: {
                recaptha: $('#auth_form').find('.g-recaptcha-response').val(),
                login: $('input[name=USER_LOGIN]').val(),
                pass: $('input[name=USER_PASSWORD]').val(),
                rem: rem,
            },
            success: function (res) {
                if (res.error) {
                    $('.post-title.error').html(res.text);
                    if (res.captch_err || recaptcha.length > 0) {
                        grecaptcha.reset(authWidget);
                    }
                } else
                    window.location.reload();
            }
        })
    });
    $('.set-register-tab, .goto-register').click(function () {
        $('a.registration-tab').trigger('click');
    });
    $('.goto-auth').click(function (e) {
        $('a.auth-tab').trigger('click');
    });
    $('#sendVote').click(function () {
        var content = $('#modalInterview');
        var userId = content.find('#userId').val(), votesInput = content.find('input[type="checkbox"]'), another = content.find('input[name="another"]').val(), votes = new Array();
        for (var i = 0; i < votesInput.length; i++) {
            if (votesInput.eq(i).prop('checked'))
                votes.push(votesInput.eq(i).val());
        }
        $.ajax({
            url: '/ajax/saveVotes.php',
            method: 'POST',
            data: {
                userId: userId,
                another: another,
                votes: votes
            }
        });
    });

    $('#restore-pass').click(function (e) {
        e.preventDefault();
        $('#user-cabinet .post-title.error').html('');
        $('#user-cabinet .post-title.success').html('');
        $.ajax({
            url: '/ajax/restore.php',
            method: 'POST',
            data: {
                login: $('input[name=USER_LOGIN]').val(),
            },
            success: function (res) {
                if (res.error) {
                    $('#user-cabinet .post-title.error').html(res.text);
                } else
                    $('#user-cabinet .post-title.success').html(res.success).css('color');
            }
        });
    });
    $('#restore-pass-cabinet').click(function (e) {
        e.preventDefault();
        $.ajax({
            url: '/ajax/restore.php',
            method: 'POST',
            data: {
                login: $('#my-info input[name=EMAIL]').val(),
            },
            success: function (res) {
            }
        });
    });
    // all pages
    $('#callback_send').click(function (e) {
        e.preventDefault();
        sendFormAjax('callback_form', '#modalBackCall', '#cb_error', callbackCaptcha, false);
    });
    $('#letter_send').click(function (e) {
        e.preventDefault();
        sendFormAjax('letter_form', '#modalBackLetter', '#letter_error', letterCaptcha, false);
    });
    // contact page
    $('#feedback_send, .feedback_send').click(function (e) {
        e.preventDefault();
        sendFormAjax('feedback_form', '#feedback_content', '#fb_error', feedbackCaptcha, true);
    });

    //catalog page
    $('.buy-by-click').click(function () {
        var name = $(this).data('name'),
                image = $(this).data('image'),
                price = $(this).data('price'),
                artnum = $(this).data('artnum'),
                id = $(this).data('id'),
                quantity = $(this).parents('.item-control').find('.quantity-control').val();

        $('#modalOneClick').find('.fastorderquant').val(quantity);
        $('#modalOneClick').find('.product-info h5').html(name);
        $('#modalOneClick').find('#product_id').val(id);
        $('#modalOneClick').find('#price').val(price);
        $('#modalOneClick').find('.product-info p').html('Арт. ' + artnum);
        $('#modalOneClick').find('.card-fast-order__wrapper .total-price').html(parseFloat(price * quantity).toFixed(2) + ' <i class="fa fa-rub" aria-hidden="true"></i>');
        $('#modalOneClick').find('.total-body .total-sum').html(parseFloat(price * quantity).toFixed(2) + ' <i class="fa fa-rub" aria-hidden="true"></i>');
        $('#modalOneClick').find('figure img').attr('src', image);
    });
    $('#modalOneClick .btn-spinner').click(function () {
        var price = $('#modalOneClick').find('#price').val();
        var input = $(this).parent().parent().find('input');
        $('#modalOneClick').find('.card-fast-order__wrapper .total-price').html(parseFloat(price * parseInt(input.val())).toFixed(2) + ' <i class="fa fa-rub" aria-hidden="true"></i>');
        $('#modalOneClick').find('.total-body .total-sum').html(parseFloat(price * parseInt(input.val())).toFixed(2) + ' <i class="fa fa-rub" aria-hidden="true"></i>');
    });
    $('#addby1click').click(function () {
        //new RegExp('^(input|select)$', 'i')
        var items = new Array();
        $('#modalOneClick').find('input,textarea').each(function () {
            items[$(this).attr('name')] = $(this).val();
        });
        $.ajax({
            url: '/ajax/buy1click.php',
            method: 'POST',
            data: {
                product: items['product'],
                quantity: items['quantity'],
                COMMENT: items['COMMENT'],
                FIO: items['NAME'],
                PHONE: items['PHONE'],
                save: 'Y'
            },
            success: function (res) {
                if (!res.error) {
                    $('#modalOneClick').find('.text-center.error').hide().html('');
                    $('#modalOneClick').find('.close').trigger('click');
                    $('#fastorder_thanks').trigger('click');
                    $('#modalOneClick').find('input,textarea').each(function () {
                        if ($(this).attr('name') == 'quantity')
                            $(this).val('1');
                        else
                            $(this).val('');
                    });
                } else {
                    $('#modalOneClick').find('.text-center.error').html(res.text).show();
                }
            }
        });
    });
    $('.add-like').click(function () {
        var id = $(this).data('id'), product = $(this).parents('.poduct-item').data('product'), action = 'add', _this = $(this);
        if (parseInt(id) > 0)
            action = 'delete';

        if ($(this).hasClass('detail-card')) {
            product = $(this).parents('.product-detail').data('product');
        }
        $.ajax({
            url: '/ajax/favorite.php',
            method: 'POST',
            data: {
                action: action,
                product: product,
                id: id
            },
            success: function (res) {
                if (action == 'add' && !res.error) {
                    _this.addClass('active');
                    _this.data('id', res.id);
                }
                if (action == 'delete' && !res.error) {
                    _this.removeClass('active');
                    _this.data('id', '0');
                }
            }
        });

    });
    $('.remove-fav').click(function () {
        var id = $(this).data('id'), product = $(this).data('product'), action = 'delete', _this = $(this);
        action = 'delete';

        if (!$('#select-product' + product).prop('checked'))
            return false;
        $.ajax({
            url: '/ajax/favorite.php',
            method: 'POST',
            data: {
                action: action,
                product: product,
                id: id
            },
            success: function (res) {
                $('#item-' + product).remove();
            }
        });

    });

    $("[data-fancybox]").fancybox({
        loop: true
    });
    // personal page
    $('.another-phone').click(function () {
        $('#enter-phone').show();
        $('#send-phone-code').hide();
        $('#entry_phone').val('');
    });
    $('a.user-avatar__upload').click(function (e) {
        e.preventDefault();
        $(this).parent().find('input').trigger('click');
    });
    $('#my-tel').focus(function () {
        $('.confirm-phone').trigger('click');
    });
    $('.show-expand-mobile').click(function () {
        $(this).remove();
        $('#my-mobile').show();
    });
    $('.user-cabinet__adress--addnew').click(function () {
        var content = $('#new-adress').clone();
        var count = $('#my-address').find('section .adress-row').length;
        content.find('.num-row').html(parseInt(count) + 1 + '.');
        content.attr('id', '').addClass('adress-row');
        $('#adress-content').append(content.show());
    });
    $(document).on('click', '.adress__btn--edit', function () {
        $(this).parents('.adress-row').remove();
        var count = $('#my-address').find('section .adress-row').length;
        for (var i = 1; i <= count; i++) {
            $('#my-address').find('section .adress-row').eq(i - 1).find('.num-row').html(i + '.');
        }
    });
    $('#form-adress').keydown(function (event) {
        if (event.keyCode == 13) {
            event.preventDefault();
            return false;
        }
    });
    $('.pesonal-panel li a').click(function () {
        localStorage.setItem('pesonal-tab', $(this).attr('aria-controls'));
    });
    $('#allot-all').click(function () {
        var items = $('.select-product-fav');
        if ($(this).prop('checked')) {
            for (var i = 0; i < items.length; i++) {
                items.eq(i).prop('checked', true);
            }
        } else {
            for (var i = 0; i < items.length; i++) {
                items.eq(i).prop('checked', false);
            }
        }
    });

    $('.user-cabinet__removefav').click(function () {
        var products = new Array, items = $('.select-product-fav');
        for (var i = 0; i < items.length; i++) {
            if (items.eq(i).prop('checked'))
                products.push(items.eq(i).val());
        }
        if (products.length == 0)
            return false;
        $.ajax({
            url: '/ajax/favorite.php',
            method: 'POST',
            data: {
                action: 'removeAll',
                products: products
            },
            success: function () {
                for (var i = 0; i < products.length; i++) {
                    console.log($('#item-' + products[i]));
                    $('#item-' + products[i]).remove();
                }
            }
        });
    });
    $('.user-cabinet__addcart').click(function () {
        var products = new Array, quantity = new Array, items = $('.select-product-fav');
        for (var i = 0; i < items.length; i++) {
            if (items.eq(i).prop('checked')) {
                products.push(items.eq(i).val());
                quantity.push(items.eq(i).parents('.item-control').find('.quantity-control').val());
            }
        }

        if (products.length == 0)
            return false;
        $.ajax({
            url: '/ajax/add_to_cart.php',
            method: 'POST',
            data: {
                action: 'add_all',
                products: products,
                quantity: quantity
            },
            success: function (res) {
                if (!res.error)
                    BX.onCustomEvent('OnBasketChange');
            }
        });
    });

    var currentPersonalTab = localStorage.getItem('pesonal-tab');

    var hash = window.location.hash.replace('#', '');
    if (hash.length > 0)
        currentPersonalTab = hash;
    if (currentPersonalTab) {
        if (currentPersonalTab.length > 0) {
            for (var i = 0; i < $('.pesonal-panel li a').length; i++) {
                if ($('.pesonal-panel li a').eq(i).attr('aria-controls') == currentPersonalTab)
                    $('.pesonal-panel li a').eq(i).trigger('click');
            }
        }
    }

    $('.order-expand').click(function () {
        var _this = $(this);
        setTimeout(function () {
            if (_this.attr('aria-expanded') == 'false')
                _this.text('развернуть');
            else
                _this.text('свернуть');
        }, 100)
    })

    //$('.btn-spinner')
});
$(document).on('click', '.basket-close', function (e) {
    e.preventDefault();
    console.log(1);
    $('#basket-simple').trigger('click');
});
$(document).on('click', '.basket-close.mobile', function (e) {
    e.preventDefault();
    $('#basket-simple-mobile').trigger('click');
});
function sendFormAjax(formName, modalId, errorId, captcha, clear) {
    var form = $('form[name="' + formName + '"]').serialize();
    $.ajax({
        method: 'POST',
        data: {
            name: formName,
            is_ajax: 'Y',
            recaptha: $(modalId).find('.g-recaptcha-response').val(),
            form: form
        },
        success: function (res) {
            if (!res.error) {
                $(modalId).find('.modal-header .close').trigger('click');
                $('#show_mess').trigger('click');
                if (clear) {
                    $('form[name="' + formName + '"]').find('input, textarea').val('');
                    grecaptcha.reset(captcha);
                    $(modalId).find(errorId).html('');
                }
            } else {
                $(modalId).find(errorId).html(res.text);
                if (res.captch_err)
                    grecaptcha.reset(captcha);

            }
        }
    });
}

function checkCode() {
    $('#check_error').text('');
    $.ajax({
        type: 'POST',
        url: url + "/sms.php",
        data: {
            check_code: 'Y',
            code: $("#entry_code").val(),
            phone: $('#entry_phone').val()
        },
        success: function (res) {
            if (parseInt(res.error) == 0) {
                $('#check_error').text(res.code);
                $('.messages_alert').fadeIn();
                $('#profile_phone').val(res.phone);
                setTimeout(function () {
                    $('.messages_alert').fadeOut();
                    $('#modalPhoneCheck button .close').trigger('click');
                    window.location.reload();
                }, 1000);
            } else {
                $('.messages_alert').text(res.code);
            }
        }
    });
}
function sendSms() {
    $('#sms_error').text('');

    if (window.sended < 3) {
        $.ajax({
            type: 'POST',
            url: url + "/sms.php",
            data: {
                tel: $("#entry_phone").val(),
            },
            success: function (res) {
                if (parseInt(res.error) > 0) {
                    $('#sms_error').text(res.code);
                } else {
                    window.sended++;
                    $('#enter-phone').hide();
                    $('#send-phone-code').show();
                    $('.confirm_phone_container').html($('#entry_phone').val());
                }
            }
        });
    }
}


function addToBasket(item) {
    $.ajax({
        method: 'POST',
        url: '/ajax/add_to_cart.php',
        data: {
            product: item,
            action: 'add',
            quantity: $('#quantity-' + item).val(),
        },
        success: function (res) {
            if (!res.error) {
                BX.onCustomEvent('OnBasketChange');
            }
        }
    });
}