<!doctype html>
<html lang="en">
  <head>


  <title>@if(isset(  $seo['title'] )) {{ $seo['title']}} | @endif {{TITLE}} </title>

  <meta name="description" content="<?php echo (isset($seo['description'])) ? $seo['description']  : NULL; ?>">
  <meta name="keywords" content="<?php echo ( isset( $seo['keywords'] ) ) ? $seo['keywords']  : NULL ;?>">
  <meta property="og:type" content="website" />  
  <meta property="og:description" content="<?php echo (isset($seo['description'])) ? $seo['description']  : NULL; ?>"/>


  <!-- Required meta tags -->

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="viewport" content="width=device-width, user-scalable=no">
    <!-- Google Web Fonts -->
   
    <link href="https://fonts.googleapis.com/css?family=Poppins:100,200,400,300,500,600,700" rel="stylesheet">

    <!-- CSS -->
    <link rel="stylesheet" href="{{ asset('frontend/css/bootstrap.css') }}">
    <link rel="stylesheet" href="{{ asset('frontend/css/all.min.css') }}">
    <link rel="stylesheet" href="{{ asset('frontend/css/animate.css') }}">
    <link rel="stylesheet" href="{{ asset('frontend/css/style-en.css') }}">



    
  </head>
<body>


<?php

use App\Http\Controllers\HomeController; 
$homeController = new HomeController(); 
$menus = $homeController->getMenus(); 


?>


<header id="header">
		<div class="headerTop">
			<div class="container">
				<a class="navbar-brand" href="index.html"><img src="{{ asset('frontend/img/logo.png')}}" alt=""></a>
				<ul class="headerTopRgt">
					<li class="workTime">
						Opening Hours <br>
						Sat -Thu 01:00 PM - 10:00 PM, Fri Off
					</li>
					<li class="hdContact">
						Call us <br>
						920024730
					</li>
					<li class="hdBtn">
						<a class="btn btn-primary" href="#" role="button">Online Booking</a>
					</li>
				</ul>
			</div>
		</div>
		
		<nav class="navbar navbar-expand-lg menuBar">
			<div class="container">  
				<button class="navbar-toggler collapsed" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
					<span class="navbar-toggler-icon"></span>
				</button>
				<div class="collapse navbar-collapse" id="navbarNavDropdown">
					
				

				<ul class="navbar-nav menu">
				        <li class="nav-item active">
							<a class="nav-link" href="/">Home</a>
						</li>
					@foreach ($menus as $menu)
						<li class="nav-item">
							<a class="nav-link" href="{{ $menu->page_link }}">{{ $menu->menu_name }}</a>	
												
						</li>
					@endforeach
				</ul>
				
				  



				</div>
				<ul class="navbar-nav language">
					<li class="nav-item active">
						<a class="nav-link" href="#">AR</a>
					</li>
				</ul>
			</div>
		</nav>
	</header>

        @yield('content')



        <footer>
		<div class="container">
			<div class="row">
				<div class="col-md-4">
					<a class="footerLogo" href="index.html"><img src="img/logo.png" alt=""></a>
					<p>We are the first and only lice removal center in the Middle East. Our center was established following comprehensive research for the best available state-of-the-art techniques that eliminate lice safely and effectively</p>
					<nav class="nav socialMedia">
						<a class="nav-link" href="#"><i class="fab fa-whatsapp"></i></a>
						<a class="nav-link" href="#"><i class="fab fa-instagram"></i></a>
						<a class="nav-link" href="#"><i class="far fa-envelope"></i></a>
					</nav>
				</div>
				<div class="col">
					<ul class="nav flex-column">
						<li class="nav-item footerHeading">
							Menu
						</li>
						<li class="nav-item">
							<a class="nav-link" href="#">Home</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" href="#">About</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" href="#">Lice Elimination Service</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" href="#">Packages & Pricing</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" href="#">Products</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" href="#">Contact Us</a>
						</li>
					</ul>				
				</div>
				<div class="col">
					<ul class="nav flex-column">
						<li class="nav-item footerHeading">
							Products
						</li>
						<li class="nav-item">
							<a class="nav-link" href="#">Tea Tree Oil</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" href="#">Tea Tree Spray</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" href="#">Tea Tree Shampoo</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" href="#">Tea Tree Collection</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" href="#">Tea Tree Comb & Tea Tree Oil</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" href="#">Tea Tree Comb</a>
						</li>
					</ul>				
				</div>
				<div class="col">
					<ul class="nav flex-column">
						<li class="nav-item footerHeading">
							Branches
						</li>
						<li class="nav-item">
							<a class="nav-link" href="#"><span>Alizdihar</span> Riyadh</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" href="#"><span>As Suwaidi</span> Riyadh</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" href="#"><span>Al Shamaliyah</span> Jeddah</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" href="#"><span>Alrawdah</span> Dammam</a>
						</li>
					</ul>				
				</div>
			</div>
		</div>
		<div class="copyRight">
			Copyright © 2020 Spotlesshair. All Rights Reserved.
		</div>
	</footer>

	<script src="{{ asset('frontend/js/jquery-2.2.4.min.js')}}"></script>
    <script src="{{ asset('frontend/js/bootstrap.min.js')}}"></script>
	<script>
		$('#homeSlider').carousel({
			interval: 5000
		})
	</script>

</body>
</html>