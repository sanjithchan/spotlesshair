@extends('layouts.app')
<div class="">
		
		
		<link rel="stylesheet" href="https://cdn.datatables.net/1.11.3/css/jquery.dataTables.min.css">
		<div class="">
		
			<div class="main-wrap p-4">
			<div class="wrap-header">
			<div class="container">
                <div class="row align-items-center mb-4">
                  
				
					@include('layouts.breadcrumbs')
                  
                    <div class="col-md-12 col-lg-7">
                        <div class="text-end d-flex justify-content-end align-items-center">

                       
                         
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
                                <table id="studentTable" class="main-table border-0" style="width:100%">
                                    <thead>
                                        <tr>
											 <th class="ps-4" width="30%">Name Of the Student</th>
											<th class="ps-4" width="20%">Class</th>
											<th class="ps-4" width="20%">Subject</th>	
										     <th class="ps-4" width="30%">Total Mark in all semesters</th>                                            
										 
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
			
		$('#studentTable').DataTable();
		getStudentDetails();
		
		});

	
		



		function getStudentDetails(){
			$("#studentTable").DataTable().destroy();
		
			var table = $('#studentTable').DataTable({
				autoWidth: false,
				searching: false,
				language: { search: '', searchPlaceholder: "Search",  },

				processing: true,
				serverSide: true,	
				"lengthChange": true,
			    "pageLength": 10,
				order: [[4, 'desc']],	
				"order": [],
				ajax: "{{ url(ADMIN.'/students/list/') }}", 
				
			
				columns: [
				  					
					{data: 'name_of_student', name: 'name_of_student',orderable :true},
					{data: 'class', name: 'class',orderable :true},					
					{data: 'Subject', name: 'Subject', orderable: true, },
					{data: 'total_mark', name: 'total_mark', orderable: true, },
                        
					
				]

			});

		}



        
	</script>