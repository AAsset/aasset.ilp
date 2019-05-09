$('#exampleModalCenter').modal();

$('#startTourBtn').on('click', function () {
    window.location.href = 'tour-2.html';
});

var step = 0;
steps = [{
            title: '',
            text: '',
            img: './public/images/stats-inactive.png'
        },
        {
            title: 'Обучение',
            text: 'На этой страница есть задания, которые вы должны выполнить до окончания обучения/стажировки.',
            img: './public/images/maps-inactive.png',
            active: './public/images/maps.png'
        },
        {
            title: 'Тесты',
            text: 'На этой странице вы должны сдать заключительный тест на задание за 1 неделю.',
            img: './public/images/files-inactive.png',
            active: './public/images/files.png'
        }
    ],
    zIndex = 999,
    leftMenuItems = $('.left-menu li');

function start() {
    addBackDrop();
    updateContent(step);
    showPopover();
}

$(document).on('click', '.popover .continue', function () {
    step++;

    if (step >= steps.length - 1) {
        removeBackDrop();
        hidePopover();
        return;
    }

    hidePopover();

    updateContent(step);
    showPopover();
});

function showPopover() {
    var dataTogglePopover = $('[data-toggle=popover]');
    $('.tour-step').css('z-index', zIndex + 1);
    dataTogglePopover.popover({
        html: true,
        trigger: 'focus',
        content: function () {
            var content = $(this).attr('data-popover-content');
            return $(content).children(".popover-body").html();
        }
    });
    dataTogglePopover.popover('show');
}

function hidePopover() {
    var dataTogglePopover = $('[data-toggle=popover]');
    dataTogglePopover.popover('hide');
}

function updateContent(step) {
    document.querySelector('.tour-step').attributes.length = 0;
    $('.tour-step').css('z-index', 1);
    $(leftMenuItems[step]).removeClass('tour-step active');
    $(leftMenuItems[step]).children('a').children('img').attr('src', steps[step].img);
    removeDataAttributes($(leftMenuItems[step]));

    $(leftMenuItems[step + 1]).addClass('tour-step active');
    $(leftMenuItems[step + 1]).children('a').children('img').attr('src', steps[step + 1].active);
    $(leftMenuItems[step + 1]).attr({
        'data-popover-content': '#unique-id',
        'data-toggle': 'popover',
        'data-placement': 'right'
    });

    $('.tour-step').css('z-index', zIndex + 1);
    $('.popover-content h4').html(steps[step + 1].title);
    $('.popover-content p').html(steps[step + 1].text);
}

function removeDataAttributes(target) {
    var i,
        $target = $(target),
        attrName,
        dataAttrsToDelete = [],
        dataAttrs = $target.get(0).attributes,
        dataAttrsLen = dataAttrs.length;

    for (i = 0; i < dataAttrsLen; i++) {
        if ('data-' === dataAttrs[i].name.substring(0, 5)) {
            dataAttrsToDelete.push(dataAttrs[i].name);
        }
    }
    $.each(dataAttrsToDelete, function (index, attrName) {
        $target.removeAttr(attrName);
    });
};

function addBackDrop() {
    var backdrop = document.createElement('div');
    backdrop.className = 'tour-backdrop';
    backdrop.style.zIndex = zIndex;
    document.body.appendChild(backdrop);
}

function removeBackDrop() {
    $('.tour-backdrop').remove();
}