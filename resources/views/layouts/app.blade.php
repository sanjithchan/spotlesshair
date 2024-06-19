<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <title>{{ TITLE }} | {{$headerdata['pageheadertitle']}}</title>
        <!-- Fonts -->
        <meta name="description" content="{{ TITLE }}">    
        <link rel="apple-touch-icon" sizes="180x180" href="{{ asset('img/favicon/apple-touch-icon.png')}}">
        <link rel="icon" type="image/png" sizes="32x32" href="{{ asset('img/favicon/favicon@32.png')}}">
        <link rel="icon" type="image/png" sizes="16x16" href="{{ asset('img/favicon/favicon16.png')}}">
        <link rel="manifest" href="{{ asset('img/favicon/site.webmanifest')}}">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" crossorigin="anonymous" referrerpolicy="no-referrer" />

        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" crossorigin="anonymous">
        <link rel="stylesheet" href="{{ asset('css/all.min.css')}}">
        <link rel="stylesheet" href="{{ asset('css/main.css?v=9')}}">
        <link rel="stylesheet" type="text/css" href="{{ asset('css/sweetalert.min.css') }}">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/font/bootstrap-icons.css">
    
        <link rel="stylesheet" href="{{ asset('css/jquery-ui.min.css')}}">
   
        <link rel="stylesheet" type="text/css" href="{{ asset('css/jquery.timepicker.min.css') }}">
        <link rel="stylesheet" href="{{ asset('css/bootstrap-datetimepicker.min.css')}}">
    
        <link rel="stylesheet" type="text/css" href="{{ asset('css/bootstrap-daterangepicker.css') }}">
              <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin> 
        <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100&display=swap" rel="stylesheet">
  
   
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/pretty-checkbox@3.0/dist/pretty-checkbox.min.css"> 
        <!-- gogole icons-->
      
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
        <script src="{{ asset('js/jquery-1.11.3.js') }}"></script>   
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
        <script src="{{ asset('js/main.js')}}"></script>
        <script src="https://cdn.datatables.net/1.11.3/js/jquery.dataTables.min.js"></script>  
        <script type="text/javascript" src="{{ asset('js/sweetalert.min.js') }}"></script>  
        <!--<script type="text/javascript" src="{{ asset('js/jquery-validate.js') }}"></script> -->
        <script type="text/javascript" src="{{ asset('js/jquery.timepicker.min.js') }}"></script> 
        <script  src="https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.19.3/jquery.validate.min.js" ></script> 
        <script type="text/javascript" src="{{ asset('js/moment.min.js') }}"></script>
        <script type="text/javascript" src="{{ asset('js/bootstrap-daterangepicker.js') }}"></script>  
        
        <script src="{{ asset('js/jquery-ui.min.js')}}"></script>
        <script src="{{ asset('js/moment-with-locales.min.js')}}"></script>
        <script src="{{ asset('js/bootstrap-datetimepicker.min.js')}}"></script>

    </head>
    <body class="main-body">    
   
        <section class="outside">
        @include('layouts.navigation')    
    
    <section class="main"> 
        <div id="side-bar side-bar-menu" class="side-bar">
             <div class="logo text-center">
             <a href="{{ url(ADMIN.'/dashboard') }}"><img src="{{ asset('img/logo.png')}}" alt=""></a>
             </div>

        
                
            <div class="menu">
                <div>
                   <div class="item   @if($headerdata['lefttitle'] == 'dashboard') active @endif" data-bs-toggle="tooltip" data-bs-placement="right" title="dashboard">
                       <a href="{{ url(ADMIN.'/dashboard') }}" class="sub-item  @if($headerdata['lefttitle'] == 'dashboard') active @endif">
                       <i class="material-symbols-outlined">receipt_long</i><span>Dashboard</span></a>
                    </div> 
              
                   <div class="item   @if($headerdata['lefttitle'] == 'menus') active @endif" data-bs-toggle="tooltip" data-bs-placement="right" title="menus">
                       <a href="{{ url(ADMIN.'/menus') }}" class="sub-item  @if($headerdata['lefttitle'] == 'menus') active @endif">
                       <i class="material-symbols-outlined">account_tree</i><span>Menus</span></a>
                    </div> 

                    <div class="item   @if($headerdata['lefttitle'] == 'students') active @endif" data-bs-toggle="tooltip" data-bs-placement="right" title="Admin">
                        <a href="{{ url(ADMIN.'/students') }}" class="sub-item  @if($headerdata['lefttitle'] == 'students') active @endif">
                        <i class="material-symbols-outlined">admin_panel_settings</i> <span>Students</span></a>
                    </div> 
                   
                </div>

                <div>
                   
                  
                    

                    <div class="toggle-menu">
                        <a href="javascript:void(0)" onclick="togglemenu()">
                            <i class="fas fa-compress-alt"></i><span>Toggle Sidebar</span>
                        </a>
                    </div>
                </div> 
            </div> 
        </div> 
    </section>
           
              


    
<script>
function myFunction() {
  document.getElementById("side-bar-menu").style.display = "block";
}
</script>


</section>
</body>
</html>