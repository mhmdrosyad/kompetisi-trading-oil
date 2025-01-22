import React, { useState, useEffect } from "react";
import { RowsPhotoAlbum } from "react-photo-album";
import "react-photo-album/rows.css"; // Mengimpor styling untuk gallery
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css"; // Mengimpor styling untuk lightbox

export default function UserGallery({ images }) {
    const [open, setOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [formattedPhotos, setFormattedPhotos] = useState([]);

    useEffect(() => {
        // Ambil dimensi asli gambar dan buat array foto
        const loadPhotos = async () => {
            const photos = await Promise.all(
                images.map((image) => {
                    return new Promise((resolve) => {
                        const img = new Image();
                        img.src = "/storage/" + image.image_path;
                        img.onload = () => {
                            resolve({
                                src: img.src,
                                width: img.width,
                                height: img.height,
                            });
                        };
                    });
                })
            );
            setFormattedPhotos(photos);
        };

        loadPhotos();
    }, [images]);
    // Fungsi untuk membuka lightbox dan set index gambar yang dipilih
    const handleImageClick = (index) => {
        setCurrentIndex(index);
        setOpen(true);
    };

    return (
        <>
            <RowsPhotoAlbum
                photos={formattedPhotos}
                onClick={({ index }) => handleImageClick(index)} // Menangani klik gambar
                layout="rows"
            />

            <Lightbox
                open={open}
                close={() => setOpen(false)} // Menutup lightbox
                slides={formattedPhotos} // Menentukan gambar di dalam lightbox
                index={currentIndex} // Menentukan gambar yang sedang ditampilkan di lightbox
            />
        </>
    );
}
