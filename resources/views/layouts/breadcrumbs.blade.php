
@if( isset( $headerdata ) && !empty( $headerdata ) )

@if( isset( $headerdata['breadcrumbs'] ) && isset( $headerdata['breadcrumbs']['links'] ) && !empty( $headerdata['breadcrumbs']['links'] ) )



<div class="col-md-12">
    <h1 class="mb-0">{{$headerdata['pageheadertitle']}}</h1>
</div>
<div class="col-md-5">
	<nav aria-label="breadcrumb" class="nav-breadcrumb">
		<ol class="breadcrumb">
			
			@foreach( $headerdata['breadcrumbs']['links'] as $bck => $bcv )
			@if( $bcv['haslink'] == 1 )
			<li class="breadcrumb-item"><a href="{{$bcv['url']}}"><?php echo $bcv['title'];?></a></li>

			@else
			<li class="breadcrumb-item active" aria-current="page"><?php echo $bcv['title'];?></li>
			@endif
			@endforeach

		</ol>
	</nav>
</div>




@endif

@endif