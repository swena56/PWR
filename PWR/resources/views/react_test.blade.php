@extends('layouts.app')

@section('content')
<div class="container">
            <div class="panel panel-default">
                <div class="panel-heading">React Test</div>

                <div class="panel-body">
                    @if (session('status'))
                        <div class="alert alert-success">
                            {{ session('status') }}
                        </div>
                    @endif
			<div id="pwr"></div>
                </div>
            </div>
</div>
@endsection
