@extends('layouts.app')
	

	@if (session()->has('errmessage'))
        <div class="row">
            <div class="col-12">
            <div class="alert alert-icon-right alert-success alert-dismissible mt-2" role="alert">
                    <span class="alert-icon">
                        <i class="la la-info"></i>
                    </span>
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                    <strong>{{ session('errmessage') }}</strong>
                </div>
            </div>
        </div>
    @endif

	<div class="main-wrap p-4">
  
        <div class="wrap-header">
            <div class="row align-items-center mb-4">
				
					@include('layouts.breadcrumbs')
					<div class="col-md-12 col-lg-7">
						<div class="text-end d-flex justify-content-end align-items-center">
							<a href="{{ url(ADMIN.'/menus') }}" class="btn btn-back px-3 py-2 ms-2 border-0 hasbackalert">
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
									<path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
								</svg> 
								Back to listing
							</a>
						</div>
					</div>

				
		    
            </div>
        </div>

        <div class="wrap-body my-2">
            <div class="card full-card mb-3 border">
                <div class="card-body px-4">
                    <form method="POST" action="{{ url(ADMIN.'/menu/store') }}" class="row" id="createmenu" enctype="multipart/form-data">
                        @csrf
                        <div class="tab-content pt-3 pb-2" id="nav-tabContent">
                            <div class="tab-pane fade show active" id="div-basic-tab" role="tabpanel">
                                <div class="row pt-3">
                                    <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                        <div class="row">
                                            <div class="col-12 col-lg-6 mb-3">
                                                <div class="form-group">
                                                    <label for="title">Page Name <span class="red">*</span></label>
                                                    <input type="text" name="page_name" id="page_name" class="form-control convertMenu" placeholder="Enter Page name"  autofocus>
                                                </div>
                                            </div>
											<div class="col-12 col-lg-6 mb-3">
                                                <div class="form-group">
                                                    <label for="title">Menu Name <span class="red">*</span></label>
                                                    <input type="text" name="menu_name" id="menu_name" class="form-control" placeholder="Enter menu name"  autofocus>
                                                </div>
                                            </div>
											<div class="col-12 col-lg-6 mb-3">
                                                <div class="form-group">
                                                    <label for="title">Page Link <span class="red">*</span></label>
                                                    <input type="text" name="page_link" id="page_link" class="form-control convertMenu" placeholder="Enter page link"  autofocus>
                                                </div>
                                            </div>
											<div class="col-12 col-lg-6 mb-3">
											<div class="form-group">
												<label for="status">Parent Menu</label>
												<select name="parent_id" class="form-control" autofocus>
													<option value="">Choose Menu</option>
													@if(!empty($parentMenu))
														@foreach($parentMenu as $menu)
														<option value="{{ $menu->id }}">{{ $menu->page_name }}</option>
														@endforeach
													@endif
												</select>
											</div>
											</div>

											<div class="col-12 col-lg-6 mb-3">
                                                <div class="form-group">
                                                    <label for="title">Title <span class="red">*</span></label>
                                                    <input type="text" name="title" class="form-control" placeholder="Enter Title"  autofocus>
                                                </div>
                                            </div>
											<div class="col-12 col-lg-6 mb-3">
                                                <div class="form-group">
                                                    <label for="title">Meta Description <span class="red">*</span></label>
                                                    <input type="text" name="meta_description" class="form-control" placeholder="Enter meta description"  autofocus>
                                                </div>
                                            </div>
											<div class="col-12 col-lg-6 mb-3">
                                                <div class="form-group">
                                                    <label for="title">Meta Keyword <span class="red">*</span></label>
                                                    <textarea name="meta_keywords" class="form-control"  ></textarea>
                                                </div>
                                            </div>
											
											<div class="col-12 col-lg-3 mb-3">
                                                <div class="form-group">
                                                    <label for="title">Sort Order </label>
                                                    <input type="text" name="sort_order" class="form-control" placeholder="Enter sortorder"  autofocus>
                                                </div>
                                            </div>
											<div class="col-12 col-lg-3 mb-3">
											<div class="form-group">
												<label for="status">Status</label>
												<select name="status" class="form-control" autofocus>													
													<option value="1">Active</option>
													<option value="0">Inactive</option>
												
												</select>
											</div>

                                            </div>
											
                                            <div class="col-12 d-grid gap-2 d-md-flex justify-content-md-end mt-2">
											<a href="javascript:void(0)" class="btn btn-primary px-3 py-2 ms-2 border-0 leavecls" id="createmenubutton" onclick="createMenu();">Save</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>					
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>

</div>

	

<script src="{{ asset('js/jquery-1.11.3.js') }}"></script>  
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@dashboardcode/bsmultiselect@1.1.18/dist/css/BsMultiSelect.min.css">
	<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.0/dist/umd/popper.min.js"></script>
	<script src="https://cdn.jsdelivr.net/npm/@dashboardcode/bsmultiselect@1.1.18/dist/js/BsMultiSelect.min.js"></script>
	<script  src="https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.19.3/jquery.validate.min.js" ></script> 

	<script type="text/javascript">
			
		
		$(document).ready(function() {

			$('.convertMenu').on('input', function(){
                this.value = this.value.toLowerCase();
            });

			$('#page_link').on('input', function() {
				// Replace spaces with underscores and convert to lowercase
				this.value = this.value.trim().toLowerCase().replace(/\s+/g, '_');
			});
		
			$('#createmenu').validate({
				ignore:[],
				rules: {
					menu_name: {
						 required : true,
						 remote: {
							url:  "{{ url(ADMIN .'/checkmenuexists') }}",
							data: {'_token': $('input[name=_token]').val()},
							type: "post"
						},
						maxlength: 45,
					},					
					page_name:{
						required:true,						
					},
					page_link :{
						required:true,	
						remote: {
							url:  "{{ url(ADMIN .'/checkmenuexists') }}",
							data: {'_token': $('input[name=_token]').val()},
							type: "post"
						},					
					},
					title :{
						required:true,						
					},
					meta_description:{
						required:true,					
					},
					meta_keyword:{
						required:true,
					},
					sort_order:{
						number:true,						
					},
					
				},
				messages: {
					menu_name:{
						required:'Please enter menu name',						
						maxlength: 'Limit the characters to 45.',						
						remote: 'Menu name already exist.',
					},
					page_name:{
						required:'Please enter page name',						
						maxlength: 'Limit the characters to 45.',
					},
					page_link:{
						required:'Please enter the link',		
						remote: 'Menu url already exist.',				
					},
					title:{
						required:'Please enter title',						
					},
					meta_description:{
						required:'Please enter meta description',						
						
					},
					meta_keyword:{
						required:'Please enter meta keywords',						
						
					},
					sort_order:{
						number:'Please enter a number',						
						
					},
					
					
					
				},

				errorPlacement: function(error, element) {
                  
                        error.insertAfter(element)
                }
            
			});


		
		

		});


		function createMenu() {
			if ($("#createmenu").valid()) {
				$("#createmenubutton").addClass('disabled');
				setTimeout(function() {
					$("#createmenu").submit();
                }, 500);
				
			
			} else {
				setTimeout(function() {
					$('html, body').animate({
						scrollTop: ($('.error:visible').first().offset().top - 100)
					}, 500);
				}, 500);
			}
		}


		
    
     
	</script>
