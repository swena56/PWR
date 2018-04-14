
@extends('layouts.app')

@section('content')
<div class="container">
            <div class="panel panel-default">
                
                <div class="panel-heading">Calculator</div>

                <div class="panel-body">

                <div id="calculator"></div>    
                <script type="text/babel" src="{{ asset('js/Calculator.js') }}"/> 

                </div>
            </div>
</div>
@endsection

