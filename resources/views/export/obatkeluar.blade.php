<!doctype html>
<html lang="en">

<head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">

    <title>Puskesmas &mdash; Obat Keluar</title>
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
        <table style="margin-left:auto;margin-right:auto;">
            <tr>
                <td width="100px;"></td>
                <td>
                    <div style="text-align: center">
                        <span style="font-weight: bold;">PEMERINTAH KOTA PAREPARE <br> DINAS KESEHATAN <br>UPTD
                            PUSKESMAS
                            LUMPUE</span> <br>
                        <small>Jl. H.A Iskandar No.2 Kec.Bacukiki Kel.Lumpue Kota Pare-pare</small> <br>
                        <small>Email: PuskesmasLumpu@yahoo.com</small>
                    </div>
                </td>
                <td>
                    <img src="{{ asset('logo.jpeg') }}" alt="" width="50px"
                        style="margin-left: 100px;margin-top:20px;float: right">
                </td>
            </tr>
        </table>
        <hr>


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

    <table style="margin-top: 30px">
        <tr>
            <td width="500px">
                <div>
                    <br>
                    Menyerahkan <br>
                    Penanggung Jawab Ruang Farmasi <br> <br> <br> <br> <br> <br>
                    <b>Nurhijarah H S.Farm. Apt</b> <br>
                    <span>NIP 19950403 201903 2 004</span>
                </div>
            </td>
            <td>
                <div>
                    <span>Parepare, {{ now()->format('d M Y') }}</span> <br>
                    Menerima <br>
                    Petugas Kesling <br> <br> <br> <br> <br> <br>
                    <b>ROSDIANA S.ST</b> <br>
                    <span>NIP 19670414 1990032008</span>
                </div>
            </td>
        </tr>
    </table>
    <table style="text-align: center;margin-left:auto;margin-right:auto;margin-top: 20px;">
        <tr>
            <td>
                <div>
                    Mengetahui <br>
                    Kepala UPTD Puskesmas Lumpue <br> <br> <br> <br> <br> <br>
                    <b>IRNAWATY SKM. M.Kes</b> <br>
                    <span>NIP 19771029 200312 2011</span>
                </div>
            </td>
        </tr>
    </table>

    <div>


        <div class="" style="float:right; margin-right:150px">


        </div>

        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
            integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous">
        </script>

</body>

</html>
