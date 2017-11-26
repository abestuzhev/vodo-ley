$(function () {
    $('.thumbnails a').click(function () {                                   /* При нажатиина миниатюру*/
        var images = $(this).find('img');
        var imgSrc = $(this).attr('href');
        console.log(imgSrc);
        $(".big-image img").attr({src: imgSrc});                        /* Подменяем адрес большого изображения на адрес выбранного*/
        $(".big-image a").data('id', $(this).data('id'));
        $(this).siblings('a').removeClass('active');                      /* Удаляем класс .active со ссылки чтоб убрать рамку*/
        images.parents().addClass('active');                               /* Добавляем класс .active на выбранную миниатюру*/
        return false;
    });

    $('.next').click(function () {                                          /* При нажатии на кнопку "вперед"*/
        var count = $('.thumbnails a').length;                             /* Общее количество изображений*/
        var n = parseInt($('.thumbnails .active').index() + 1);      /* Порядковый номер текущего изображения*/
        var activeImg = $('.thumbnails .active');                          /* Активное на данный момент изображение*/
        var nextSrc, id;

        if (count != n) {                                                   /* - Если изображение не последнее*/

            nextSrc = activeImg.next().attr('href');            /* В переменную записывается адрес следующего изображения*/
            id = activeImg.next().data('id');
            $('.thumbnails .active').removeClass('active');              /* Удаляется класс .active с предыдущей миниатюры*/
            activeImg.next().addClass('active');
            /* На миниатюру следующего изображения вешается класс .active*/

        } else {                                                             /* - Если текущее изображение последнее в списке*/

            nextSrc = $('.thumbnails a').first().attr('href');  /* В переменную записывается адрес первого изображения*/
            id = $('.thumbnails a').first().data('id');
            $('.thumbnails .active').removeClass('active');                /* Удаляется класс .active с предыдущей миниатюры*/
            $('.thumbnails a').first().addClass('active');                 /* На первую миниатюру вешается класс .active*/
        }
        $('.big-image img').attr({src: nextSrc});
        $(".big-image a").data('id', id);
        /* Подменяем адрес большого изображения на адрес следующего*/
        return false;
    });


    $('.prev').click(function () {                                           /* При нажатии на кнопку "назад"*/
        var count = $('.thumbnails a').length;                             /*Общее количество изображений*/
        var n = parseInt($('.thumbnails .active').index() + 1);     /* Порядковый номер текущего изображения*/
        var activeImg = $('.thumbnails .active');                          /* Активное на данный момент изображение*/
        var prevSrc, id;

        if (n != 1) {                                                       /* - Если текущее изображение не первое*/
            prevSrc = activeImg.prev().attr('href');            /* В переменную записывается адрес предыдущего изображения     */
            id = activeImg.prev().data('id');
            $('.thumbnails .active').removeClass('active');                /* Удаляется класс .active активной до этого миниатюры*/
            activeImg.prev().addClass('active');                           /* На миниатюру изображения слева вешается класс .active*/
        } else {                                                             /* - Если текущее изображение первое*/
            prevSrc = $('.thumbnails a:last').attr('href');     /* В переменную записывается адрес последнего изображения*/
            id = $('.thumbnails a:last').data('id');
            $('.thumbnails .active').removeClass('active');                /* Удаляется класс .active с предыдущей миниатюры*/
            $('.thumbnails a:last').addClass('active');                    /* На последнюю миниатюру вешается класс .active*/
        }
        $('.big-image img').attr({src: prevSrc});                        /* Подменяется адрес большого изображения на адрес следующего*/
        $(".big-image a").data('id', id);
        return false;
    });


    $('.big-image a').click(function () {
        var id = $(this).data('id');
        $('[data-fancybox]').each(function () {
            if ($(this).data('id') == id)
                $(this).trigger('click');
        })
    })
})