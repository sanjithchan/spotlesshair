@extends('frontend.master')
@section('content')
                         

       


        <!-- 404 Start -->
        <div class="container-fluid py-5">
            <div class="container py-5 text-center">
                <div class="row justify-content-center">
                    <div class="col-lg-6">
                        <i class="bi bi-exclamation-triangle display-1 text-secondary"></i>
                        <h3 class="display-1">{{$menuDetails->page_name}}</h3>                      
                        <?php echo $menuDetails->main_content;?>
                        
                    </div>
                </div>
            </div>
        </div>
        <!-- 404 End -->

  
        @stop
