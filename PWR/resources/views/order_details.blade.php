
@extends('layouts.app')

@section('content')
<div id="pwr" class="container">
            <div class="panel panel-default">
                
                <div class="panel-heading">Order Details</div>

                <div class="panel-body">
                    @if (session('status'))
                        <div class="alert alert-success">
                            {{ session('status') }}
                        </div>
                    @endif

                </div>
            </div>
</div>
@endsection

