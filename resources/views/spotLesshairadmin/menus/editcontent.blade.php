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
		<div class="container">
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
        </div>

        <div class="wrap-body my-2">
		
            <div class="card full-card mb-3 border">
                <div class="card-body px-4">
				<div class="container">
                    <form method="POST" action="{{ url(ADMIN.'/menu/updateContent/'.$menudata->menu_uuid) }}" class="row" id="updatemenu" enctype="multipart/form-data">
                        @csrf
                        <div class="tab-content pt-3 pb-2" id="nav-tabContent">
                            <div class="tab-pane fade show active" id="div-basic-tab" role="tabpanel">
                                <div class="row pt-3">
                                    <div class="col-11 col-sm-12 col-md-11 col-lg-11 col-xl-11 col-xxl-11">
                                        <div class="row">
                                             
									    	<textarea name="main_content" id="editor">{{$menudata->main_content}}</textarea>
											
                                            <div class="col-12 d-grid gap-2 d-md-flex justify-content-md-end mt-2">
											<a href="javascript:void(0)" class="btn btn-primary px-3 py-2 ms-2 border-0 leavecls" id="updatemenubutton" onclick="updatemenu();">Update</a>
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

</div>

	

<script src="{{ asset('js/jquery-1.11.3.js') }}"></script>  
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@dashboardcode/bsmultiselect@1.1.18/dist/css/BsMultiSelect.min.css">
	<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.0/dist/umd/popper.min.js"></script>

	<script  src="https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.19.3/jquery.validate.min.js" ></script> 
	<script src="https://cdn.ckeditor.com/4.16.0/standard/ckeditor.js"></script>
			<script>
				CKEDITOR.replace('editor');
			</script>

	<script type="text/javascript">
			
		


		function updatemenu() {
			if ($("#updatemenu").valid()) {
				$("#updatemenubutton").addClass('disabled');
				setTimeout(function() {
					$("#updatemenu").submit();
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
