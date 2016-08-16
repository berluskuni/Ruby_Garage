/**
 * Created by berluskuni on 03.08.16.
 */
var template_add = function(text, i){
  return '<div class="'+i+'"><div class="row task" ><div class="col-lg-1 col-md-2 icon" ><span class="glyphicon glyphicon-calendar">' +
      '</span></div><div class="col-lg-9 col-md-6 text" id="task'+i+'">' + text + '</div><div class="col-lg-1 col-md-2 edit" name="'+i+'">' +
      '<span class="glyphicon glyphicon-pencil"></span></div><div class="col-lg-1 col-md-2 trash" name="'+i+'">' +
      '<span class="glyphicon glyphicon-trash"></span></div></div><div class="row add_task">' +
      '<div class="col-lg-1 col-md-2 plus"><span class="glyphicon glyphicon-plus"></span></div>' +
      '<div class="col-lg-9 col-md-7 in_text" id="'+i+'"><input type="text" class="form-control" id="in_text_'+i+'" placeholder="Start typing here to create a task" required></div>' +
      '<div class="col-lg-2 col-md-3 task_add">Add Task</div></div></div>'
};
var template_task_info = function(task_info, id, count){
    return '<div class="row task_info" name="'+id+'" id="info_id_'+id+'_count_'+count+'" ><div class="col-lg-1 col-md-2 task_info_1 task_done " id="task_done_'+count+'" name="'+count+'"><label> <input type="checkbox" value="'+count+'">' +
        '</label></div><div class="col-lg-9 col-md-7 task_info_2" id="'+id+'_'+count+'">'+task_info+'</div> <div class="col-lg-2 col-md-3 task_info_3">' +
        '<div class="task_info_position"><div class="up"><span class="glyphicon glyphicon-arrow-up"></span></div><div  class="down">' +
        '<span class="glyphicon glyphicon-arrow-down"></span></div></div><div class="task_info_edit" name="'+count+'"><span class="glyphicon glyphicon-pencil">' +
        '</span></div><div  class="task_info_trash" name="'+count+'"><span class="glyphicon glyphicon-trash trash-info"></span></div></div></div>'
};
window.j = parseInt($('.task_id').text());
window.k = 0;
window.count_info = {};
window.requestSent = false;
window.count_task_info =0;
window.info = '';

var main;
main = function () {
    task_info();
    function task_info() {
        $.get("/count_info/", function (data) {
            count_info = data;


        });
    }

    $('#task_add').submit(function (e) {
        e.preventDefault();
        var i = j;
        /*parseInt($('.task_id').text());*/
        var text = $('input[id=text_task]');
        var csrfmiddlewaretoken = $('input[name=csrfmiddlewaretoken]');
        var error = '';
        if (text.val() == '') {
            error = "Enter task";
            alert(error);
        }
        if (!error) {
            i += 1;
            j += 1;
            $.ajax({
                url: '/add_task/',
                type: 'POST',
                dataType: 'html',
                data: {
                    'task': text.val(),
                    'csrfmiddlewaretoken': csrfmiddlewaretoken.val(),
                    'task_id': i.toString()
                },
                cache: false,
                statusCode: {
                    200: function () {
                        var html = template_add(text.val(), i);
                        $('.list_task').prepend(html);
                        $('#text_task').val(' ');
                        $('#basicModal').modal("hide");
                        count_info["info_id_"+i]=0;
                        $('input[id=text_task]').val('');
                        /*$('span.task_id').text(i);*/
                        return false;
                    },
                    401: function () {
                        alert('The server is not available')
                    }

                }

            })
        }

    });
    $(document).on('click', '.trash', function (e) {
        e.preventDefault();
        var id = $(this).attr('name');
        var csrfmiddlewaretoken = $('input[name=csrfmiddlewaretoken]');
        $.ajax({
            url: '/delete_task/',
            type: 'POST',
            dataType: 'html',
            data: {
                task_id: id,
                'csrfmiddlewaretoken': csrfmiddlewaretoken.val()
            },
            cache: false,
            statusCode: {
                200: function () {
                    var task = jQuery('.' + id + '');
                    task.detach();
                    j -= 1;
                    /* location.replace("/"); */
                    /*location.reload(); */
                    return false;
                },
                401: function () {
                    alert('The server is not available');
                }
            }
        })
    });
    $(document).on('click', '.edit', function () {
        k = $(this).attr('name');
        $('#Modal_edit').modal();
        $('#task_edit').submit(function (e) {
            e.preventDefault();
            var id = k;
            var new_task = $('input[id=new_text_task]').val();
            var csrfmiddlewaretoken = $('input[name=csrfmiddlewaretoken]');
            $.ajax({
                url: '/edit_task/',
                type: 'POST',
                dataType: 'html',
                data: {
                    'task_id': id,
                    'task': new_task,
                    'csrfmiddlewaretoken': csrfmiddlewaretoken.val()
                },
                cache: false,
                statusCode: {
                    200: function () {
                        $('#task' + id + '').text(new_task);
                        $('#Modal_edit').modal("hide");
                        return false;
                    },
                    401: function () {
                        alert('The server is not available');
                    }
                }
            })
        })

    });
    $(document).on('click', '.task_add', function (e) {
        e.preventDefault();
        var id = parseInt($(this).parent().find('.in_text').attr('id'));
        /*var id = i.toString();*/
        var task_info = $(this).parent().find('#in_text_' + id + '').val();
        var count = parseInt(count_info["info_id_"+id]);
        $(this).parent().find('#in_text_' + id + '').val('');
        var csrfmiddlewaretoken = $('input[name=csrfmiddlewaretoken]');
        var error = '';
        if (task_info == '') {
            error = "Enter task";
            alert(error);
        }
        if (!error) {
            $.ajax({
            url: '/task_info/',
            type: 'POST',
            dataType: 'html',
            data: {
                'task': id,
                'task_info': task_info,
                'csrfmiddlewaretoken': csrfmiddlewaretoken.val(),
                'count': count
            },
            cache: false,
            statusCode: {
                200: function () {
                    var html = template_task_info(task_info, id, count);
                    $('.' + id + '').append(html);
                    count += 1;
                    count_info["info_id_"+ id] = count;
                    return false;
                },
                401: function () {
                    alert('The server is not available');
                }
            }
        })
        }

    });
    $(document).on('click', '.task_info_trash', function () {
        var task_info = $(this).parents('.task_info');
        var id = task_info.attr('name');
        /*var id = $(this).parents('.task_info').attr('name');*/
        var info_id = $(this).attr('name');
        var count = parseInt(count_info["info_id_"+ id]);
        info = $(this).parents().find('#'+id+'_'+info_id+'').text();
        var csrfmiddlewaretoken = $('input[name=csrfmiddlewaretoken]');
        $(this).parents().find('#'+id+'_'+info_id+'').text('');
        $.ajax({
            url: '/task_info_delete/',
            type: 'POST',
            dataType: 'html',
            data: {
                'task': info,
                'task_id': id,
                'csrfmiddlewaretoken': csrfmiddlewaretoken.val()
            },
            cache: false,
            statusCode: {
                200: function () {
                    task_info.remove();
                    count -= 1;
                    count_info["info_id_"+ id] = count;
                },
                401: function () {
                    alert('The server is not available');
                }
            }
        });

    });
    $(document).on('click', '.task_info_edit', function (e) {
        e.preventDefault();
        k = $(this).parents('.task_info').attr('name');
        count_task_info = $(this).attr('name');
        info = $(this).parents().find('#'+k+'_'+count_task_info).text();
        $('#Modal_edit_info').modal();
        $('#info_button').click(function (e) {
            e.preventDefault();
            if(!requestSent){
                requestSent = true;
                var new_task_info = $('input[id=new_info_task]').val();
                var csrfmiddlewaretoken = $('input[name=csrfmiddlewaretoken]');
                var id = k;
                $('#Modal_edit_info').modal("hide");
                $('input[id=new_info_task]').val('');
                $.ajax({
                    url: '/task_info_edit/',
                type: 'POST',
                dataType: 'html',
                data: {
                    'task_id': id,
                    'task': info,
                    'csrfmiddlewaretoken': csrfmiddlewaretoken.val(),
                    'new_task': new_task_info
                },
                cache: false,
                complete: function () {
                        $('#'+id+'_'+count_task_info).text(new_task_info);
                        requestSent = false;
                }
            });
        }

        })

    });
    $(document).on('change', '.task_done', function(e){
        e.preventDefault();
        k = $(this).parents('.task_info').attr('name');
        count_task_info = $(this).attr('name');
        info = $(this).parents().find('#'+k+'_'+count_task_info).text();
        var csrfmiddlewaretoken = $('input[name=csrfmiddlewaretoken]');
        var id = k;
        /* $('#task_done_'+ count_task_info+' input:checkbox').val(),*/
        var box = $(this).find('input[type=checkbox]');
        $.ajax({
            'url': "/task_done/",
            'type': 'POST',
            'dataType': 'html',
            'data': {
                'task': info,
                'present': box.is(':checked') ? '1': '0',
                'csrfmiddlewaretoken': csrfmiddlewaretoken.val(),
                'task_id': id
            },
            cache: false,
            statusCode: {
                200: function(){
                    $(this).find('input[type=checkbox]').prop('checked', 'true');
                }
            }
        })
    });
    $(document).on('click', '.up', function(){
        var pdiv = $(this).parents('.task_info');
        pdiv.insertBefore(pdiv.prev('.task_info'));
        return false
    });
    $(document).on('click','.down',function(){
        var pdiv = $(this).parents('.task_info');
        pdiv.insertAfter(pdiv.next());
        return false
    });
};

$(document).ready(main);