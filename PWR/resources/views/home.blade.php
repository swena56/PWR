@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <div class="panel panel-default">
                <div class="panel-heading">Dashboard</div>

                <div class="panel-body">
                    @if (session('status'))
                        <div class="alert alert-success">
                            {{ session('status') }}
                        </div>
                    @endif
		   <!--
			<link href="https://cdnjs.cloudflare.com/ajax/libs/tabulator/3.4.4/css/tabulator.min.css" rel="stylesheet">
		   <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/tabulator/3.4.4/js/tabulator.min.js"></script>
		<script src="https://code.jquery.com/jquery-3.2.1.min.js" integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4=" crossorigin="anonymous"></script>
		<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.min.js" integrity="sha256-VazP97ZCwtekAsvgPBSUwPFKdrwD3unUfSGVYrahUqU=" crossorigin="anonymous"></script>

		--!>
		  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/Swiper/4.2.0/css/swiper.css">
		   <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/Swiper/4.2.0/css/swiper.min.css">

		   <link href="https://cdnjs.cloudflare.com/ajax/libs/tabulator/3.4.4/css/tabulator_modern.min.css" rel="stylesheet">
		   <script type="text/javascript" src="{!! asset('js/jquery-3.2.1.min.js') !!}"></script>
		   <script type="text/javascript" src="{!! asset('js/jquery-ui.min.js') !!}"></script>
		   <script type="text/javascript" src="{!! asset('js/tabulator.min.js') !!}"></script>

		 <!-- Demo styles -->
  <style>
    html, body {
      position: relative;
      height: 100%;
    }
    body {
      background: #eee;
      font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
      font-size: 14px;
      color:#000;
      margin: 0;
      padding: 0;
    }
    .swiper-container {
      width: 100%;
      height: 100%;
    }
    .swiper-slide {
      text-align: center;
      font-size: 18px;
      background: #fff;

      /* Center slide text vertically */
      display: -webkit-box;
      display: -ms-flexbox;
      display: -webkit-flex;
      display: flex;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      -webkit-justify-content: center;
      justify-content: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      -webkit-align-items: center;
      align-items: center;
    }
  </style>

		   <div id="example-table"></div>
		   <script>

/*
Tabulator.extendExtension("format", "formatters", {
    bold:function(cell, formatterParams){
        return "<strong>" + cell.getValue() + "</strong>"; //make the contents of the cell bold
    },
    uppercase:function(cell, formatterParams){
        return cell.getValue().toUpperCase(); //make the contents of the cell uppercase
    }
});
*/
			//create Tabulator on DOM element with id "example-table"
			$("#example-table").tabulator({
			    //height:200, // set height of table (in CSS or here), this enables the Virtual DOM and improves render speed dramatically (can be any valid css height value)
			    layout:"fitColumns", //fit columns to width of table (optional)
			    height:"100%",
			   resizableRows:true,
			   layout:"fitDataFill",
		           placeholder:"No Data Set",
			   responsiveLayout:true,
			   pagination:"local",
			   paginationSize:6,
			//paginationElement:$("#pagination-element"),
			rowFormatter:function(row){
      			  if(row.getData().status == "Complete"){
		           // row.getElement().css({"color":"#A6A6DF"});
		           }
			if(row.getData().price >= 18){
		            row.getElement().addClass("success"); //mark rows with age greater than or equal to 18 as successfull;
		        }
    			},
			    columns:[ //Define Table Columns
			        {title:"OrderId", field:"order_id", width:150},
				{title:"Address", field:"address",sorter:"string",formatter:"bold"},
				{title:"Time", field:"timestamp",sorter:"datetime"},
				{title:"Price", field:"price"},//bottomCalc:"avg",  bottomCalcParams:{precision:3}},
				{title:"Phone", field:"phone"},
				{title:"Status", field:"status",sorter:"string",format:"bold"},
			    ],
			    rowClick:function(e, row){ //trigger an alert message when the row is clicked
		                 alert("Row " + row.getData().id + " Clicked!!!!");
			
				  //row.toggleSelect();
			    },
			});

/*
//Trigger sort when "Trigger Sort" button is clicked
$("#sort-trigger").click(function(){
    $("#example-table").tabulator("setSort", $("#sort-field").val(), $("#sort-direction").val());
});
*/			

			
			$("#example-table").tabulator("setData","delivery/1953");	



	</script>

		 <!-- Swiper -->
<!--
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide">Slide 1</div>
      <div class="swiper-slide">Slide 2</div>
      <div class="swiper-slide">Slide 3</div>
      <div class="swiper-slide">Slide 4</div>
      <div class="swiper-slide">Slide 5</div>
      <div class="swiper-slide">Slide 6</div>
      <div class="swiper-slide">Slide 7</div>
      <div class="swiper-slide">Slide 8</div>
      <div class="swiper-slide">Slide 9</div>
      <div class="swiper-slide">Slide 10</div>
    </div>
    <div class="swiper-pagination"></div>
 
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
 
  </div>
  <script>
    var swiper = new Swiper('.swiper-container', {
      pagination: {
        el: '.swiper-pagination',
        //dynamicBullets: true,
        clickable: true,
      },
      keyboard: {
        enabled: true,
      	},
      	loop: true,
    });
  </script>
-->
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
