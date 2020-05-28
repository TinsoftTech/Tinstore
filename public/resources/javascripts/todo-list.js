$(document).ready(function(){

$('form').on('submit',function(){
var input= $('#post').val();
var todo={item:input};
$.ajax({
    url:'/todo',
    type:'POST',
    data:todo,
    success:function(data){
        
        location.reload();
        input.val("");
    },
    complete:function(){
      
    }
});
return false;
});

});


$(document).ready(function(){

    $('li').on('click',function(){
    var item= $(this).html();
   // var todo={item:input};
    $.ajax({
        url:'/todo/' +item,
        type:'DELETE',
        success:function(data){
            
            location.reload();
            input.val("");
        },
        complete:function(){
          
        }
    });
    return false;
    });
    
    });