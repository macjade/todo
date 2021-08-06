$(document).ready(function() {

    "use strict";

    $('.task-item.complete').find('input').prop('checked', true);

    function check_uncheck_task(id) {
        var data = {'id': id};
        $.ajax({
            url: location.pathname+'toggletask/',
            type: 'get',
            data: data,
            contentType: false,
            processdata: false,
            success: function(e) {
                if (e.status) {
                    return true;
                }else {
                    return false;
                }
            }
        });
    }

    function delete_task(id) {
        var header_token = $('#tk_del').find('input[name="csrfmiddlewaretoken"]').val();

        $.ajax({
            url: location.pathname+'deletetask/',
            type: 'POST',
            data: {
                'csrfmiddlewaretoken': header_token,
                'id': id
            },
            success: function(e) {
                if (e.status) {
                    return true;
                }else {
                    return false;
                }
            }
        });
    }

    var task = function() {
        $('.task-list .task-item input').click(function(e) {
            e.stopImmediatePropagation();
            var id=$(this).parent().parent().parent()[0].id;
            if($(this).is(':checked')) {
                $(this).parent().parent().parent().toggleClass('complete');
                $(this).parent().parent().parent().insertAfter($('#completed_task'));

            } else {
                $(this).parent().parent().parent().toggleClass('complete');
                $(this).parent().parent().parent().insertBefore($('#completed_task'));
            }
            check_uncheck_task(id);
        });

        $('.task-nav .all-task').click(function() {
            $('.task-list').removeClass('only-active');
            $('.task-list').removeClass('only-complete');
            $('.task-nav li.active').removeClass('active');
            $(this).addClass('active');
        });

        $('.task-nav .active-task').click(function() {
            $('.task-list').removeClass('only-complete');
            $('.task-list').addClass('only-active');
            $('#completed_task').css('visibility', 'none');
            $('.task-nav li.active').removeClass('active');
            $(this).addClass('active');
        });

        $('.task-nav .completed-task').click(function() {
            $('.task-list').removeClass('only-active');
            $('.task-list').addClass('only-complete');
            $('.task-nav li.active').removeClass('active');
            $(this).addClass('active');
        });

        $('#uniform-all-complete input').click(function() {
            if($(this).is(':checked')) {
                $('.task-item .checker span:not(.checked) input').click();
            } else {
                $('.task-item .checker span.checked input').click();
            }
        });

        $('.task-list .task-item').click(function(e) {
            e.stopImmediatePropagation();
            $(this).find('input').click();
        });

        $('.task-list .task-item button > .edit').click(function (e) {
            e.stopImmediatePropagation();
            $('#change-task > div').remove();
            $('#change-task').append('<div class="project-form_Body" style="padding: 20px;"><input type="text" name="change_'+$(this).parent().parent().parent()[0].id+'" class="form-control enter-project" placeholder="change Task..." value="'+$(this).parent().parent().prev().prev().html()+'"><button type="submit" class="btn" id="edit_task">Change</button><button type="button" class="btn btn-secondary" id="close_task">Close</button></div>')
            $('#close_task').click(function() {
                $('#change-task > div').remove();
            });
            $('#change-task').on('submit', function(e) {
                e.preventDefault();
                var header_token = $(this).find('input[name="csrfmiddlewaretoken"]').val();
                var name = $(this).find('input[type="text"]').val();
                var id = $(this).find('input[type="text"]')[0].name;
                $.ajax({
                    url: location.pathname+'edittask/',
                    type: 'POST',
                    data: {
                        'csrfmiddlewaretoken': header_token,
                        'id': id,
                        'name': name,
                    },
                    success: function(e) {
                        if (e.status) {
                            $('#close_task').click();
                            $('#task_'+e.pk).removeClass('complete');
                            $('#task_'+e.pk).find('input[type="checkbox"]').prop('checked', false);
                            $($('#task_'+e.pk+' > span')[0]).html(e.task);
                            $('#task_'+e.pk).insertAfter('#pending_task')
                            return true;
                        }else {
                            return false;
                        }
                    }
                });
            });
        });

        $('.task-list .task-item button > .trash').click(function (e) {
            e.stopImmediatePropagation();
            delete_task($(this).parent().parent().parent()[0].id);
            $(this).parent().parent().parent().remove();
        });

    };

    task();

    $("#new_taskForm").on('submit', function(e) {
        e.preventDefault();
        var header_token = $(this).find('input[name="csrfmiddlewaretoken"]').val();
        var name = $(this).find('input[name="task-name"]').val()
        $.ajax({
            url: location.pathname+'addtask/',
            type: 'POST',
            data: {
                "csrfmiddlewaretoken": header_token,
                "task-name": name,
            },
            success: function(e) {
                if (e.status) {
                    $('<div class="task-item" id="task_'+e.id+'"><div class="checker"><span class=""><input type="checkbox"></span></div><span> '+e.task+'</span><span class="float-right">'+e.date+'</span><div class="btn-action"><button class="btn"><span class="trash"><i class="fas fa-trash-alt"></i></span></button><button class="btn"><span class="edit"><i class="fas fa-pencil-alt"></i></span></button></div></div>').insertBefore('#completed_task');
                    $('#task-name').val('');
                    task();
                }
            },
        });
    });

    $('#add_task').click(function() {
        $('#task-name').prev().remove();
        if (!$('#task-name').val().length == 0) {
            $("#new_taskForm").submit();
        }else {
            $('<label for="task-name" class="col-form-label" style="color:#ff9676; font-size:12px;">This field is required</label>').insertBefore('#task-name');
        }
    });

    $(".add-task").keypress(function (e) {
        $('#task-name').prev().remove();
        if ((e.which == 13)&&(!$(this).val().length == 0)) {
            $("#new_taskForm").submit();
        } else {
            $('<label for="task-name" class="col-form-label" style="color:#ff9676; font-size:12px;">This field is required</label>').insertBefore('#task-name');
        }
    });
});