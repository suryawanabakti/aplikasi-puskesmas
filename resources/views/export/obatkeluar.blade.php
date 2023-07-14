<!doctype html>
<html lang="en">

<head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">

    <title>Apoteker &mdash; Obat Keluar</title>
    <style>
        #customers {
            font-family: Arial, Helvetica, sans-serif;
            border-collapse: collapse;
            width: 100%;
        }

        #customers td,
        #customers th {
            border: 1px solid #ddd;
            padding: 8px;
        }

        #customers tr:nth-child(even) {
            background-color: #f2f2f2;
        }

        #customers tr:hover {
            background-color: #ddd;
        }

        #customers th {
            padding-top: 12px;
            padding-bottom: 12px;
            text-align: left;
            background-color: #04AA6D;
            color: white;
        }
    </style>
</head>

<body>
    <div>
        <h5>Apoteker</h5>
        <small>Jalan Kerukunan timur no.2 , 20123.</small>
        <table id="customers">
            <thead>
                <tr>
                    <th>No.Invoice</th>
                    <th>Tanggal</th>
                    <th>Obat</th>
                    <th>Pasien</th>
                    <th>Jumlah</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($drugsOut as $data)
                    <tr>
                        <td>{{ $data->invoice }}</td>
                        <td>{{ $data->tanggal_keluar }}</td>
                        <td>{{ $data->obat->nama }}</td>
                        <td>{{ $data->pasien->nama }}</td>
                        <td>{{ $data->jumlah_keluar }}</td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    </div>




    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous">
    </script>

</body>

</html>
