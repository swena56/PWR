@extends('layouts.app')

@section('content')
<div class="container-fluid">
      @if (session('status'))
          <div class="alert alert-success">
              {{ session('status') }}
          </div>
      @endif
      <div id="pwr"></div>
</div>
@endsection
