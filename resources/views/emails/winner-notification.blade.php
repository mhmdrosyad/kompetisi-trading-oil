<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pemenang Kompetisi</title>
</head>
<body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; background-color: #f9f9f9;">
    <div style="width: 100%; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
        <!-- Header -->
        <div style="background-color: #1a1a1a; color: #ffffff; padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
            <img src="https://ptntc.com/wp-content/uploads/2024/12/ato-mix-putih.png" alt="Logo Kompetisi" style="width: 150px; margin: 20px auto; display: block;">
            <h1 style="margin: 0; font-size: 24px;">Selamat! Anda Juara {{ $customRank }}</h1>
            <p style="margin: 10px 0; font-size: 16px;">Kompetisi Demo Trading Oil</p>
        </div>

        <!-- Konten Utama -->
        <div style="padding: 20px; background-color: #ffffff; border-radius: 0 0 10px 10px; border: 1px solid #efefef;">
            <p style="font-size: 16px; color: #333333; line-height: 1.5;">Halo {{ $user->name }},</p>
            <p style="font-size: 16px; color: #333333; line-height: 1.5;">
                Selamat! Anda telah menjadi juara <strong>{{ $customRank }}</strong> dalam kompetisi demo trading oil. 
                Terima kasih telah berpartisipasi, dan kami harap Anda terus berprestasi!
            </p>
            <p style="font-size: 16px; color: #333333; line-height: 1.5;">Silahkan segera hubungi kami untuk klaim hadiah melalui tombol di bawah ini:</p>
            <a href="#" style="display: inline-block; padding: 12px 24px; background-color: #1a1a1a; color: #ffffff; text-decoration: none; border-radius: 5px; text-align: center; font-size: 16px;">Klaim Hadiah</a>
        </div>

        <!-- Footer -->
        <div style="text-align: center; font-size: 12px; color: #777777; margin-top: 20px;">
            <p style="margin: 0;">Terima kasih telah bergabung dengan kompetisi kami.</p>
            <p style="margin: 0;">&copy; 2025 <a href="https://ptntc.com" target="_blank" style="color: #777777; text-decoration: underline;">PT Nusantara Trade Center</a></p>
        </div>
    </div>
</body>
</html>
