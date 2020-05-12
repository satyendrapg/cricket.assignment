<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link href="{{ asset('css/app.css') }}" rel="stylesheet">
        <script>
            const csrf_token = '{{ csrf_token()}}';
        </script>
        <title>Laravel</title>

        <div class="container">
			<div id="root"></div>
        </div>
        <script src="{{asset('/js/app.js')}}" ></script>
    </body>
</html>
