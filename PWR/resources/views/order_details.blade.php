
@extends('layouts.app')

@section('content')
<div class="container">
            <div class="panel panel-default">
                <div class="panel-heading">Order Details</div>

                <div class="panel-body">
                    @if (session('status'))
                        <div class="alert alert-success">
                            {{ session('status') }}
                        </div>
                    @endif
			Test
			<div id="order_details">
			Test2
			</div>
                </div>
            </div>
</div>
@endsection

