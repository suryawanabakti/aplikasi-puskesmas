<!doctype html>
<html lang="en">

<head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">

    <title>Puskesmas &mdash; Bukti Pengambilan</title>
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
            /* background-color: #04AA6D; */
            /* color: white; */
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


        <table id="">
            <thead>
                <tr>
                    <th>Nama :</th>
                    @if ($data->pasien)
                        <td>{{ $data->pasien->nama }}</td>
                    @else
                        <td>{{ $data->nama_pasien }}</td>
                    @endif
                </tr>
                @if ($data->pasien?->no_rm)
                    <tr>
                        <th>No.RM :</th>
                        <td>{{ $data->pasien->no_rm }}</td>
                    </tr>
                @endif
                @if ($data->pasien?->alamat)
                    <tr>
                        <th>Alamat :</th>
                        <td>{{ $data->pasien->alamat }}</td>
                    </tr>
                @endif
            </thead>
        </table>
        <br><br>
        <b>Daftar Obat :</b>
        <table id="customers">
            <thead>
                <tr>
                    <th>Nama Obat</th>
                    <th>Jumlah</th>
                    @if (!$data->pasien)
                        <th>Total</th>
                    @endif
                    {{-- <th>Total</th>
                    <th>Keterangan</th> --}}
                </tr>
            </thead>
            <tbody>
                @foreach ($data->keranjang as $keranjang)
                    <tr>
                        <td>{{ $keranjang->obat->nama }}</td>
                        <td>{{ $keranjang->jumlah }}</td>
                        @if (!$data->pasien)
                            <td>{{ $keranjang->jumlah * $keranjang->obat->harga_jual }}</td>
                        @endif
                        {{-- <td>{{ $keranjang->keterangan }}</td> --}}
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
