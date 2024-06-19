@extends('layouts.app')
<div class="">
	
		
		<link rel="stylesheet" href="https://cdn.datatables.net/1.11.3/css/jquery.dataTables.min.css">
		<div class="">
		
		@if (session()->has('message'))
		<script>
			$(document).ready(function(){
				
				setTimeout(function(){
					swal({
						title: '',
						text: '{{session('message')}}',
						html: true,
						timer: 2000,
						type: "success",
						showCancelButton: false,
						showConfirmButton: false,
						closeOnConfirm: true,
					}); 
				},<?php echo SETTIMEOUT; ?>); 
			});
		</script>
            
		    @endif
            @if (session()->has('error_message'))
                <script>
                    $(document).ready(function(){                        
                        swal("{{ session('error_message') }}",'','error');
                    });
                </script>
		    @endif
			<div class="main-wrap p-4">
			<div class="wrap-header">
			<div class="container">
                <div class="row align-items-center mb-4">
                  
				
					@include('layouts.breadcrumbs')
                  
                    <div class="col-md-12 col-lg-7">
                        <div class="text-end d-flex justify-content-end align-items-center">

                         <a href="{{ url(ADMIN.'/menu/create') }}" class="btn btn-primary px-3 py-2 ms-2 border-0"><i class="fas fa-plus"></i> Create</a>
                         
                        </div>
                    </div>
                    </div>
                </div> 
            </div>
			<div class="wrap-body my-2">
                <div class="card mb-3 pt-3 border">
                    <div class="card-body px-4">
					
					
						<div class="tab-content py-3 table-move" id="nav-tabContent">
                            <div class="tab-pane fade show active" id="nav-draft" role="tabpanel" aria-labelledby="nav-home-tab">
							<div class="table-responsive">
                                <table id="menuTable" class="main-table border-0" style="width:100%">
                                    <thead>
                                        <tr>
											 <th class="ps-4" width="20%">Name</th>
											<th class="ps-4" width="20%">Link</th>
											<th class="ps-4" width="20%">Menu parent</th>	
										     <th class="ps-4" width="10%">Created Date</th>                                            
											<th width="40%" class="text-end">Action</th> 
                                        </tr>
                                    </thead>
                                   
                                </table>
                            </div>
                        
                        </div>   </div>

						
						
					</div>
                </div>
            </div>
        </div>

		<script src="{{ asset('js/jquery-1.11.3.js') }}"></script>
		<script src="https://cdn.datatables.net/1.11.3/js/jquery.dataTables.min.js"></script> 
    <!-- <script src="//cdn.datatables.net/plug-ins/1.11.3/pagination/select.js"></script> -->
	<script type="text/javascript">
	
		$(document).ready(function() {
			
		//$('#menuTable').DataTable();
		getMenu();
		
		});

	





		function getMenu(){
			$("#menuTable").DataTable().destroy();
		
			var table = $('#menuTable').DataTable({
				autoWidth: false,
				searching: true,
				language: { search: '', searchPlaceholder: "Search",  },


				// bLengthChange: false,
				//processing: true,
				serverSide: true,	
				"lengthChange": true,
			    "pageLength": 10,
				order: [[4, 'desc']],	
				"order": [],
				ajax: "{{ url(ADMIN.'/menus/list/') }}", 
				
			
				columns: [
				  					
					{data: 'page_name', name: 'page_name',orderable :true},
					{data: 'page_link', name: 'page_link',orderable :true},					
					{data: 'parent_menu', name: 'parent_menu', orderable: true, },
					{data: 'created_at', name: 'created_at', orderable: true, },
                        
					{
						data: 'action',
						name: 'action',
						orderable: false, 
                        searchable: false,
						class: 'text-end'
					},
				]

			});

		}


		
		function showDeleteModal(id)
        {
            swal({
				title: "Are you sure you want to delete this menu?",
				text: "",
				type: "warning",
				showCancelButton: true,
				confirmButtonClass: "btn-danger",
				confirmButtonText: "OK",
				closeOnConfirm: true,
				showLoaderOnConfirm: false
		  },
		  function(){
           $.ajax({
                type: "POST",
                url: "{{ URL::to(ADMIN.'/menu/destroy')}}",
                data: 
                {'id':id,"_token": "{{ csrf_token() }}"},
                dataType : 'json',
                success: function(data) {
					console.log(data);
                    if(data.success==1){
                     	setTimeout(function(){
                            swal({
                                title: '',
                                text: data.message,
                                html: true,
                                timer: 2000,
                                type: "success",
                                showCancelButton: false,
                                showConfirmButton: false,
                                closeOnConfirm: true,
                            }); 
                        },<?php echo SETTIMEOUT; ?>);
                       
						getMenu();
                    } else{
						swal(data.errormsg);
					}
                    
                    
                    }
                });
            });
        }

        
	</script>