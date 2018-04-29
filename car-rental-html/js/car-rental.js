(function ($) {

    var endPoint = "http://localhost:10010";

    //get All Car
    axios.get( endPoint + '/getCarDisplay?from=html')
        .then(function (response) {
            // console.log(response.data);

            $.each(response.data, function( index, value ) {
                console.log(value)
                $('.car-slider').append(assignSlide(value))
                $('body').append(modalReserv(value))
            });


            $(".carsmodals").owlCarousel({ 		  
                loop:true,
                    margin:30,
                    nav:true,
                    responsiveClass:true,
                    responsive:{
                        0:{
                            items:1,
                            nav:true,
                            loop:true
                        },
                        700:{
                            items:1,
                            nav:true,
                            loop:true
                        },
                        1170:{
                            items:1,
                            nav:true,
                            loop:true
                        }
                    }
                
                
            }); 

        })
        .catch(function (error) {
            console.log(error);
        });


    $(document).on("click", '.rent-now', function() {

        var id = $(this).attr('data-id');
        var model = $(this).attr('data-name');
        var fname = $('.fname-'+id).val();
        var lname = $('.lname-'+id).val();
        var start = $('.start-'+id).val();
        var end = $('.end-'+id).val();
        

        if( fname.length < 1 || lname.length < 1 || start.length < 1 || end.length < 1){
            
            swal({
                type: 'error',
                title: 'Oops...',
                text: 'Please Enter Input',
            })

            return;
        }

        axios.put(endPoint + '/rentCar?id='+ id, {
            firstName: fname,
            lastName: lname,
            start_date: start,
            end_date: end,
            status: 'pending'
          })
          .then(function (response) {
             if(response.status == 200) {
                swal({
                    type: 'success',
                    title: 'Success',
                    text: 'Rent ' + model + ' Success',
                })
             }
          })
          .catch(function (error) {
            console.log(error);
          });




    });

    $(document).on("click", '.add-car', function(  event ) {

        event.preventDefault();

        var car_type = $('.car_type').val();
        var pickup = $('.pickup').val();
        var datetime_pick = $('.datetime_pick').val();
        var dropoff = $('.dropoff').val();
        var datetime_off = $('.datetime_off').val();
        var name = $('.name').val();
        var email = $('.email').val();
        var phone = $('.phone').val();
        var img = $('.img').val();

        if(car_type.length < 1 || pickup.length < 1 || datetime_pick.length < 1 || dropoff.length < 1 || datetime_off.length < 1 || name.length < 1 || email.length < 1 || phone.length < 1 || img.length < 1){

            swal({
                type: 'error',
                title: 'Oops...',
                text: 'Please Enter Input',
            })

            return;

        }

        axios.post(endPoint + '/addCar', {
            car_type: car_type,
            pickup: pickup,
            datetime_pick: datetime_pick,
            dropoff: dropoff,
            datetime_off: datetime_off,
            name: name,
            email: email,
            phone: phone,
            img: img,
            status: 'available'
          })
          .then(function (response) {
             if(response.status == 200) {
                swal({
                    type: 'success',
                    title: 'Success',
                    text: 'Success',
                })
             }
          })
          .catch(function (error) {
            swal({
                type: 'error',
                title: 'Oops...',
                text: 'Error',
            })
          });

    });


    $(document).on("click", '.remove-car', function(  event ) {
        event.preventDefault();
        var id = $(this).attr('data-id');

        axios.delete(endPoint + '/deleteCar?id=' + id, {
            
          })
          .then(function (response) {
             if(response.status == 200) {
                swal({
                    type: 'success',
                    title: 'Success',
                    text: 'Success',
                })
             }
          })
          .catch(function (error) {
              console.log(error)
            swal({
                type: 'error',
                title: 'Oops...',
                text: 'Error',
            })
          });

    });
    
        


    function assignSlide(data){
        var btn_remove = '';
        if(data.status == "rent"){
            btn_remove = '<a href="#" class="btn back-groud-red remove-car" data-id="'+data.id+'">Remove Now</a>';
        }
        
        var html = '<li class="item">\
                        <div class="row">\
                        <div class="col-md-3">\
                            <h3>'+ data.name +'</h3>\
                            <div class="subtitle">Transmission : '+ data.gear +'</div>\
                            <div class="carPrice"> <strong>'+ data.price_per_day +'</strong> <span>/Day</span> </div>\
                            <a href="#" class="btn" data-toggle="modal" data-target="#modal-'+data.id+'"><i class="fa fa-calendar" aria-hidden="true"></i> Reserve Now</a>\
                            '+btn_remove+'\
                         </div>\
                        <div class="col-md-6" style="text-align: center;"><a href="images/'+ data.img +'" class="image-popup"><img src="images/'+ data.img +'" style="width:70%" alt="" /></a></div>\
                        <div class="col-md-3">\
                            <div class="carinfo">\
                            <ul>\
                                <li>Transmission: <strong>'+ data.gear +'</strong></li>\
                                <li>Passengers: <strong>'+ data.no_passenger +'</strong></li>\
                                <li>Size: <strong>'+ data.size +'</strong></li>\
                                <li>Place: <strong>'+ data.place_rent +'</strong></li>\
                                <li>Accessories: '+ data.accessories +'</li>\
                                <li>Status: <strong>'+ data.status +'</strong></li>\
                            </ul>\
                            </div>\
                        </div>\
                        </div>\
                    </li>';

        return html;

    }

    function modalReserv(data){
        var html = '<div class="modal fade" id="modal-'+data.id+'" tabindex="-1" role="dialog">\
                        <div class="modal-dialog" role="document">\
                            <div class="modal-content">\
                            <div class="modal-header">\
                                <h5 class="modal-title">Rent Model : '+data.name+'  [<strong>'+ data.price_per_day +'</strong> <span>/Day</span>] </h5>\
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">\
                                <span aria-hidden="true">&times;</span>\
                                </button>\
                            </div>\
                            <div class="modal-body">\
                                <div class="row">\
                                    <div class="col-md-6 col-sm-6">\
                                        <div>\
                                            <p>First Name</p>\
                                        </div>\
                                        <div class="formrow">\
                                            <input type="text" class="form-control fname-'+data.id+'" placeholder="Your Name" name="fsname" required >\
                                        </div>\
                                    </div>\
                                    <div class="col-md-6 col-sm-6">\
                                        <div>\
                                            <p>Last Name</p>\
                                        </div>\
                                        <div class="formrow">\
                                            <input type="text" class="form-control lname-'+data.id+'" placeholder="Last Name" name="lsname" required >\
                                        </div>\
                                    </div>\
                                </div>\
                                <br>\
                                <div class="row">\
                                    <div class="col-md-6 col-sm-6">\
                                        <div>\
                                            <p>Start Date</p>\
                                        </div>\
                                        <div class="formrow">\
                                            <input class="form-control start-'+data.id+'" type="date" value="" placeholder="Select Start Rent Time" name="start_off" required >\
                                        </div>\
                                    </div>\
                                    <div class="col-md-6 col-sm-6">\
                                        <div>\
                                            <p>End Date</p>\
                                        </div>\
                                        <div class="formrow">\
                                            <input class="form-control end-'+data.id+'" type="date" value="" placeholder="Select End Rent Time" name="end_off" required >\
                                        </div>\
                                    </div>\
                                </div>\
                            </div>\
                            <div class="modal-footer">\
                                <button type="button" class="btn btn-primary rent-now" data-id="'+data.id+'" data-name="'+data.name+'">Rent Now</button>\
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>\
                            </div>\
                            </div>\
                        </div>\
                    </div>';

        return html;
    }

})(jQuery);