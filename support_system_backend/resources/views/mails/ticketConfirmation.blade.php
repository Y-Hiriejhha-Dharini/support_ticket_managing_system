<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Ticket Confirmation mail</title>
</head>
<body>
    <h2>Confirmation for Ticket Creation</h2>
    <p>Your ticket has been created successfully</p>
    <p><strong>Reference Number: {{ $referenceNumber }}</strong></p>

    <p>
        Thanks,<br>
        {{ config('app.name') }}
    </p>
</body>
</html>
